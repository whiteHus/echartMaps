<template>
  <div class="home">
    <div class="count">总人数：{{count}}</div>
    <div class="map-container" id="myEchart1"></div>
  </div>
</template>

<script>
import china from './china.js';
import { mapState} from 'vuex'

export default {
  name: 'Home',
  components: {
  },
  data() {
    return{
      count:0,
    }
  },
  mounted(){
    this.drawLine();
    this.count=this.seriesData.reduce((prev, cur)=> {
        if(prev.value){
          return prev.value + cur.value;
        }else{
          return prev + cur.value;
        }
    })
  },
  computed:{
      ...mapState(['seriesData']),
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myEchart1'))
         this.$echarts.registerMap('china', china)
            // 绘制图表
            var option = {
               title: {
                  text: '中国疫情分布图',
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
      myChart.on('click', (param)=> {
          this.$router.push({name:'Province',query:param.data});
      });
    }
  }
}
</script>

<style lang="css">
.map-container{
  height: 90vh;
  width: 90vw;
  padding: 20px;
  border: 1px solid #ebebeb;
}
.home{
   width: 90vw;
   margin: 0 auto;
}
.count {
  border: 2px solid #1456bc;
  border-radius: 5px;
  padding: 20px;
  position: fixed;
}
</style>
