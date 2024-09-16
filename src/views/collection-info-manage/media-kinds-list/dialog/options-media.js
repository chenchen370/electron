import useInitOptions from '@/hooks/use_init_options'

function options_info() {
  return useInitOptions([
    {
      // 藏品编号类型
      key: 'options_collection_number_name',
      isDict: true,
      dictCode: 'collection_number_name'
    },
    {
      // 类别
      key: 'options_category',
      isDict: true,
      dictCode: 'category'
    },
    {
      // 类别
      key: 'options_recording_medium',
      isDict: true,
      dictCode: 'recording_medium'
    },
    {
      // 类别
      key: 'options_record_angle',
      isDict: true,
      dictCode: 'record_angle'
    },
    {
      // 采集方式
      key: 'options_collection_method',
      isDict: true,
      dictCode: 'collection_method'
    },
    {
      // 采集精度单位
      key: 'options_collection_accuracy_unit',
      isDict: true,
      dictCode: 'collection_accuracy_unit'
    },
    {
      // 采集加工手段
      key: 'options_collection_processing_methods',
      isDict: true,
      dictCode: 'collection_processing_methods'
    }
  ])
}
export default options_info()
