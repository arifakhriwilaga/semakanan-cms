<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="title pull-left">Transaksi</h4>
    </div>
    <div class="col-md-12 card">
      <div class="card-header">
        <div class="card-title"><h4 style="margin-top:10px;margin-bottom:-15px">Daftar Transaksi</h4></div>
      </div>
      <div class="card-content row">
        <div class="col-sm-12">
          <hr>
          <el-table class="table-striped"
                    :data="tableData"
                    border
                    style="width: 100%">
            <!-- <el-table-column v-for="column in tableColumns"
                             :key="column.label"
                             :min-width="column.minWidth"
                             :prop="column.prop"
                             :label="column.label">
            </el-table-column> -->
            <el-table-column
              :min-width="150"
              prop="user"
              label="User">
              <template slot-scope="props">
                {{ (props.row.user) ?  props.row.user.name : '-' }}
              </template>
            </el-table-column>
            <el-table-column
              :min-width="110"
              prop="total_payment"
              label="Total Pembayaran">
              <template slot-scope="props">
                {{ formatPrice('id', props.row.total_payment) }}
              </template>
            </el-table-column>
            <el-table-column
              :min-width="100"
              prop="cash"
              label="Cash">
              <template slot-scope="props">
                {{ formatPrice('id', props.row.cash) }}
              </template>
            </el-table-column>
            <el-table-column
              :min-width="65"
              prop="status"
              label="Status">
              <template slot-scope="props">
                {{ props.row.status }}
              </template>
            </el-table-column>
            <el-table-column
              :min-width="56"
              prop="created_at"
              label="Tanggal Transaksi">
              <template slot-scope="props">
                <span style="font-size:10.5px">{{ props.row.created_at | moment("DD-MM-YYYY") }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :min-width="150"
              prop="driver"
              label="Driver">
              <template slot-scope="props">
                {{ (props.row.driver) ?  props.row.driver.name : '-'}}
              </template>
            </el-table-column>
            <el-table-column
              :min-width="50"
              fixed="right"
              label="Actions">
              <template slot-scope="props">
                <!-- <i style="padding-left: 0px;padding-right: 10px;font-size: 22px;margin-top: 1px;" class="el-icon-delete btn btn-simple btn-lg btn-danger btn-icon remove" @click="handleDelete(props.$index, props.row)"></i> -->
                <i style="padding-left:0px;padding-right:0px;font-size: 22px;margin-top: 1px;" class="el-icon-edit-outline btn btn-simple btn-lg btn-info btn-icon"  @click="handleShow(props.$index, props.row)"></i>
              </template>
            </el-table-column>
          </el-table>
          <pagination @paginate="page($event)" :pagination="pagination"></pagination>
        </div>
      </div>
    </div>

    <spinner :showSpinner="statusSpinner" :class="'spinner-dashboard'"></spinner>
  </div>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'
  import {Table, TableColumn, Select, Option} from 'element-ui'
  import Pagination from 'src/components/Base/Pagination.vue'

  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(require('vue-moment'));

  export default{
    components: {
      Pagination
    },
    created() {
      this.getList()
    },
    data () {
      return {
        statusSpinner: false,
        pagination: {
        },
        tableColumns: [
          // {
          //   prop: 'user.name',
          //   label: 'User',
          //   minWidth: 150
          // },
          // {
          //   prop: 'total_payment',
          //   label: 'Total Pembayaran',
          //   minWidth: 110
          // },
          // {
          //   prop: 'cash',
          //   label: 'Cash',
          //   minWidth: 100
          // },
          // {
          //   prop: 'status',
          //   label: 'Status',
          //   minWidth: 70
          // },
          // {
          //   prop: 'created_at',
          //   label: 'Tanggal Transaksi',
          //   minWidth: 57
          // },
          // {
          //   prop: 'driver.name',
          //   label: 'Driver',
          //   minWidth: 150
          // }
        ],
        tableData: [],
        title: '',
        meta_pagination: ''
      }
    },
    methods: {
      page(val) {
        this.getList({}, this.pagination[val]);
      },
      handleShow(index, row) {
        this.$router.push({name: 'transaction-detail', params: {id: row.id}})
      },
      getList() {
        this.tableData = [];
        this.statusSpinner = true;
        axios.get(`/api/transactions`).then(res => {
            this.statusSpinner = false;
            this.tableData = res.data.data;
            this.pagination  = res.data.meta.paging;

        }).catch(err => {
          this.statusSpinner = false;
          this.showModalError();
        });
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
        
          this.getList();
        
        }, function (dismiss) {
          // this code dismiss condition
        });
        
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
    }
  }
</script>
<style>
</style>
