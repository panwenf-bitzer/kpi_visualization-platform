<!--
 * @FileDescription: father component for output
 * @Author: Pan,Wenfang
 * @Date: 2022/01/04
 * @LastEditors: Pan,wenfang
 * @LastEditTime: 2022/02/28
 -->
<template>
    <div id="big_container">
      <el-row :gutter="20">
        <el-col :span="8" class="Time">
          <h4 style="color:#2EC7C9">Data/Time:{{current_time}}</h4>
        </el-col>
        <el-col :span="8" class="Title" style="height: 100%">
          <h1 style="color: #2EC7C9">KPI Visualization Dashboard</h1>
          <p v-show="error_show===true" style="color: red">The service is not available</p>
        </el-col>
        <el-col :span="8" class="Logo">
            <img src='../../assets/img/logo.png' style="float: right;height: 100%;width: 20%" alt="No img">
        </el-col>
      </el-row>
      <div STYLE="margin-left: 40px">
        <el-date-picker v-model="query.month" value-format="YYYYMMDD" type="date" placeholder="Select date"  class="handle-input mr10"></el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="throughput_month_query">Search</el-button>
      </div>
      <el-row :gutter="0" class="el-row-inline">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="el-col-inline2" >
          <div class="echart">
            <sh_output_daily :raw_data="query_month"></sh_output_daily>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"  class="el-col-inline4" >

          <div class="echart">
            <alu_output_daily :raw_data="query_month"></alu_output_daily>
          </div>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="el-col-inline5" >

          <div class="echart">
            <sc_output_daily :raw_data="query_month"></sc_output_daily>
          </div>
        </el-col>
         <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="el-col-inline5" >

          <div class="echart">
            <scr_output_daily :raw_data="query_month"></scr_output_daily>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import {onMounted, onActivated, onDeactivated, ref, reactive} from "vue";
import alu_output_daily from "./charts/alu_output_daily.vue";
import sh_output_daily from "./charts/sh_output_daily.vue";
import sc_output_daily from "./charts/sc_output_daily.vue";
import scr_output_daily from "./charts/roll_output_daily.vue";
import { useStore } from "vuex";
export default {
    name: "output_dash",
    components:{alu_output_daily,sc_output_daily,scr_output_daily,sh_output_daily},
    setup() {
        const name = localStorage.getItem("ms_username");
        const role = name === "admin" ? "Super manager" : "Normal user";
        const error_show=ref(false)
        const dash_theme=ref('heavy')
        var fullscreen=ref(false)
        var current_time=ref()
        const current_month=ref(new Date().toDateString().split(" ")[1])
        const query=reactive({
          month:getNowFormatDate()
            })
        const query_month=reactive({
        })
        const throughput_month_query = () => {
          console.log(query.month)
          query_month.month=getNowFormatMonth(query.month)
        }

        function getNowFormatMonth(date) {
          if (date.substr(4,1)==="0"){
            return date.substr(5,1);}
          else
            return date.substr(4,2)
        }
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
        const full_screen = () => {
          let element = document.getElementById('big_container')
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
        const time_calculate=()=>{
          current_time.value = new Date().toString().replace("(中国标准时间)"," ").replace("GMT+0800","")
        }
        onMounted(()=>{
          font_adapt()
        })
        onActivated(()=> {
          current_time.value=setInterval(time_calculate,1000)
        })
        onDeactivated(()=>{
          clearInterval(current_time.value)
        })
        const font_adapt=(()=>{
          document.documentElement.style.fontSize = document.documentElement.clientWidth*3/320 +'px';
        })
        window.addEventListener('resize',font_adapt,false)

        return {
            name,
            role,
            full_screen,
            dash_theme,
            current_time,
            error_show,
            current_month,
            query_month,
            throughput_month_query,
            query
            };
      },
};
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;

}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}
.echart {
    width: 100%;
    height: 100%;
    font-size: 1rem;
}
#big_container{
    width: 100%;
    height: 100%;
    /*background-image: url("../assets/img/bg-1.png");*/
    /*background-color: #1f2f3d;*/
    background-color:white;
    /*background-repeat: repeat-y;*/
    font-size: 1em;
    /*background-size: cover;*/
}

@media screen and (max-width: 744px) {
  .el-row-inline{
    height: 225px;
}
}

@media screen and (min-width: 744px) and (max-width: 1024px) {
  .el-row-inline{
    height: 225px;
}
}
@media screen and (min-width: 1024px) {
  .el-row-inline{
    height: 45%;
}
}

.el-row-inline{
    /*height: 30%;*/
    width: 99.5%;
    margin-left: 0.3%;
    margin-bottom: 0px;
}
.el-col-inline1{
    height: 100%;
    /*width: 100%;*/
    border-top:  solid 2px  #2EC7C9;
    border-bottom:  solid 2px #2EC7C9;
}
.el-col-inline2{
    height: 100%;
    /*width: 100%;*/
    /*border-top: white solid 2px;*/
}
.el-col-inline3{
    height: 100%;
    /*width: 100%;*/
    border-top: white solid 2px;
    border-bottom: white solid 2px;
}
.el-col-inline4{
    height: 100%;
    /*width: 100%;*/
}
.el-col-inline5{
    height: 100%;
    /*width: 100%;*/
}
.el-col-inline6{
    height: 100%;
    /*width: 100%;*/
    border-top: white solid 2px;
    border-bottom: white solid 2px;
}
.Title{
  border: solid 3px #2EC7C9;
  color: white;
  text-align: center;
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
#MyThroughput{
  margin-top: 20px;
}
#MyProductivity{
  margin-top: 20px;
}
.Thr_ok{
  color: #00b294;
  position: relative;
  left: 47%;
  bottom: 40%;
}
.Thr_alarm{
  color: #ffc300;
  position: relative;
  left: 47%;
  bottom: 40%;
}
.Thr_nok{
  color: #d83b01;
  position: relative;
  left: 47%;
  bottom: 40%;
}
</style>
