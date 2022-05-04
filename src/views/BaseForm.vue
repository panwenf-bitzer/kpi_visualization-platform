<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
<!--                <el-breadcrumb-item>-->
<!--                    <i class="el-icon-lx-calendar"></i> 订单-->
<!--                </el-breadcrumb-item>-->
                <el-breadcrumb-item>platform technic checklist</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="formRef" :rules="rules" :model="form" label-width="auto">
                    <el-form-item label="1.Platform login successfully" prop="Login">
                        <el-radio-group v-model="form.Login" style="margin-left: 100px">
                            <el-radio label="OK"></el-radio>
                            <el-radio label="NOK"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                <el-form-item label="2.MD dashboard functionality is normal" prop="MD">
                        <el-radio-group v-model="form.MD" style="margin-left: 35px">
                         <el-radio label="OK"></el-radio>
                            <el-radio label="NOK"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                  <el-form-item label="3.Director dashboard functionality is normal" prop="Director">
                        <el-radio-group v-model="form.Director" style="margin-left: 8px">
                         <el-radio label="OK"></el-radio>
                            <el-radio label="NOK"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                  <el-form-item label="4.Manager dashboard functionality is normal" prop="Manager">
                        <el-radio-group v-model="form.Manager" style="margin-left: 2px">
                         <el-radio label="OK"></el-radio>
                            <el-radio label="NOK"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                  <el-form-item label="5.Throughput center functinality is normal" prop="Throughput">
                        <el-radio-group v-model="form.Throughput" style="margin-left: 20px">
                         <el-radio label="OK"></el-radio>
                            <el-radio label="NOK"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                  <el-form-item label="6.Attendance center functinality is normal" prop="Attendance">
                        <el-radio-group v-model="form.Attendance" style="margin-left: 20px">
                          <el-radio label="OK"></el-radio>
                            <el-radio label="NOK"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="7.Output center functinality is normal" prop="Output">
                        <el-radio-group v-model="form.Output" style="margin-left: 48px">
                         <el-radio label="OK"></el-radio>
                            <el-radio label="NOK"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="8.The email is triggerred normally" prop="Email">
                        <el-radio-group v-model="form.Email" style="margin-left: 68px">
                         <el-radio label="OK"></el-radio>
                            <el-radio label="NOK"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="9.The manipulation for all pages is smoothly" prop="Performance">
                        <el-radio-group v-model="form.Performance" style="margin-left: 5px">
                         <el-radio label="OK"></el-radio>
                            <el-radio label="NOK"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="10.Platform logout successfully" prop="Logout">
                        <el-radio-group v-model="form.Logout" style="margin-left: 85px">
                         <el-radio label="OK"></el-radio>
                            <el-radio label="NOK"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="Remark" prop="Description">
                        <el-input type="textarea" rows="3" v-model="form.Description"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button @click="onReset">重置表单</el-button>
                    </el-form-item>
                </el-form>
              <download-excel
                  class = "export-excel-wrapper"
                  :data = "exportData"
                  :fields = "exportDataStandard"
                  type="xlsx"
                  :fetch="createExportData"
                  :header="exportHeader"
                  :footer="exportFooter"
                  :defaultValue="exportDefaultValue"
                  name = "checklist">
    		      <el-button type="success"> Download </el-button>
            </download-excel>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
export default {
    name: "baseform",
    setup() {
        const rules = {
          Login: [
                { required: true, message: "please select!", trigger: "blur" },
            ],
           MD: [
                { required: true, message: "please select!", trigger: "change" },
            ],
           Director: [
                { required: true, message: "please select!", trigger: "change" },
            ],
          Manager: [
                { required: true, message: "please select!", trigger:  "change"  },
            ],
          Throughput: [
                { required: true, message: "please select!", trigger:  "change" },
            ],
           Attendance: [
                { required: true, message: "please select!", trigger:  "change" },
            ],
          Output: [
                { required: true, message: "please select!", trigger:  "change" },
            ],
          Email: [
                { required: true, message: "please select!", trigger:  "blur" },
            ],
          Performance: [
                { required: true, message: "please select!", trigger:  "blur" },
            ],
          Logout: [
                { required: true, message: "please select!", trigger:  "blur" },
            ],
        };
        const formRef = ref(null);
        var exportData=[
        {name: "甲", sex: "女", phone: 15521103211},
        {name: "乙", sex: "男", phone: 15521103222},
        {name: "丙", sex: "女", phone: 15521103233},
        {area: "北京市朝阳区"},
        {name: "丁", sex: "男", phone: 15521103233},
        {name: "丁", sex: "男", phone: 15521103233},
      ];
        var exportDataStandard={
        "名称": "name",
        "性别": "sex",
        "地区": {
          field: "phone",
          callback: value => {
            return `他的电话是：${value}`
          }
        }
      };
      var exportName="导出数据";
      var exportHeader=["用户信息页头1","用户信息页头2"];
      var exportFooter=["用户的信息页脚1","用户的信息页脚2"];
      var exportDefaultValue="这一行这一列没有数据";

        const form = reactive({
            Login:"",
            MD:"",
            Director:"",
            Manager:"",
            Throughput:"",
            Attendance:"",
            Output:"",
            Email:"",
            Performance:"",
            Logout:"",
            Description:"",
        });
        // 提交
        const onSubmit = () => {
            // 表单校验
            // formRef.value.validate((valid) => {
            //     if (valid) {
            //         console.log(form);
            //        submit_platform_checklist(form)
            //       ElMessage.success("提交成功！");
            //     } else {
            //         return false;
            //     }
            // });
        };
      function createExportData() {
      // 点击导出按钮之后,开始导出数据之前的执行函数,返回值为需要下载的数据
      // TODO:构造需要下载的数据返回
      return [
        {name: "甲", sex: "女", phone: 15521103211},
        {name: "乙", sex: "男", phone: 15521103222},
        {name: "丙", sex: "女", phone: 15521103233},
        {area: "北京市朝阳区"},
        {name: "丁", sex: "男", phone: 15521103233},
        {name: "丁", sex: "男", phone: 15521103233},
      ];}
        // 重置
        const onReset = () => {
            formRef.value.resetFields();
        };
        return {
            exportData,
            exportFooter,
            exportHeader,
            exportName,
            exportDefaultValue,
            exportDataStandard,
            rules,
            formRef,
            form,
            onSubmit,
            onReset,
            createExportData
        };
    },
};
</script>
<style scoped>
  .el-form-item__label {
        text-align: left;
    }
</style>