<!--
 * @FileDescription: father component for MD dashboard
 * @Author: Pan,Wenfang
 * @Date: 2022/01/04
 * @LastEditors: Pan,wenfang
 * @LastEditTime: 2022/02/28
 -->
<template>

<!--<div class="background-all">-->
<el-row class="md-row">
  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" style="height: 100%" >
    <div class="banner_container" @click="full_screen">
      <h3 class="banner">Faster Processes</h3>
    </div>

     <div class="MdGauge">

      <Productivity @md_productivity_current="listen_productivity"></Productivity>


       <div class="description">
         <p class="heading">Speed: Productivity</p>
         <p class="info">calculation: total menhour in production  / total amount of products produced for customer</p>
       </div>
         <div class="MdContent">
           <p style="font-size: small;font-weight: bold;display: inline">Target: {{target_productivity}}</p>
           <p style="font-size: small;font-weight: bold;display: inline;margin-left: 85px"> Current: {{current_productivity}}</p>
           <el-button v-if="target_productivity<current_productivity" type="success" size="mini" icon="el-icon-top-right" style="margin-left: 95px" @click="$router.push('/dash_productivity')"></el-button>
           <el-button v-else-if="target_productivity>current_productivity" type="danger" size="mini" icon="el-icon-bottom-right" style="margin-left: 95px" @click="$router.push('/dash_productivity')"></el-button>
           <el-button v-else type="success" size="mini" icon="el-icon-right" style="margin-left: 95px" @click="$router.push('/dash_productivity')"></el-button>
         </div>
       <div class="TablePro">
         <TableProductivity></TableProductivity>
       </div>

</div>


       <div class="MdGauge">
      <ThroughputTime @md_throughput_current="listen_throughput"></ThroughputTime>
         <div class="description">
         <p class="heading">Speed: Throughput time</p>
         <p class="info">calculation: ((WIP customer orders (ZP01 + ZP02) / average compressor cost))* takt time paintshop</p>
       </div>
         <div class="MdContent">
           <p style="font-size: small;font-weight: bold;display: inline">Target: {{target_throughput}}h</p>
           <p style="font-size: small;font-weight: bold;display: inline;margin-left: 85px">Current: {{current_throughput}}h</p>
           <el-button v-if="current_throughput>target_throughput" type="danger" size="mini" icon="el-icon-top-right" style="margin-left: 95px" @click="$router.push('/dash_throughput')"></el-button>
           <el-button v-else-if="current_throughput<target_throughput" type="success" size="mini" icon="el-icon-bottom-right" style="margin-left: 95px" @click="$router.push('/dash_throughput')"></el-button>
           <el-button v-else type="success" size="mini" icon="el-icon-right" style="margin-left: 95px" @click="$router.push('/dash_throughput')"></el-button>
         </div>
         <div class="TablePro">
         <TableThroughputTime></TableThroughputTime>
       </div>
    </div>
  </el-col>



  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" style="height: 100%">
    <div class="banner_container" @click="full_screen">
      <h3 class="banner">Better Quality</h3>
    </div>

        <div class="MdGauge">
      <CustomerComplain></CustomerComplain>

          <div class="description">
            <div class="heading"><p>Customer complaints</p></div>
            <div class="info"><p>calculation: (summary of customer complaints per week / Production volume  of week) * 1000</p></div>
</div>

          <div class="MdContent">
            <p style="font-size: small;font-weight: bold;display: inline">Target: 6 ppt </p>
            <p style="font-size: small;font-weight: bold;display: inline;margin-left: 85px">Current: 6 ppt </p>
            <el-button v-if="true" type="danger" size="mini" icon="el-icon-bottom-right" style="margin-left: 95px"></el-button>
             <el-button v-else-if="false" type="success" size="mini" icon="el-icon-top-right" style="margin-left: 95px"></el-button>
             <el-button v-else type="success" size="mini" icon="el-icon-right" style="margin-left: 95px"></el-button>
  </div>
          <div class="TablePro">
         <TableCustomerComplain></TableCustomerComplain>
       </div>
    </div>

        <div class="MdGauge">
      <DeliveryOnTime></DeliveryOnTime>

          <div class="description">
            <div class="heading"><p>Delivery on time</p></div>
            <div class="info"><p>calculation: Average amount of open orders at the end of week (units) . Update: Friday noontime</p></div>
