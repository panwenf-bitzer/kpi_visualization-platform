<template>
    <div id="container">
          <el-row :gutter="20">
            <el-col :span="8" class="Time">
            <h2 style="color: white">Data/Time:{{current_time}}</h2>
              <el-select v-model="search_item.line" :popper-append-to-body="false" placeholder="unit" class="handle-select mr10">
                <el-option key="All" label="Total line" value="all"></el-option>
                <el-option key="Assembly" label="Assembly line" value="assembly"></el-option>
                <el-option key="Cnc" label="CNC line" value="cnc"></el-option>
              </el-select>
<!--              <el-date-picker v-model="search_item.date" value-format="YYYYMMDD" type="date" placeholder="选择日期"  class="handle-input"></el-date-picker>-->
              <el-button type="primary" icon="el-icon-search" @click="handleSearch">Search</el-button>
          </el-col>
            <el-col :span="8" class="Title">
            <h1 style="color: white;float: bottom">ALU&MSK Productivity Dashboard</h1>
              <p v-show="error_show===true" style="color: red">The service is not available</p>
          </el-col>
          <el-col :span="8" class="Logo">
              <img src='../../assets/img/logo.png' style="float: right;height: 80%;width: 40%" alt="No img">
          </el-col>
          </el-row>
          <el-row :gutter="0" class="el-row-inline" @click="full_screen">
          <el-col :span="12" class="el-col-inline1">
            <div class="echart" id="DailyThroughput"></div>
          </el-col>
          <el-col :span="12" class="el-col-inline2">
            <div class="echart" id="WeeklyThroughput"></div>
          </el-col>
          </el-row>
          <el-row :gutter="0" class="el-row-inline" @click="full_screen">
          <el-col :span="12" class="el-col-inline3">
            <div class="echart" id="MonthlyThroughput"></div>
          </el-col>
          <el-col :span="12" class="el-col-inline4">
            <div class="echart" id="YearlyThroughput"></div>
          </el-col>
          </el-row>
    </div>
</template>

<script>
import {onMounted, reactive, onActivated,onDeactivated, ref} from "vue";
import * as echarts from "echarts";
import * as macarons from 'echarts/theme/macarons'
import {fetch_alu_productivity} from "../../api";
export default {
  name: "P_ALU_Charts",
  setup() {
      const search_item = reactive({
        date:'20211223',
        line:'all'
      });
      const query_daily = reactive({
        limit: 'day',
      });
      const query_weekly = reactive({
        limit: 'week',
      });
      const query_monthly = reactive({
        limit: 'month',
      });
      const query_yearly = reactive({
        limit: 'year',
      });
      const fullscreen=ref(false)
      const refresh=ref()
      const current_time=ref()
      const error_show=ref(false)
      const Fetch_data=(()=>{
        query_daily.date=search_item.date
        query_daily.line=search_item.line
        query_weekly.date=search_item.date
        query_weekly.line=search_item.line
        query_monthly.date=search_item.date
        query_monthly.line=search_item.line
        query_yearly.date=search_item.date
        query_yearly.line=search_item.line
        var my_day_throughput =echarts.init(document.getElementById('DailyThroughput'));
        var my_week_throughput =echarts.init(document.getElementById('WeeklyThroughput'));
        var my_month_throughput =echarts.init(document.getElementById('MonthlyThroughput'));
        var my_year_throughput =echarts.init(document.getElementById('YearlyThroughput'));
        fetch_alu_productivity(query_daily).then((res)=> {
          if(res.status===200){
            let throughput_daily_data=JSON.parse(res.data)
            my_day_throughput.setOption(throughput_daily_data)
            console.log(throughput_daily_data)
            error_show.value=false
          }else{
            error_show.value=true
          }

          })
        fetch_alu_productivity(query_weekly).then((res)=> {
          let throughput_week_data=JSON.parse(res.data)
          my_week_throughput.setOption(throughput_week_data)
          })
        fetch_alu_productivity(query_monthly).then((res)=> {
          let throughput_month_data=JSON.parse(res.data)
          my_month_throughput.setOption(throughput_month_data)
          })
        fetch_alu_productivity(query_yearly).then((res)=> {
          let throughput_year_data=JSON.parse(res.data)
          my_year_throughput.setOption(throughput_year_data)
          })
      //   window.addEventListener('resize', () => {
      //     my_day_throughput.resize();
      //     my_week_throughput.resize();
      //     my_month_throughput.resize();
      //     my_year_throughput.resize();
      // });
      });
        onMounted(()=>{
          Fetch_data()
          font_adapt()
          });
        const time_calculate=()=>{
          current_time.value = new Date().toLocaleString()
        }
        onActivated(()=>{
          refresh.value=setInterval(Fetch_data,10000)
          current_time.value=setInterval(time_calculate,1000)
        });
        onDeactivated(()=>{
          clearInterval(refresh.value)
          clearInterval(current_time.value)
        })
        const handleSearch=(()=>{

        })
        const full_screen = () => {
          let element = document.getElementById('container')
          if(fullscreen.value){
            if(document.exitFullscreen){
              document.exitFullscreen()
              fullscreen.value=false}
            }
          else{
            if(element.requestFullscreen)
            {element.requestFullscreen()}
            fullscreen.value=!fullscreen.value
          }
        }
        const font_adapt=(()=>{
          document.documentElement.style.fontSize = document.documentElement.clientWidth*3/320 +'px';
        })
        window.addEventListener('resize',font_adapt,false)
        return {
          search_item,
          full_screen,
          current_time,
          handleSearch,
          error_show
        };
      },
};
</script>
<style scoped>

.content-title {
    clear: both;
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}

.echart {
    width: 100%;
    height: 100%;
    /*margin-left: 4%;*/
    font-size: 1rem;
}
#container{
    width: 100%;
    height: 100%;
    background-image: url("../../assets/img/bg-1.png");
    font-size: 1rem;
    background-size: cover;
}
.el-row-inline{
    height: 40%;
    width: 99.5%;
    margin-left: 0.3%;
    margin-bottom: 1px;
}
.el-col-inline1{
    height: 100%;
    width: 40%;
    border-left: white solid 2px;
    border-right: white dashed 2px;
    border-top: white solid 2px;
    /*border-bottom: white dashed 2px;*/

}
.el-col-inline2{
    height: 100%;
    width: 40%;
    border-top-right-radius: 15%;
    /*border-left: white solid 2px;*/
    border-right: white solid 2px;
    border-top: white solid 2px;
    /*border-bottom: white dashed 2px;*/
}
.el-col-inline3{
    height: 100%;
    width: 40%;
    border-left: white solid 2px;
    border-right: white dashed 2px;
    border-top: white dashed 2px;
    border-bottom: white solid 2px;
    border-bottom-left-radius: 15%;
}
.el-col-inline4{
    height: 100%;
    width: 40%;
    /*border-left: white solid 2px;*/
    border-right: white solid 2px;
    border-top: white dashed 2px;
    border-bottom: white solid 2px;
}
.handle-box {
    margin-bottom: 20px;
    float: right;
}

.handle-select {
    width: 30%;
    background-color: #00a854;
}
.handle-input {
    width: 300px;
    display: inline-block;
}

.Title{
  border-style: solid;
  color: white;
  text-align: center;
  /*border-radius: 20%;*/
  border-bottom-left-radius: 30%;
  border-bottom-right-radius: 30%;
  margin-top: 0.1%;
}
.Time{
  /*border-style: solid;*/
}
.Logo{
  /*border-style: solid;*/
}
</style>