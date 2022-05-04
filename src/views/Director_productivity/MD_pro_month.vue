<!--
 * @FileDescription: child component for director monthly productivity
 * @Author: Pan,Wenfang
 * @Date: 2022/01/04
 * @LastEditors: Pan,wenfang
 * @LastEditTime: 2022/02/28
 -->
<template>
<div id="MD_pro_month" :style="{height:height,width:width}" />
</template>

<script>

import * as echarts from "echarts";
import {onActivated, onDeactivated, onMounted, reactive, ref} from "vue";
import {debounce} from "../../utils";
import "echarts/theme/macarons";
import {fetch_md_productivity_all} from "../../api/Director_dashboard";
export default {
  name: "MD_pro_month",
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
      default: '90%'
    }
    },
  setup(props,context){
    const production_data= ref([])
    const production_month=ref([])
    const month_query=ref()
    const refresh=ref()
    const chart=ref()
    const query = reactive({
        limit: 'month',
        date:getNowFormatDate(),
        line:'all'
        });
    const init=(()=> {
      chart.value = echarts.init(document.getElementById("MD_pro_month"),'macarons')

      chart.value.setOption({
      title: {
        text: 'Productivity_monthly',
        left: "center",
        textStyle: {
                fontSize: 14
              }
      },
      subtitle: {
        text: 'Minutes'
      },
      tooltip: {
        // trigger: 'axis',
        trigger: 'item',
        formatter: '{b}:\n{c}%'
     },
      legend: {
        data: ['Productivity_Monthly'],
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
      // mark: { show: true },
      // dataView: { show: true, readOnly: false },
      // magicType: { show: true, type: ['line', 'bar', 'stack'] },
      // restore: { show: true },
      // saveAsImage: { show: true }
    }
  },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: production_month.value
      },
      yAxis: {
        type: 'value',
        name: 'Minutes',
        axisLabel: {
                  show: true,
                  interval: 'auto',
                  formatter: '{value}%'
                },
      },
      series: [
      {
          name: 'CNC_throughput',
         type: 'bar',
         // stack: 'Total',
          data: production_data.value,
        markPoint: {
          data: [{
                type: 'max',
                name: '最大值'
            },
            {
                type: 'min',
                name: '最小值'
            }
            ]
        },
        markLine: { // 平均值
          data: [{
            type: 'average',
            name: '平均值'
          },]
        },
        itemStyle: {
          normal: {
            label: {
              show: true, //开启显示
              position: 'inside', //在inside显示
              formatter: '{c}%',
              textStyle: { //数值样式
                color: 'black',
                fontSize: 10
              }
            }
          }
        }
      },
      ]
    },
          chart.value.on('click', function (params) {
          getMonthFromString(params.name)
        })
      )})

    const data_fresh=()=>{
      fetch_md_productivity_all(query).then((res)=>{
        console.log(res)
        let data=JSON.parse(res)
        production_data.value=data.values
        init()
      })
      // production_data.value=[12,10,11,15,23,34,45,45,23,16,11,22]
      production_month.value=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

    }


    onMounted(()=>{
      data_fresh()
    })
      function getMonthFromString(mon){
      month_query.value=new Date(Date.parse(mon +"1")).getMonth()+1
      context.emit("month_data_query",month_query.value)
      }

      function getNowFormatDate() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        return year + month + strDate;
    }
    const resize = debounce(() => {chart.value.resize()}, 100)

    onActivated(()=>{
      refresh.value=setInterval(data_fresh,10000)
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