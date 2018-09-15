<template>
  <div class="row card">
    <div class="card-header">

    </div>
    <div class="card-content">
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
              label="ID Image">
              <template slot-scope="props">
                <img :src="props.row.id_image">
              </template>
            </el-table-column>

            <el-table-column
              :min-width="180"
              label="Image">
              <template slot-scope="props">
                <img :src="props.row.image">
              </template>
            </el-table-column>
            <el-table-column
              :min-width="180"
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
</template>
<script>
  import axios from 'axios'
  import Pagination from 'src/components/Base/Pagination.vue'

  export default{
    components: {Pagination},
    created(){
      this.getDrivers();
    },
    methods: {
      getDrivers(){
        axios.get('/api/drivers').then(resp=>{
           if (resp.status==200){
            this.tableData = resp.data.data;
            this.pagination = resp.data.meta.paging;
          }
        });
      },
      handleDelete(){},
      handleShow(){}
    },
    data(){
      return {
        tableData: [],
        driver: {
          id: null,
          name: null,
          address: null,
          id_number: null,
          image: null,
          id_image: null,
          shifts_count: null,
          on_progress: null
        },
        pagination: {},
        tableColumns: [{
          prop: 'id',
          label: 'ID',
          minWidth: 50,
        },{
          prop: 'name',
          label: 'Name',
          minWidth: 75,
        },{
          prop: 'address',
          label: 'Address',
          minWidth: 100,
        },{
          prop: 'on_progress',
          label: 'On Progress',
          minWidth: 75,
        },{
          prop: 'shifts_count',
          label: 'Shifts Count',
          minWidth: 75,
        }],
      }
    }
  }
</script>
