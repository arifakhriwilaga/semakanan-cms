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
        <div class="col-sm-4">
          <button class="btn btn-primary btn-fill" @click="createMerchant()">Tambah Merchant</button>
        </div>

        <div class="col-sm-4">
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
              :min-width="180"
              fixed="right"
              label="Actions">
              <template slot-scope="props">
                <p-checkbox v-model="props.row.info.data.is_open" @change="alert('hi')">Buka</p-checkbox>
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
  import axios from 'axios'
  import Pagination from 'src/components/Base/Pagination.vue'

  export default{
    components:{
      Pagination
    },
    created(){
      this.getFoods();
    },
    data(){
      return{
        tableData: [],
        pagination: null,
        tableColumns: [
          {
            prop: 'id',
            label: 'ID',
            minWidth: 50
          },
          {
            prop: 'name',
            label: 'Name',
            minWidth: 200
          },
          {
            prop: 'price',
            label: 'Price',
            minWidth: 200
          },
          {
            prop: 'm_price',
            label: 'M Price',
            minWidth: 150
          },
          {
            prop: 'type',
            label: 'Type',
            minWidth: 125
          },
          {
            prop: 'image',
            label: 'Image',
            minWidth: 125
          }
        ],
      }
    },
    methods:{
      getFoods(params=null, path=null){
        axios.get('/api/foods').then((resp)=>{
          if (resp.status==200){
            this.tableData = resp.data.data;
            this.pagination = resp.data.meta.paging;
          }
        })
      }
    }
  }
</script>
