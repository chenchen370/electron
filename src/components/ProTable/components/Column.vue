<script lang="jsx">
/* eslint-disable camelcase */
/* prettier-ignore */
// @ts-nocheck
import { inject, ref, useSlots, defineComponent } from 'vue';
import {
  filterEnum,
  formatValue,
  handleProp,
  handleRowAccordingToProp
} from './../utils';
import { ElButton, ElTableColumn, ElTooltip, ElSpace } from 'element-plus';
import { QuestionFilled } from '@element-plus/icons-vue';
export default defineComponent(
  props => {
    const slots = useSlots();
    const enumMap = inject('enumMap', ref(new Map()));
    // 渲染表格数据
    const renderCellData = (item, scope) => {
      return enumMap.value.get(item.prop) && item.isFilterEnum
        ? filterEnum(
            handleRowAccordingToProp(scope.row, item.prop),
            enumMap.value.get(item.prop),
            item.fieldNames
          )
        : formatValue(handleRowAccordingToProp(scope.row, item.prop));
    };

    // 获取 tag 类型
    const getTagType = (item, scope) => {
      return filterEnum(
        handleRowAccordingToProp(scope.row, item.prop),
        enumMap.value.get(item.prop),
        item.fieldNames,
        'tag'
      );
    };
    const RenderTableColumn = item => {
      if (item.isShow)
        return (
          <ElTableColumn
            {...item}
            align={item.align ?? 'center'}
            showOverflowTooltip={
              item.showOverflowTooltip ?? item.prop !== 'operation'
            }
          >
            {{
              default: scope => {
                if (item._children)
                  return item._children.map(child => RenderTableColumn(child));
                if (item.render) return item.render(scope);
                if (slots[handleProp(item.prop)])
                  return slots[handleProp(item.prop)](scope);
                if (item.tag)
                  return (
                    <el-tag type={getTagType(item, scope)}>
                      {renderCellData(item, scope)}
                    </el-tag>
                  );
                return renderCellData(item, scope);
              },
              header: scope => {
                if (item.headerRender) return item.headerRender(scope);
                if (slots[`${handleProp(item.prop)}Header`])
                  return slots[`${handleProp(item.prop)}Header`](scope);
                return (
                  <ElSpace size={0}>
                    <span>{item.label}</span>
                    {item.tip && (
                      <ElTooltip>
                        {{
                          default: () => {
                            return (
                              <ElButton
                                style={{ padding: 0 }}
                                icon={QuestionFilled}
                                link
                              ></ElButton>
                            );
                          },
                          content: () => {
                            return typeof item.tip === 'function'
                              ? item.tip()
                              : item.tip;
                          }
                        }}
                      </ElTooltip>
                    )}
                  </ElSpace>
                );
              }
            }}
          </ElTableColumn>
        );
    };
    return () => {
      return RenderTableColumn(props.column);
    };
  },
  {
    name: 'ProTableColumn',
    props: {
      column: {
        type: Object,
        required: true
      }
    }
  }
);
</script>
