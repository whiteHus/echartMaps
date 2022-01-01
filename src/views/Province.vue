<template>
  <div class="Province">
     <div class="map1-container" id="myEchart"></div>
     <div class="form">
       <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="省份名称">
          {{form.name}}
          </el-form-item>
          <el-form-item label="感染人数">
            <el-input v-model="form.value"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="$router.push({name:'Home'})">取消</el-button>
          </el-form-item>
        </el-form>
     </div>
  </div>
</template>

<script>
import china from './china.js';
import { mapMutations, mapState} from 'vuex'

export default {
  name: 'Home',
  components: {
  },
  data(){
    return{
      form: {
          name: '',
          value: 0,
        }
    }
  },
  mounted(){
    const {name,value} = this.$route.query
    this.form = {name,value}
    this.drawLine();
  },
  computed:{
      ...mapState(['seriesData']),
  },
  methods: {
    ...mapMutations(['setSeriesData']),
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myEchart'))
        const _china =JSON.parse(JSON.stringify(china));
         this.$echarts.registerMap('china', _china)
         for (let i = 0; i < _china.features.length; i++) {
           const el = _china.features[i];
           if(el.properties.name===this.$route.query.name){
             _china.features=[el];
             break;
           }
         }
            // 绘制图表
            var option = {
               title: {
                  text: `${this.form.nam}疫情分布图`,
                  left: 'center'
                },
                  tooltip: {
                      trigger: 'item',
                      formatter: '{b}<br/>{c} (人)'
                  },
                color:"burlywood",
                visualMap: {
                    min: 0,
                    max: 10000,
                    left: '2%',
                    top: '50%',
                    text: ['高','低'],
                    calculable : true,
                    color:['#0b50b9','#c3e2f4']
                },
                selectedMode: 'single',
                series : [
                    {
                        name: '中国',
                        type: 'map',
                        mapType: 'china',
                        itemStyle: {
                            normal: {
                                borderWidth: .5,//区域边框宽度
                                borderColor: '#0550c3',//区域边框颜色
                                areaColor:"#4ea397",//区域颜色
                            },
                            emphasis: {
                                borderWidth: .5,
                                borderColor: '#4b0082',
                                areaColor:"#ece39e",
                            }
                        },
                        showLegendSymbol: true,
                        label: {
                            normal: {
                                show: true,//显示省份标签
                                textStyle:{color:"#000000"}//省份标签字体颜色
                            },
                            emphasis: {//对应的鼠标悬浮效果
                                show: true,
                                textStyle:{color:"#323232"}
                            }
                        },
                        data:this.seriesData
                    }
                ]
            }

      myChart.setOption(option);
    },
    onSubmit(){
      const {name,value} = this.form
      this.setSeriesData({name,value:parseInt(value)});  
      this.$router.push({name:'Home'})
    }
  }
}
</script>

<style lang="css">
.map1-container{
  height: 90vh;
  width: 60vw;
} 
.Province{
  display: flex;
}
.form{
  flex: 1;
  border: 1px solid #ebebeb;
  padding: 20px;
}
</style>
