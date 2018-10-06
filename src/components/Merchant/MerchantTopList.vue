<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="title pull-left">Merchant Teratas</h4>
      <!-- <p class="category"></p> -->
    </div>
    <div class="col-md-12 card">
      <div class="card-header">
        <div class="card-title"><h4 style="margin-top:10px;margin-bottom:-15px">Daftar Merchant Teratas</h4></div>
      </div>
      <div class="card-content row">
        <div class="col-sm-12">
          <hr>
          <button class="btn btn-primary" @click="createMerchantTop()" style="margin-bottom:15px">Tambah</button>
        </div>

        <div class="col-sm-12">
          <el-table class="table-striped" :data="tableData" border>
              <el-table-column label="Name" property="name"></el-table-column>
              <el-table-column label="Priority" property="priority"></el-table-column>
              <el-table-column
                  :min-width="120"
                  fixed="right"
                  label="Actions">
                  <template slot-scope="props">
                    <!-- <a class="btn btn-simple btn-xs btn-info btn-icon like" @click="handleTop(props.$index, props.row)"><i class="ti-heart"></i></a>
                    <a class="btn btn-simple btn-xs btn-warning btn-icon edit" @click="handleEdit(props.$index, props.row)"><i class="ti-pencil-alt"></i></a> -->
                    <i style="padding-left: 0px;padding-right: 10px;font-size: 22px;margin-top: 1px;" class="el-icon-delete btn btn-simple btn-lg btn-danger btn-icon remove" @click="handleDelete(props.$index, props.row)"></i>
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
  import {Table, TableColumn, Select, Option} from 'element-ui'
  import Pagination from 'src/components/Base/Pagination.vue'
  import swal from 'sweetalert2'
  import axios from 'axios'
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Select)
  Vue.use(Option)
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
        tableData: []
      }
    },
    methods: {
      page(val) {
        this.getList({}, this.pagination[val]);
      },

      getList(params=null, path=null) {
        if (path == null) {
          path = `/api/merchants/top`;
        }

        this.tableData = [];
        this.statusSpinner = true;

        axios.get(path, params).then(res => {
          this.statusSpinner = false;
          this.tableData = res.data.data;
          this.pagination  = res.data.meta.paging;

        }).catch(err => {
          this.statusSpinner = false;
          this.showModalError();
        });
      },
      // handleEdit (index, row) {
      //   this.$router.push({ name: 'merchant-edit', params: {id: row.id}});
      // },
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
                axios.delete(`/api/merchants/top/${row.merchant_id}`).then((res) => {
                    swal({
                    title: 'Terhapus!',
                    text: 'Data berhasil terhapus.',
                    type: 'success',
                    confirmButtonClass: 'btn btn-success btn-fill',
                    buttonsStyling: false
                    })
                    this.getList()
                    resolve();
                }).catch((er) => {
                    swal({
                    title: 'Dibatalkan',
                    text: 'Menghapus data dibatalkan',
                    type: 'error',
                    confirmButtonClass: 'btn btn-info btn-fill',
                    buttonsStyling: false
                    })
                    reject();
                })
            })
        }, function (dismiss) {
          if (dismiss === 'cancel') {
            swal({
              title: 'Dibatalkan',
              text: 'Menghapus data dibatalkan',
              type: 'error',
              confirmButtonClass: 'btn btn-info btn-fill',
              buttonsStyling: false
            })
          }
        })

      },
      createMerchantTop() {
          this.$router.push({name: 'merchant-top-create'})
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
        
      }
    }
  }
</script>
<style>
</style>
