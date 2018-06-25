<template>
    <div class="row">
        <div class="col-md-12">
            <h4 class="title pull-left">Form Slider</h4>
            <button class="btn btn-primary pull-right" style="margin-bottom: 15px" @click="toList">List Slider </button>
        </div>

        <!-- Form Input -->
        <div class="col-md-12">
            <div class="card">
                <form action="">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-md-offset-2 col-md-8 col-sm-8 col-xs-12">
                                <h4 class="card-title">
                                    {{name}}
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="row">
                            <div class="col-md-offset-2 col-md-8 col-sm-8 col-xs-12">
                                <div class="form-group">
                                    <label for="">Caption</label>
                                    <input type="text" v-model="caption" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="">Tipe</label>
                                    <el-select class="select-danger"
                                            size="large"
                                            placeholder="Pilih Tipe"
                                            v-model="type">
                                        <el-option v-for="option in type_options"
                                                    class="select-danger"
                                                    :value="option.value"
                                                    :label="option.label"
                                                    :key="option.label">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="form-group">
                                    <label>Gambar</label>
                                    <input type="file" class="form-control" @change="onFileChanged">
                                </div>

                                <div class="form-group" v-if="!error">
                                    <a href="javascript:;" style="width: 100%" class="btn btn-primary" @click="save">Tambah Slider</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
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
                caption: '',
                type: '',
                type_options: [
                    {
                        value: 'home', label: 'Home'
                    },
                    {
                        value: 'semakanan', label: 'seMakanan'
                    },
                ],
            }
        },
        methods: {
            save() {
                if (!this.type || !this.caption) {
                    this.$notify({
                        component: {
                            template: `<span>Kolom belum lengkap</span>`
                        },
                        icon: 'ti-alert',
                        horizontalAlign: 'right',
                        verticalAlign: 'top',
                        type: 'danger'
                    })
                } else {
                    const formData = new FormData();
                    formData.append('caption', this.caption);
                    formData.append('type', this.type);
                    formData.append('image', this.image);

                    axios.post(`http://apiadmin.portalsekampus.id/public/api/slider/add`, formData).then(res => {
                        this.$notify({
                            component: {
                                template: `<span>Data berhasil disimpan</span>`
                            },
                            icon: 'ti-alert',
                            verticalAlign: 'top',
                            horizontalAlign: 'right',
                            type: 'success'
                        })
                        this.$router.push({ name: `slider-${this.type}-list`})
                    }).catch(err => {
                         this.$notify({
                        component: {
                            template: `<span>Terjadi kesalahan</span>`
                        },
                        icon: 'ti-alert',
                        horizontalAlign: 'right',
                        verticalAlign: 'top',
                        type: 'danger'
                    })
                    })
                }
            },
            toList() {
                this.$router.push({name: 'slider-semakanan-list'})
            },
            onFileChanged (event) {
                this.image = event.target.files[0];
            }
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

