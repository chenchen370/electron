import useInitOptions from '@/hooks/use_init_options'

function options_info() {
  return useInitOptions([
    // 藏品编号类型
    {
      key: 'options_collection_number_name',
      isDict: true,
      dictCode: 'collection_number_name'
    },
    // 入藏时间范围
    {
      key: 'options_time_range_tibet',
      isDict: true,
      dictCode: 'time_range_tibet'
    },
    // 研究部门
    {
      key: 'options_research_department',
      isDict: true,
      dictCode: 'research_department'
    }, // 保护优先等级
    {
      key: 'options_protection_priority_level',
      isDict: true,
      dictCode: 'protection_priority_level'
    },
    // 保存状态
    {
      key: 'options_save_status',
      isDict: true,
      dictCode: 'save_status'
    },
    // 当前保存条件
    {
      key: 'options_current_saving_conditions',
      isDict: true,
      dictCode: 'current_saving_conditions'
    }
  ])
}
export default options_info()
