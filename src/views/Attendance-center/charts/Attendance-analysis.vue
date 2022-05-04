<!--
 * @FileDescription: child component for assembly attendance statistic
 * @Author: Pan,Wenfang
 * @Date: 2022/01/04
 * @LastEditors: Pan,wenfang
 * @LastEditTime: 2022/02/28
 -->
<template>
     <div id="assembly" :style="{height:height,width:width}"></div>
</template>

<script>
import {onMounted,ref,watch} from "vue";
import * as echarts from "echarts"
export default {
  name:"Attendance-analysis",
  props: {
    "raw_data":{
      type:Object
      },
      width: {
      type: String,
      default: '100%'
    },
      height: {
      type: String,
      default: '100%'
    }
    },
  setup(props){
        const legendArr = [];
        const total_attendance=ref()
        const pie_data= [
        {"value":0, "name":"Normal"},
        {"value":0, "name":"Abnormal"},
        {"value":0, "name":"Overtime"},
        ]
        const option = {
            title: {
                text: 'Attendance analysis pie&gauge',
                // subtext:'pie',
                x: '70',                 // 水平安放位置，默认为左对齐，可选为：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
                y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）

                textStyle: {
                    fontSize: 18,
                    fontWeight: 'bolder',
                    color: '#333'          // 主标题文字颜色
                },
                subtextStyle: {
                    color: 'red'          // 副标题文字颜色
                },

            },

            tooltip: {                    //提示框样式，鼠标悬浮交互时的信息提示
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {                     //图例
                orient : 'vertical', // 布局方式，默认为水平布局，可选为：'horizontal' ¦ 'vertical'
                x: 'right',
                y: 'center',
                data: legendArr,
                textStyle: {
                    color: "red"
                }
            },
            color: ["#d58930", "#28cfed", "#236be2"],
            series: [
                {
                    name: '数量统计',
                    type: 'pie',
                    radius: '60%',//环 ['50%,'70%']
                    center: ['40%', '50%'],
                    data: pie_data
                }
            ]
        }
    const init=(()=> {
      console.log(props.raw_data)
      console.log(pie_data)
      option.series[0].data =pie_data;
      let box = echarts.init(document.getElementById("assembly"))
      // let box= echarts.init($el)
      box.setOption(option)
    })
    onMounted(()=>{
      init()
      watch(props.raw_data,(newProps, oldProps) => {
        updatedata(newProps)
      });
    })
    const updatedata=((newvalue)=>{
        pie_data[0]["value"]=newvalue.Normal
        pie_data[1]["value"]=newvalue.Abnormal
        pie_data[2]["value"]=newvalue.Overtime
        init()
    })
        return{
        }
  }

}
</script>

<style scoped>

</style>