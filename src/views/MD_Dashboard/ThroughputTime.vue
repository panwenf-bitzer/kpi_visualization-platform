<!--
 * @FileDescription: child component for throughput time
 * @Author: Pan,Wenfang
 * @Date: 2022/01/04
 * @LastEditors: Pan,wenfang
 * @LastEditTime: 2022/02/28
 -->
<template>
<div id="Gauge_ThroughputTime" style="height: 55%"></div>
</template>

<script>
import * as echarts from "echarts"
import {onActivated, onDeactivated, onMounted, reactive, ref} from "vue";
import {fetch_dashboard_throughput} from "../../api/Manager_dashboard";
import {debounce} from "../../utils";
export default {
  name: "ThroughputTime",
  setup(props,context){
    const refresh=ref()
    const chart=ref()
    const throughput_current = ref()
    const productivity_query = reactive({
            limit: 'month',
        });
    const data_fresh=()=>{
       chart.value = echarts.init(document.getElementById("Gauge_ThroughputTime"))
      fetch_dashboard_throughput(productivity_query).then((res)=> {
            let productivity_data_show=JSON.parse(res)
            throughput_current.value = productivity_data_show["Values"]
            context.emit('md_throughput_current',throughput_current.value)
            chart.value.setOption({series: [
    {
      type: 'gauge',
      startAngle:180,
      endAngle:0,
      radius:"95%",
      min:0,
      max:200,
      axisLine: {
        lineStyle: {
          width: 20,
          color: [
             [0.5, '#00b294'],
              [0.7, '#ffc300'],
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
        fontSize: 10,
      },
      detail: {
                show:false,
        valueAnimation: true,
        formatter: '{value} km/h',
        color: 'auto',
      },
      data: [
        {
          value: throughput_current.value
        }
      ]
    }
  ],
})
          })

    }
    onMounted(()=> {
      data_fresh()
    })
    const resize = debounce(() => {chart.value.resize()}, 100)

    onActivated(()=>{
      refresh.value=setInterval(data_fresh,3000)
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