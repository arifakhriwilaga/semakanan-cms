<template>
    <div class="row">
        <div class="col-md-12">
            <h4 class="title pull-left">Driver</h4>
            <button class="btn btn-primary pull-right" @click="listMerchant()" style="margin-bottom: 15px">List</button>
        </div>

        <!-- Form Input -->
        <div class="col-md-12 card">
            <div class="card-header">
                <div class="card-title"><h4 style="margin-top:10px;">Ubah Driver <span class="badge badge-secondary">{{ form.field.id_number }}</span></h4></div>
                <hr>
            </div>
            <form v-on:submit.prevent="saveForm">
                <div class="card-content">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <!-- <label for="">Id Number</label> -->
                            <input type="text" class="form-control hidden" v-model="form.field.id_number"  disabled="true" name="id_number">
                            <!-- <span class="msg-error">{{ errors.first('id_number') }}</span> -->
                        </div>

                        <div class="form-group">
                            <label for="">Total Shift</label>
                            <input type="number" class="form-control" v-model="form.field.shift_count" v-validate="'required'" name="shift_count">
                            <span class="msg-error">{{ errors.first('shift_count') }}</span>
                        </div>

                        <div class="form-group">
                            <label>Gambar</label><br>
                            <input type="file" v-if="(!form.field.image)" class="form-control" @change="onFileChanged" name="image" v-validate="'required'">
                            <el-button v-if="(form.field.image)" type="info" class="pull-right" circle style="position: absolute;right: 5px;top: 27px;width:30px;height:30px" @click="form.field.image = ''"> <i class="el-icon-edit" style="left: 8px;top: 8px;position: absolute;"></i></el-button>
                            <img :src="form.field.image" v-if="form.field.image!=''">
                            <span class="msg-error">{{ errors.first('image') }}</span>
                        </div>

                        <div class="form-group">
                            <label for="">Alamat</label>
                            <textarea cols="15" rows="5" class="form-control" v-model="form.field.address" name="address" v-validate="'required'"></textarea>
                            <span class="msg-error">{{ errors.first('address') }}</span>
                        </div>
                    </div>
                    
                    <div class="col-sm-12">
                        <hr>
                        <div class="form-group">
                            <button type="submit" class="btn btn-fill btn-primary pull-right" style="margin-bottom:25px;" :disabled="isSubmitted">Update</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <spinner :showSpinner="statusSpinner" :class="'spinner-dashboard'"></spinner>
    </div>
</template>

<script>
    import Vue from 'vue';
    import swal from 'sweetalert2'

    let SERVER = process.env.HOST_URL;

    import axios from 'axios'
    import {DatePicker, TimeSelect, Slider, Tag, Input, Button, Select, Option} from 'element-ui'

    // import ImageUpload from 'src/components/Base/ImageUpload';


    export default {
        // props:{
        //   merchant: Object
        // },
        components: {
            // ImageUpload
        },
        data () {
            return {
                form: {
                    field: {
                        user_id: '',
                        address: '',
                        id_number: '',
                        image: '',
                        shift_count: ''
                    },
                    validation: {
                        messages: {
                            custom: {
                                // id_number: {
                                //     required: 'Nama tidak boleh kosong'
                                // },
                                address: {
                                    required: 'Alamat tidak boleh kosong'
                                },
                                shift_count: {
                                    required: 'Total Shift Pemilik tidak boleh kosong'
                                },
                                image: {
                                    required: 'Image tidak boleh kosong'
                                }
                            }
                        }
                    }
                
                },
                isSubmitted: false,
                statusSpinner: false
          }
        },
        created(){
            this.getDriver();
            this.$validator.localize('id', this.form.validation.messages); // set custom messages
        },
        methods: {

            // GET RELATED DATA
            getDriver(){
                this.statusSpinner = true;

                axios.get(`${SERVER}/api/drivers/${this.$router.currentRoute.params.id}`).then(res => {
                    const data = res.data;
                    console.log(data.data.shifts_count);

                    this.form.field.user_id = data.data.user_id;
                    this.form.field.address = data.data.address;
                    this.form.field.id_number = data.data.id_number;
                    this.form.field.image = data.data.image;
                    this.form.field.shift_count = data.data.shifts_count;

                    this.statusSpinner = false;

                }).catch((err) => {this.statusSpinner = false; this.showModalError()});
            },

            // ACTION
            saveForm () {
              this.$validator.validateAll().then((result) => {
                if (result) {
                    this.isSubmitted = true;
                    this.statusSpinner = true;
                    
                    if (this.form.field.image.slice(0, 10) != "data:image") {
                        Vue.delete(this.form.field, 'image');
                    };
                    axios.put('/api/drivers/' + this.$router.currentRoute.params.id, this.form.field).then(res => {
                            this.statusSpinner = false;                      
                        if (res.status == 200) {
                            
                            this.$notify({
                            component: {
                                template: `<span>`+ res.data.meta.message +`</span>`
                            },
                            icon: 'ti-alert',
                            horizontalAlign: 'right',
                            verticalAlign: 'top',
                            type: 'success'
                            });
                            this.listMerchant();
                        }
                    }).catch(err => {
                        let messages = err.response.data.errors;
                        if(messages !== undefined) {
                            let keys = Object.keys(messages);
                            for (let i = 0; i < keys.length; i++) {
                            this.errors.add(keys[i], messages[keys[i]][0]);
                            }
                        }
                        this.$notify({
                            component: {
                            template: `<span>Terjadi kesalahan!</span>`
                            },
                            icon: 'ti-alert',
                            horizontalAlign: 'right',
                            verticalAlign: 'top',
                            type: 'danger'
                        })
                        this.isSubmitted = false;
                        this.statusSpinner = false;                      
                });
                }
              });
            },

            // OTHERS
            listMerchant() {
                this.$router.push({ name: 'driver-list' });
            },
            onLoad(avatar) {
              this.form.field.image = avatar.src;
            },
            onFileChanged (e) {
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    this.form.field.image = e.target.result;
                };
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
                
                    this.getDriver();
                
                }, function (dismiss) {
                    // this code dismiss condition
                });
                
            },
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
