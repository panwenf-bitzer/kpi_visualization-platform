<!--
 * @FileDescription: father component for compressor sheet
 * @Author: Pan,Wenfang
 * @Date: 2022/01/04
 * @LastEditors: Pan,wenfang
 * @LastEditTime: 2022/02/28
 -->
<template>
    <div>
        <div class="container">
          <el-row :gutter="20">
            <el-col :span="24" class="Time">
            <div class="handle-box">
                <el-select v-model="query.line" placeholder="Lines" class="handle-select mr10">
                  <el-option key="bbk" label="ALU&MSK assembly line" value="ALU&MSK"></el-option>
                  <el-option key="imoo" label="SC assembly line" value="SC"></el-option>
                  <el-option key="imoo" label="SH assembly line" value="SH"></el-option>
                  <el-option key="imoo" label="SCR assembly line" value="SCR"></el-option>
                </el-select>
                <el-radio v-model="query.period" label="day">Daily</el-radio>
              <el-radio v-model="query.period" label="week">Weekly</el-radio>
              <el-radio v-model="query.period" label="month">Monthly</el-radio>
              <el-radio v-model="query.period" label="quarter">Quarterly</el-radio>
              <el-radio v-model="query.period" label="year">Yearly</el-radio>
                <el-date-picker v-model="query.date" value-format="YYYYMMDD" type="date" placeholder="Select date"  class="handle-input mr10"></el-date-picker>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">Search</el-button>
                <el-button type="warning" icon="el-icon-search" @click="abnormalSearch">Abnormal search</el-button>
            </div>
            <el-table :data="tableData.slice((query.pageIndex-1)*query.pageSize,query.pageIndex*query.pageSize)" border class="table" ref="multipleTable" header-cell-class-name="table-header">
<!--              <el-table-column prop="Id" label="ID" width="55" align="center"></el-table-column>-->
              <el-table-column prop="SerialNumber" label="SerialNumber" min-width="6%" ></el-table-column>
              <el-table-column prop="MaterialNumber" label="MaterialNumber" min-width="6%" ></el-table-column>
              <el-table-column prop="SalesOrderNumber" label="SalesOrderNumber" min-width="8%" ></el-table-column>
              <el-table-column prop="ProductionLine" label="ProductionLine" min-width="6%" ></el-table-column>
              <el-table-column label="PreassemblyStartTime" min-width="10%" >
                    <template #default="scope">{{ scope.row.PreassemblyStartTime}}</template>
              </el-table-column>
              <el-table-column label="WashingStartTime" min-width="10%" >
                    <template #default="scope">{{ scope.row.WashingStartTime}}</template>
              </el-table-column>
              <el-table-column label="PackagingStartTime" min-width="10%" >
                    <template #default="scope">{{ scope.row.PackagingStartTime}}</template>
              </el-table-column>
              <el-table-column prop="AssThroughputTime" label="AssThroughputTime" min-width="8%" ></el-table-column>
              <el-table-column prop="CncThroughputTime" label="CncThroughputTime" min-width="8%" ></el-table-column>
              <el-table-column prop="AllThroughputTime" label="AllThroughputTime" min-width="8%" ></el-table-column>

            </el-table>
            <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                      :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
            </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24" class="assembly_pie">
            <compressor_analysis :raw_data="curve_tableData"></compressor_analysis>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <compressor_k_analysis :boxplot_data="curve_tableData" @outliers="outliers_listener" ></compressor_k_analysis>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <compressor_bar_analysis :bar_data="curve_tableData" ></compressor_bar_analysis>
            </el-col>
          </el-row>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import {fetch_table_compressor } from "../../api/Throughput_center";
import compressor_analysis from "./compressor_analysis.vue";
import compressor_k_analysis from "./compressor_k_analysis.vue";
import compressor_bar_analysis from "./compressor_bar_analysis.vue";
export default {
    name: "basetable",
    components:{compressor_analysis,compressor_k_analysis,compressor_bar_analysis},
    setup() {
        const query = reactive({// 获取数据的query
            line: "alu&msk",
            date:getNowFormatDate(),
            pageIndex: 1,
            pageSize: 6,
            period:'day'
        });
        const tableData = ref([]);//获取数据表格的定义
        const pageTotal = ref(0);// 页面数的定义
        const curve_tableData = reactive({
          tableData:[]
        })
        const cnc_outlier=ref([])// cnc的异常值
        const Assy_outlier=ref([])// 组装线的异常值
        const Total_outlier=ref([])// 总时间异常值
        // 获取表格数据
        const getData = () => {
            fetch_table_compressor(query).then((res) => {
                tableData.value =res;
                pageTotal.value=res.length;
                curve_tableData["tableData"]=res
                console.log(res)
            });
        };

        // 查询操作
        const handleSearch = () => {
            query.pageIndex = 1;
            getData();
        };
        // 分页导航
        const handlePageChange = (val) => {
            query.pageIndex = val;
        };

        // 依据boxplot的异常值的搜索
        const abnormalSearch = () => {
            query.pageIndex = 1;

            console.log("hhh")
            console.log(curve_tableData["tableData"])
            fetch_table_compressor(query).then((res) => {
              tableData.value.length =0;
              for(let i=0;i<res.length;i++){
              if (res[i]['CncThroughputTime']>cnc_outlier.value[4] || res[i]['AssThroughputTime']>Assy_outlier.value[4]){
                 tableData.value.push(res[i])}
            }
              pageTotal.value=tableData.value.length;
              console.log(curve_tableData["tableData"])
            });
        };
        //监听子组件的变量的变化
        const outliers_listener = (load1,load2,load3) => {
          cnc_outlier.value=load1
          Assy_outlier.value=load2
          Total_outlier.value=load3
        }
        //返回规定20220223样式的时间格式，以保持与后端的一致
      function getNowFormatDate() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        return year + month + strDate;
    }
        return {
            query,
            tableData,
            curve_tableData,
            pageTotal,
            getData,
            handleSearch,
            handlePageChange,
            abnormalSearch,
            outliers_listener
        };
    },
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 200px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
