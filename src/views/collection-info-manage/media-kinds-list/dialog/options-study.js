import useInitOptions from '@/hooks/use_init_options'

function options_study() {
  return useInitOptions([
    {
      // 研究论著类型
      key: 'options_research_papers_type',
      isDict: true,
      dictCode: 'research_papers_type'
    }
  ])
}
export default options_study()