</div>
          <div class="MdContent">
            <p style="font-size: small;font-weight: bold;display: inline">Target: 4 unts</p>
            <p style="font-size: small;font-weight: bold;display: inline;margin-left: 95px"> Current: 3 unts</p>
            <el-button v-if="target_throughput>current_throughput" type="danger" size="mini" icon="el-icon-bottom-right" style="margin-left: 95px"></el-button>
            <el-button v-else-if="target_throughput<current_throughput" type="success" size="mini" icon="el-icon-top-right" style="margin-left: 95px"></el-button>
            <el-button v-else type="success" size="mini" icon="el-icon-right" style="margin-left: 95px"></el-button>
  </div>
          <div class="TablePro">
         <TableDeliveryOnTime></TableDeliveryOnTime>
       </div>
    </div>

  </el-col>

  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" style="height: 100%">
    <div class="banner_container" @click="full_screen">
      <h3 class="banner">Dropping Costs</h3>
    </div>
        <div class="MdGauge">
      <OperationalCost></OperationalCost>
          <div class="description">
            <div class="heading"><p>Operational costs</p></div>
            <div class="info"><p>calculation: sum of total costs (labor, variable + fixed)/ total number of compressors produced</p></div>
</div>
          <div class="MdContent">
            <p style="font-size: small;font-weight: bold;display: inline">Target: 1070 ¥/unit</p>
            <p style="font-size: small;font-weight: bold;display: inline;margin-left: 85px">Current: 1270 ¥/unit</p>
            <el-button v-if="true" type="success" size="mini" icon="el-icon-top-right" style="margin-left: 95px"></el-button>
            <el-button v-else-if="false" type="success" size="mini" icon="el-icon-top-right" style="margin-left: 95px"></el-button>
            <el-button v-else type="success" size="mini" icon="el-icon-right" style="margin-left: 95px"></el-button>
  </div>
          <div class="TablePro">
         <TableOperationalCost></TableOperationalCost>
       </div>
    </div>

        <div class="MdGauge">
      <CostOfQuality></CostOfQuality>

          <div class="description">
         <p id="CostOfQuality" class="heading">Cost of quality</p>
         <p class="info">calculation: sum (Ʃ rework hours  * fully burdened  labor rate, ( / total units produced)</p>
       </div>
          <div class="MdContent">
            <p style="font-size: small;font-weight: bold;display: inline">Target: 15 ¥/unit</p>
            <p style="font-size: small;font-weight: bold;display: inline;margin-left: 85px">Current: 19 ¥/unit</p>
            <el-button v-if="true" type="success" size="mini" icon="el-icon-top-right" style="margin-left: 95px"></el-button>
            <el-button v-else-if="false" type="success" size="mini" icon="el-icon-top-right" style="margin-left: 95px"></el-button>
            <el-button v-else type="success" size="mini" icon="el-icon-top-right" style="margin-left: 95px"></el-button>
  </div>
          <div class="TablePro">
         <TableCostQuality></TableCostQuality>
       </div>
    </div>
  </el-col>

</el-row>
<!--</div>-->


</template>

<script>
import CostOfQuality from "./CostOfQuality.vue";
import CustomerComplain from "./CustomerComplain.vue";
import DeliveryOnTime from "./DeliveryOnTime.vue";
import DroppingCost from "./OperationalCost.vue";
import Productivity from "./Productivity.vue";
import ThroughputTime from "./ThroughputTime.vue";
import {ref} from "vue";
import OperationalCost from "./OperationalCost.vue";
import TableProductivity from "./TableProductivity.vue";
import TableCostQuality from "./TableCostQuality.vue";
import TableCustomerComplain from "./TableCustomerComplain.vue";
import TableDeliveryOnTime from "./TableDeliveryOnTime.vue";
import TableThroughputTime from "./TableThroughputTime.vue";
import TableOperationalCost from "./TableOperationalCost.vue";
export default {
  name: "MdDashboard",
  components:{
    OperationalCost,
    CostOfQuality, CustomerComplain, DeliveryOnTime, DroppingCost, Productivity, ThroughputTime, TableProductivity, TableCustomerComplain, TableDeliveryOnTime,
  TableThroughputTime, TableOperationalCost, TableCostQuality},

    setup(){
      const target_throughput = ref()
      const current_throughput = ref()
      const target_productivity = ref()
      const current_productivity = ref()
      var fullscreen=ref(false)
      const listen_productivity = (payload) => {
        current_productivity.value = (payload*100).toLocaleString()+"%"
        target_productivity.value="62%"
      }
      const listen_throughput = (payload) => {
        current_throughput.value = payload[0]
        target_throughput.value=97
      }

      const full_screen = () => {
          let element = document.getElementsByClassName('banner_container')
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
      return {
        target_throughput,
        current_throughput,
        target_productivity,
        current_productivity,
        listen_productivity,
        full_screen,
        listen_throughput
      }
    }

}
</script>

<style scoped>
@import "../../assets/css/MdDirector.css";
</style>
