<!--<template>-->
<!--    <div>-->
<!--        <div class="crumbs">-->
<!--            <el-breadcrumb separator="/">-->
<!--                <el-breadcrumb-item>-->
<!--                    <i class="el-icon-lx-cascades"></i> Order table-->
<!--                </el-breadcrumb-item>-->
<!--            </el-breadcrumb>-->
<!--        </div>-->
<!--        <div class="container">-->
<!--            <div class="handle-box">-->
<!--                <el-select v-model="query.line" placeholder="产线" class="handle-select mr10">-->
<!--                  <el-option key="bbk" label="MSK assembly line" value="msk"></el-option>-->
<!--                  <el-option key="xtc" label="ALU assembly line" value="alu"></el-option>-->
<!--                  <el-option key="imoo" label="Sc assembly line" value="sc"></el-option>-->
<!--                  <el-option key="imoo" label="SH assembly line" value="sh"></el-option>-->
<!--                  <el-option key="imoo" label="SCR assembly line" value="scr"></el-option>-->
<!--                </el-select>-->
<!--                <el-date-picker v-model="query.date" value-format="YYYY-MM-DD" type="date" placeholder="选择日期"  class="handle-input mr10"></el-date-picker>-->
<!--                <el-button type="primary" icon="el-icon-search" @click="handleSearch">Search</el-button>-->
<!--            </div>-->
<!--            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">-->
<!--              <el-table-column prop="Id" label="ID" width="55" align="center"></el-table-column>-->
<!--              <el-table-column prop="Order_name" label="Order"></el-table-column>-->
<!--              <el-table-column label="Date">-->
<!--                    <template #default="scope">{{ scope.row.Production_date }}</template>-->
<!--                </el-table-column>-->
<!--              <el-table-column label="Time">-->
<!--                  <template #default="scope">{{ scope.row.Production_time }}</template>-->
<!--                </el-table-column>-->
<!--              <el-table-column prop="Shift" label="Shift"></el-table-column>-->
<!--              <el-table-column prop="Product" label="Product"></el-table-column>-->
<!--              <el-table-column prop="Line" label="Line"></el-table-column>-->
<!--              <el-table-column prop="Order_quantity" label="Order_quantity"></el-table-column>-->
<!--              <el-table-column label="Progress">-->
<!--                <template #default="scope">-->
<!--            <el-progress type="line" :percentage="scope.row.Current_finished_rate" :format="format(scope.row,scope.column)" color="#57DCDD" :text-inside="false" :stroke-width="14" />-->
<!--          </template>-->
<!--              </el-table-column>-->

<!--              <el-table-column label="State" align="center">-->
<!--                    <template #default="scope">-->
<!--                        <el-tag :type="-->
<!--                                scope.row.Current_status === 'on-going'-->
<!--                                    ? '进行中'-->
<!--                                    : scope.row.Current_status === 'finished'-->
<!--                                    ? '完成'-->
<!--                                    : '等待'-->
<!--                            ">{{ scope.row.Current_status}}</el-tag>-->
<!--                    </template>-->
<!--              </el-table-column>-->
<!--              <el-table-column prop="Des" label="Description"></el-table-column>-->
<!--              <el-table-column label="Operation" width="180" align="center">-->
<!--                    <template #default="scope">-->
<!--                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">Edit-->
<!--                        </el-button>-->
<!--                        <el-button type="text" icon="el-icon-delete" class="red"-->
<!--                            @click="handleDelete(scope.$index, scope.row.Id)">Delete</el-button>-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--            </el-table>-->
<!--            <div class="pagination">-->
<!--                <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"-->
<!--                    :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>-->
<!--            </div>-->
<!--        </div>-->

<!--        &lt;!&ndash; 编辑弹出框 &ndash;&gt;-->
<!--        <el-dialog title="Edit" v-model="editVisible" width="30%">-->
<!--            <el-form label-width="70px">-->
<!--                <el-form-item label="Date">-->
<!--                    <el-input v-model="form.Production_date"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="Time">-->
<!--                    <el-input v-model="form.Production_time"></el-input>-->
<!--                </el-form-item>-->
<!--                              <el-form-item label="Shift">-->
<!--                    <el-input v-model="form.Shift"></el-input>-->
<!--                </el-form-item>-->
<!--                              <el-form-item label="Des">-->
<!--                    <el-input v-model="form.Des"></el-input>-->
<!--                </el-form-item>-->
<!--                              <el-form-item label="Line">-->
<!--                    <el-input v-model="form.Line"></el-input>-->
<!--                </el-form-item>-->
<!--                 <el-form-item label="Product">-->
<!--                    <el-input v-model="form.Product"></el-input>-->
<!--                </el-form-item>-->
<!--              <el-form-item label="Order_name">-->
<!--                    <el-input v-model="form.Order_name"></el-input>-->
<!--                </el-form-item>-->
<!--              <el-form-item label="Order_quantity">-->
<!--                    <el-input v-model="form.Order_quantity"></el-input>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
<!--            <template #footer>-->
<!--                <span class="dialog-footer">-->
<!--                    <el-button @click="editVisible = false">cancel</el-button>-->
<!--                    <el-button type="primary" @click="saveEdit()">Confirm</el-button>-->
<!--                </span>-->
<!--            </template>-->
<!--        </el-dialog>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--import { ref, reactive } from "vue";-->
<!--import { ElMessage, ElMessageBox } from "element-plus";-->
<!--import { fetchData,deleteData,updateData } from "../api/index";-->

