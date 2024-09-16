import useInitOptions from '@/hooks/use_init_options'

function options_info() {
  return useInitOptions([
    // 文物来源
    {
      key: 'options_source_cultural_relics',
      isDict: true,
      dictCode: 'source_cultural_relics'
    }
  ])
}
export default options_info()
