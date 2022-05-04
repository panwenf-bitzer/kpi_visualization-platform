<!--
 * @FileDescription: child component for monthly productivity
 * @Author: Pan,Wenfang
 * @Date: 2022/01/04
 * @LastEditors: Pan,wenfang
 * @LastEditTime: 2022/02/28
 -->
<template>
  <div :id="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from "echarts";
import {fetch_dashboard_productivity} from "../../../api/Manager_dashboard";
import {onActivated, onDeactivated, onMounted, reactive, ref} from "vue";
import {debounce} from "../../../utils";
export default {
  name: "Guage_productivity.vue",
  props: {
    className: {
      type: String,
      default: 'Guage_productivity'
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
    const query = reactive({
        limit: 'day',
        date:getNowFormatDate(),
        line:'all'
        });
    const refresh=ref()
    const chart=ref()
    const production_data=ref()

    const init=(()=> {
      chart.value = echarts.init(document.getElementById(props.className),"macarons")
      chart.value.setOption(
       {
  series: [
    {
      type: 'gauge',
      startAngle:180,
      endAngle:0,
      min:100,
      max:0,
      radius:"95%",
      axisLine: {
        lineStyle: {
          width: 20,
          color: [
            [0.38, '#00b294'],
            [0.62, '#ffc300'],
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
        formatter: '{value}%',
        color: 'auto',
        fontSize:20
      },
      data: [
        {
          value: production_data.value*100
        }
      ]
    }
  ],
})
    })

    const data_fresh=()=>{
      fetch_dashboard_productivity(query).then((res)=>{
        // console.log(res.data)
        let data=JSON.parse(res)
        production_data.value=data["Values"]
        init()
      })
      // production_value.value=40
      // init()
    }
    onMounted(()=> {
      data_fresh()
    })
   function getNowFormatDate() {
        let date = new Date();

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
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