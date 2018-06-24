<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="title pull-left">Pengguna</h4>
      <button class="btn btn-primary pull-right" @click="createUser()" style="margin-bottom: 15px">Tambah Pengguna</button>
    </div>
    <div class="col-md-12 card">
      <div class="card-header">
        <div class="category">Extended tables</div>
      </div>
      <div class="card-content row">
        <div class="col-sm-6">
          <el-select
            class="select-default"
            v-model="pagination.perPage"
            placeholder="Per page">
            <el-option
              class="select-default"
              v-for="item in pagination.perPageOptions"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
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
                    :data="queriedData"
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
                <a class="btn btn-simple btn-xs btn-warning btn-icon edit" @click="handleEdit(props.row)"><i class="ti-pencil-alt"></i></a>
                <a class="btn btn-simple btn-xs btn-danger btn-icon remove"  @click="handleDelete(props.row)"><i class="ti-close"></i></a>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="col-sm-6 pagination-info">
          <p class="category">Showing {{from + 1}} to {{to}} of {{total}} entries</p>
        </div>
        <div class="col-sm-6">
          <p-pagination class="pull-right"
                        v-model="pagination.currentPage"
                        :per-page="pagination.perPage"
                        :total="pagination.total">
          </p-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Table, TableColumn, Select, Option} from 'element-ui'
  import PPagination from 'src/components/UIComponents/Pagination.vue'
  import users from 'src/api/users'
  import swal from 'sweetalert2'
  import axios from 'axios'
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Select)
  Vue.use(Option)
  export default{
    components: {
      PPagination
    },
    created() {
      this.getList()
    },
    computed: {
      pagedData () {
        return this.tableData.slice(this.from, this.to)
      },
      /***
       * Searches through table data and returns a paginated array.
       * Note that this should not be used for table with a lot of data as it might be slow!
       * Do the search and the pagination on the server and display the data retrieved from server instead.
       * @returns {computed.pagedData}
       */
      queriedData () {
        if (this.tableData) {
          this.pagination.currentPage = this.meta_pagination.current_page;
          this.pagination.perPage = this.meta_pagination.per_page;
          this.pagination.total = this.meta_pagination.total;
          if (!this.searchQuery) {
            this.pagination.total = this.tableData.length
            return this.pagedData
          }
          let result = this.tableData
            .filter((row) => {
              let isIncluded = false
              for (let key of this.propsToSearch) {
                let rowValue = row[key].toString()
                if (rowValue.includes && rowValue.includes(this.searchQuery)) {
                  isIncluded = true
                }
              }
              return isIncluded
            })
          this.pagination.total = result.length
          return result.slice(this.from, this.to)
        }
      },
      to () {
        let highBound = this.from + this.pagination.perPage
        if (this.total < highBound) {
          highBound = this.total
        }
        return highBound
      },
      from () {
        return this.pagination.perPage * (this.pagination.currentPage - 1)
      },
      total () {
        if (this.tableData) {
          this.pagination.total = this.tableData.length
          return this.tableData.length
        } else {
          return 0
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
        propsToSearch: ['name', 'email'],
        tableColumns: [
          {
            prop: 'name',
            label: 'Nama',
            minWidth: 200
          },
          {
            prop: 'email',
            label: 'Email',
            minWidth: 200
          },
          {
            prop: 'phone',
            label: 'No. Telepon',
            minWidth: 150
          },
          {
            prop: 'fcm_token',
            label: 'FCM Token',
            minWidth: 200
          },
          {
            props: 'activate_token',
            label: 'Activate Token',
            minWidth: 150
          }
        ],
        tableData: [],
        title: '',
        meta_pagination: ''
      }
    },
    methods: {
      createUser() {
        this.$router.push({name: 'user-create'})
      },
      handleEdit(row) {
        this.$router.push({name: 'user-edit', params: {
            id: row.id
        }})
      },
      handleDelete(row) {
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
                axios.delete(`http://apiadmin.portalsekampus.id/public/api/user/${row.id}`).then((res) => {
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
          // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
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
      getList() {
          axios.get(`http://apiadmin.portalsekampus.id/public/api/user`).then(res => {
              this.title = res.data.meta.message;
              this.tableData = res.data.data;
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
      }
    }
  }
</script>
<style>
</style>
