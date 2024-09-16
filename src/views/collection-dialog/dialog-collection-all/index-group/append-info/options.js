import useInitOptions from '@/hooks/use_init_options'

function options_info() {
  return useInitOptions([
    {
      // 文物类别
      key: 'options_artifact_type',
      isDict: true,
      dictCode: 'artifact_type'
    },
    {
      // 藏品基本部类
      key: 'options_basic_categories_collectibles',
      isDict: true,
      dictCode: 'basic_categories_collectibles'
    },
    {
      // 标本类别
      key: 'options_specimen_category',
      isDict: true,
      dictCode: 'specimen_category'
    },
    {
      // 模型类别
      key: 'options_model_category',
      isDict: true,
      dictCode: 'model_category'
    },
    {
      // 复制品类别
      key: 'options_copy_category',
      isDict: true,
      dictCode: 'copy_category'
    },
    {
      // 文物级别
      key: 'options_artifact_level',
      isDict: true,
      dictCode: 'artifact_level'
    },
    {
      // 文物藏品保密级别
      key: 'options_collection_secrecy_level',
      isDict: true,
      dictCode: 'collection_secrecy_level'
    },
    {
      // 地域类型
      key: 'options_regional_type',
      isDict: true,
      dictCode: 'regional_type'
    },
    {
      // 地域表示方式
      key: 'options_geographical_representation',
      isDict: true,
      dictCode: 'geographical_representation'
    },
    {
      // 人文类型
      key: 'options_humanities_type',
      isDict: true,
      dictCode: 'humanities_type'
    },
    {
      // 人文表示方式
      key: 'options_humanistic_representation',
      isDict: true,
      dictCode: 'humanistic_representation'
    },
    {
      // 功能类别
      key: 'options_functional_categories',
      isDict: true,
      isTree: true,
      dictCode: 'functional_categories'
    },
    {
      // 颜色类别
      key: 'options_color_category',
      isDict: true,
      dictCode: 'color_category'
    },
    {
      // 装饰题材类别
      key: 'options_decorative_theme_categories',
      isDict: true,
      isTree: true,
      dictCode: 'decorative_theme_categories'
    },
    {
      // 装饰组成方式
      key: 'options_decoration_composition_method',
      isDict: true,
      isTree: true,
      dictCode: 'decoration_composition_method'
    },

    {
      // 化石类别
      key: 'options_fossil_categories',
      isDict: true,
      dictCode: 'fossil_categories'
    }
    // ---------------
  ])
}
export default options_info()
