<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="title pull-left">Merchant</h4>
      <!-- <p class="category"></p> -->
    </div>
    <div class="col-md-12 card">
      <div class="card-header">
        <div class="card-title"><h4 style="margin-top:10px;margin-bottom:-15px">Daftar Merchant</h4></div>
      </div>
      <div class="card-content row">
        <div class="col-sm-12">
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
        </div>
        <div class="col-sm-12">
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
                <p-checkbox v-model="props.row.info.is_open" @change="alert('hi')">Buka</p-checkbox>
                <a class="btn btn-simple btn-xs btn-danger btn-icon remove"  @click="handleDelete(props.$index, props.row)"><i class="ti-close"></i></a>
                <a class="btn btn-simple btn-xs btn-info btn-icon"  @click="handleShow(props.$index, props.row)"><i class="ti-arrow-right"></i></a>
              </template>
            </el-table-column>
          </el-table>
          <pagination @paginate="page($event)" :pagination="pagination"></pagination>
        </div>
      </div>
    </div>
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
      this.getMerchants();
    },
    watch:{
      "switches.defaultOn": function(newVal, oldVal){
      },
      filterStore: function(newVal, oldVal){
        switch (newVal){
          case "all" : this.getMerchants(); break;
          case "opened": this.getMerchants(null, "/api/merchants?is_open=true");break;
          case "closed": this.getMerchants(null, "/api/merchants?is_open=false");break;
          default: this.getMerchants(); break;
        }
      }
    },
    data () {
      return {
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
            prop: 'name',
            label: 'Nama',
            minWidth: 200
          },
          {
            prop: 'owner',
            label: 'Pemilik',
            minWidth: 200
          },
          {
            prop: 'address',
            label: 'Alamat',
            minWidth: 200
          },
          {
            prop: 'phone',
            label: 'No. Telepon',
            minWidth: 150
          },
          {
            prop: 'open_time',
            label: 'Waktu Buka',
            minWidth: 125
          },
          {
            prop: 'close_time',
            label: 'Waktu Tutup',
            minWidth: 125
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
        this.getMerchants({}, this.pagination[val]);
      },
      search(event) {
        this.getMerchants({'name': event.target.value});
      },
      createMerchant() {
        this.$router.push({ name: 'merchant-create'})
      },
      getMerchants(params=null, path=null){
        if (path==null){
          path='/api/merchants';
        }
        axios.get(path, {params:params} ).then((resp) => {
          if (resp.status == 200) {
            this.tableData = resp.data.data;
            this.pagination  = resp.data.meta.paging;
          }
        })
      },
      handleTop (index, row) {
        this.$router.push({ name: 'merchant-top-create', params: {id: row.id}});
      },
      handleEdit (index, row) {
        this.$router.push({ name: 'merchant-edit', params: {id: row.id}});
      },
      handleDelete (index, row) {
        swal({
          title: 'Apakah anda yakin?',
          text: 'Data tidak akan dapat dikembalikan lagi.',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ya, hapus!',
          cancelButtonText: 'Tidak, simpan!',
          confirmButtonClass: 'btn btn-success btn-fill',
          cancelButtonClass: 'btn btn-danger btn-fill',
          buttonsStyling: false
        }).then(() => {
          new Promise((resolve, reject) => {
                // axios.delete(`merchants/${row.id}`).then((res) => {
                axios.delete(`/api/merchants/${row.id}`).then((res) => {
                    swal({
                    title: 'Terhapus!',
                    text: 'Data berhasil terhapus.',
                    type: 'success',
                    confirmButtonClass: 'btn btn-success btn-fill',
                    buttonsStyling: false
                    })
                    this.getMerchants()
                    // resolve();
                }).catch((err) => {
                  console.log(err);
                    swal({
                    title: 'Terjadi kesalahan',
                    text: 'Menghapus data dibatalkan',
                    type: 'error',
                    confirmButtonClass: 'btn btn-info btn-fill',
                    buttonsStyling: false
                    })
                    reject();
                })
            })
        }, function (dismiss) {
        })
      },
      handleShow(index, row) {
        this.$router.push({name: 'merchant-edit', params: {
          id: row.id
        }})
      },
      confirm(row){
        swal({
          title: 'Apakah anda yakin?',
          text: 'Toko akan buka / tutup',
          type: 'warning',
          showCancelButton: true,
          confirmButtonClass: 'btn btn-success btn-fill',
          cancelButtonClass: 'btn btn-danger btn-fill',
          confirmButtonText: 'Yes!',
          buttonsStyling: false
        }).then(function () {
          // let service = orderService.changeState(row.id, {
          //   'order_status': row.order_status
          // });
          // service.then(response => {
          //   if (response.status == 200) {
          //     swal({
          //       title: 'Success!',
          //       text: 'Status Order: ' + row.order_status,
          //       type: 'success',
          //       confirmButtonClass: 'btn btn-success btn-fill',
          //       buttonsStyling: false
          //     }, function () {
          //       this.getOrders();
          //     });
          //   }
          // });
        }).catch(()=>{
          // this.getOrders();
        });
      },
    }
  }
</script>
<style>
</style>
