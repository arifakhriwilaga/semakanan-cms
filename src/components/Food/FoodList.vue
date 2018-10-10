<template>
    <div class="row">
    <div class="col-md-12">
      <h4 class="title pull-left">Makanan</h4>
      <!-- <p class="category"></p> -->
    </div>
    <div class="col-md-12 card">
      <div class="card-header">
        <div class="card-title"><h4 style="margin-top:10px;margin-bottom:-15px">Daftar Makanan</h4></div>
      </div>
      <div class="card-content row">
        <div class="col-sm-12">
          <hr>
          <button class="btn btn-primary" @click="createFood()">Tambah</button>

          <div class="pull-right">
            <label>
              <input @keyup.enter="search" type="search" placeholder="Cari Nama Makanan"
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
              :min-width="120"
              prop="total_payment"
              label="Total Pembayaran">
              <template slot-scope="props">
                {{ formatPrice('id', props.row.price) }}
              </template>
            </el-table-column>
            <el-table-column
              :min-width="120"
              prop="cash"
              label="Cash">
              <template slot-scope="props">
                {{ formatPrice('id', props.row.m_price) }}
              </template>
            </el-table-column>
            <el-table-column :min-width="55"
              prop="type"
              label="Tipe">
              <template slot-scope="props">
                {{ props.row.type }}
                <!-- <img :src="props.row.image"> -->
              </template>
            </el-table-column>
            <el-table-column :min-width="50">
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
                <i style="padding-left:0px;padding-right:0px;font-size: 22px;margin-top: 1px;" class="el-icon-edit-outline btn btn-simple btn-lg btn-info btn-icon"  @click="handleShow(props.$index, props.row)"></i>
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
    components:{
      Pagination
    },
    created(){
      this.getFoods();
    },
    data(){
      return{
        statusSpinner: false,
        tableData: [],
        pagination: {},
        tableColumns: [
          // {
          //   prop: 'id',
          //   label: 'ID',
          //   minWidth: 70
          // },
          {
            prop: 'merchant.name',
            label: 'Merchant',
            minWidth: 200

          },
          {
            prop: 'name',
            label: 'Name',
            minWidth: 200
          },
          // {
          //   prop: 'price',
          //   label: 'Price',
          //   minWidth: 200
          // },
          // {
          //   prop: 'm_price',
          //   label: 'M Price',
          //   minWidth: 150
          // },
          // {
          //   prop: 'type',
          //   label: 'Type',
          //   minWidth: 125
          // }
        ],
      }
    },
    methods:{
      search(event) {
        this.getFoods({'field': 'name','search': event.target.value});
      },
      page(val) {
        this.getFoods({}, this.pagination[val]);
      },
      getFoods(params=null, path=null){
        if (path==null){
          path='/api/foods';
        }
        this.tableData = [];
        this.statusSpinner = true;
        axios.get(path, {params:params} ).then((resp)=>{
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
            swal({
              title: 'Terhapus!',
              text: 'Data berhasil terhapus.',
              type: 'success',
              confirmButtonClass: 'btn btn-success btn-fill',
              buttonsStyling: false
            });
            this.getFoods();
          
          }).catch(err=>{
            
            swal({
              title: 'Terjadi kesalahan',
              text: 'Menghapus data dibatalkan',
              type: 'error',
              confirmButtonClass: 'btn btn-info btn-fill',
              buttonsStyling: false
            })
            reject();
            
          })
        }, function (dismiss) {
          // this code dismiss condition
          // if (dismiss === 'cancel') {
          //   swal({
          //     title: 'Dibatalkan',
          //     text: 'Menghapus data dibatalkan',
          //     type: 'error',
          //     confirmButtonClass: 'btn btn-info btn-fill',
          //     buttonsStyling: false
          //   })
          // }
        })
      },
      
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
        
          this.getFoods();
        
        }, function (dismiss) {
          // this code dismiss condition
        });
      },
      formatPrice(type, value) {
        var format = '';

        switch(type) {
          case 'id':
              format = 'Rp. '
              break;
          case 'en':
              format = '$ '
              break;
          default:
              format = ''
        }
        let val = (value/1).toFixed(2).replace('.', ',')
        return format + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
    }
  }
</script>
