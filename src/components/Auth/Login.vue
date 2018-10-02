<template>
  <div>
    <!-- <nav class="navbar navbar-transparent navbar-absolute">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle"
                  data-toggle="collapse"
                  data-target="#navigation-example-2"
                  @click="toggleNavbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>

      </div>
    </nav> -->

    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page" data-color=""
           data-image="static/img/background/background-2.jpg">
        <!--   you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple" -->
        <div class="content">
          <div class="container">
            <div class="row">
              <div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                <form @submit.prevent="login()">
                  <div class="card" data-background="color" data-color="blue">
                    <div class="card-header">
                      <h3 class="card-title">Login</h3>
                    </div>
                    <div class="card-content">
                      <div class="form-group">
                        <label>Email address</label>
                        <input type="email" placeholder="Enter email" class="form-control input-no-border" v-model="email">
                      </div>
                      <div class="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Password" class="form-control input-no-border" v-model="password">
                      </div>
                    </div>
                    <div class="card-footer text-center">
                      <button type="submit" class="btn btn-fill btn-wd ">Let's go</button>
                      <div class="forgot">
                        <!-- <router-link to="/register"> -->
                        <a class="cursor-pointer" @click="toRegister()">
                          Forgot your password?
                        </a>
                        <!-- </router-link> -->
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <footer class="footer footer-transparent">
          <div class="container">
            <div class="copyright">
              &copy; Copy Right
              <i class="fa fa-heart heart"></i> by
              seKampus
            </div>
          </div>
        </footer>
        <div class="full-page-background" style="background-image: url(static/img/background/background-2.jpg) "></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        email: "",
        password: ""
      }
    },
    created() {
      this.$store.dispatch('emptyMerchant')
    },
    methods: {
      toggleNavbar () {
        document.body.classList.toggle('nav-open')
      },
      closeMenu () {
        document.body.classList.remove('nav-open')
        document.body.classList.remove('off-canvas-sidebar')
      },
      login () {
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        }).then(() => {
          this.$router.push('/');
        }).catch(() => {
          this.$notify(
          {
            component: {
              template: `<span><b>Email</b> atau <b>Password</b> salah!</span>`
            },
            icon: 'ti-warning',
            horizontalAlign: 'center',
            verticalAlign: 'top',
            type: 'danger'
          })
        })
      },
      toRegister: function () {
        alert('Under construction');
        // this.href = '';
        // let src = this.href;
        // let file = null;
        // this.$emit('loaded', {src, file});
      },
    },
    beforeDestroy () {
      this.closeMenu()
    }
  }
</script>
<style>
</style>
