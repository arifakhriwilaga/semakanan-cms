<template>
    <div class="row">
        <div class="col-md-12">
            <h4 class="title pull-left">Form Tambah Merchant Populer</h4>
            <button class="btn btn-primary pull-right" style="margin-bottom: 15px" @click="toList">List Merchant Populer </button>
        </div>

        <!-- Form Input -->
        <div class="col-md-6">
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
                                    <label for="">Prioritas</label>
                                    <el-select class="select-primary"
                                            size="large"
                                            placeholder="Pilih Prioritas"
                                            v-model="priority">
                                        <el-option v-for="option in priority_options"
                                                    class="select-danger"
                                                    :value="option.value"
                                                    :label="option.label"
                                                    :key="option.label">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="form-group">
                                    <label for="">Merchant</label>
                                    <el-select class="select-primary"
                                            size="large"
                                            placeholder="Pilih Merchant"
                                            v-model="merchant_id">
                                        <el-option v-for="option in merchant_options"
                                                    class="select-danger"
                                                    :value="option.value"
                                                    :label="option.label"
                                                    :key="option.label">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="form-group" v-if="!error">
                                  <button class="btn btn-primary btn-fill" @click="save">Tambah Merchant</button>
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
                name: '',
                priority: '',
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
                merchant_id: '',
                error: true
            }
        },
        methods: {
            save() {
                if (!this.priority) {
                    this.$notify({
                        component: {
                            template: `<span>Prioritas belum dipilih</span>`
                        },
                        icon: 'ti-alert',
                        horizontalAlign: 'right',
                        verticalAlign: 'top',
                        type: 'danger'
                    })
                } else {
                    const formData = new FormData();
                    formData.append('merchant_id', this.merchant_id);
                    formData.append('priority', this.priority);

                    axios.post(`/api/merchants/pop`, formData).then(res => {
                        this.$notify({
                            component: {
                                template: `<span>Data berhasil disimpan</span>`
                            },
                            icon: 'ti-alert',
                            verticalAlign: 'top',
                            horizontalAlign: 'right',
                            type: 'success'
                        })
                        this.$router.push({ name: 'merchant-pop-list'})
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
                    })
                }
            },
            toList() {
                this.$router.push({name: 'merchant-pop-list'})
            }
        },
        mounted () {
            axios.get(`/api/merchants`).then(res => {
                for (let index = 0; index < res.data.data.length; index++) {
                    console.log(res.data.data[index])
                    this.merchant_options.push({
                        value: res.data.data[index].id,
                        label: res.data.data[index].name
                    });
                }
                this.error = false;
            })
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

