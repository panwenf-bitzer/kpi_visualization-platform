import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
        {
        path: '/help',
        name: "help",
        meta: {
             title: 'help'
                },
        component: () => import ("../views/help.vue")
            },

    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dash_boardMD",
                name: "dashboard_MD",
                meta: {
                    title: 'MD_Dashboard'
                },
                component: () => import ( /* webpackChunkName: "MdDashboard" */ "../views/MD_Dashboard/MdDashboard.vue")
            },
            {
                path: "/dash_board",
                name: "dashboard",
                meta: {
                    title: 'Dir_Dashboard'
                },
                component: () => import ( /* webpackChunkName: "manager_dash" */ "../views/Manager_dashboard/manager_dash.vue")
            },

            {
                path: "/dash_throughput",
                name: "dash_throughput",
                meta: {
                    title: 'dash_throughput'
                },
                component: () => import ( /* webpackChunkName: "MD_thr" */ "../views/Director_throughputime/MD_thr.vue")
            },
            {
                path: "/dash_productivity",
                name: "dash_productivity",
                meta: {
                    title: 'dash_productivity'
                },
                component: () => import ( /* webpackChunkName: "MD_pro" */ "../views/Director_productivity/MD_pro.vue")
            },

            {
                path: "/output_center",
                name: "output_center",
                meta: {
                    title: 'output_center'
                },
                component: () => import ( /* webpackChunkName: "output_dash" */ "../views/Output_center/output_dash.vue")
            },
            {
                path: "/table",
                name: "basetable",
                meta: {
                    title: 'Table',
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/BaseTable.vue")
            }, {
                path: "/charts_SH",
                name: "SH_charts",
                meta: {
                    title: 'T-SH',

                },
                component: () => import ( /* webpackChunkName: "Thro_SH_Charts" */ "../views/Manager_Throughput_time/Thro_SH_Charts.vue"),
                    },
                {
                path: "/charts_SCR",
                name: "SCR_charts",
                meta: {
                    title: 'T-SCR',

                },
                component: () => import ( /* webpackChunkName: "Thro_SCR_Charts" */ "../views/Manager_Throughput_time/Thro_SCR_Charts.vue")
                        },
                    {
                path: "/charts_SC",
                name: "SC_charts",
                meta: {
                    title: 'T-SC',
                },
                component: () => import ( /* webpackChunkName: "Thro_SC_Charts" */ "../views/Manager_Throughput_time/Thro_SC_Charts.vue")

                    },
                        {
                path: "/charts_MSK",
                name: "MSK_charts",
                meta: {
                    title: 'T-MSK',
                },
                component: () => import ( /* webpackChunkName: "Thro_MSK_Charts" */ "../views/Manager_Throughput_time/Thro_MSK_Charts.vue")
                        },
                            {
                path: "/charts_ALU",
                name: "ALU_charts",
                meta: {
                    title: 'T-ALU',
                },
                component: () => import ( /* webpackChunkName: "Thro_ALU_Charts" */ "../views/Manager_Throughput_time/Thro_ALU_Charts.vue")
                            },
                                {
                path: "/compressor_center",
                name: "compressor_center",
                meta: {
                    title: 'T-Throughput_table',

                },
                component: () => import (/* webpackChunkName: "compressor_sheet" */ "../views/Throughput_center/compressor_sheet.vue")
            },
            {
                path: "/Pro_charts_SH",
                name: "Productivity_SH_charts",
                meta: {
                    title: 'P-SH',

                },
                component: () => import (/* webpackChunkName: "Prod_SH_Charts" */"../views/Manager_productivity/Prod_SH_Charts.vue"),
                    },
                {
                path: "/Pro_charts_SCR",
                name: "Productivity_SCR_charts",
                meta: {
                    title: 'P-SCR',
                },
                component: () => import (/* webpackChunkName: "Prod_SCR_Charts" */"../views/Manager_productivity/Prod_SCR_Charts.vue")
                        },
                    {
                path: "/Pro_charts_SC",
                name: "Productivity_SC_charts",
                meta: {
                    title: 'P-SC',
                },
                component: () => import (/* webpackChunkName: "Prod_SC_Charts" */"../views/Manager_productivity/Prod_SC_Charts.vue")
                    },
                        {
                path: "/Pro_charts_MSK",
                name: "Productivity_MSK_charts",
                meta: {
                    title: 'P-CNC',
                },
                component: () => import (/* webpackChunkName: "Prod_MSK_Charts" */"../views/Manager_productivity/Prod_MSK_Charts.vue")
                        },
                {
                path: "/Pro_charts_ALU",
                name: "Productivity_ALU_charts",
                meta: {
                    title: 'P-ALU',
                },
                component: () => import (/* webpackChunkName: "Prod_ALU_Charts" */"../views/Manager_productivity/Prod_ALU_Charts.vue")
                            },
                {
                path: "/att_statistic",
                name: "attendance_center",
                meta: {
                    title: 'P-Attendance',

                },
                component: () => import (/* webpackChunkName: "Attendance-sheet" */"../views/Attendance-center/Attendance-sheet.vue")
            },
            {
                path: "/form",
                name: "baseform",
                meta: {
                    title: 'Form'
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/BaseForm.vue")
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'Tab'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/Tabs.vue")
            }, {
                path: "/donate",
                name: "donate",
                meta: {
                    title: 'Encourage'
                },
                component: () => import ( /* webpackChunkName: "donate" */ "../views/Donate.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: 'Authorization',
                    permission: true
                },
                component: () => import ( /* webpackChunkName: "permission" */ "../views/Permission.vue")
            }, {
                path: "/i18n",
                name: "i18n",
                meta: {
                    title: 'Globalization'
                },
                component: () => import ( /* webpackChunkName: "i18n" */ "../views/I18n.vue")
            }, {
                path: "/upload",
                name: "upload",
                meta: {
                    title: 'Upload'
                },
                component: () => import ( /* webpackChunkName: "upload" */ "../views/Upload.vue")
            }, {
                path: "/icon",
                name: "icon",
                meta: {
                    title: 'Customization'
                },
                component: () => import ( /* webpackChunkName: "icon" */ "../views/Icon.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: 'Page not exist'
                },
                component: () => import (/* webpackChunkName: "404" */ '../views/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: 'NO Authorization'
                },
                component: () => import (/* webpackChunkName: "403" */ '../views/403.vue')
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: 'Personal'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/User.vue')
            }, {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: 'Editor'
                },
                component: () => import (/* webpackChunkName: "editor" */ '../views/Editor.vue')
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: 'Login'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    mode:"history",
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | KPI-Visualization`;
    const role = localStorage.getItem('ms_username');
    const group= localStorage.getItem('role');
    if (from.path==="/help"){
        next("/help")
    }
    else if (!role && to.path !== '/login' && to.path!=="/help" ) {
        next('/login');
    }
    else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
            role === 'admin'
            ? next()
            : next('/403');
    }
    else if (group!=="OperationMD"&& to.path==="/dash_boardMD"){
            group === 'OperationMD'
            ? next()
            : next('/403');
    }
    else if (group!=="OperationMD" && group!=="AssemblyManager" && group!=="ProductionDirector" && to.path==="/dash_board"){
            group === 'CNCManager'
            ? next()
            : next('/403');
    }
    else if (group!=="OperationMD" && group!=="CNCManager" && group!=="ProductionDirector" && to.path==="/dash_board"){
            group === 'AssemblyManager'
            ? next()
            : next('/403');
    }
    else if (group!=="OperationMD"&& to.path==="/dash_throughput"){
            group === 'ProductionDirector'
            ? next()
            : next('/403');
    }
    else if (group!=="OperationMD" && to.path==="/dash_productivity"){
            group === 'ProductionDirector'
            ? next()
            : next('/403');
    }
    else {
        next();
    }
});

export default router;