import useInitOptions from '@/hooks/use_init_options'

export function useOptions() {
  return useInitOptions([
    {
      // 藏品编号类型
      key: 'options_collection_number_name',
      isDict: true,
      dictCode: 'collection_number_name'
    },
    {
      // 藏品编号类型
      key: 'options_cp_texture_1',
      isDict: true,
      isTree: true,
      dictCode: 'cp_texture_1'
    },
    {
      // 文物类别
      key: 'options_artifact_type',
      isDict: true,
      dictCode: 'artifact_type'
    },
    {
      // 文物级别
      key: 'options_artifact_level',
      isDict: true,
      dictCode: 'artifact_level'
    },
    {
      // 年代
      key: 'options_years',
      isDict: true,
      isTree: true,
      dictCode: 'years'
    },
    {
      // 质量范围
      key: 'options_quality_range',
      isDict: true,
      dictCode: 'quality_range'
    },
    {
      // 质量单位
      key: 'options_quality_unit',
      isDict: true,
      dictCode: 'quality_unit'
    },
    {
      // 外形尺寸单位
      key: 'options_dimensional_units',
      isDict: true,
      dictCode: 'dimensional_units'
    },
    {
      // 数量单位
      key: 'options_actual_quantity_unit',
      isDict: true,
      dictCode: 'actual_quantity_unit'
    },
    {
      // 文物来源
      key: 'options_source_cultural_relics',
      isDict: true,
      dictCode: 'source_cultural_relics'
    },
    {
      // 入藏时间范围
      key: 'options_time_range_tibet',
      isDict: true,
      dictCode: 'time_range_tibet'
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
    }
  ])
}
