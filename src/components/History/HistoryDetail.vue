<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="title pull-left">{{title}}</h4>
      <button class="btn btn-primary pull-right" @click="toListHistory()" style="margin-bottom: 15px">List</button>
    </div>

    <div class="col-md-12 card">
      <div class="card-header">
        <h4><b>Order <span class="badge badge-secondary">{{history.status}}</span></b></h4>
      </div>
      <div class="card-content row">
        <div class="col-md-6">
          <h5><b>Customer </b></h5>
          <div class="form-group">
            {{ (history.user) ? history.user.name : '-' }}
          </div>
          <h5><b>Driver </b></h5>
          <div class="form-group">
            {{ (history.driver) ? history.driver.name : '-' }}
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <h6>Tanggal Order</h6>
            {{history.created_at | moment("DD-MM-YYYY")}}
          </div>
          <div class="form-group">
            <h6>Pembayaran</h6>
            {{ formatPrice('id', history.cash) }}
          </div>
          <div class="form-group">
            <h6>Total Pembayaran</h6>
            {{ formatPrice('id', history.total_payment) }}
          </div>
        </div>
        <div class="col-md-12">        
          <hr>
          <div class="row" style="margin:0px">
            <h5 class="pull-left">Daftar Merchant :</h5>
            <div class="col-md-12" v-if="history.carts.length < 1" style="text-align:center"><br>Merchant tidak tersedia</div>
            <!-- <el-button type="success" class="pull-right" :name="'process-all'" @click="processAllMerchant()">Process Semua</el-button> -->
            <!-- <el-button type="danger" class="pull-right" :name="'cancel-all'" style="margin-right:5px" @click="cancelAllMerchant()" v-if="(history.status !== 'Done' && history.status !== 'Canceled' && history.carts.length > 1)">Cancel Semua</el-button> -->
          </div>
          <el-collapse class="panel-group" v-model="statusExpand">
            <el-collapse-item v-for="(cart, index) in history.carts" :key="index" :title="cart.merchant[0].name" :name="index">
              <div class="card-content">
                <div class="row">
                <!-- <div class="col-md-12" style="margin-bottom: 15px"> -->
                  <!-- <el-button type="success" class="pull-right" :name="'process'+index" :id="'process'+index" @click="processMerchant(cart)" v-if="(cart.status !== 'Done' && cart.status !== 'Canceled')">Process</el-button> -->
                  <!-- <el-button type="danger" class="pull-right" :name="'cancel'+index" :id="'process'+index" style="margin-right:5px" @click="cancelMerchant(cart)" v-if="(cart.status !== 'Done' && cart.status !== 'Canceled')">Cancel</el-button> -->
                <!-- </div> -->
                <div class="col-md-8 card">
                  <div class="form-group">
                    <h6>Tanggal Kirim</h6>
                    {{cart.tanggal_kirim || '-'}}
                  </div>
                  <div class="form-group">
                    <h6>Waktu Kirim</h6>
                    {{ cart.waktu_kirim || '-' }}
                  </div>
                  <div class="form-group">
                    <h6>Alamat User</h6>
                    {{cart.user_address || '-'}}
                  </div>
                  <div class="form-group">
                    <h6>Message</h6>
                    {{cart.message || '-'}}
                  </div>
                </div>
                
                <div class="col-md-3 card pull-right">
                  <div class="form-group">
                    <h6>Status</h6>
                    <span class="badge badge-secondary">{{cart.status}}</span>
                  </div>
                  <div class="form-group">
                    <h6>Total M Harga</h6>
                    {{ formatPrice('id', cart.total_m_price)}}
                  </div>
                  <div class="form-group">
                    <h6>Total Harga</h6>
                    {{ formatPrice('id', cart.total_price)}}
                  </div>
                </div>

                <div class="col-md-12 card">
                  <h5><b>Menu Makanan :</b></h5>
                  <!-- <div class="col-md-12" v-if="chart.foods.length < 1" style="text-align:center"><br>Makanan tidak tersedia</div> -->
                  <el-table :data="cart.foods" height="250" style="width: 100%">
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

    <spinner :showSpinner="statusSpinner" :class="'spinner-dashboard'"></spinner>
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
      this.title = 'Detil Histori';
      this.getHistory()
    },
    data () {
      return {
        title: '',
        history: {
          carts: []
        },
        moment: moment,
        statusSpinner: false,
        statusExpand: []
      }
    },
    methods: {
      // get related data
      getHistory() {
        this.statusSpinner = true;
        axios.get(`/api/histories/${this.$router.currentRoute.params.id}`).then(res => {
            this.statusSpinner = false;
            this.history = res.data.data;
            for (let index = 0; index < res.data.data.carts.length; index++) {
              this.statusExpand.push(index);
            }
            
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
      toListHistory() {
        this.$router.push({name: 'history-list'})
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

      showModalError(){
        swal({
          title: 'Terjadi kesalahan',
          text: 'Retry request',
          type: 'error',
          confirmButtonClass: 'btn btn-info btn-fill',
          cancelButtonClass: 'btn btn-danger btn-fill',
          showCancelButton: true,
          buttonsStyling: true,
          confirmButtonText: 'Ok',
          cancelButtonText: 'Cancel',
        }).then(() => {
        
          this.getHistory();
        
        }, function (dismiss) {
          // this code dismiss condition
        });
      }
    }
  }
</script>
<style>
</style>