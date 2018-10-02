<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="title pull-left">{{title}}</h4>
      <button class="btn btn-primary pull-right" @click="toListTransaction()" style="margin-bottom: 15px">List</button>
    </div>
    <div class="col-md-12 card">
      <div class="card-header">
        <h4><b>Order <span class="badge badge-secondary">{{transaction.status}}</span></b> <el-button type="primary" icon="el-icon-edit" class="pull-right" circle @click="toEditTransaction()"></el-button></h4>
      </div>
      <div class="card-content row">
        <div class="col-md-6">
          <h5><b>Customer </b></h5>
          <div class="form-group">
            {{ (transaction.user) ? transaction.user.name : '-'  || '-'}}
          </div>
          <h5><b>Driver </b></h5>
          <div class="form-group">
            {{ (transaction.driver) ? transaction.driver.name : '-'  || '-'}}
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <h6>Tanggal Order</h6>
            {{transaction.created_at | moment("DD-MM-YYYY")}}
          </div>
          <div class="form-group">
            <h6>Pembayaran</h6>
            {{ formatPrice('id', transaction.cash) }}
          </div>
          <div class="form-group">
            <h6>Total Pembayaran</h6>
            {{ formatPrice('id', transaction.total_payment) }}
          </div>
        </div>
        <div class="col-md-12">        
          <hr>
          <div class="row" style="margin:0px">
            <h5 class="pull-left">Daftar Merchant :</h5>
            <el-button type="success" class="pull-right" :name="'process-all'" @click="processAllMerchant()">Process Semua</el-button>
            <el-button type="danger" class="pull-right" :name="'cancel-all'" style="margin-right:5px" @click="cancelAllMerchant()">Cancel Semua</el-button>
          </div>
          <el-collapse class="panel-group">
            <el-collapse-item v-for="(chart, index) in transaction.carts" :key="index" :title="chart.merchant.name" :name="index">
              <div class="card-content">
                <div class="row">
                <div class="col-md-12" style="margin-bottom: 15px">
                  <el-button type="success" class="pull-right" :name="'process'+index" :id="'process'+index" @click="processMerchant(index, chart)">Process</el-button>
                  <el-button type="danger" class="pull-right" :name="'cancel'+index" :id="'process'+index" style="margin-right:5px" @click="cancelMerchant(index, chart)">Cancel</el-button>
                </div>
                <div class="col-md-8 card">
                  <div class="form-group">
                    <h6>Tanggal Kirim</h6>
                    {{chart.tanggal_kirim || '-'}}
                  </div>
                  <div class="form-group">
                    <h6>Waktu Kirim</h6>
                    {{ chart.waktu_kirim | '-' }}
                  </div>
                  <div class="form-group">
                    <h6>Alamat User</h6>
                    {{chart.user_address || '-'}}
                  </div>
                  <div class="form-group">
                    <h6>Message</h6>
                    {{chart.message || '-'}}
                  </div>
                </div>
                
                <div class="col-md-3 card pull-right">
                  <div class="form-group">
                    <h6>Status</h6>
                    <span class="badge badge-secondary">{{chart.status}}</span>
                  </div>
                  <div class="form-group">
                    <h6>Total M Harga</h6>
                    {{ formatPrice('id', chart.total_m_price) || '-'}}
                  </div>
                  <div class="form-group">
                    <h6>Total Harga</h6>
                    {{ formatPrice('id', chart.total_price) || '-'}}
                  </div>
                </div>

                <div class="col-md-12 card">
                  <h5><b>Menu Makanan :</b></h5>
                  <el-table :data="chart.foods" height="250" style="width: 100%">
                    <el-table-column prop="name" label="Nama" width="280">
                    </el-table-column>
                    <el-table-column prop="qty" label="Quantity" width="90">
                    </el-table-column>
                    <el-table-column prop="m_price" label="M Harga" width="120">
                    </el-table-column>
                    <el-table-column prop="price" label="Harga" width="120">
                    </el-table-column>
                    <el-table-column prop="note" label="Catatan">
                    </el-table-column>
                  </el-table>
                </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
   </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Table, TableColumn, Select, Option, Button} from 'element-ui'
  import PPagination from 'src/components/UIComponents/Pagination.vue'
  import users from 'src/api/users'
  import swal from 'sweetalert2'
  import axios from 'axios'
  import * as moment from 'moment';
  // import VueMoment from 'vue-moment'
  // import moment from 'moment-timezone'

  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Button);
  // Vue.use(VueMoment)
  Vue.use(require('vue-moment'));
  Vue.use(moment);
  export default{
    components: {
      PPagination
    },
    created() {
      this.title = 'Detil Transaksi';
      this.getTransaction()
    },
    data () {
      return {
        title: '',
        transaction: {},
        moment: moment
      }
    },
    methods: {
      // get related data
      getTransaction() {
        axios.get(`/api/transactions/${this.$router.currentRoute.params.id}`).then(res => {
            this.transaction = res.data.data;

            this.meta_pagination = res.data.meta.pagination;
        }).catch(err => {
          this.$notify({
              component: {
                  template: `<span>Terjadi kesalahan!</span>`,
              },
              icon: 'ti-alert',
              horizontalAlign: 'right',
              verticalAlign: 'top',
              type: 'danger'
          })
        })
      },

      // others
      toListTransaction() {
        this.$router.push({name: 'transaction-list'})
      },
      toEditTransaction() {
        alert('under construction');
        // this.$router.push({name: 'transaction-edit', params: {id: this.transaction.id}})
      },
      formatPrice(type, value) {
        var format = '';

        switch(type) {
          case 'id':
              format = 'Rp. '
              break;
          case 'en':
              format = '$ '
              break;
          default:
              format = ''
        }
        let val = (value/1).toFixed(2).replace('.', ',')
        return format + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },

      // action
      processAllMerchant(){
        console.log(this.transaction);
      },
      cancelAllMerchant(){
        axios.patch(`/api/transactions/${this.$router.currentRoute.params.id}/cancel`).then(res => {
            this.$notify({
              component: {
                  template: `<span>Transaksi berhasil dibatalkan!</span>`,
              },
              icon: 'ti-alert',
              horizontalAlign: 'right',
              verticalAlign: 'top',
              type: 'success'
          });
          this.$router.reload();
          // this.getTransaction();

            // this.transaction = res.data.data;
            // this.meta_pagination = res.data.meta.pagination;
        }).catch(err => {
          this.$notify({
              component: {
                  template: `<span>Terjadi kesalahan, Transaksi gagal dibatalkan!</span>`,
              },
              icon: 'ti-alert',
              horizontalAlign: 'right',
              verticalAlign: 'top',
              type: 'danger'
          })
          this.$router.reload();
          // this.getTransaction();
        })      
      },
      processMerchant(index, chart) {
        // console.log('index',index);
        // console.log('chart',chart);
      },
      cancelMerchant(index, chart) {
        axios.patch(`/api/transactions/${this.$router.currentRoute.params.id}/cart/${chart.id}/cancel`).then(res => {
            this.$notify({
              component: {
                  template: `<span>Chart berhasil dibatalkan!</span>`,
              },
              icon: 'ti-alert',
              horizontalAlign: 'right',
              verticalAlign: 'top',
              type: 'success'
          });
          // this.$router.reload();
          this.getTransaction();

            // this.transaction = res.data.data;
            // this.meta_pagination = res.data.meta.pagination;
        }).catch(err => {
          this.$notify({
              component: {
                  template: `<span>Terjadi kesalahan, Chart gagal dibatalkan!</span>`,
              },
              icon: 'ti-alert',
              horizontalAlign: 'right',
              verticalAlign: 'top',
              type: 'danger'
          })
          // this.$router.reload();
          this.getTransaction();
        })
      }
    }
  }
</script>
<style>
</style>
