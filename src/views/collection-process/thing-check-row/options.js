import useInitOptions from '@/hooks/use_init_options'

function options_info() {
  return useInitOptions([
    {
      // 文物级别
      key: 'options_artifact_level',
      isDict: true,
      dictCode: 'artifact_level'
    },
    {
      // 文物类别
      key: 'options_artifact_type',
      isDict: true,
      dictCode: 'artifact_type'
    },
    {
      // 藏品质地-一类
      key: 'options_cp_texture_1',
      isDict: true,
      isTree: true,
      dictCode: 'cp_texture_1'
    },
    {
      // 质量范围
      key: 'options_quality_range',
      isDict: true,
      dictCode: 'quality_range'
    },
    {
      // 保存状态
      key: 'options_save_status',
      isDict: true,
      dictCode: 'save_status'
    },
    {
      // 完残程度
      key: 'options_degree_disability',
      isDict: true,
      dictCode: 'degree_disability'
    },
    {
      // 入藏时间范围
      key: 'options_time_range_tibet',
      isDict: true,
      dictCode: 'time_range_tibet'
    },
    {
      // 年代
      key: 'options_years',
      isDict: true,
      isTree: true,
      dictCode: 'years'
    }
  ])
}
export default options_info()
