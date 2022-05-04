<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage" v-show="collapse_visible">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo" v-show="collapse_visible">KPI Visualization Platform</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 消息中心 -->
<!--                <div class="btn-bell">-->
<!--                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`information center`" placement="bottom">-->
<!--                        <router-link to="/tabs">-->
<!--                            <i class="el-icon-bell"></i>-->
<!--                        </router-link>-->
<!--                    </el-tooltip>-->
<!--                    <span class="btn-bell-badge" v-if="message"></span>-->
<!--                </div>-->
              <!-- 主题设置 -->
              <el-dropdown @command="handleTheme" v-if="false">
                <el-button size="mini" type="success">
                    Theme
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu size="small">
                        <el-dropdown-item command="light">light style</el-dropdown-item>
                        <el-dropdown-item command="middle">medium style</el-dropdown-item>
                        <el-dropdown-item command="heavy">heavy style</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
              <!-- 用户头像 -->
                <div class="user-avator">
                    <img src="../assets/img/logo.png" style="height: 100%" alt=""/>
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
<!--                            <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">-->
<!--                                <el-dropdown-item>project repository</el-dropdown-item>-->
<!--                            </a>-->
                            <el-dropdown-item command="throughput" v-show="center_visible">Throughput center</el-dropdown-item>
                            <el-dropdown-item divided command="attendance">Attendance center</el-dropdown-item>
                            <el-dropdown-item divided command="output">Output center</el-dropdown-item>
                            <el-dropdown-item divided command="checklist">Daily checklist</el-dropdown-item>
                            <el-dropdown-item divided command="loginout">logout</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import {computed, onMounted, ref} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
    setup() {
        const username = localStorage.getItem("ms_username");
        const group = localStorage.getItem("role");
        const message = 2;
        const collapse_visible=ref(false)
        const center_visible=ref(true)
        const store = useStore();
        const collapse = computed(() => store.state.collapse);
        // 侧边栏折叠
        const collapseChage = () => {
            store.commit("handleCollapse", !collapse.value);
        };

        // onMounted(() => {
        //     if (document.body.clientWidth > 1000) {
        //         collapseChage();
        //     }
        // });

        // 用户名下拉菜单选择事件
        const router = useRouter();
        const handleCommand = (command) => {
          if (command === "loginout") {
            localStorage.removeItem("ms_username");
            router.push("/login");
          } else if (command === "attendance") {
            router.push('/att_statistic');
          } else if (command === "throughput") {
            router.push('/compressor_center');
          } else if (command === "output") {
            router.push('/output_center');
          }
            else if (command === "checklist") {
            router.push('/form');
          }
        }
        const handleTheme = (command) => {
            if(command==="light"){
              store.commit("handleTheme","light")
            }else if(command==="middle"){
              store.commit("handleTheme","middle")
            }
            else if(command==="heavy"){
              store.commit("handleTheme","heavy")
            }
        };
        onMounted(()=>{
          if(group==="OperationMD"||group==="ProductionDirector"){
           collapse_visible.value=true
          }
          if(group==="CNCLeader"||group==="AssemblyLeader"){
           center_visible.value=false
          }
        })
        return {
            username,
            message,
            collapse,
            collapseChage,
            handleCommand,
            handleTheme,
            collapse_visible,
            center_visible
        };
    },
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
