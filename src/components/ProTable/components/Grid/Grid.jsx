import {
  defineComponent,
  computed,
  cloneVNode,
  vShow,
  provide,
  ref,
  onMounted,
  onActivated,
  onDeactivated,
  onUnmounted
} from 'vue';
import { flatten } from './utils/flatten';
import { getSlot } from './utils/get-slot';
import { getResponsive } from './utils/get-responsive';
import { isNodeVShowFalse } from './utils/is-node-v-show-false';
export default defineComponent({
  name: 'Grid',
  props: {
    gap: {
      type: [Array, Number],
      default: 0
    },
    cols: {
      type: [Object, Number],
      default: 24
    },
    collapsed: { type: Boolean, default: false },
    collapsedRows: { type: Number, default: 1 }
    // responsive: { type: String as PropType<"self" | "screen">, default: "screen" },
  },
  setup(props, { expose }) {
    const breakPoint = ref('xl');
    // 监听屏幕变化
    const resize = e => {
      let width = e.target.innerWidth;
      switch (!!width) {
        case width < 768:
          breakPoint.value = 'xs';
          break;
        case width >= 768 && width < 992:
          breakPoint.value = 'sm';
          break;
        case width >= 992 && width < 1200:
          breakPoint.value = 'md';
          break;
        case width >= 1200 && width < 1920:
          breakPoint.value = 'lg';
          break;
        case width >= 1920:
          breakPoint.value = 'xl';
          break;
      }
    };
    onMounted(() => {
      resize({
        target: { innerWidth: window.innerWidth }
      });
      window.addEventListener('resize', resize);
    });
    onActivated(() => {
      resize({
        target: { innerWidth: window.innerWidth }
      });
      window.addEventListener('resize', resize);
    });
    onUnmounted(() => {
      window.removeEventListener('resize', resize);
    });
    onDeactivated(() => {
      window.removeEventListener('resize', resize);
    });
    // 设置间距
    const gridGap = computed(() => {
      if (typeof props.gap === 'number') return `${props.gap}px`;
      if (Array.isArray(props.gap))
        return `${props.gap[1]}px ${props.gap[0]}px`;
      return 'unset';
    });

    const gridCols = computed(() => {
      return typeof props.cols === 'object'
        ? props.cols[breakPoint.value] ?? 24
        : props.cols;
    });
    // 是否有溢出
    const overflow = ref(false);
    provide('responsive', {
      cols: gridCols,
      gap: Array.isArray(props.gap) ? props.gap[0] : props.gap,
      overflow
    });
    expose({ breakPoint });
    return {
      style: computed(() => {
        return {
          display: 'grid',
          gridGap: gridGap.value,
          gridTemplateColumns: `repeat(${gridCols.value}, minmax(0, 1fr))`
        };
      }),
      breakPoint: breakPoint,
      cols: gridCols,
      overflow: overflow
    };
  },
  render() {
    const renderContent = () => {
      this.overflow = false;
      // render will be called twice when mounted, I can't figure out why
      // 2 jobs will be pushed into job queues with same id, and then be flushed
      const rawChildren = flatten(getSlot(this));
      const childrenAndRawSpan = [];
      const { collapsed, collapsedRows, cols, breakPoint } = this;
      // 计算折叠情况下最多展示多少个span
      let collapsedSpanFlag = computed(() => {
        return collapsedRows * cols;
      });

      // 存储子元素占用的列（span + offset）
      let childSpanCache = 0;

      let suffixNode = null;
      rawChildren.forEach(child => {
        if (child?.type?.__GRID_ITEM__ !== true) return;
        if (isNodeVShowFalse(child)) {
          const clonedNode = cloneVNode(child);
          clonedNode.props = {
            ...(clonedNode.props || {}),
            privateShow: false
          };
          childrenAndRawSpan.push({
            child: clonedNode,
            rawChildSpan: 0
          });
          return;
        }
        if (child.props?.suffix == '' || child.props?.suffix === true) {
          suffixNode = cloneVNode(child);
          return;
        }
        // We don't want v-show to control display, so we need to stripe it
        // here, nor it may mess child's style
        child.dirs = child.dirs?.filter(({ dir }) => dir !== vShow) || null;

        if (child.dirs?.length === 0) {
          child.dirs = null;
        }
        const clonedChild = cloneVNode(child);

        const { span, offset } = getResponsive(child.props, breakPoint);

        childSpanCache += span + offset;
        let { span: suffixSpan, offset: suffixOffset } = getResponsive(
          suffixNode?.props,
          breakPoint
        );
        if (
          collapsed &&
          childSpanCache > collapsedSpanFlag.value - suffixSpan - suffixOffset
        ) {
          this.overflow = true;
          clonedChild.props = {
            ...(clonedChild.props || {}),
            privateShow: false
          };
        }
        if (span === 0) return;
        childrenAndRawSpan.push({
          child: clonedChild,
          rawChildSpan: span
        });
      });
      if (suffixNode) {
        suffixNode.props = {
          ...(suffixNode.props || {}),
          breakPoint: breakPoint
        };
      }
      return (
        <div style={this.style}>
          {childrenAndRawSpan.map(({ child }, idx) => {
            child.props = {
              ...child.props,
              breakPoint
            };
            return child;
          })}
          {suffixNode}
        </div>
      );
    };
    return renderContent();
  }
});
