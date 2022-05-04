<!--
 * @FileDescription: child component for director cnc productivity
 * @Author: Pan,Wenfang
 * @Date: 2022/01/04
 * @LastEditors: Pan,wenfang
 * @LastEditTime: 2022/02/28
 -->
<template>
<div id="MD_pro_cnc" :style="{height:height,width:width}" />
</template>

<script>

import * as echarts from "echarts";
import {onActivated, onDeactivated, onMounted, reactive, ref, watch} from "vue";
import {debounce} from "../../utils";
import "echarts/theme/macarons";
import {fetch_md_productivity_assy, fetch_md_productivity_cnc} from "../../api/Director_dashboard";
export default {
  name: "MD_pro_cnc",
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
  setup(props) {
    const production_data = ref([])
    const production_month = ref([])
    const chart = ref()
    const refresh=ref()
    const query = reactive({
        limit: 'day',
        date:getNowFormatDate(null),
        line:'all'
        });
    const init = (() => {
      chart.value = echarts.init(document.getElementById("MD_pro_cnc"),'macarons')
      chart.value.setOption({
            title: {
              text: 'CNC Productivity-Daily',
              left: "center",
              textStyle: {
                fontSize: 14
              }
            },
            subtitle: {

            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['Throughput_Monthly'],
              left: "right"
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
                // mark: {show: true},
                // dataView: {show: true, readOnly: false},
                // magicType: {show: true, type: ['line', 'bar', 'stack']},
                // restore: {show: true},
                // saveAsImage: {show: true}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
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
                type: 'line',
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
                markLine: {
                   data: [{
                   type: 'average',
                     name: '平均值'
                   },
                   ]
                },
                itemStyle: {
                  normal: {
                    label: {
                      show: true,
                      position: 'top',
                      formatter: '{c}%',
                      textStyle: {
                        color: 'black',
                        fontSize: 10
                      }
                    }
                  }
                }
              },
            ]
          }
      )
    })
    onMounted(() => {
      data_fresh()
      watch(props.raw_data,(newProps, oldProps) => {
        getNowFormatDate(newProps.month)
        console.log(newProps.month)
        data_fresh(newProps.month)
    })
   })
    const data_fresh = (mon) => {
      fetch_md_productivity_cnc(query).then((res)=>{
        console.log(res)
        let data=JSON.parse(res)
        production_data.value=data.values
      })
      production_month.value.length=0
      // production_data.value.length=0
      for(var i=1;i<=getMonthDays(new Date().getFullYear(),mon);i++) {
        production_month.value.push(i)
        // production_data.value.push((Math.random()*100).toFixed(1) )
      }
      init()
    }
    function getMonthDays(year,month){
      var thisDate = new Date(year,month,0); //当天数为0 js自动处理为上一月的最后一天
      return thisDate.getDate();
    }
   function getNowFormatDate(mon) {
        let date = new Date();

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (mon!==null){
          month = new Date(Date.parse(mon +"1")).getMonth()+1;
        }
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        return year + month + strDate;
    }
    const resize = debounce(() => {
      chart.value.resize()
    }, 100)

    onActivated(() => {
      refresh.value=setInterval(function () {
        query.date=getNowFormatDate(null)
        data_fresh(new Date().getMonth()+1)
      },10000)
      window.addEventListener("resize", resize)
    })

    onDeactivated(() => {
      clearInterval(refresh.value)
      window.removeEventListener("resize", resize)
    })
  }}
</script>

<style scoped>

</style>