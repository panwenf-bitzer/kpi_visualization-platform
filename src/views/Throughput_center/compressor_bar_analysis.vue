<!--
 * @FileDescription: child component for mean,max,min value of throughput time
 * @Author: Pan,Wenfang
 * @Date: 2022/01/04
 * @LastEditors: Pan,wenfang
 * @LastEditTime: 2022/02/28
 -->
<template>
<div id="bar" :style="{height:height,width:width}" />
</template>
<script>
import * as echarts from "echarts";
import {onMounted, watch} from "vue";
export default {
  name: "compressor_bar_analysis",
  props: {
    "bar_data":{
      type:Object
      },
      width: {
      type: String,
      default: '100%'
    },
      height: {
      type: String,
      default: '350px'
    }
    },
  setup(props){
    let Min=[] // Throughput time 的最小值初始化
    let Max=[] // Throughput time 的最大值初始化
    let Mean=[]// Throughput time 的平均值初始化
    let CNC_throughput=[]//
    let Assy_throughput=[]//
    let Total_throughput=[]//
    const option = {//
      title: {
      text: 'Throughput Time-Max,Mean,Min',
      left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
        type: 'shadow'
        }
        },
      legend: {
        data: ['Max', 'Mean', 'Min'],
        left: "right"
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar', 'stack'] },
        restore: { show: true },
        saveAsImage: { show: true }
        }
        },
      xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: ['Throughput_CNC','Throughput_Assy',  'Total_throughput']
          }
          ],
      yAxis: [
          {
            type: 'value',
            name: 'Minutes',
          }
          ],
      series: [
          {
            name: 'Max',
            type: 'bar',
            barGap: 0,
      // label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: Max,
            label:{
            show:true,
            position:"top"
            }
            },
        {
          name: 'Mean',
          type: 'bar',
      // label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: Mean,
          label:{
            show:true,
            position:"top"
          }
          },
        {
          name: 'Min',
          type: 'bar',
      // label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: Min,
          label:{
            show:true,
            position:"top"
          }
          },
      ]
    };
    //echarts的初始化
    const init=(()=> {
      if(props.bar_data["tableData"].length!==0){
      let box = echarts.init(document.getElementById("bar"))
      box.setOption(option)}
    })
    //页面加载后启用监听
     onMounted(()=>{
      init()
      watch(props.bar_data,(newProps, oldProps) => {
        updatedata(newProps)
      })
    })
    //监听数据发生变化后调用的函数
    const updatedata=((newvalue)=>{
      Min.length=0
      Max.length=0
      Mean.length=0
      let sum_cnc=0
      let sum_assembly=0
      let sum_total=0
      CNC_throughput.length=0
      Assy_throughput.length=0
      Total_throughput.length=0
      for (var i=0;i<newvalue["tableData"].length;i++){
        CNC_throughput.push(newvalue["tableData"][i]['CncThroughputTime'])
        sum_cnc+=newvalue["tableData"][i]['CncThroughputTime']
        Assy_throughput.push(newvalue["tableData"][i]['AssThroughputTime'])
        sum_assembly+=newvalue["tableData"][i]['AssThroughputTime']
        Total_throughput.push(newvalue["tableData"][i]['AllThroughputTime'])
        sum_total+=newvalue["tableData"][i]['AllThroughputTime']
      }
      Max.push(Math.max.apply(null,CNC_throughput))
      Max.push(Math.max.apply(null,Assy_throughput))
      Max.push(Math.max.apply(null,Total_throughput))
      Min.push(Math.min.apply(null,CNC_throughput))
      Min.push(Math.min.apply(null,Assy_throughput))
      Min.push(Math.min.apply(null,Total_throughput))
      Mean.push((sum_cnc/CNC_throughput.length).toFixed(2))
      Mean.push((sum_assembly/Assy_throughput.length).toFixed(2))
      Mean.push((sum_total/Total_throughput.length).toFixed(2))
      init()
    });
  }
}
</script>

<style scoped>

</style>