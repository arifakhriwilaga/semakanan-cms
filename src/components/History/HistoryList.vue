<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="title pull-left">History</h4>
      <!-- <p class="category"></p> -->
    </div>
    <div class="col-md-12 card">
      <div class="card-header">
        <div class="card-title"><h4 style="margin-top:10px;margin-bottom:-15px">Daftar History</h4></div>
      </div>
      <div class="card-content row">
        <!-- <div class="col-sm-12">
          <hr>
          <button class="btn btn-primary" @click="createMerchant()">Tambah</button>
          <div class="pull-right">
          Filter
              <el-select
                class="select-primary"
                size="large"
                placeholder="Single Select"
                v-model="filterStore">
                <el-option
                  class="select-success"
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </div>
          <div class="pull-right" style="margin-right:5px;margin-bottom:15px">
              <input @keyup.enter="search" type="search" placeholder="Search records" aria-controls="datatables" class="form-control input-sm">
          </div>
        </div> -->
        <div class="col-sm-12">
          <hr>
          <el-table class="table-striped"
                    :data="tableData"
                    border
                    style="">
            <el-table-column v-for="column in tableColumns"
                             :key="column.label"
                             :min-width="column.minWidth"
                             :prop="column.prop"
                             :label="column.label">
            </el-table-column>
            <el-table-column
              :min-width="180"
              fixed="right"
              label="Actions">
              <template slot-scope="props">
                <!-- <p-checkbox v-model="props.row.info.is_open" @change="alert('hi')">Buka</p-checkbox> -->
                <!-- <a class="btn btn-simple btn-xs btn-danger btn-icon remove"  @click="handleDelete(props.$index, props.row)"><i class="ti-close"></i></a> -->
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
  import swal from 'sweetalert2'


  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Select)
  Vue.use(Option)
  export default{
    components: {
      Pagination
    },
    created() {
      this.getHistories();
    },
    watch:{
      "switches.defaultOn": function(newVal, oldVal){
      },
      filterStore: function(newVal, oldVal){
        switch (newVal){
          case "all" : this.getHistories(); break;
          case "opened": this.getHistories(null, "/api/merchants?is_open=true");break;
          case "closed": this.getHistories(null, "/api/merchants?is_open=false");break;
          default: this.getHistories(); break;
        }
      }
    },
    data () {
      return {
        statusSpinner: false,
        switches: {
         defaultOn: true,
        },
        pagination: {
        },
        options: [{
          value: 'all',
          label: 'All'
        }, {
          value: 'opened',
          label: 'Opened'
        }, {
          value: 'closed',
          label: 'Closed'
        }],
        filterStore: 'all',
        tableColumns: [
          {
            prop: 'total_payment',
            label: 'Total Pembayaran',
            minWidth: 200
          },
          {
            prop: 'cash',
            label: 'Cash',
            minWidth: 200
          },
          {
            prop: 'status',
            label: 'Status',
            minWidth: 200
          }
        ],
        tableData: []
      }
    },
    methods: {
      changeState(event){
        console.log(event);
      },
      page(val) {
        this.getHistories({}, this.pagination[val]);
      },
      search(event) {
        this.getHistories({'name': event.target.value});
      },
      getHistories(params=null, path=null){
        if (path==null){
          path='/api/histories';
        }

        this.tableData = [];
        this.statusSpinner = true;

        axios.get(path, {params:params} ).then((resp) => {
          if (resp.status == 200) {
            this.statusSpinner = false;
            this.tableData = resp.data.data;
            this.pagination  = resp.data.meta.paging;
          }
        }).catch(err => {
          this.statusSpinner = false;
          this.showModalError();
        });
      },
      handleShow(index, row) {
        this.$router.push({name: 'history-detail', params: {
          id: row.id
        }})
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
        
          this.getHistories();
        
        }, function (dismiss) {
          // this code dismiss condition
        });
        
      }
    }
  }
</script>
<style>
</style>
