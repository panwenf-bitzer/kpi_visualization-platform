<!--
 * @FileDescription: child component for table of productivity
 * @Author: Pan,Wenfang
 * @Date: 2022/01/04
 * @LastEditors: Pan,wenfang
 * @LastEditTime: 2022/02/28
 -->
<template>
<el-table :data="data" height="100%" :row-style="{height: '2px'}" :cell-style="{padding: '0px',fontSize:'10px'}" :header-cell-style="{padding: '0px'}">
  <el-table-column prop="item" label="item" width="180px">

  </el-table-column>

  <el-table-column prop="target" label="target" >

  </el-table-column>

  <el-table-column prop="current" label="current">

  </el-table-column>

  <el-table-column prop="trend" label="trend">
                    <template #default="scope">
                      <span v-if="(parseFloat(scope.row.current)>=parseFloat(scope.row.target))&&scope.row.item!=='Unplan Downtime'">
                        <el-button type="success" size="mini" icon="el-icon-top-right" >
                        </el-button>
                        </span>
                      <span v-else-if="(parseFloat(scope.row.current)<parseFloat(scope.row.target))&&scope.row.item!=='Unplan Downtime'">
                         <el-button type="danger" size="mini" icon="el-icon-bottom-right" >
                        </el-button>
                      </span>
                      <span v-else-if="(parseFloat(scope.row.current)<=parseFloat(scope.row.target))&&scope.row.item==='Unplan Downtime'">
                         <el-button type="success" size="mini" icon="el-icon-bottom-right" >
                        </el-button>
                      </span>
                      <span v-else>
                         <el-button type="danger" size="mini" icon="el-icon-top-right" >
                        </el-button>
                      </span>


                      </template>
  </el-table-column>

</el-table>
</template>

<script>
export default {
  name: "TableProductivity",
  setup(){
    const data=[
             {item: "Productivity Ass",
             target: "54.1%",
             current: "54.2%",
             trend: ""},
            {item: "Productivity CNC",
             target: "57.1%",
             current: "58%",
             trend: ""},
            {item: "OEE CNC",
             target: "82%",
             current: "84%",
             trend: ""},
            {item: "Unplan Downtime",
             target: "2 h",
             current: "8 h",
             trend: ""},
  ]
    return{data}
  }
}
</script>

<style scoped>

</style>