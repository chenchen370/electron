import useInitOptions from '@/hooks/use_init_options'

function options_info() {
  return useInitOptions([
    // 移动原因
    {
      key: 'options_reason_withdrawal',
      isDict: true,
      dictCode: 'reason_withdrawal'
    },
    // 展览类型
    {
      key: 'options_exhibition_type',
      isDict: true,
      dictCode: 'exhibition_type'
    }
  ])
}
export default options_info()
