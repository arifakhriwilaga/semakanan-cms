<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="title pull-left">Helpdesk Kost</h4>
    </div>

    <div class="col-md-12 card">
      <div class="card-header">
        <div class="card-title"><h4 style="margin-top:10px;margin-bottom:-15px">Daftar Kost</h4></div>
      </div>
      <div class="card-content row">
        <div class="col-sm-12">
          <hr>
          <button class="btn btn-primary" @click="createKost()" style="margin-bottom:15px">Tambah</button>
          <div class="pull-right" style="margin-right:5px;margin-bottom:15px">
              <input @keyup.enter="search" type="search" placeholder="Cari Nama Kost" aria-controls="datatables" class="form-control input-sm">
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
              :min-width="45"
              fixed="right"
              label="Actions">
              <template slot-scope="props">
                <!-- {{props.row.info.description}} -->
                <i style="padding-left: 10px;padding-right: 10px;font-size: 22px;margin-top: 1px;" class="el-icon-delete btn btn-simple btn-lg btn-danger btn-icon remove" @click="handleDelete(props.$index, props.row)"></i>
                <i style="padding-left:0px;padding-right:0px;font-size: 22px;margin-top: 1px;" class="el-icon-edit-outline btn btn-simple btn-lg btn-info btn-icon"  @click="handleShow(props.$index, props.row)"></i>
                <!-- <p-checkbox v-model="props.row.info.is_open" disabled>Buka</p-checkbox> -->
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
      this.getKost();
    },
    watch:{
      "switches.defaultOn": function(newVal, oldVal){
      },
      filterStore: function(newVal, oldVal){
        switch (newVal){
          case "all" : this.getKost(); break;
          // case "opened": this.getKost(null, "/api/merchants/opened");break;
          // case "closed": this.getKost(null, "/api/merchants/closed");break;
          default: this.getKost(); break;
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
        }],
        filterStore: 'all',
        tableColumns: [
          {
            prop: 'name',
            label: 'Nama',
            minWidth: 100
          },
          {
            prop: 'address',
            label: 'Alamat',
            minWidth: 300
          }
        ],
        tableData: []
      }
    },
    methods: {
      handleShow(index, row) {
        this.$router.push({name: 'helpdesk-kost-edit', params: {
          id: row.id
        }})
      },
      page(val) {
        this.getKost({}, this.pagination[val]);
      },
      search(event) {
        this.getKost({'field': 'name','search': event.target.value});
      },
      createKost() {
        // alert('hallo guys')
        this.$router.push({ name: 'helpdesk-kost-create'})
      },
      getKost(params=null, path=null){
        if (path==null){
          path='/api/helpdesk/kosts';
        }
        this.statusSpinner = true;
        this.tableData = [];
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
      // handleTop (index, row) {
      //   this.$router.push({ name: 'merchant-top-create', params: {id: row.id}});
      // },
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
          this.statusSpinner = true;
          new Promise((resolve, reject) => {
            axios.delete(`/api/helpdesk/kosts/${row.id}`).then((res) => {
                this.statusSpinner = false;
                swal({
                title: 'Terhapus!',
                text: 'Data berhasil terhapus.',
                type: 'success',
                confirmButtonClass: 'btn btn-success btn-fill',
                buttonsStyling: false
                })
                this.getKost()
                // resolve();
            }).catch((err) => {
              this.statusSpinner = false;
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
          // this code dismiss condition
        })
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
        
          this.getKost();
        
        }, function (dismiss) {
          // this code dismiss condition
        });
        
      }
    }
  }
</script>
<style>
</style>
