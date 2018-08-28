<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h4 class="title">List Merchant Open List</h4>
                    <p class="category">Menampilkan merchant yang sudah buka </p>
                </div>
                <div class="card-content table-responsive table-full-width">
                <el-table class="table-striped" :data="tableData">
                    <el-table-column label="Name" property="merchant.data.name"></el-table-column>
                    <el-table-column
                        :min-width="120"
                        fixed="right"
                        label="Actions">
                        <template slot-scope="props">
                            <!-- <a class="btn btn-simple btn-xs btn-info btn-icon like" @click="handleTop(props.$index, props.row)"><i class="ti-heart"></i></a>
                            <a class="btn btn-simple btn-xs btn-warning btn-icon edit" @click="handleEdit(props.$index, props.row)"><i class="ti-pencil-alt"></i></a> -->
                            <a class="btn btn-simple btn-xs btn-danger btn-icon remove"  @click="handleDelete(props.$index, props.row)"><i class="ti-close"></i></a>
                        </template>
                    </el-table-column>
                </el-table>

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
        //   var pagination = this.$store.getters.metaMerchants.pagination;
        //   this.pagination.currentPage = pagination.current_page;
        //   this.pagination.perPage = pagination.per_page;
        //   this.pagination.total = pagination.total;
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
        propsToSearch: ['name'],
        tableColumns: [
          {
            prop: 'name',
            label: 'Nama',
            minWidth: 200
          },
          {
            prop: 'priority',
            label: 'Prioritas',
            minWidth: 200
          }
        ],
        tableData: []
      }
    },
    methods: {
      getList() {
          axios.get(`/api/merchants/open`).then(res => {
                this.tableData = res.data.data
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
      createMerchant() {
        // this.$router.push({ name: 'merchant-create'})
      },
      handleTop (index, row) {
        // this.$router.push({ name: 'merchant-top-create', params: {id: row.id}});
      },
      handleEdit (index, row) {
        // this.$router.push({ name: 'merchant-edit', params: {id: row.id}});
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
                axios.put(`/api/merchants/state/${row.id}`).then((res) => {
                    swal({
                    title: 'Terhapus!',
                    text: 'Status berhasil diubah.',
                    type: 'success',
                    confirmButtonClass: 'btn btn-success btn-fill',
                    buttonsStyling: false
                    })
                    this.getList()
                    resolve();
                }).catch((er) => {
                    swal({
                    title: 'Dibatalkan',
                    text: 'Mengubah status dibatalkan',
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

        // let indexToDelete = this.tableData.findIndex((tableRow) => tableRow.id === row.id)
        // if (indexToDelete >= 0) {
        //   this.tableData.splice(indexToDelete, 1)
        // }
      },
    }
  }
</script>
<style>
</style>
