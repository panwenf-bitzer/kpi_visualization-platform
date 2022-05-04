<template>
  <div class="header">
    <img src="../assets/img/logo.png" style="width:100px" alt="BITZER GROUP">
     <a href="http://kpi.bitzer.cn" style="font-size: 1.4rem;float: right;color: #00b294">back</a>
    <H1 style="color: white;text-align: center">KPI Visualization Instruction</H1>
    </div>
<div id="instruction">
<!--step1-->
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card>
        <H2 style="color: #00a854">Step1</H2>
          <article>
            Follow the link below to access KPI online platform login page:
            <a href="http://kpi.bitzer.cn">http://kpi.bitzer.cn</a>
          </article>
        </el-card>
      </el-col>
          </el-row>
<!--step2-->
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card>
          <H2 style="color: #00a854">Step2 <span>  </span></H2>
          <p>
            Login in using your Bitzer ID number and password
          </p>
          <img src="../assets/img/login.png" style="position: relative;left: 39%" alt="BITZER GROUP">
        </el-card>
      </el-col>
    </el-row>
<!--step3-->
    <el-row :gutter="0" >
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" style="height: 100%">
                <el-card>
                  <div style="height: 300px">
                   <H2 style="color: #00a854">Step3</H2>
                   <H2>A:</H2>
                   <p>Throughput time gauge shows the average throughput time of all compressors for this month (from entering CNC to packaging in assembly)</p><br/>
                   <H2>D:</H2>
                   <p>Shows throughput time of past 20 SH housing </p><br/>
                   <H2>B:</H2>
                   <p>Productivity gauge shows the averaged productivity of all production lines for this current month </p>
                    </div>
                </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" style="height: 100%">
                <el-card style="flex-wrap: wrap">
                  <img src="../assets/img/dashboard.png" alt="BITZER GROUP">
                </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" style="height: 100%">
                <el-card>
                  <div style="height: 300px">
                   <H2>C:</H2>
                   <p>Shows throughput time of past 25 aluminum housing</p><br/><br/><br/>
                   <H2>E:</H2>
                   <p>Shows throughput time of past 20 SC housing  </p> <br/><br/><br/>
                   <H2>F:</H2>
                   <p>Shows average daily productivity trend for this current month</p>
                  </div>
                </el-card>
      </el-col>
    </el-row>
  </div>
</template>
import { useRouter } from "vue-router";
<script>
import {useRouter} from "vue-router";

export default {
  name: "help.vue",

  setup(){
    const router = useRouter();
    const backlogin = () => {
      router.push("/")
    }
    return{
      backlogin
    }
  }
}
</script>

<style scoped>
#instruction{
  width: 100%;
  overflow-y:auto;}
</style>