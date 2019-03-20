<template>
  <el-tabs v-model="currentTab" @tab-click="tabClick">
    <el-tab-pane v-for="item in tabsData" :key="item.name" :label="item.label" :name="item.name"/>
  </el-tabs>
</template>

<script>
export default {
  name: 'BaseTab',
  components: {},
  props: ['activeTab', 'tabsData'],
  data() {
    return {
      currentTab: this.activeTab
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    tabClick(e) {
      this.currentTab = e.name
      this.$emit('update:activeTab', e.name)
      this.$emit('tabChange')
    }
  }
}
</script>

<style>

</style>
