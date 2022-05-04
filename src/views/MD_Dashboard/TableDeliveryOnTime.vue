<!--
 * @FileDescription: child component for table of delivery ontime
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
                      <span v-if="parseFloat(scope.row.current)>parseFloat(scope.row.target)">
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
  name: "TableDeliveryOnTime",

   setup(){
    const data=[
             {item: "Delivery IT SH",
             target: "99%",
             current: "98.9%",
             trend: ""},
      {item: "Delivery IT SC",
             target: "98%",
             current: "98.8%",
             trend: ""},
        {item: "Delivery IT ALU",
             target: "99%",
             current: "98.8%",
             trend: ""},
        {item: "Delivery IT Scroll",
             target: "99%",
             current: "98.7%",
             trend: ""},
        {item: "Ʃ time on rework",
             target: "280 h",
             current: "313.3 h",
             trend: ""},

  ]
    return{data}
  }

}
</script>

<style scoped>

</style>