<!--export default {-->
<!--    name: "basetable",-->
<!--    setup() {-->
<!--        const query = reactive({-->
<!--            line: "all",-->
<!--            date:"2021-09-30",-->
<!--            pageIndex: 1,-->
<!--            pageSize: 10,-->
<!--        });-->
<!--        const tableData = ref([]);-->
<!--        const pageTotal = ref(0);-->
<!--        // 获取表格数据-->
<!--        const getData = () => {-->
<!--            fetchData(query).then((res) => {-->
<!--                tableData.value =res.data;-->
<!--            });-->
<!--        };-->
<!--        getData();-->

<!--        // 查询操作-->
<!--        const handleSearch = () => {-->
<!--            query.pageIndex = 1;-->
<!--            getData();-->
<!--        };-->
<!--        // 分页导航-->
<!--        const handlePageChange = (val) => {-->
<!--            query.pageIndex = val;-->
<!--            getData();-->
<!--        };-->
<!--        // 删除操作-->
<!--        const handleDelete = (index,Id) => {-->
<!--            // 二次确认删除-->
<!--            ElMessageBox.confirm("确定要删除吗？", "提示", {-->
<!--                type: "warning",-->
<!--            })-->
<!--                .then(() => {-->
<!--                    tableData.value.splice(index, 1);-->
<!--                    deleteData(Id)-->
<!--                    ElMessage.success("删除成功");-->
<!--                })-->
<!--                .catch(() => {});-->
<!--        };-->

<!--        // 表格编辑时弹窗和保存-->
<!--        const editVisible = ref(false);-->
<!--        let form = reactive({-->
<!--            Id:"",-->
<!--            Production_date:"",-->
<!--            Production_time:"",-->
<!--            Shift:"",-->
<!--            Des: "",-->
<!--            Line: "",-->
<!--            Product:"",-->
<!--            Order_name:"",-->
<!--            Order_quantity:"",-->
<!--        });-->
<!--        let idx = -1;-->
<!--        const handleEdit = (index, row) => {-->
<!--            idx = index;-->
<!--            Object.keys(form).forEach((item) => {-->
<!--                form[item] = row[item];-->
<!--            });-->
<!--            editVisible.value = true;-->
<!--        };-->
<!--        const saveEdit = () => {-->
<!--            editVisible.value = false;-->
<!--            updateData(form)-->
<!--            ElMessage.success(`修改第 ${idx + 1} 行成功`);-->
<!--            Object.keys(form).forEach((item) => {-->
<!--                tableData.value[idx][item] = form[item];-->
<!--            });-->
<!--        };-->
<!--        const format=(row, column)=>{-->
<!--          return () => {-->
<!--        if (column.label === 'Progress') {-->
<!--          return row.Current_finished_rate + 'pcs'-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--        return {-->
<!--            query,-->
<!--            tableData,-->
<!--            pageTotal,-->
<!--            editVisible,-->
<!--            form,-->
<!--            handleSearch,-->
<!--            handlePageChange,-->
<!--            handleDelete,-->
<!--            handleEdit,-->
<!--            saveEdit,-->
<!--            format,-->
<!--        };-->
<!--    },-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.handle-box {-->
<!--    margin-bottom: 20px;-->
<!--}-->

<!--.handle-select {-->
<!--    width: 120px;-->
<!--}-->

<!--.handle-input {-->
<!--    width: 300px;-->
<!--    display: inline-block;-->
<!--}-->
<!--.table {-->
<!--    width: 100%;-->
<!--    font-size: 14px;-->
<!--}-->
<!--.red {-->
<!--    color: #ff0000;-->
<!--}-->
<!--.mr10 {-->
<!--    margin-right: 10px;-->
<!--}-->
<!--.table-td-thumb {-->
<!--    display: block;-->
<!--    margin: auto;-->
<!--    width: 40px;-->
<!--    height: 40px;-->
<!--}-->
<!--</style>-->
