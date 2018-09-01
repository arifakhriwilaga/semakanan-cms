<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="title pull-left">{{title}}</h4>
    </div>
    <div class="col-md-12 card">
      <div class="card-header">
        <div class="category">History</div>
      </div>
      <div class="card-content row">
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
                <a class="btn btn-simple btn-xs btn-info" @click="detail(props.$index, props.row)">Detail</a>
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
  import Pagination from 'src/components/Base/Pagination.vue'
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
        pagination: {
        },
        tableColumns: [
          {
            prop: 'total_payment',
            label: 'Total Pembayaran',
            minWidth: 250
          },
          {
            prop: 'cash',
            label: 'Cash',
            minWidth: 200
          },
          {
            prop: 'status',
            label: 'Status',
            minWidth: 200
          }
        ],
        tableData: [],
        title: '',
      }
    },
    methods: {
      detail(index, row) {
        this.$router.push({name: 'history-detail', params: {id: row.id}})
      },
      getList() {
          axios.get(`/api/histories`).then(res => {
              this.tableData = res.data.data;
              this.pagination  = res.data.paging;
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
