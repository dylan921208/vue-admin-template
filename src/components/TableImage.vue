<template>
<el-table-column :label="colConfig.label" width="180px">
  <template slot-scope="scope">
    <img :src="colConfig.prop" alt="" class="table-prize-picture">
  </template>
</el-table-column>
</template>

<script>
export default {
  name: 'TableImage',
  props: ['colConfig'],
  data() {
    return {}
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
 }
</script>

<style scoped>
.table-prize-picture {
  width: 160px;
  height: auto;
}
</style>
