/*
* @Brief: 经营报告-日 主文件
* @Author: 张文亮
* @Date: 2018-11-02 20:20:04
* @Last Modified by: 张文亮
* @Last Modified time: 2018-11-02 20:23:54
*/
<template>
  <div>
    <!-- 经营报告-日  主文件 -->
    <el-row>
      <el-col :span="12">
        <h3 style="display:inline">仪表盘</h3>
        <span>最后统计时间：&nbsp;&nbsp;</span>
        <span>{{latestTime}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="salesTable">
          <el-table :data="tableDataSales" style="width: 100%">
            <el-table-column prop="industry" label="行业">
            </el-table-column>
            <el-table-column prop="sales" label="销售额">
            </el-table-column>
            <el-table-column prop="proportion" label="占比">
            </el-table-column>
            <el-table-column label="完成率">
              <template slot-scope="scope">
                <p style='display:inline'>{{scope.row.completionRate}}</p>
                <img v-if="scope.row.completionRate >0" src='../../../assets/img/icons/32/arrows-up-red.png' height="16" width="16">
                <img v-else  src='../../../assets/img/icons/32/arrows-down-green.png' height="16" width="16">
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="flowTable">
          <el-table :data="tableDataFlow" style="width: 100%">
            <el-table-column prop="industry" label="行业">
            </el-table-column>
            <el-table-column prop="sales" label="客流量">
            </el-table-column>
            <el-table-column prop="proportion" label="占比">
            </el-table-column>
            <el-table-column label="转化率">
              <template slot-scope="scope">
                <p style='display:inline'>{{scope.row.completionRate}}</p>
                <img v-if="scope.row.completionRate >0" src='../../../assets/img/icons/32/arrows-up-red.png' height="16" width="16">
                <img v-else  src='../../../assets/img/icons/32/arrows-down-green.png' height="16" width="16">
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="leaguerTable">
          <el-table :data="tableDataFlow" style="width: 100%">
            <el-table-column prop="industry" label="行业">
            </el-table-column>
            <el-table-column prop="sales" label="新增会员">
            </el-table-column>
            <el-table-column prop="proportion" label="占比">
            </el-table-column>
            <el-table-column label="同比">
              <template slot-scope="scope">
                <p style='display:inline'>{{scope.row.completionRate}}</p>
                <img v-if="scope.row.completionRate >0" src='../../../assets/img/icons/32/arrows-up-red.png' height="16" width="16">
                <img v-else  src='../../../assets/img/icons/32/arrows-down-green.png' height="16" width="16">
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <h3 style="display:inline">客流趋势</h3>
        <el-select v-model="regionSelect" size='mini'>
          <el-option v-for="item in regionSelectList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="floorSelectList" size='mini'>
          <el-option v-for="item in floorSelectList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="shopSelect" size='mini'>
          <el-option v-for="item in shopSelectList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" size="small" @click= 'trendChartQuery' round>查询</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div id='myTrendChart' :style="{height:'300px',width:'100%'}"></div>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="24">
        <div id='myChart' :style="{height:'300px',width:'100%'}"></div>
      </el-col>
    </el-row> -->
    <el-row>
      <el-col :span="24">
        <h3 style="display:inline">客流趋势</h3>
        <button type='button' >餐饮</button>
        <button type='button' >零售</button>
        <button type='button' >免税</button>
        <button type='button' >便利</button>
        <span >日期：{{yesterday}}(昨日)</span>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="yesterdayFirstTable" style="width: 100%">
            <el-table-column prop="ranking" label="排名">
            </el-table-column>
            <el-table-column prop="tradeState" label="业态">
            </el-table-column>
            <el-table-column  label="日销售额(元)">
              <template slot-scope="scope">
                <p style='display:inline'>{{scope.row.salesOfDay}}</p>
                <!-- <i class = "el-icon-arrow-up"></i> -->
                <!-- <i class = "getCompletionIcon(scope.row.completionRate)"></i> -->
                <img src='../../../assets/img/icons/32/arrows-up-red.png' height="16" width="16">
              </template>
            </el-table-column>
            <el-table-column label="日客流量(人次)">
              <template slot-scope="scope">
                <p style='display:inline'>{{scope.row.flowOfDay}}</p>
                <!-- <i class = "el-icon-arrow-up"></i> -->
                <!-- <i class = "getCompletionIcon(scope.row.completionRate)"></i> -->
                <img src='../../../assets/img/icons/32/arrows-up-red.png' height="16" width="16">
              </template>
            </el-table-column>
          </el-table>
    </el-row>
    <el-row>
      <el-table :data="yesterdayRankingTable" style="width: 100%">
            <el-table-column prop="ranking" label="排名">
            </el-table-column>
            <el-table-column prop="brandName" label="品牌名称">
            </el-table-column>
            <el-table-column  label="日销售额(元)">
              <template slot-scope="scope">
                <p style='display:inline'>{{scope.row.salesOfDay}}</p>
                <!-- <i class = "el-icon-arrow-up"></i> -->
                <!-- <i class = "getCompletionIcon(scope.row.completionRate)"></i> -->
                <img src='../../../assets/img/icons/32/arrows-up-red.png' height="16" width="16">
              </template>
            </el-table-column>
            <el-table-column label="日客流量(人次)">
              <template slot-scope="scope">
                <p style='display:inline'>{{scope.row.flowOfDay}}</p>
                <!-- <i class = "el-icon-arrow-up"></i> -->
                <!-- <i class = "getCompletionIcon(scope.row.completionRate)"></i> -->
                <img src='../../../assets/img/icons/32/arrows-up-red.png' height="16" width="16">
              </template>
            </el-table-column>
          </el-table>
    </el-row>
  </div>

</template>
<script>
export default {
  data () {
    return {
      tableDataSales: [
        {
          industry: '综合',
          sales: 2000,
          proportion: '100%',
          completionRate: 0.1
        },
        {
          industry: '餐饮',
          sales: 800,
          proportion: '30%',
          completionRate: 0.14
        },
        {
          industry: '商贸',
          sales: 500,
          proportion: '20%',
          completionRate: 0.14
        },
        {
          industry: '免税',
          sales: 700,
          proportion: '40%',
          completionRate: -0.02
        },
        {
          industry: '餐饮',
          sales: 800,
          proportion: '30%',
          completionRate: 0.14
        }],
      tableDataFlow: [
        {
          industry: '综合',
          sales: 2000,
          proportion: '100%',
          completionRate: 0.1
        },
        {
          industry: '餐饮',
          sales: 800,
          proportion: '30%',
          completionRate: 0.14
        },
        {
          industry: '商贸',
          sales: 500,
          proportion: '20%',
          completionRate: 0.14
        },
        {
          industry: '免税',
          sales: 700,
          proportion: '40%',
          completionRate: '-0.02'
        },
        {
          industry: '餐饮',
          sales: 800,
          proportion: '30%',
          completionRate: 0.14
        }],
      regionSelectList: [
        {
          label: '整体',
          value: 'allRegion'
        },
        {
          label: '公共区',
          value: 'publicRegion'
        },
        {
          label: '控制区',
          value: 'controlRegion'
        }],
      floorSelectList: [
        {
          label: '第一层',
          value: 1
        },
        {
          label: '第二层',
          value: 2
        },
        {
          label: '第三层',
          value: 3
        }
      ],
      yesterdayFirstTable: [
        {
          ranking: 1,
          tradeState: '商贸',
          salesOfDay: 100000,
          flowOfDay: 100000000
        }
      ],
      yesterdayRankingTable: [
        {
          ranking: 1,
          brandName: 'Adidas',
          salesOfDay: '51.884',
          flowOfDay: '51.884'
        }
      ],
      shopSelectList: [],
      regionSelect: '',
      floorSelect: '',
      shopSelect: '',
      latestTime: '',
      yesterday: '2018-11-07'
    };
  },
  computed: {
    getCompletionIcon (v) {
      return v > 0 ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
    }
  },
  mounted () {
    // 示例图表
    /* let myChart = this.$echarts.init(document.getElementById('myChart'));
    myChart.setOption({
      title: {
        text: '在VUE中使用echarts'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
    }); */

    // 客流趋势图表
    let myTrendChart = this.$echarts.init(
      document.getElementById('myTrendChart')
    );
    myTrendChart.setOption({
      title: {
        text: '',
        subtext: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['昨日数据', '今日数据']
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: (function () {
            let list = [];
            for (let i = 0; i <= 21; i += 3) {
              if (i < 10) {
                list.push('0' + i + ':00-0' + i + ':59');
              } else {
                list.push(i + ':00-' + i + ':59');
              }
            }
            return list;
          })()
        }],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: '{value} '
          }
        }],

      series: [
        {
          name: '昨日新用户数',
          type: 'line',
          data: [27, 18, 10, 29, 15, 9, 13, 16]
        },
        {
          name: '今日新用户数',
          type: 'line',
          data: [26, 11, 19, 9, 27, 11, 16, 21]
        }]
    });
    /* let form = new FormData();
    form.append('data_time', '2018-10-28');
    form.append('category_cd', '餐饮');
    form.append('data_interval', 'day');
    this.$axios({
      method: 'post',
      url: 'http://172.21.32.9:8000/api/bsn/v1/overview/getPassengerCount',
      data: form,
      timeout: 1000 * 60 * 2
    }).then(e => {
      let jsonData = JSON.parse(e.data);
      console.log(jsonData);
      debugger;
    }); */
  },
  methods: {
    trendChartQuery () {
    }
  }
};
</script>
<style scoped>
/* .el-table{
  background-color: linear-gradient(to top right,#6C80Fe,#26CDFD);
} */
.salesTable{
  /* background: linear-gradient(to top right,#6C80Fe,#26CDFD); */
  background-color: rgba(255,0,0, 0.5);
}
.flowTable{

}
.leaguerTable{

}
</style>
