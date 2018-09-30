<template>
    <div class="row">
    <div class="col-md-12">
      <h4 class="title pull-left">Makanan</h4>
      <!-- <p class="category"></p> -->
    </div>
    <div class="col-md-12 card">
      <div class="card-header">
        <div class="category">Daftar Makanan</div>
      </div>
      <div class="card-content row">
        <div class="col-sm-4">
          <button class="btn btn-primary btn-fill" @click="createFood()">Tambah</button>
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
            <el-table-column>
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
  </div>
</template>
<script>
  import axios from 'axios'
  import Pagination from 'src/components/Base/Pagination.vue'
  import swal from 'sweetalert2'

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
            minWidth: 70
          },
          {
            prop: 'merchant.name',
            label: 'merchant',
            minWidth: 200

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
            console.log(this.tableData);
          }
        })
      },
      createFood(){
        this.$router.push({ name: 'food-create'})
      },
      handleShow(index, row){
         this.$router.push({name: 'food-detail', params: {id: row.id}})
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
          axios.delete('/api/foods/' + row.id).then(res=>{
            this.getFoods();
          }).catch(err=>{
            alert(err);
          })
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
      },
    }
  }
</script>
