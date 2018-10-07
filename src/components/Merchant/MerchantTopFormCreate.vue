<template>
    <div class="row">
        <div class="col-md-12">
            <h4 class="title pull-left">Merchant Teratas</h4>
            <button class="btn btn-primary pull-right" style="margin-bottom: 15px" @click="toList()">List</button>
        </div>

        <!-- Form Input -->
        <div class="col-md-4 card">
            <div class="card-header">
                <div class="card-title"><h4 style="margin-top:10px;">{{mode == 'Add' ? 'Tambah' : 'Ubah'}} Merchant Teratas</h4></div>
                <hr>
            </div>
            <form v-on:submit.prevent="saveForm">
                <div class="card-content">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="form-group">
                                <label for="">Merchant</label>
                                <el-select style="padding-right:0px;padding-left:0px;width:100%" class="select-primary"
                                        size="large"
                                        placeholder="Pilih Merchant"
                                        v-model="form.field.merchant_id" name="merchant_id" v-validate="'required'">
                                    <el-option v-for="option in merchant_options"
                                                class="select-danger"
                                                :value="option.value"
                                                :label="option.label"
                                                :key="option.value">
                                    </el-option>
                                </el-select>
                                <span class="msg-error">{{ errors.first('merchant_id') }}</span>
                            </div>
                            <div class="form-group">
                                <label for="">Prioritas</label>
                                <el-select style="padding-right:0px;padding-left:0px;width:100%" class="select-primary"
                                        size="large"
                                        placeholder="Pilih Prioritas"
                                        v-model="form.field.priority" v-validate="'required'" name="priority">
                                    <el-option v-for="option in priority_options"
                                                class="select-danger"
                                                :value="option.value"
                                                :label="option.label"
                                                :key="option.value">
                                    </el-option>
                                </el-select>
                                <span class="msg-error">{{ errors.first('priority') }}</span>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <hr>
                            <div class="form-group">
                                <button class="btn btn-primary btn-fill pull-right" style="margin-bottom:25px;" :disabled="isSubmitted">{{mode == 'Add' ? 'Simpan' : 'Update'}}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <spinner :showSpinner="statusSpinner" :class="'spinner-dashboard'"></spinner>
    </div>
</template>

<script>
    import axios from 'axios';
    import {DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option} from 'element-ui'

    export default {
        components: {
            [Select.name]: Select,
        },
        data () {
            return {
                form: {
                    field: {
                        merchant_id: '',
                        priority: ''
                    },
                    validation: {
                        messages: {
                            custom: {
                                merchant_id: {
                                    required: 'Merchant tidak boleh kosong'
                                },
                                priority: {
                                    required: 'Prioritas tidak boleh kosong'
                                }
                            }
                        }
                    }
                
                },
                statusSpinner: false,
                priority_options: [
                    {
                        value: 1, label: 1
                    },
                    {
                        value: 2, label: 2
                    },
                    {
                        value: 3, label: 3
                    },
                    {
                        value: 4, label: 4
                    },
                    {
                        value: 5, label: 5
                    }
                ],
                merchant_options: [],
                error: true,
                isSubmitted: false
            }
        },
        computed: {
          mode(){
            if (this.$router.currentRoute.params.id){
              return "Update"
            }else{
              return "Add"
            }
          }
        },
        methods: {
            // GET RELATED DATA
            getData() {
                this.statusSpinner = true;
                axios.get(`/api/merchants`).then(res => {
                    for (let index = 0; index < res.data.data.length; index++) {
                        this.merchant_options.push({
                            value: res.data.data[index].id,
                            label: res.data.data[index].name
                        });
                    }
                    this.statusSpinner = false;
                    this.error = false;
                }).catch((err) => {this.statusSpinner = false; this.showModalError()});
            },

            // ACTION
            saveForm() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.statusSpinner = true;
                        axios.post(`/api/merchants/top`, this.form.field).then(res => {
                            this.toList();
                            this.$notify({
                                component: {
                                    template: `<span>Data berhasil disimpan</span>`
                                },
                                icon: 'ti-alert',
                                verticalAlign: 'top',
                                horizontalAlign: 'right',
                                type: 'success'
                            })
                        }).catch(err => {
                            this.$notify({
                                component: {
                                    template: `<span>Terjadi kesalahan</span>`
                                },
                                icon: 'ti-alert',
                                horizontalAlign: 'right',
                                verticalAlign: 'top',
                                type: 'danger'
                            });
                            this.isSubmitted = false;
                            this.statusSpinner = false; 
                        });
                    }
                })
            },

            // OTHERs
            toList() {
                this.$router.push({name: 'merchant-top-list'})
            },
            underConstruction() {
                alert('under construction');
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
                
                    this.getMerchant();
                
                }, function (dismiss) {
                    // this code dismiss condition
                });
                
            },
        },
        mounted () {
            this.$validator.localize('id', this.form.validation.messages); // set custom messages
            this.getData();
        }
    }
</script>

<style scoped>
    .form-group {
        margin-bottom: 20px !important
    }

    label {
        margin-bottom: 4px !important
    }
</style>

