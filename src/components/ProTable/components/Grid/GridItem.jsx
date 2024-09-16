import { defineComponent, inject, ref } from 'vue';
export default defineComponent({
  __GRID_ITEM__: true,
  name: 'GridItem',
  props: {
    span: {
      type: [Object, Number],
      default: 1
    },
    offset: {
      type: [Object, Number],
      default: 0
    },
    suffix: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { cols, gap, overflow } = inject('responsive', {
      cols: ref(4),
      gap: 0,
      overflow: ref(false)
    });
    return {
      driveStyle(breakPoint) {
        const span =
          typeof props.span === 'object'
            ? props.span[breakPoint] ?? 1
            : props.span;
        const offset =
          typeof props.offset === 'object'
            ? props.offset[breakPoint] ?? 0
            : props.offset;
        const gridColumnStart = cols.value - span - offset + 1;
        const gridColumnEnd = `span ${
          span + offset > cols.value ? cols.value : span + offset
        }`;
        const marginLeft =
          offset !== 0
            ? `calc(((100% + ${gap}px) / ${span + offset}) * ${offset})`
            : 'unset';

        if (props.suffix) {
          return {
            gridColumnStart,
            gridColumnEnd,
            marginLeft
          };
        } else {
          return {
            gridColumn: `${gridColumnEnd}/span ${
              span + offset > cols.value ? cols.value : span + offset
            }`,
            marginLeft
          };
        }
      },
      overflow: overflow
    };
  },
  render() {
    // @ts-ignore
    return (
      <div
        style={{
          display: this.$attrs.privateShow === false ? 'none' : '',
          ...this.driveStyle(this.$attrs.breakPoint)
        }}
      >
        {this.$slots.default?.({ overflow: this.overflow })}
      </div>
    );
  }
});
