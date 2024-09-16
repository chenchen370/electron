import useInitOptions from '@/hooks/use_init_options'
import {  deptTreeSelect } from '@/api/system/user';

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
      // 年代
      key: 'options_years',
      isDict: true,
      dictCode: 'years'
    },
    {
      // 年代树
      key: 'options_years_tree',
      isDict: true,
      isTree: true,
      dictCode: 'years'
    },
    {
      // 部门
      key: 'options_dept_tree',
      api: deptTreeSelect,
    }
  ])
}
export default options_info()
