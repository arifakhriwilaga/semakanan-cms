<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="title pull-left">{{title}}</h4>
    </div>
    <div class="col-md-12 card">
      <div class="card-header">
        <div class="category"></div>
      </div>
      <div class="card-content row">
          <div class="col-md-6">
            ramdani
          </div>
        <div class="col-md-6">
            kasep
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
        propsToSearch: ['total_payment'],
        tableColumns: [
          {
            prop: 'address.data.address',
            label: 'Alamat',
            minWidth: 250
          },
          {
            prop: 'waktu_kirim',
            label: 'Waktu Kirim',
            minWidth: 100
          },
          {
            prop: 'tanggal_kirim',
            label: 'Tanggal Kirim',
            minWidth: 100
          },
          {
            prop: 'total_price',
            label: 'Total Harga',
            minWidth: 100
          },
          {
            prop: 'total_m_price',
            label: 'Total M Harga',
            minWidth: 100
          },
          {
            prop: 'status.data.status',
            label: 'Status',
            minWidth: 100
          },
          {
            prop: 'rating',
            label: 'Rating',
            minWidth: 100
          },
          {
            prop: 'message',
            label: 'Pesan',
            minWidth: 200
          }
        ],
        tableData: [],
        title: '',
        meta_pagination: ''
      }
    },
    methods: {
      changeState(row) {
        axios.put(`/api/transactions/${this.$router.currentRoute.params.id}/${row.id}`).then(res => {
            this.$notify({
                component: {
                    template: `<span>${res.data.meta.message}</span>`
                },
                icon: 'ti-alert',
                horizontalAlign: 'right',
                verticalAlign: 'top',
                type: 'success'
            })
            this.getList()
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
      cancel(row) {
        axios.put(`/api/transactions/${row.id}/cancel`).then(res => {
            this.$notify({
                component: {
                    template: `<span>${res.data.meta.message}</span>`
                },
                icon: 'ti-alert',
                horizontalAlign: 'right',
                verticalAlign: 'top',
                type: 'success'
            })
            this.getList()
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
      getList() {
          axios.get(`/api/transactions/${this.$router.currentRoute.params.id}`).then(res => {
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
