import useInitOptions from '@/hooks/use_init_options'

function options_info() {
  return useInitOptions([
    // 保护优先等级
    {
      key: 'options_protection_priority_level',
      isDict: true,
      dictCode: 'protection_priority_level'
    }
  ])
}
export default options_info()
