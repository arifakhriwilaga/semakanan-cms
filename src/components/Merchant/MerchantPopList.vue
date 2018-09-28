<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <h4 class="title pull-left" style="margin: 0">List Merchant Populer List</h4>
                        </div>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                            <button class="btn btn-primary pull-right" @click="createMerchantPop">Tambah Merchant Populer</button>
                        </div>
                    </div>
                    <p class="category">Daftar Merchant Populer </p>
                </div>
                <div class="card-content table-responsive table-full-width">
                <el-table class="table-striped" :data="tableData">
                    <el-table-column label="Name" property="name"></el-table-column>
                    <el-table-column label="Priority" property="priority"></el-table-column>
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
                <pagination @paginate="page($event)" :pagination="pagination"></pagination>

                </div>
            </div>
        </div>
    </div>

</template>
<script>
  import Vue from 'vue'
  import {Table, TableColumn, Select, Option} from 'element-ui'
  import Pagination from 'src/components/Base/Pagination.vue'
  import swal from 'sweetalert2'
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
        tableData: []
      }
    },
    methods: {
      page(val) {
        this.getList({}, this.pagination[val]);
      },
      getList(params=null, path=null) {
          if (path==null){
            path='/api/merchants/pop';
          }
          axios.get(path, params).then(res => {
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
                axios.delete(`/api/merchants/pop/${row.merchant_id}`).then((res) => {
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
                    });
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
      createMerchantPop() {
          this.$router.push({name: 'merchant-pop-create'})
      }
    }
  }
</script>
<style>
</style>
