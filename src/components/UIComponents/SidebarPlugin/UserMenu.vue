<template>
  <div class="user">
    <div class="photo">
      <img src="/static/img/faces/face-2.jpg"/>
    </div>
    <div class="info">
      <a data-toggle="collapse" @click="toggleMenu" href="javascript:void(0)">
           <span>
             Admin Nissa
             <b class="caret"></b>
          </span>
      </a>
      <div class="clearfix"></div>
      <div>
        <el-collapse-transition>
          <ul class="nav" v-show="!isClosed">
            <li>
              <a href="javascript:void(0)" @click="underConstruction()">
                <span class="sidebar-mini">P</span>
                <span class="sidebar-normal">Profil</span>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" @click="underConstruction()">
                <span class="sidebar-mini">Up</span>
                <span class="sidebar-normal">Ubah Profil</span>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" @click="underConstruction()">
                <span class="sidebar-mini">P</span>
                <span class="sidebar-normal">Pengaturan</span>
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" @click="logout">
                <span class="sidebar-mini">L</span>
                <span class="sidebar-normal">Logout</span>
              </a>
            </li>
          </ul>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>
<script>
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
  export default {
    components: {
      [CollapseTransition.name]: CollapseTransition
    },
    data () {
      return {
        isClosed: true
      }
    },
    methods: {
      toggleMenu () {
        this.isClosed = !this.isClosed
      },
      underConstruction() {
        alert('under construction');
      }
      ,
      logout() {
        this.$store.dispatch("logout", localStorage.getItem('login_id')).then(() => this.$router.push('/login')).catch(() => alert('asd'))
      }
    }
  }
</script>
<style>
  .collapsed {
    transition: opacity 1s;
  }
</style>
