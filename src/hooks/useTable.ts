import { ref, reactive } from 'vue'

export interface UseTableOption {
  pageSize?: number
  queryAction: (page: Page) => Promise<{ list: any[]; total: number }>
}
export interface Page {
  currentPage: number
  pageSize: number
  total: number
}
export function useTable({ queryAction, pageSize = 20 }: UseTableOption) {
  const page = reactive<Page>({
    currentPage: 1,
    pageSize: pageSize,
    total: 0
  })
  const listLoading = ref(false)
  const list = ref<any[]>([])
  const searchLoading = ref(false)

  function queryList() {
    listLoading.value = true
    queryAction(page)
      .then(res => {
        list.value = res.list || []
        page.total = res.total || 0
      })
      .finally(() => {
        searchLoading.value = false
        listLoading.value = false
      })
  }

  function onSearch() {
    searchLoading.value = true
    page.currentPage = 1
    queryList()
  }

  function onPageChange(e: { page: number; limit: number }) {
    console.log(e)
    page.currentPage = e.page
    page.pageSize = e.limit
    queryList()
  }

  return {
    page,
    list,
    listLoading,
    onPageChange,
    searchLoading,
    onSearch,
    queryList
  }
}
