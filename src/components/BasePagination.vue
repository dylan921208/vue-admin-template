<template>
<el-row :style="{marginTop: width || '20px', float: float || 'right'}">
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.pageNo"
      :page-sizes="pageSizeArr"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total">
      <div slot="sizes"></div>
      <div slot="pager"></div>
      <div slot="jumper"></div>
      <div slot="next"></div>
  </el-pagination>
</el-row>
</template>

<script>
export default {
  name: 'BasePagination',
  props: ['pageInfo', 'pageNoChange', 'pageSizeChange', 'width', 'float'],
  data() {
    return {
      pageSizeArr: [10,20,50],

    }
  },
  components: {},
  methods: {
    handleCurrentChange(val) {
      this.pageNoChange(val)
    },
    handleSizeChange(val) {
      this.pageSizeChange(val)
    }
  },
  mounted() {},
  watch: {},
  computed: {}
 }
</script>

<style>

</style>
