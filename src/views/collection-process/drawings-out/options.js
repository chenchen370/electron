import useInitOptions from '@/hooks/use_init_options'

export function useOptionInfo() {
  return useInitOptions([
    {
      key: 'application_type',
      isDict: true,
      dictCode: 'application_type'
    },
    {
      key: 'out_type',
      isDict: true,
      dictCode: 'out_type'
    },
    {
      key: 'artifact_level',
      isDict: true,
      dictCode: 'artifact_level'
    },
    {
      key: 'exhibition_type',
      isDict: true,
      dictCode: 'exhibition_type'
    },
    {
      key: 'reason_withdrawal',
      isDict: true,
      dictCode: 'reason_withdrawal'
    },
    {
      key: 'flow_status',
      isDict: true,
      dictCode: 'flow_status'
    }
  ])
}

// 审批状态
export const flowStatus = [
  { label: '未提交', value: '0' },
  { label: '待审批', value: '1' },
  { label: '审批通过', value: '2' },
  { label: '被驳回', value: '3' }
]

// export const outTypes = [
//   { label: '馆内提用', value: '1' },
//   { label: '馆外提用', value: '2' }
// ]

// flowStatus	string
// 审批状态 0：未提交 1：待审批 2：审批通过 3-被驳回
// 提用去向 字典outType 1:馆内提用  2：馆外提用
// queryType 查询业务类型 all：退库总账 mine：我发起的 approval：待我审批的
