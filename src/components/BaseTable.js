export default {
  name: 'BaseTable',
  template: `
    <el-table :data="data"  stripe v-on="listeners" v-bind="$attrs" >
      <template v-for="(colConfig,index) in colConfigs" >
        <slot v-if="colConfig.slot" :name="colConfig.slot"></slot>
        <component
          v-else-if="colConfig.component"
          :is="colConfig.component" 
          :col-config="colConfig">
        </component>
      <el-table-column v-else v-bind="colConfig"></el-table-column>
      </template>  
    </el-table>
  `,
  props: {
    colConfigs: {
      required: true
    },
    data: {
      required: true
    },
    listLoading: {
      required: false,
      default: false
    },
  }, 
  computed: {
    listeners() {
      return {
        ...this.$listeners
      }
    }  
  }
}
