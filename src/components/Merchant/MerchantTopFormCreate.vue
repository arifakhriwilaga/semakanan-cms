<template>
    <div class="row">
        <div class="col-md-12">
            <h4 class="title pull-left">Form Tambah Merchant Top</h4>
            <button class="btn btn-primary pull-right" style="margin-bottom: 15px" @click="toList">List Merchant Top </button>
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
                                    <label for="">Prioritas</label>
                                    <el-select class="select-danger"
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
                                <div class="form-group" v-if="!error">
                                    <a href="javascript:;" style="width: 100%" class="btn btn-primary" @click="save">Tambah Merchant Top</a>
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
                    formData.append('merchant_id', this.$router.currentRoute.params.id);
                    formData.append('priority', this.priority);

                    axios.post(`http://apiadmin.portalsekampus.id/public/api/merchant/top/add`, formData).then(res => {
                        this.$notify({
                            component: {
                                template: `<span>Data berhasil disimpan</span>`
                            },
                            icon: 'ti-alert',
                            verticalAlign: 'top',
                            horizontalAlign: 'right',
                            type: 'success'
                        })
                        this.$router.push({ name: 'merchant-list'})
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
                this.$router.push({name: 'merchant-top-list'})
            }
        },
        mounted () {
            axios.get(`http://apiadmin.portalsekampus.id/public/api/merchant/${this.$router.currentRoute.params.id}`).then(res => {
                this.name = res.data.data.merchant.data.name
                this.error = false
            }).catch(err => {
                this.$notify({
                    component: {
                        template: `<span>${err.response.data.message}</span>`
                    },
                    icon: 'ti-alert',
                    horizontalAlign: 'right',
                    verticalAlign: 'top',
                    type: 'danger'
                })
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

