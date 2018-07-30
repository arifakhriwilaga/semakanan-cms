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
              <input type="search" class="form-control input-sm" placeholder="Search records" v-model="searchQuery" aria-controls="datatables">
            </label>
          </div>
        </div>
        <div class="col-sm-12">
          <el-table class="table-striped"
                    :data="tableData"
                    border
                    style="width: 100%">
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
        </div>
        <div class="col-sm-6 pagination-info">
          <p class="category">Showing {{from}} to {{to}} of {{pagination.total}} entries</p>
        </div>
        <div class="col-sm-6">
          <p-pagination class="pull-right"
                        v-model="pagination.currentPage"
                        :per-page="pagination.perPage"
                        :total="pagination.total"
                        @paginate="paginate"
          >
          </p-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'
  import {Table, TableColumn, Select, Option} from 'element-ui'
  import PPagination from 'src/components/UIComponents/Pagination.vue'
  import users from 'src/api/users'
  import swal from 'sweetalert2'
  let SERVER = process.env.HOST_URL;


  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Select)
  Vue.use(Option)
  export default{
    components: {
      PPagination
    },
    created() {
      this.getMerchants();
    },
    computed: {
      from(){
        return (this.pagination.currentPage * this.pagination.perPage) - this.pagination.perPage + 1;
      },
      to(){
        if ((this.pagination.currentPage * this.pagination.perPage) - this.pagination.perPage <= this.pagination.pageCount ){
          return this.pagination.pageCount;
        }else{
          return this.pagination.perPage;
        }
      }
    },
    data () {
      return {
        pagination: {
          perPage: 0,
          currentPage: 0,
          perPageOptions: [5, 10, 25, 50],
          total: 0
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
      paginate(){
        this.getMerchants({'page': this.pagination.currentPage})
      },
      createMerchant() {
        this.$router.push({ name: 'merchant-create'})
      },
      getMerchants(params=null){
        console.log(params);
        axios.get(SERVER + '/api/merchant', {params:params} ).then((resp) => {
          if (resp.status == 200) {
            this.tableData = resp.data.data;
            let pagination = resp.data.meta.pagination;
            this.pagination.currentPage = pagination.current_page;
            this.pagination.perPage = pagination.per_page;
            this.pagination.total = pagination.total;
            this.pagination.count = pagination.count;
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
        this.$router.push({name: 'merchant-profile', params: {
          id: row.id
        }})
      }
    }
  }
</script>
<style>
</style>
