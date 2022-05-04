<!--
 * @FileDescription: father component for director throughput time daily
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
      <el-row :gutter="0" class="el-row-inline">
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" class="el-col-inline1">
          <h4 style="color: #2EC7C9" >ThroughputTime_Yearly</h4>
          <div class="echart">
            <MD_thro_average></MD_thro_average>
          </div>
        </el-col>

          <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18" class="el-col-inline1">
          <div class="echart">
            <MD_thro_month @month_data_query="throughput_month_query"></MD_thro_month>
          </div>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="el-col-inline2" >
          <div class="echart">
            <MD_sh_daily :raw_data="query_month"></MD_sh_daily>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12"  class="el-col-inline4" >

          <div class="echart">
            <MD_alu_daily :raw_data="query_month"></MD_alu_daily>
          </div>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="el-col-inline5" >

          <div class="echart">
            <MD_sc_daily :raw_data="query_month"></MD_sc_daily>
          </div>
        </el-col>
         <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="el-col-inline5" >

          <div class="echart">
            <MD_scr_daily :raw_data="query_month"></MD_scr_daily>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import {onMounted, onActivated, onDeactivated, ref, reactive} from "vue";
import MD_alu_daily from "./MD_alu_daily.vue";
import MD_sc_daily from "./MD_sc_daily.vue";
import MD_scr_daily from "./MD_scr_daily.vue";
import MD_sh_daily from "./MD_sh_daily.vue";
import MD_thro_average from "./MD_thro_average.vue";
import MD_thro_month from "./MD_thro_month.vue";
import { useStore } from "vuex";
export default {
    name: "MD_thr",
    components:{MD_sh_daily,MD_sc_daily,MD_scr_daily,MD_thro_month,MD_thro_average,MD_alu_daily},
    setup() {
        const name = localStorage.getItem("ms_username");
        const role = name === "admin" ? "Super manager" : "Normal user";
        const error_show=ref(false)
        const dash_theme=ref('heavy')
        var fullscreen=ref(false)
        var current_time=ref()
        const current_month=ref(new Date().toDateString().split(" ")[1])

        const query_month=reactive({
          month:null
        })
        const throughput_month_query = (load) => {
          query_month.month=load
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
            throughput_month_query
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
    height: 30%;
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
