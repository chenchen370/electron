import { reactive } from 'vue'
import { dataTree } from '@/api/system/dict/data'
import { useDict } from '@/utils/dict'
import { handleTree } from '@/utils/zhebo'
type IProps = {
  key: string
  apiParams?: any
  api?: (params: any) => Promise<any>
  isDict?: boolean
  dictCode?: string
  isTree: boolean
}[]

export default function useInitOptions(props: IProps) {
  const optionObj = reactive<any>({})
  props.forEach(async p => {
    if (p?.isDict) {
      if (p.isTree) {
        const res = await dataTree({ dictType: p?.dictCode })
        optionObj[p.key] = handleTree(
          res.data,
          'dictCode',
          'parentId',
          'children'
        )
        console.log('tree ===> ', res)
      } else {
        const res = useDict(p?.dictCode) as any
        console.log(res)
        if (p?.dictCode) {
          optionObj[p.key] = res[p?.dictCode]
        }
      }
    } else {
      const res = await p?.api?.(p?.apiParams)
      optionObj[p.key] = res?.rows || res?.data || [];
    }
  })
  console.log('optionObj====>', optionObj)
  return optionObj
}
