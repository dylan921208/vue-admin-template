const initPageInfo =  {
  pageNo: 1,
  pageSize: 10,
  total: undefined
}

export default {
  data() {
    return {
      pageInfo: {...initPageInfo}
    }   
  },
  methods: {
    pageNoChange(val) {
      this.pageInfo.pageNo = val
      this.getList()
    },
    pageSizeChange(val) {
      this.pageInfo.pageSize = val
      this.getList()
    },
    initPageInfo() {
      this.pageInfo = { ...initPageInfo}
    }
  }
}
