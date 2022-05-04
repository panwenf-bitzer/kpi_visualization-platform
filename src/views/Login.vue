<template>
    <div class="login-wrap">
      <div class="header">
      <img src="../assets/img/logo.png" style="width: 100px" alt="BITZER GROUP">
        <el-button type="text" style="float: right;font-size: 2em" @click="$router.push('/help')">?</el-button>
      </div>
        <div class="ms-login">
            <div class="ms-title">KPI Visualization Platform</div>
            <el-form :model="query" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="query.username" placeholder="username">
                        <template #prepend>
                            <el-button icon="el-icon-user"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="query.password"
                        @keyup.enter="submitForm()">
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">login</el-button>
                </div>
                <p class="login-tips">Tips : Input BITZER username and password。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
import {ref, reactive, onMounted} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import {ldap_authorization} from "../api/index"

export default {
    name:"login",
    setup() {
        const router = useRouter();
        const query = reactive({
            username: '',
            password: '',
        });
        const rules = {
            username: [
                {required: true, message: "PLS input username", trigger: "blur"},
            ],
            password: [
                { required: true, message: "PLS input password", trigger: "blur" },
            ],
        };
        const login = ref(null);
        const submitForm = () => {
            login.value.validate((valid) => {
                if (valid) {
                     ldap_authorization(query).then((res) =>
                  {
                    var read_data=eval(res.data)
                    if (read_data["state"]===true)
                    {
                       localStorage.setItem("ms_username", query.username);
                       localStorage.setItem("role",read_data["group"])
                      if (read_data["group"]==="OperationMD"){
                        ElMessage.success("login succeed!");
                        router.push("/dash_boardMD");
                      }else if (read_data["group"]==="ProductionDirector"){
                        ElMessage.success("login succeed!");
                        router.push("/dash_throughput");
                       }
                      else if (read_data["group"]==="CNCManager"){
                        ElMessage.success("login succeed!");
                        router.push("/dash_board");
                      }
                      else if (read_data["group"]==="AssemblyManager"){
                        ElMessage.success("login succeed!");
                        router.push("/dash_board");
                      }
                      else if (read_data["group"]==="CNCLeader"){
                        ElMessage.success("login succeed!");
                        router.push("/att_statistic");
                      }
                      else if (read_data["group"]==="AssemblyLeader"){
                        ElMessage.success("login succeed!");
                        router.push("/att_statistic");
                      }
                      else if (read_data["group"]==="MaintenanceManager"){
                        ElMessage.success("login succeed!");
                        router.push("/att_statistic");
                      }
                      else {
                         router.push("/login");
                      }

                  }
                    else {
                     ElMessage.error("login failed,the username is not existed!");
                }})
                  .catch ((err)=>
                  {
                     ElMessage.error("login failed,the password is not correct, pls correct it");
                  })
                  }
                else {
                    ElMessage.error("login failed,PLS confirm your username and password");
                    return false;
                }
            });
        };
        const store = useStore();
        store.commit("clearTags");

        // onMounted(()=> {
        //   if (location.href.indexOf("#reloaded") === -1) {
        //     location.href = location.href + "#reloaded";
        //     location.reload();
        //   }
        // })
        return {
            query,
            rules,
            login,
            submitForm,
        };
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    /*background-image: url(../assets/img/login-bg.jpg);*/
    /*background-size: 10%;*/
    background-color: gray;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>