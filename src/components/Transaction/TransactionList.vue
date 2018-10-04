<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="title pull-left">Transaksi</h4>
    </div>
    <div class="col-md-12 card">
      <div class="card-header">
        <div class="card-title"><h4 style="margin-top:10px;margin-bottom:-15px">Daftar Transaksi</h4></div>
      </div>
      <div class="card-content row">
        <div class="col-sm-12">
          <hr>
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
        pagination: {
        },
        tableColumns: [
          {
            prop: 'user.name',
            label: 'User',
            minWidth: 150
          },
          {
            prop: 'total_payment',
            label: 'Total Pembayaran',
            minWidth: 150
          },
          {
            prop: 'cash',
            label: 'Cash',
            minWidth: 100
          },
          {
            prop: 'status',
            label: 'Status',
            minWidth: 100
          },
          {
            prop: 'created_at',
            label: 'Created_at',
            minWidth: 100
          },
          {
            prop: 'driver.name',
            label: 'Driver',
            minWidth: 100
          }
        ],
        tableData: [],
        title: '',
        meta_pagination: ''
      }
    },
    methods: {
      page(val) {
        this.getList({}, this.pagination[val]);
      },
      handleShow(index, row) {
        this.$router.push({name: 'transaction-detail', params: {id: row.id}})
      },
      getList() {
          axios.get(`/api/transactions`).then(res => {
              this.tableData = res.data.data;
              this.pagination  = res.data.meta.paging;

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
