<!--
 * @FileDescription: father component for director productivity
 * @Author: Pan,Wenfang
 * @Date: 2022/01/04
 * @LastEditors: Pan,wenfang
 * @LastEditTime: 2022/02/28
 -->
<template>
    <div id="big_container">
      <el-row :gutter="20">
        <el-col :span="8" class="Time">
          <h4 style="color: #2EC7C9;">Data/Time:{{current_time}}</h4>
        </el-col>
        <el-col :span="8" class="Title" style="height: 100%">
          <h1 style="color:#2EC7C9">KPI Visualization Dashboard</h1>
        </el-col>
        <el-col :span="8" class="Logo">
            <img src='../../assets/img/logo.png' style="float: right;height: 100%;width: 20%" alt="No img">
        </el-col>
      </el-row>
            <el-row class="el-row-inline">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="el-col-inline3">
          <h4 style="color:#2EC7C9">Productivity-Yearly</h4>
          <div class="echart">
            <MD_pro_average></MD_pro_average>
          </div>
        </el-col>

         <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16" class="el-col-inline3" >
          <div class="echart">
            <MD_pro_month @month_data_query="productivity_month_query"></MD_pro_month>
          </div>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="el-col-inline6" >
          <div class="echart">
            <MD_pro_daily :raw_data="query_month" @load="productivity_month_query"></MD_pro_daily>
          </div>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="el-col-inline6" >
          <div class="echart">
            <MD_pro_cnc :raw_data="query_month" @load="productivity_month_query"></MD_pro_cnc>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="el-col-inline6" >
          <div class="echart">
            <MD_pro_assy :raw_data="query_month" @load="productivity_month_query"></MD_pro_assy>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import {onMounted, onActivated, onDeactivated, ref, reactive} from "vue";
import MD_pro_average from "./MD_pro_average.vue";
import MD_pro_daily from "./MD_pro_daily.vue";
import MD_pro_month from "./MD_pro_month.vue";
import MD_pro_assy from "./MD_pro_assy.vue";
import MD_pro_cnc from "./MD_pro_cnc.vue";
export default {
    name: "MD_pro",
    components:{MD_pro_average,MD_pro_month,MD_pro_daily,MD_pro_assy,MD_pro_cnc},
    setup() {
        const name = localStorage.getItem("ms_username");
        const role = name === "admin" ? "Super manager" : "Normal user";
        const dash_theme=ref('heavy')
        var fullscreen=ref(false)
        var current_time=ref()
        const current_month=ref(new Date().toDateString().split(" ")[1])

        const query_month=reactive({
          month:null
        })
        const productivity_month_query = (load) => {
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
      function get_query_month(load){

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
            current_month,
            query_month,
            productivity_month_query
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
    background-color: white;
    /*  background-color: #b3d8ff;*/
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

.el-col-inline3{
    height: 100%;
    /*width: 100%;*/
    border-top:  solid 2px  #2EC7C9;
    border-bottom:  solid 2px #2EC7C9;
}

.el-col-inline6{
    height: 100%;
    /*width: 100%;*/
    border-top: white solid 2px;
    /*border-bottom: white solid 2px;*/
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
.Pro_ok{
  color: #00b294;
  position: relative;
  left: 49%;
  bottom: 40%;
}
.Pro_alarm{
  color: #ffc300;
  position: relative;
  left: 49%;
  bottom: 40%;

}
.Pro_nok{
  color: #d83b01;
  position: relative;
  left: 49%;
  bottom: 40%;
}

</style>
