<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="title pull-left">Merchant</h4>
      <!-- <p class="category"></p> -->
    </div>
    <div class="col-md-12 card">
      <div class="card-header">
        <div class="category">Daftar Merchant</div>
      </div>
      <div class="card-content row">
        <div class="col-sm-6">
          <button class="btn btn-primary btn-fill" @click="createMerchant()">Tambah Merchant</button>
        </div>
        <div class="col-sm-6">
          <div class="pull-right">
            <label>
              <input @keyup.enter="search" type="search" placeholder="Search records"
                                              aria-controls="datatables" class="form-control input-sm">
            </label>
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
              :min-width="120"
              fixed="right"
              label="Actions">
              <template slot-scope="props">
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
  let SERVER = process.env.HOST_URL;


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
    data () {
      return {
        pagination: {
        },
        searchQuery: '',
        propsToSearch: ['name', 'owner', 'open_time'],
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
      page(val) {
        this.getMerchants({}, this.pagination[val]);
      },
      search(event) {
        this.getMerchants({'name': event.target.value});
      },
      createMerchant() {
        this.$router.push({ name: 'merchant-create'})
      },
      getMerchants(params=null){
        console.log(params);
        axios.get(SERVER + '/api/merchants', {params:params} ).then((resp) => {
          if (resp.status == 200) {
            this.tableData = resp.data.data;
            this.pagination  = resp.data.paging;
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
          this.$store.dispatch('merchantDrop', row).then((res) => {
            // this.queriedData;
            // this.getMerchants();
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

        // let indexToDelete = this.tableData.findIndex((tableRow) => tableRow.id === row.id)
        // if (indexToDelete >= 0) {
        //   this.tableData.splice(indexToDelete, 1)
        // }
      },
      handleShow(index, row) {
        this.$router.push({name: 'merchant-edit', params: {
          id: row.id
        }})
      }
    }
  }
</script>
<style>
</style>
