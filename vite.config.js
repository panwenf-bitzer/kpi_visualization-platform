import vue from '@vitejs/plugin-vue'

export default {
    base: './',
    plugins: [vue()],
    optimizeDeps: {
        include: ['schart.js']
    },
    build: {
        target: 'modules',
        outDir: 'dist', //指定输出路径
          assetsDir: 'assets', // 指定生成静态资源的存放路径
          minify: 'terser' // 混淆器，terser构建后文件体积更小
      },
    server: {
          port:8081,
          cors: true, // 默认启用并允许任何源
          open: true, // 在服务器启动时自动在浏览器中打开应用程序
          //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
          ws:true,
          // https:true,
          proxy: {
              '/throughput_alu': {
                  target: 'http://10.15.8.42:80/v2/Throughput/alu',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/throughput_alu/, '')
            },
             '/throughput_msk': {
                  target: 'http://10.15.8.42:80/v2/Throughput/msk',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/throughput_msk/, '')
            },
              '/throughput_sc': {
                  target: 'http://10.15.8.42:80/v2/Throughput/sc',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/throughput_sc/, '')
            },
              '/throughput_sh': {
                  target: 'http://10.15.8.42:80/v2/Throughput/sh',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/throughput_sh/, '')
            },
               '/throughput_scr': {
                  target: 'http://10.15.8.42:80/v2/Throughput/scr',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/throughput_scr/, '')
            },
              '/productivity_alu': {
                  target: 'http://10.15.8.42:80/v2/Productivity/alu',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/productivity_alu/, '')
            },
             '/productivity_cnc': {
                  target: 'http://10.15.8.42:80/v2/Productivity/cnc',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/productivity_cnc/, '')
            },
              '/productivity_sc': {
                  target: 'http://10.15.8.42:80/v2/Productivity/sc',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/productivity_sc/, '')
            },
              '/productivity_sh': {
                  target: 'http://10.15.8.42:80/v2/Productivity/sh',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/productivity_sh/, '')
            },
               '/productivity_scr': {
                  target: 'http://10.15.8.42:80/v2/Productivity/scr',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/productivity_scr/, '')
            },
              '/authorization': {
                  target: 'http://10.15.8.42:80/v2/authorization',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/authorization/, '')
            },
              '/dashboard_throughput': {
                  target: 'http://10.15.8.42:80/v2/Dashboard/throughput',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/dashboard_throughput/, '')
            },
                '/dashboard_productivity': {
                  target: 'http://10.15.8.42:80/v2/Dashboard/productivity',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/dashboard_productivity/, '')
            },
              '/productivity_attendance_cnc_table': {
                  target: 'http://10.15.8.42:80/v2/Dashboard/attendance_cnc_table',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/productivity_attendance_cnc_table/, '')
            },
              '/productivity_attendance_assembly_table': {
                  target: 'http://10.15.8.42:80/v2/Dashboard/attendance_assembly_table',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/productivity_attendance_assembly_table/, '')
            },
              '/productivity_attendance_maintenance_table': {
                  target: 'http://10.15.8.42:80/v2/Dashboard/attendance_maintenance_table',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/productivity_attendance_maintenance_table/, '')
            },
              '/throughput_compressor_table': {
                  target: 'http://10.15.8.42:80/v2/Dashboard/throughput_compressor_table',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/throughput_compressor_table/, '')
            },
                 '/throughput_past_sh': {
                  target: 'http://10.15.8.42:80/v2/Dashboard/throughput_past_sh',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/throughput_past_sh/, '')
            },
                 '/throughput_past_sc': {
                  target: 'http://10.15.8.42:80/v2/Dashboard/throughput_past_sc',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/throughput_past_sc/, '')
            },
                 '/throughput_past_alu': {
                  target: 'http://10.15.8.42:80/v2/Dashboard/throughput_past_alu',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/throughput_past_alu/, '')
            },
                 '/Productivity_monthly': {
                  target: 'http://10.15.8.42:80/v2/Dashboard/Productivity_monthly',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/Productivity_monthly/, '')
            },
                 '/throughput_past_scr': {
                  target: 'http://10.15.8.42:80/v2/Dashboard/throughput_past_scr',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/throughput_past_scr/, '')
            },

            // new API since 20220209

             '/md_throughput_average': {
                  target: 'http://10.15.8.42:80/v1/md_throughput_average',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/md_throughput_average/, '')
            },
             '/md_throughput_all': {
                  target: 'http://10.15.8.42:80/v1/md_throughput_all',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/md_throughput_all/, '')
            },
             '/md_throughput_alu': {
                  target: 'http://10.15.8.42:80/v1/md_throughput_alu',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/md_throughput_alu/, '')
            },
             '/md_throughput_scr': {
                  target: 'http://10.15.8.42:80/v1/md_throughput_scr',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/md_throughput_scr/, '')
            },
             '/md_throughput_sc': {
                  target: 'http://10.15.8.42:80/v1/md_throughput_sc',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/md_throughput_sc/, '')
            },
             '/md_throughput_sh': {
                  target: 'http://10.15.8.42:80/v1/md_throughput_sh',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/md_throughput_sh/, '')
            },
             '/md_productivity_average': {
                  target: 'http://10.15.8.42:80/v1/md_productivity_average',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/md_productivity_average/, '')
            },
             '/md_productivity_all': {
                  target: 'http://10.15.8.42:80/v1/md_productivity_all',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/md_productivity_all/, '')
            },
             '/md_productivity_cnc_assy': {
                  target: 'http://10.15.8.42:80/v1/md_productivity_cnc_assy',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/md_productivity_cnc_assy/, '')
            },
             '/md_productivity_cnc': {
                  target: 'http://10.15.8.42:80/v1/md_productivity_cnc',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/md_productivity_cnc/, '')
            },
             '/md_productivity_assy': {
                  target: 'http://10.15.8.42:80/v1/md_productivity_assy',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/md_productivity_assy/, '')
            },
             '/dir_attendance_assy': {
                  target: 'http://10.15.8.42:80/v1/dir_attendance_assy',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/dir_attendance_assy/, '')
            },
             '/dir_attendance_cnc': {
                  target: 'http://10.15.8.42:80/v1/dir_attendance_cnc',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/dir_attendance_cnc/, '')
            },
             '/dir_attendance_maintenance': {
                  target: 'http://10.15.8.42:80/v1/dir_attendance_maintenance',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/dir_attendance_maintenance/, '')
            },

            // new API since 20220228
                '/output_sh': {
                  target: 'http://10.15.8.42:80/v1/output_sh',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/output_sh/, '')
            },
                 '/output_sc': {
                  target: 'http://10.15.8.42:80/v1/output_sc',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/output_sc/, '')
            },
                 '/output_alu': {
                  target: 'http://10.15.8.42:80/v1/output_alu',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/output_alu/, '')
            },
                  '/output_roll': {
                  target: 'http://10.15.8.42:80/v1/output_scr',   //代理接口
                  changeOrigin: true,
                  // https:true,
                  rewrite: (path) => path.replace(/^\/output_roll/, '')
            },
          }
      }
}

