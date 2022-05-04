<!--
 * @FileDescription: child component for compressor information statistic
 * @Author: Pan,Wenfang
 * @Date: 2022/01/04
 * @LastEditors: Pan,wenfang
 * @LastEditTime: 2022/02/28
 -->
<template>
<div id="compressor_curve" :style="{height:height,width:width}" />
</template>
<script>
import * as echarts from "echarts";
import {onMounted, watch} from "vue";
export default {
  name: "compressor_analysis",
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
      default: '350px'
    }
    },
  setup(props){
    const CNC_throughput= []  //CNC 工件throughput time初始化
    const Assy_throughput= [] //组装线工件throughput time初始化
    const Total_throughput= []//CNC+组装线throughput time的初始化
    const serial_number=[]    //横坐标throughput time数组初始化
    const option = {          //echart 的option变量
      title: {
        text: 'Throughput time-statistic',
        left: "center"
      },
      subtitle: {
        text: 'Minutes'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['CNC_throughput', 'Assy_throughput', 'Total_throughput'],
        left:"right"
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
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
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: serial_number
      },
      yAxis: {
        type: 'value',
        name: 'Minutes',
      },
      series: [
      {
        name: 'CNC_throughput',
        type: 'line',
         // stack: 'Total',
        data: CNC_throughput
      },
        {
          name: 'Assy_throughput',
          type: 'line',
          // stack: 'Total',
         data: Assy_throughput
        },
        {
          name: 'Total_throughput',
          type: 'line',
         // stack: 'Total',
         data: Total_throughput
       },
      ]
    };
    //echart的初始化渲染，当父组件未传来值，不进行渲染
    const init=(()=> {
      if(props.raw_data["tableData"].length!==0){
      let box = echarts.init(document.getElementById("compressor_curve"))
      box.setOption(option)}
    })
    //页面加载完成之后，进行页面的echart的渲染，同事启动监听，监听数据的变化
    onMounted(()=>{
      init()
      watch(props.raw_data,(newProps, oldProps) => {
          updatedata(newProps)
      })
    })
    //监听数据发生变化后调用的函数
    const updatedata=((newvalue)=>{
      CNC_throughput.length=0
      Assy_throughput.length=0
      Total_throughput.length=0
      serial_number.length=0
      for (var i=0;i<newvalue["tableData"].length;i++){
        CNC_throughput.push(newvalue["tableData"][i]['CncThroughputTime'])
        Assy_throughput.push(newvalue["tableData"][i]['AssThroughputTime'])
        Total_throughput.push(newvalue["tableData"][i]['AllThroughputTime'])
        serial_number.push(newvalue["tableData"][i]['SerialNumber'])
      }
      init()
    });
  }
}
</script>

<style scoped>

</style>