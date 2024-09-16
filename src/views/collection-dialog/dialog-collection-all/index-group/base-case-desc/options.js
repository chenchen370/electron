import useInitOptions from '@/hooks/use_init_options'

function options_info() {
  return useInitOptions([
    {
      // 年代类型
      key: 'options_years_type',
      isDict: true,
      dictCode: 'years_type'
    }
  ])
}
export default options_info()
