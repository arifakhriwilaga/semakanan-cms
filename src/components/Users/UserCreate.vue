<template>
  <div class="row">
    <div class="col-md-12">
        <form method="POST" action="/users/create" class="form-horizontal"  v-on:submit.prevent="submit">
            <div class="card">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card-header">
                            <h4 class="card-title">Create new user</h4>
                        </div>
                        <div class="card-content">
                            <fieldset>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Name</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Email</label>
                                    <div class="col-sm-10">
                                        <input type="email" class="form-control" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Phone</label>
                                    <div class="col-sm-10">
                                        <input type="phone" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Collage</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Departement</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Year</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Role</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                            </fieldset>


                            <fieldset>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Address</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" placeholder="Here can be your nice text"
                                                  rows="3"></textarea>
                                    </div>
                                </div>
                            </fieldset>

                        </div>
                        <div class="card-footer text-right">
                            <button type="submit" class="btn btn-fill btn-info btn-wd">Register</button>
                        </div>
                    </div>
                    <div class="col-md-6">
                    </div>
                </div>
            </div>  <!-- end card -->
        </form>
    </div> <!-- end col-md-12 -->
  </div>
</template>
<script>
  import User from './UserService';
  import axios from 'axios';

  export default {
    data () {
      return {
      }
    },
    methods: {
      submit(){
        let user = new User(axios, 'http://dummy.com');
        let response = user.get('a');
        console.log(response);
      }
    }
  }
</script>
<style>
</style>
