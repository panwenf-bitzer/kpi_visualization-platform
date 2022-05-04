<!--
 * @FileDescription: child component for boxplot analysis
 * @Author: Pan,Wenfang
 * @Date: 2022/01/04
 * @LastEditors: Pan,wenfang
 * @LastEditTime: 2022/02/28
 -->
<template>
<div id="boxplot" :style="{height:height,width:width}">
  </div>
</template>

<script>
import * as echarts from "echarts";
import {onMounted, watch, ref, reactive} from "vue";
import dataTool from 'echarts/extension/dataTool'

export default {
  name: "compressor_boxplot_analysis",
    props: {
    "boxplot_data":{
      type:Object
      },
      width: {
      type: String,
      default: '100%'
    },
      height: {
      type: String,
      default: '320px'
    }
    },

    setup(props,context){
      let CNC_throughput= []
      let Assy_throughput= []
      let Total_throughput= []
      var data=[];
      const init=(()=> {
      if(props.boxplot_data["tableData"].length!==0){
      let box = echarts.init(document.getElementById("boxplot"))
      box.setOption(
      {
    title: [
    {
      text: 'Throughput Time-boxplot analysis',
      left: 'center'
    },
    {
      text: 'upper: Q3 + 1.5 * IQR \t lower: Q1 - 1.5 * IQR',
      borderColor: '#999',
      borderWidth: 1,
      textStyle: {
        fontWeight: 'normal',
        fontSize: 12,
        lineHeight: 20
      },
      left: '60%',
      top: '10%'
    }
  ],
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '10%',
    right: '10%',
    bottom: '15%'
  },
  xAxis: {
    type: 'category',
    data: ["-CNC","-Assy","-Total"],

    boundaryGap: true,
    nameGap: 30,
    splitArea: {
      show: false
    },
    axisLabel: {
      formatter: 'Throughput {value}'
    },
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    name: 'Minutes',
    splitArea: {
      show: true
    }
  },
  series: [
    {
      name: 'boxplot',
      type: 'boxplot',
      datasetIndex: 1,
      data: data[0].boxData,
      tooltip: { //注意：series.tooltip 仅在 tooltip.trigger 为 'item' 时有效。
								formatter: function(param) {
									return [
										 param.name + ': ',
										'upper: ' + param.data[5].toFixed(1),
										'Q3: ' + param.data[4].toFixed(1),
										'median: ' + param.data[3].toFixed(1),
										'Q1: ' + param.data[2].toFixed(1),
										'lower: ' + param.data[1].toFixed(1)
									].join('<br/>')
								}
							}
						},
    {
      name: 'outlier',
      type: 'scatter',
      datasetIndex: 2,
      data: data[0].outliers
    }
  ]
}

      )}
    })

     onMounted(()=>{
      init()
      watch(props.boxplot_data,(newProps, oldProps) => {
          updatedata(newProps)
      })
    })

    const updatedata=((newvalue)=>{
            CNC_throughput.length=0
            Assy_throughput.length=0
            Total_throughput.length=0
            data.length=0
           for (var i=0;i<newvalue["tableData"].length;i++){
              CNC_throughput.push(newvalue["tableData"][i]['CncThroughputTime'])
              Assy_throughput.push(newvalue["tableData"][i]['AssThroughputTime'])
              Total_throughput.push(newvalue["tableData"][i]['AllThroughputTime'])
           }
           data.push(echarts.dataTool.prepareBoxplotData([CNC_throughput, Assy_throughput, Total_throughput]));
            context.emit("outliers",data[0].boxData[0],data[0].boxData[1],data[0].boxData[2])
            init()
            });

    }
}
</script>

<style scoped>

</style>