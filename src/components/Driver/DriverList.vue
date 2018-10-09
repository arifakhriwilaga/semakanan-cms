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

          <!-- <div class="col-sm-12">
            <kalendar :configuration="calendar_settings" :appointments="appointments" class="generate-shadow">
              <div slot="creating-card" slot-scope="{appointment_props}">
         
               <h4 class="appointment-title" style="text-align: left;">Pilih Driver</h4>
                <span class="time">{{appointment_props.start_value.value}} - {{appointment_props.end_value.value}}
                </span>
              </div>
              <div slot="popup-form" slot-scope="{popup_scope}" style="display: flex; flex-direction: column;">
         
                <input v-model="new_appointment['title']" type="text" name="title" placeholder="Title">
                <textarea v-model="new_appointment['description']" type="text" name="description" placeholder="Description" rows="2"></textarea>
                <div class="buttons" style="margin-top:10px">
                  <button class="btn btn-sm btn-fill btn-success pull-right" @click="completeAppointment(popup_scope, new_appointment)" style="margin-left:5px;">Save</button>
                  <button class="btn btn-sm btn-fill btn-danger cancel pull-right" @click="popup_scope.close_popup = true">Cancel</button>
                </div>
              </div>
              <div slot="details-card" slot-scope="{appointment_props}">
            
                <h4 class="appointment-title">{{appointment_props.data.title}} Hallo</h4>
                <small v-show="(appointment_props.end - appointment_props.start) > 2">{{appointment_props.data.description}}</small>
                <span class="time">{{appointment_props.start_value.value | normalizeDate('hh:mm A')}} - {{appointment_props.end_value.value | normalizeDate('hh:mm A')}}</span>
                <button class="cancel" @click="deleteAppointment({appointment_props}.$index)">Delete</button>
              </div>
            
              <template slot="first-date" slot-scope="{ date }">
            
                {{ date | normalizeDate('MMM DD') }}
              </template>
              <template slot="last-date" slot-scope="{ date }">
            
                {{ date | normalizeDate('DD MMM, YYYY') }}
              </template>
              <template slot="current-date" slot-scope="{ date }">
            
                {{ date | normalizeDate('DD MMM, YYYY') }}
              </template>
              <template slot="number-date" slot-scope="{ date }">
            
                {{ date | normalizeDate('D') }}
              </template>
              <template slot="letters-date" slot-scope="{ date }">
            
                {{ date | normalizeDate('ddd') }}
              </template>
            </kalendar>
          </div> -->
      </div>
    </div>

    <spinner :showSpinner="statusSpinner" :class="'spinner-dashboard'"></spinner>

  </div>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'
  import Pagination from 'src/components/Base/Pagination.vue'
  import swal from 'sweetalert2'

  // import calender
  // import { Kalendar } from 'kalendar-vue';
  import 'kalendar-vue/dist/KalendarVue.css';
  import * as moment from 'moment';
  // ...
  // components: {
  //   Kalendar,
  //   ...
  // },
  Vue.use(moment);

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
          }
        ],

        // kalender-vue
        new_appointment: [],
        appointments: [],
        calendar_settings: {
          style: 'material_design', // ['flat_design', 'material_design']
          view_type: 'Month', // ['Month', 'Day']
          split_value: 60, // Value % 60 === 0
          cell_height: 70, // !isNaN(Value)
          // scrollToNow: true, // Boolean
          current_day: new Date(), // Valid date
          military_time: true, // Boolean
        },
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
      page(val) {
        this.getDrivers({}, this.pagination[val]);
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
      },

      // kalender-vue
      completeAppointment(popup_data, form_data) {
        // console.log(moment(popup_data.appointment_props.start_value.value).format('YYYY-MM-DD'));
        let payload = {
          data: {
            title: form_data.title,
            description: form_data.description,
          },
          from: popup_data.appointment_props.start_value.value,
          to: popup_data.appointment_props.end_value.value,
          date: moment(popup_data.appointment_props.start_value.value).format('YYYY-MM-DD'),
        };
        this.appointments.push(payload);
        this.new_appointment = {
          title: null,
          description: null,
        };
        popup_data.close_popup = true;
      },

      deleteAppointment(data) {
        console.log(data);
        console.log('new',this.new_appointment);
        console.log('old',this.appointments);
      }
    }
    
  }
</script>
