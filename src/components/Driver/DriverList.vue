<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="title pull-left">Driver</h4>
      <!-- <p class="category"></p> -->
    </div>
    <div class="col-md-12 card">
      <div class="card-header">
        <div class="card-title"><h4 style="margin-top:10px;margin-bottom:-15px">Daftar Driver</h4></div>
      </div>
      <div class="card-content row">
          <div class="col-sm-12">
            <hr>
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
                :min-width="65"
                fixed="right"
                label="Actions">
                <template slot-scope="props">
                  <i style="padding-left: 0px;padding-right: 10px;font-size: 22px;margin-top: 1px;" class="el-icon-delete btn btn-simple btn-lg btn-danger btn-icon remove" @click="handleDelete(props.$index, props.row)"></i>
                  <!-- <i style="padding-left:0px;padding-right:0px;font-size: 22px;margin-top: 1px;" class="el-icon-edit-outline btn btn-simple btn-lg btn-info btn-icon"  @click="handleShow(props.$index, props.row)"></i> -->
                  <i style="padding-left:0px;padding-right:0px;font-size: 22px;margin-top: 1px;" class="el-icon-edit-outline btn btn-simple btn-lg btn-info btn-icon"  @click="underConstruction()"></i>
                </template>
              </el-table-column>

            </el-table>
            <pagination @paginate="page($event)" :pagination="pagination"></pagination>
          </div>
      </div>
    </div>

    <spinner :showSpinner="statusSpinner" :class="'spinner-dashboard'"></spinner>
  </div>
</template>
<script>
  import axios from 'axios'
  import Pagination from 'src/components/Base/Pagination.vue'
  import swal from 'sweetalert2'

  export default{
    components: {Pagination, swal},
    data(){
      return {
        statusSpinner: false,
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
        tableColumns: [
        // {
        //   prop: 'id',
        //   label: 'ID',
        //   minWidth: 50,
        // },
        {
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
    },
    created(){
      this.getDrivers();
    },
    methods: {
      getDrivers(){
        this.statusSpinner = true;
        this.tableData = [];
        axios.get('/api/drivers').then(resp=>{
          if (resp.status==200){
            this.statusSpinner = false;
            this.tableData = resp.data.data;
            this.pagination = resp.data.meta.paging;
          }
        }).catch(err => {
          this.statusSpinner = false;
          this.showModalError();
        });
      },
      handleDelete(index, row){
        swal({
          title: 'Apakah anda yakin?',
          text: 'Driver akan dihapus.',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ya, hapus!',
          cancelButtonText: 'Tidak, simpan!',
          confirmButtonClass: 'btn btn-success btn-fill',
          cancelButtonClass: 'btn btn-danger btn-fill',
          buttonsStyling: false
        }).then(() => {
          axios.delete('/api/drivers/' + row.id).then((res) => {
            if (res.status==204){
              this.getDrivers();
            }

          }).catch(err => {
            this.statusSpinner = false;
            this.showModalError();
          })
        }, function (dismiss) {
          // this code dismiss condition          
        })
      },
      handleShow(){},
      showModalError(){
        swal({
          title: 'Terjadi kesalahan',
          text: 'Retry request',
          type: 'error',
          confirmButtonClass: 'btn btn-info btn-fill',
          cancelButtonClass: 'btn btn-danger btn-fill',
          showCancelButton: true,
          buttonsStyling: true,
          confirmButtonText: 'Ok',
          cancelButtonText: 'Cancel',
        }).then(() => {
        
          this.getDrivers();
        
        }, function (dismiss) {
          // this code dismiss condition
        });
      },
      underConstruction() {
        alert('under construction')
      }
    }
    
  }
</script>
