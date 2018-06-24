<template>
  <div class="card card-user">
    <div class="image">
      <img src="static/img/background.jpg" alt="...">
    </div>
    <div class="card-content">
      <div class="author">
        <img class="avatar border-white" src="static/img/faces/face-2.jpg" alt="...">
        <h4 class="title">{{name}}
          <br>
          <button class="btn btn-success" style="margin: 4px 0 4px 0" v-if="open" @click="status()">BUKA</button>
          <button class="btn btn-danger" style="margin: 4px 0 4px 0" v-if="!open" @click="status()">TUTUP</button>
          <br>
          <a href="#">
            <small>{{owner}}</small>
          </a>
        </h4>
      </div>
      <p class="description text-center">
        "{{description}}"
      </p>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    props:['data'],
    data () {
      return {
        details: [
          {
            title: '12',
            subTitle: 'Files'
          },
          {
            title: '2GB',
            subTitle: 'Used'
          },
          {
            title: '24,6$',
            subTitle: 'Spent'
          }
        ],
        name: '',
        owner: '',
        description: '',
        open: ''
      }
    },
    created() {
      axios.get(`http://apiadmin.portalsekampus.id/public/api/merchant/${this.$router.currentRoute.params.id}`).then(res => {
        const data = res.data.data.merchant;

        this.name = data.data.name;
        this.owner = data.data.owner;
        this.description = res.data.data.description;
        this.open = res.data.data.buka;
      })
    },
    methods: {
      getClasses (index) {
        const remainder = index % 3
        if (remainder === 0) {
          return 'col-md-3 col-md-offset-1'
        } else if (remainder === 2) {
          return 'col-md-4'
        } else {
          return 'col-md-3'
        }
      },
      status() {
        axios.put(`http://apiadmin.portalsekampus.id/public/api/merchant/state/change/${this.$router.currentRoute.params.id}`).then(res => {
          this.$notify({
            component: {
              template: `<span>${res.data.meta.message}</span>`
            },
            icon: 'ti-alert',
            horizontalAlign: 'right',
            verticalAlign: 'top',
            type: 'success'
          })
          this.open = res.data.data.buka
        })
      }
    }
  }

</script>
<style>

</style>
