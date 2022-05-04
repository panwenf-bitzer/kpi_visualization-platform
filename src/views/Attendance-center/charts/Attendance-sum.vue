<!--
 * @FileDescription: child component for director average productivity
 * @Author: Pan,Wenfang
 * @Date: 2022/01/04
 * @LastEditors: Pan,wenfang
 * @LastEditTime: 2022/02/28
 -->
<template>
<div id="Total_attendance" :style="{height:height,width:width}"></div>
</template>

<script>
import * as echarts from "echarts"
import {onActivated, onDeactivated, onMounted, ref} from "vue";
import {debounce} from "../../../utils";
export default {
  name:"Attendance-sum",
  props: {
    "raw_data":{
      type:Object
      },
      width: {
      type: String,
      default: '70%'
    },
      height: {
      type: String,
      default: '70%'
    }
    },
  setup(props){
    const refresh=ref()
    const chart=ref()
    const production_data=ref()
    const init=(()=> {
      console.log(props.raw_data)
      production_data.value=props.raw_data.Total_attendance.toFixed(2)
      chart.value = echarts.init(document.getElementById("Total_attendance"))
      chart.value.setOption(
       {
      series: [
    {
      type: 'gauge',
      startAngle:180,
      endAngle:0,
      min:0,
      max:2000,
      radius:"95%",
      axisLine: {
        lineStyle: {
          width: 20,
          color: [
            [0.7, '#00b294'],
            [0.8, '#ffc300'],
            [1, '#d83b01']
          ]
        }
      },
      pointer: {
        itemStyle: {
          color: 'auto'
        }
      },
      axisTick: {
        distance: -30,
        length: 8,
        lineStyle: {
          color: '#fff',
          width: 2
        }
      },
      splitLine: {
        distance: -30,
        length: 30,
        lineStyle: {
          color: '#fff',
          width: 4
        }
      },
      axisLabel: {
        color: 'auto',
        distance: 0,
        fontSize: 10
      },
      detail: {
        show:true,
        valueAnimation: true,
        formatter: '{value}Hours',
        color: 'auto',
        fontSize:20
      },
      data: [
        {
          value: production_data.value
        }
      ]
    }
  ],
})
    })
    onMounted(()=> {
      init()
    })
    const resize = debounce(() => {chart.value.resize()}, 100)
    onActivated(()=>{
      refresh.value=setInterval(init,1000)
      window.addEventListener("resize",resize)
    })

    onDeactivated(()=>{
    clearInterval(refresh.value)
    window.removeEventListener("resize",resize)
    })
  }
}
</script>

<style scoped>

</style>