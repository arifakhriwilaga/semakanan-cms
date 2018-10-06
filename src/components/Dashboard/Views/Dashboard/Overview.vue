<template>
  <div>
    <!--Stats cards-->
    <!-- <div class="row">
      <div class="col-lg-3 col-sm-6" v-for="stats in statsCards">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div> -->

    <div class="row">
        <div class="col-lg-12 col-sm-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title"><b>seMakanan Admin Panel</b><p>Selamat datang di dashboard seKampus Makanan</p></h4>
              <p class="category"></p>
            </div>
            <div class="card-content">
              <div class="row">
                <div class="col-md-12">
                  <world-map></world-map>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="col-lg-4 col-sm-6">
          <chart-card :chart-data="earningsChart.data" :chart-options="earningsChart.options">
            <span slot="title">$34,657</span>
            <span slot="title-label" class="label label-success">
              +18%
            </span>
            <h6 slot="subtitle">
              total earnings <span class="text-muted">in last</span> ten <span class="text-muted">quarters</span>
            </h6>
            <div slot="footer-title">
              Financial Statistics
            </div>
            <button slot="footer-right" class="btn btn-info btn-fill btn-icon btn-sm">
              <i class="ti-plus"></i>
            </button>
          </chart-card>
        </div> -->
    </div>

    <!-- <div class="row">
      <div class="col-lg-3 col-sm-6">
        <circle-chart-card :percentage="70"
                           title="Dashboard"
                           description="Monthly sales target"
                           color="blue">
        </circle-chart-card>
      </div>

      <div class="col-lg-3 col-sm-6">
        <circle-chart-card :percentage="34"
                           title="Orders"
                           description="Completed"
                           color="green">
        </circle-chart-card>
      </div>

      <div class="col-lg-3 col-sm-6">
        <circle-chart-card :percentage="62"
                           title="New Visitors"
                           description="Out of total number"
                           color="orange">
        </circle-chart-card>
      </div>

      <div class="col-lg-3 col-sm-6">
        <circle-chart-card :percentage="10"
                           title="Subscriptions"
                           description="Monthly newsletter"
                           color="brown">
        </circle-chart-card>
      </div>
    </div> -->

  </div>
</template>
<script>
  import CircleChartCard from 'src/components/UIComponents/Cards/CircleChartCard.vue'
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
  import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'
  import Loading from 'src/components/Dashboard/Layout/LoadingMainPanel.vue'

  const WorldMap = () => ({
    component: import('./../Maps/WorldMap.vue'),
    loading: Loading,
    delay: 200
  })

  export default {
    components: {
      StatsCard,
      ChartCard,
      CircleChartCard,
      WorldMap
    },
    /**
     * Chart data used to render stats, charts. Should be replaced with server data
     */
    data () {
      return {
        statsCards: [
          {
            type: 'warning',
            icon: 'ti-server',
            title: 'Capacity',
            value: '105GB',
            footerText: 'Updated now',
            footerIcon: 'ti-reload'
          },
          {
            type: 'success',
            icon: 'ti-wallet',
            title: 'Revenue',
            value: '$1,345',
            footerText: 'Last day',
            footerIcon: 'ti-calendar'
          },
          {
            type: 'danger',
            icon: 'ti-pulse',
            title: 'Errors',
            value: '23',
            footerText: 'In the last hour',
            footerIcon: 'ti-timer'
          },
          {
            type: 'info',
            icon: 'ti-twitter-alt',
            title: 'Followers',
            value: '+45',
            footerText: 'Updated now',
            footerIcon: 'ti-reload'
          }
        ],
        earningsChart: {
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June'],
            series: [
              [230, 340, 400, 300, 570, 500, 800]
            ]
          },
          options: {
            showPoint: false,
            lineSmooth: true,
            height: '210px',
            axisX: {
              showGrid: false,
              showLabel: true
            },
            axisY: {
              offset: 40,
              showGrid: false
            },
            low: 0,
            high: 'auto',
            classNames: {
              line: 'ct-line ct-green'
            }
          }
        }

      }
    }
  }

</script>
<style>

</style>
