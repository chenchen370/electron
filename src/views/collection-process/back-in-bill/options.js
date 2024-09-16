import useInitOptions from '@/hooks/use_init_options'

export function useOptionInfo() {
  return useInitOptions([
    {
      key: 'application_type',
      isDict: true,
      dictCode: 'application_type'
    },
    {
      key: 'out_type',
      isDict: true,
      dictCode: 'out_type'
    },
    {
      key: 'out_status',
      isDict: true,
      dictCode: 'out_status'
    },
  ])
}
