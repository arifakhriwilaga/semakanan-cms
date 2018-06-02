<template>
    <div class="row">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Kategori UKM</h4>
                    <p class="category"></p>
                </div>
                <div class="card-content">
                    <div class="row">
                        <el-table :data="tableData">
                            <el-table-column prop="id" label="No">

                            </el-table-column>
                            <el-table-column prop="name"
                                             label="Name">
                            </el-table-column>
                            <el-table-column
                                    label="Actions">
                                <template slot-scope="props">
                                    <a class="btn btn-simple btn-warning btn-xs btn-icon edit"
                                       @click="handleEdit(props.$index, props.row)"><i class="ti-pencil-alt"></i></a>
                                    <a class="btn btn-simple btn-danger btn-xs btn-icon remove"
                                       @click="handleDelete(props.$index, props.row)"><i class="ti-close"></i></a>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card">
                <form class="form-horizontal" v-on:submit.prevent="onSubmit">
                    <div class="card-header"><h4 class="card-title">
                        {{category.id == "" ?  'Menambahkan Kategori UKM': 'Ubah Kategori UKM'}}
                    </h4></div>
                    <div class="card-content">
                        <div class="form-group"><label class="col-md-3 control-label">Name</label>
                            <div class="col-md-9"><input type="text" placeholder="Name" class="form-control"
                                                         minlength="3" maxlength="100" v-model="category.name"
                                                         :disabled="isSubmitted"
                                                         required>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="form-group"><label class="col-md-3"></label>
                            <div class="col-md-9">
                                <button type="submit" class="btn btn-fill btn-info" :disabled="isSubmitted">
                                    {{ category.id == "" ? "Add" : "Update" }}
                                </button>
                                <button type="button" class="btn btn-fill btn-warning" id="btn_cancel" v-on:click="cancel"
                                        :disabled="category.id==''">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
  import Vue from 'vue'
  import {Table, TableColumn} from 'element-ui'
  import PSwitch from 'src/components/UIComponents/Switch.vue'

  import CategoryUkmService from './CategoryUkmService'

  Vue.use(Table)
  Vue.use(TableColumn)

  let categoryUkmService = new CategoryUkmService();

  export default {
    components: {
      PSwitch
    },
    data() {
      return {
        tableData: [],
        category: {
          id: '',
          name: ''
        },
        isSubmitted: false
      }
    },
    created: function () {

      this.getCategories();
    },
    methods: {
      onSubmit() {
        this.isSubmitted = true;

        console.log("submit haursnya true");

        if (this.category.id == "") {
          let service = categoryUkmService.post(this.category);
          service.then(response => {
            console.log(response);
            if (response.status == 200) {
              this.$notify({
                component: {
                  template: `<span>Menambahkan Kategori berhasil</span>`
                },
                icon: 'ti-gift',
                horizontalAlign: 'right', // right | center | left
                verticalAlign: 'bottom', // top | bottom
                type: 'success'  // info | success | warning | danger
              })
            }
            this.isSubmitted = false;
            this.cancel();
            this.getCategories();

          })
        } else {
          let service = categoryUkmService.put(this.category.id, this.category);
          service.then(response => {
            if (response.status == 200){
              alert('berhasil update');
            }
            this.isSubmitted = false;
          })

        }

      },
      cancel(){
        this.category = {
          id: '',
          name: ''
        }
      },
      getCategories() {
        let service = categoryUkmService.query({'hade': 'kasep'});

        service.then(response => {
          if (response.status == 200) {
            console.log(response.data);
            this.tableData = response.data.data;
          }
        })
      },
      handleEdit(index, row) {
        console.log(index);
        console.log(row);
        this.category = row;
      },
      handleDelete(index, row) {
        let service = categoryUkmService.delete(index);
        service.then(response =>{
            if (response.status == 204){
              alert('ok berhasil delete');
            }
        });
      }
    }
  }
</script>
<style>
</style>
