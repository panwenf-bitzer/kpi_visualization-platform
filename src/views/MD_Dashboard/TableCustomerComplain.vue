<!--
 * @FileDescription: child component for table of customer complain
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
                      <span v-if="parseFloat(scope.row.current)<=parseFloat(scope.row.target)">
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
  name: "TableCustomerComplain",
  setup(){
    const data=[
             {item: "failures in product",
             target: "63 ppt",
             current: "69 ppt",
             trend: ""},
      {item: "customer complain Alu",
             target: "5 ppt",
             current: "3 ppt",
             trend: ""},
        {item: "customer complain SH",
             target: "5 ppt",
             current: "5 ppt",
             trend: ""},
        {item: "customer complain SC",
             target: "15 ppt",
             current: "23 ppt",
             trend: ""},
        {item: "customer complain SCR",
             target: "5 ppt",
             current: "14 ppt",
             trend: ""},

  ]
    return{data}
  }
}

</script>

<style scoped>

</style>