import useInitOptions from '@/hooks/use_init_options'

function options_info() {
  return useInitOptions([
    {
      // 文档类型
      key: 'options_document_type',
      isDict: true,
      dictCode: 'document_type'
    }
  ])
}
export default options_info()
