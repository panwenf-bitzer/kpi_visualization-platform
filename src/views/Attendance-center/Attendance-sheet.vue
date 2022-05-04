<!--
 * @FileDescription: father component for attendance
 * @Author: Pan,Wenfang
 * @Date: 2022/01/04
 * @LastEditors: Pan,wenfang
 * @LastEditTime: 2022/02/28
 -->
<template>
        <div class="container">
          <el-row :gutter="20" class="Attendance_row">
            <el-col :xm="24" :sm="24" :md="24" :lg="16" :xl="16" class="Attendance_table">
            <div class="handle-box" >
              <el-radio v-model="line_query.line" label="cnc" v-if="radio_visible">CNC</el-radio>
              <el-radio v-model="line_query.line" label="assembly" v-if="radio_visible">Assembly</el-radio>
              <el-radio v-model="line_query.line" label="maintenance" v-if="radio_visible">Maintenance</el-radio>
              <el-date-picker v-model="query.date" value-format="YYYYMMDD" type="date" placeholder="select date"  class="handle-input mr10"></el-date-picker>
              <el-button type="primary" icon="el-icon-search" @click="handleSearch">Search</el-button>
              <el-button type="warning" icon="el-icon-search" @click="abnormalSearch">Abnormal</el-button>
            </div>
            <el-table :data="tableData.slice((query.pageIndex-1)*query.pageSize,query.pageIndex*query.pageSize)" border class="table" ref="multipleTable" header-cell-class-name="table-header">
<!--              <el-table-column prop="Id" label="ID" width="55" align="center"></el-table-column>-->
              <el-table-column prop="Pers_No" label="Pers_No" min-width="6%" >
                <template #default="scope">{{ parseInt(scope.row.Pers_No)}}</template>
                </el-table-column>
              <el-table-column prop="Name" label="Name" min-width="9%"></el-table-column>
              <el-table-column prop="CC" label="CC" min-width="11%">
                <template #default="scope" v-if="line_query.line==='cnc'&&data_exchange===true">
                  {{scope.row.Description}}</template>
                </el-table-column>
              <el-table-column prop="Description" label="Description" min-width="9%">
                 <template #default="scope" v-if="line_query.line==='cnc'&&data_exchange===true">
                   {{scope.row.CC}}
              </template>

              </el-table-column>
              <el-table-column prop="Attendance_Time" label="Attendance_Time" min-width="8%"></el-table-column>
              <el-table-column label="Date" min-width="6%">
                <template #default="scope">{{ scope.row.Date }}</template>
              </el-table-column>
              <el-table-column label="Edit" align="center" min-width="4%">
                <template #default="scope" >
                  <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">Edit
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                               :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
            </div>
            </el-col>
            <el-col :xm="24" :sm="24" :md="24" :lg="8" :xl="8"  class="Attendance_analysis">
              <AttendanceAnalysis :raw_data=Attendance_statistic style="margin-left: 60px"></AttendanceAnalysis>
              <AttendanceSum :raw_data="Attendance_statistic" style="margin-left: 80px;margin-top: 110px"></AttendanceSum>
            </el-col>
          </el-row>


         <!-- 修改考勤时间权限认证  -->
        <el-dialog title="Authorization" v-model="authVisible" width="40%">
            <el-form label-width="35%">
                <el-form-item label="Username" prop="username">
                    <el-input v-model="auth_query.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input type="password" v-model="auth_query.password" placeholder="password"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="authVisible = false">cancel</el-button>
                    <el-button type="primary" @click="auth()">Submit</el-button>
                </span>
            </template>
        </el-dialog>


         <!-- 组装线编辑弹出框 -->
        <el-dialog title="Assembly_Attendance_Edit" v-model="editVisible" width="40%">
            <el-form label-width="35%" :model="auth_query">
                <el-form-item label="Person_No">
                    <el-input v-model="form.Pers_No"></el-input>
                </el-form-item>
                <el-form-item label="Name">
                    <el-input v-model="form.Name"></el-input>
                </el-form-item>
              <el-form-item label="CC">
                    <el-input v-model="form.CC"></el-input>
                </el-form-item>
              <el-form-item label="Description">
                    <el-input v-model="form.Description"></el-input>
                </el-form-item>
              <el-form-item label="Date">
                    <el-input v-model="form.Date"></el-input>
                </el-form-item>
              <el-form-item label="Attendance_Time">
                    <el-input v-model="form.Attendance_Time"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">cancel</el-button>
                    <el-button type="primary" @click="saveEdit()">Confirm</el-button>
                </span>
            </template>
        </el-dialog>
        </div>
