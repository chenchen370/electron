export const options_approval_type = [
  { label: '入藏', value: '1' },
  { label: '提用', value: '2' },
  { label: '归库', value: '3' },
  { label: '新增藏品', value: '4' },
  { label: '藏品信息编辑', value: '5' },
  { label: '多媒体编辑', value: '6' },
  { label: '核销', value: '7' },
  { label: '多媒体删除', value: '8' }
]

export const options_approval_status = [
  { label: '待审批', value: '0', tagType: 'info' },
  { label: '审批中', value: '1', tagType: 'warning' },
  { label: '已完成', value: '2', tagType: 'success' },
  { label: '已拒绝', value: '3', tagType: 'danger' }
]

// @ApiModelProperty(value = "审批类型 1:入藏 2：提用  3：归库 4：新增藏品 5：藏品信息编辑 6：多媒体编辑 7：核销 8: 多媒体删除")
