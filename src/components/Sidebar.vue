<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index" v-show="sidebar_show_director">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else-if="item.manager">
                    <el-menu-item :index="item.index" :key="item.index" v-show="sidebar_show_manager">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
              <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" v-show="sidebar_show_MD">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import {computed, onMounted, ref, watch} from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
    setup() {
        const items = [
            {
                icon: "el-icon-pie-chart",
                index: "/dash_boardMD",
                title: "MD Dashboard",
                MD:"True"
            },

          {
                icon: "el-icon-pie-chart",
                index: "",
                title: "Director Dashboard",
                director:"True",
                subs:[
                                {
                icon: "el-icon-pie-chart",
                index: "/dash_throughput",
                title: "throughput dashboard",
            },
                     {
                icon: "el-icon-pie-chart",
                index: "/dash_productivity",
                title: "productivity dashboard",
            },
            ],
          },
          {
                icon: "el-icon-pie-chart",
                index: "/dash_board",
                title: "Manager Dashboard",
                manager:"True"
            },

          // {
          //       icon: "el-icon-lx-home",
          //       index: "/throughput",
          //       title: "Throughput",
          //       subs:[
          //                       {
          //       icon: "el-icon-pie-chart",
          //       index: "/charts_SH",
          //       title: "SH line",
          //   },
          //            {
          //       icon: "el-icon-pie-chart",
          //       index: "/charts_SCR",
          //       title: "SCR line",
          //   },
          //            {
          //       icon: "el-icon-pie-chart",
          //       index: "/charts_SC",
          //       title: "SC line",
          //   },
          //   //          {
          //   //     icon: "el-icon-pie-chart",
          //   //     index: "/charts_MSK",
          //   //     title: "MSK line",
          //   // },
          //            {
          //       icon: "el-icon-pie-chart",
          //       index: "/charts_ALU",
          //       title: "ALU&MSK line",
          //   },
          //            {
          //       icon: "el-icon-pie-chart",
          //       index: "/charts_spare",
          //       title: "Throughput time table",
          //   },
          //
          //       ]
          // },
          // {
          //       icon: "el-icon-lx-home",
          //       index: "/Productivity",
          //       title: "Productivity",
          //       subs:[
          //                       {
          //       icon: "el-icon-pie-chart",
          //       index: "/Pro_charts_SH",
          //       title: "SH Assembly line",
          //   },
          //            {
          //       icon: "el-icon-pie-chart",
          //       index: "/Pro_charts_SCR",
          //       title: "SCR Assembly line",
          //   },
          //            {
          //       icon: "el-icon-pie-chart",
          //       index: "/Pro_charts_SC",
          //       title: "SC Assembly line",
          //   },
          //            {
          //       icon: "el-icon-pie-chart",
          //       index: "/Pro_charts_MSK",
          //       title: "CNC line",
          //   },
          //            {
          //       icon: "el-icon-pie-chart",
          //       index: "/Pro_charts_ALU",
          //       title: "ALU&MSK line",
          //   },
          //            {
          //       icon: "el-icon-pie-chart",
          //       index: "/Pro_charts_spare",
          //       title: "Attendance table",
          //   },
          //
          //       ]
          // },
        ];
        const sidebar_show_director=ref(false)
        const sidebar_show_manager=ref(false)
        const sidebar_show_MD=ref(false)
        const route = useRoute();
        const group=localStorage.getItem("role")
        const onRoutes = computed(() => {
            return route.path;
        });

        const store = useStore();
        const collapse = computed(() => store.state.collapse);

        onMounted(()=>{
          if (group==="OperationMD"){
            sidebar_show_director.value=true
            sidebar_show_MD.value=true
            sidebar_show_manager.value=true
          }
          if (group==="ProductionDirector"){
            sidebar_show_manager.value=true
            sidebar_show_director.value=true
          }
        })

        return {
            items,
            onRoutes,
            collapse,
            sidebar_show_director,
            sidebar_show_manager,
            sidebar_show_MD
        };
    },
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
