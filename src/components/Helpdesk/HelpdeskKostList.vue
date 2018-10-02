<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="title pull-left">Kost</h4>
    </div>

    <div class="col-md-12 card">
      <div class="card-header">
        <div class="category">Daftar Kost</div>
      </div>
      <div class="card-content row">
        <div class="col-sm-4" style="margin-bottom: 15px">
          <button class="btn btn-primary btn-fill" @click="createKost()">Tambah Kost</button>
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
              :min-width="80"
              fixed="right"
              label="Actions">
              <template slot-scope="props">
                {{props.row.info.description}}
                <p-checkbox v-model="props.row.info.is_open" disabled>Buka</p-checkbox>
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
            minWidth: 200
          },
          {
            prop: 'address',
            label: 'Alamat',
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
        this.getKost({}, this.pagination[val]);
      },
      search(event) {
        this.getKost({'name': event.target.value});
      },
      createKost() {
        // alert('hallo guys')
        this.$router.push({ name: 'helpdesk-kost-create'})
      },
      getKost(params=null, path=null){
        if (path==null){
          path='/api/kosts';
        }
        axios.get(path, {params:params} ).then((resp) => {
          if (resp.status == 200) {
            this.tableData = resp.data.data;
            this.pagination  = resp.data.meta.paging;
          }
        })
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
          this.$store.dispatch('merchantDrop', row).then((res) => {
          }).catch(er => console.log(er))
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
      handleShow(index, row) {
        this.$router.push({name: 'kost-edit', params: {
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
