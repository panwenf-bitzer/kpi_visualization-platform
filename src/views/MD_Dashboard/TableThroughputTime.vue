<!--
 * @FileDescription: child component for table of throughput time
 * @Author: Pan,Wenfang
 * @Date: 2022/01/04
 * @LastEditors: Pan,wenfang
 * @LastEditTime: 2022/02/28
 -->
<template>
<el-table :data="data" height="100%" :row-style="{height: '8px'}" :cell-style="{padding: '0px',fontSize:'10px'}" :header-cell-style="{padding: '0px'}">
  <el-table-column prop="item" label="item" width="180px">

  </el-table-column>

  <el-table-column prop="target" label="target" >

  </el-table-column>

  <el-table-column prop="current" label="current">

  </el-table-column>

  <el-table-column prop="trend" label="trend">
  <template #default="scope" >
                      <span v-if="(parseFloat(scope.row.current)>=parseFloat(scope.row.target))&&scope.row.item!=='Employee turnover'">
                        <el-button type="danger" size="mini" icon="el-icon-top-right" >
                        </el-button>
                        </span>
                        <span v-else-if="(parseFloat(scope.row.current)<parseFloat(scope.row.target))&&scope.row.item!=='Employee turnover'">
                        <el-button type="success" size="mini" icon="el-icon-bottom-right" >
                        </el-button>
                        </span>
                        <span v-else-if="(parseFloat(scope.row.current)>=parseFloat(scope.row.target))&&scope.row.item==='Employee turnover'">
                        <el-button type="success" size="mini" icon="el-icon-top-right" >
                        </el-button>
                        </span>
                        <span v-else>
                         <el-button type="danger" size="mini" icon="el-icon-bottom-right" >
                        </el-button>
                      </span>
                      </template>
  </el-table-column>

</el-table>
</template>

<script>
export default {
  name: "TableThroughputTime",
    setup(){
    const data=[
             {item: "Employee turnover",
             target: "11%",
             current: "9.7%",
             trend: ""},
      {item: "WIP",
             target: "2000 unts",
             current: "2726 unts",
             trend: ""},
        {item: "Sick Leave rate",
             target: "0.8%",
             current: "0.9%",
             trend: ""},
        {item: "Scrape rate",
             target: "52ppt",
             current: "104ppt",
             trend: ""},

  ]
    return{data}
  }
}
</script>

<style scoped>

</style>