</template>

<script>
import {ref, reactive, onMounted} from "vue";
import { ElMessage} from "element-plus";
import {fetch_table_assembly_attendance,fetch_table_cnc_attendance,fetch_table_maintenance_attendance} from "../../api/Attendance_center";
import {ldap_authorization} from "../../api";
import {fetch_dir_attendance_assy,fetch_dir_attendance_cnc,fetch_dir_attendance_maintenance} from "../../api/Director_dashboard"
// import CNC_Attendance_analysis from "./charts/CNC_Attendance_analysis.vue";
// import Assy_Attendance_analysis from "./charts/Assy_Attendance_analysis.vue";
import AttendanceSum from "./charts/Attendance-sum.vue";
import AttendanceAnalysis from "./charts/Attendance-analysis.vue";
export default {
    name: "Attendance-sheet",
    components:{
      AttendanceSum,
      AttendanceAnalysis
    },
    setup() {
        const group = localStorage.getItem("role");
        const radio_visible=ref(false)
        const auth_query=reactive({                // ldap request
          username:"",
          password:""
        })
        const line_query=reactive({
          line:"cnc"
        })

        const query_modification=reactive({   // assembly attendance modification
          value:0,
          date:"",
          number:""
        })
        const query = reactive({              // assembly attendance sheet request
            line: "all",
            date:getNowFormatDate(),
            pageIndex: 1,
            pageSize: 8,
        });
        const Attendance_statistic=reactive({ //assembly attendance summarization
            Total: 0,
            Normal:0,
            Overtime: 0,
            Abnormal: 0,
            Total_attendance:0,
          })
        const tableData = ref([]);
        const pageTotal = ref(0);
        const data_exchange=ref(false)
        onMounted(()=>{
        if(group==="OperationMD"){
          radio_visible.value=true
        }else if(group==="CNCLeader"){
          radio_visible.value=false
          line_query.line="cnc"
        }else if(group==="AssemblyLeader"){
          radio_visible.value=false
          line_query.line="assembly"
        }else if(group==="MaintenanceManager"){
          radio_visible.value=false
          line_query.line="maintenance"
        }else {
          radio_visible.value=true
      }})

      // 获取表格数据
        const data_washing=(res)=>{
           tableData.value =res;
            console.log(res)
            pageTotal.value=res.length
            Attendance_statistic.Total=res.length
            Attendance_statistic.Overtime=0
            Attendance_statistic.Normal=0
            Attendance_statistic.Abnormal=0
            Attendance_statistic.Total_attendance=0
            for (var i=0;i<res.length;i++)
              {
                Attendance_statistic.Total_attendance+=res[i]["Attendance_Time"]
                if(res[i]["Attendance_Time"]<=8.2){
                  Attendance_statistic.Abnormal+=1
                    }else if(res[i]["Attendance_Time"]>9){
                      Attendance_statistic.Overtime+=1
                  }
                    else {
                      Attendance_statistic.Normal+=1
                    }
                  }
        }
        const get_Data = () => {
          if(line_query.line==="cnc"){
            fetch_table_cnc_attendance(query).then((res) => {
              data_washing(res)
            });
          }else if (line_query.line==="assembly") {
            fetch_table_assembly_attendance(query).then((res) => {
              data_washing(res)
            })
          }else{
              fetch_table_maintenance_attendance(query).then((res) => {
              data_washing(res)
            })
          }
          data_exchange.value=false
            };


        // Assembly查询操作
        const handleSearch = () => {
            // query.pageIndex = 1;
            data_exchange.value=true
            get_Data();

        };
        // Assembly分页导航
        const handlePageChange = (val) => {
            query.pageIndex = val;
            // get_Assembly_Data();
        };
        const editVisible = ref(false);
        const authVisible = ref(false);

        let form = reactive({
            Pers_No:"",
            Name:"",
            CC:"",
            Description: "",
            Attendance_Time: "",
            Date:""
        });
        let idx = -1;
        const handleEdit = (index, row) => {
            idx = index;
            Object.keys(form).forEach((item) => {
                form[item] = row[item];
            });
            authVisible.value = true;
        };
        const saveEdit = () => {
            editVisible.value = false;

            Object.keys(form).forEach((item) => {
                tableData.value[idx][item] = form[item];
                query_modification.value=form["Attendance_Time"]
                query_modification.date=form["Date"]
                query_modification.number=form["Pers_No"]
            });
            console.log(query_modification)
            if(line_query.line==="assembly"){
              fetch_dir_attendance_assy(query_modification).then((res)=>{
                 ElMessage.success(`修改第 ${idx + 1} 行成功`);
            })
            }else if(line_query.line==="cnc"){
              fetch_dir_attendance_cnc(query_modification).then((res)=>{
                 ElMessage.success(`修改第 ${idx + 1} 行成功`);
            })}else{
              fetch_dir_attendance_maintenance(query_modification).then((res)=>{
                 ElMessage.success(`修改第 ${idx + 1} 行成功`);
            })}
        };

        /**
  * @description: get formate like 20220302
  * @return {string} 20220302
  */
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
      const abnormal_washing = (res) => {
        tableData.value.length =0;
        for(let i=0;i<res.length;i++){
          if (res[i]['Attendance_Time']>9 || res[i]['Attendance_Time']<8.2){
            tableData.value.push(res[i])}
        }
        pageTotal.value=tableData.value.length
      }
    // abnormal search
      const abnormalSearch = () => {
        query.pageIndex = 1;
        data_exchange.value=true
        if(line_query.line==="assembly"){
          fetch_table_assembly_attendance(query).then((res) => {
            abnormal_washing(res)
            })}else if (line_query.line==="cnc"){
            fetch_table_cnc_attendance(query).then((res) => {
              abnormal_washing(res)
            })
          }else {
            fetch_table_maintenance_attendance(query).then((res) => {
              abnormal_washing(res)
            })
          }
        data_exchange.value=false
      };
    // authorization
      const auth = () => {
        ldap_authorization(auth_query).then((res)=> {
          let read_data = eval(res.data)
          if (read_data["state"] === true && (read_data["group"] === "MaintenanceManager" || read_data["group"] === "CNCLeader"||read_data["group"] === "AssemblyLeader")) {
            ElMessage.success("login succeed!");
            editVisible.value = true;
            authVisible.value=false;
          } else {
            ElMessage.error("login failed,PLS confirm your username and password or you are not authorized");
          }
        })}
        return {
            query,
            tableData,
            pageTotal,
            editVisible,
            handleSearch,
            handlePageChange,
            get_Data,
            Attendance_statistic,
            handleEdit,
            saveEdit,
            form,
            abnormalSearch,
            auth_query,
            auth,
            authVisible,
            line_query,
            data_exchange,
            radio_visible
        };
    },
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 200px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 10px;
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
.Attendance_table{
  border-right: #1f2f3d solid 6px;
}
.Attendance_analysis{
  height: 50%;
}
.container {
  height: 730px;
}
.Attendance_row{
  height: 100%;
}

</style>
