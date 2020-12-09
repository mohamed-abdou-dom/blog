<template>
<div id="app">
    <div class="auth container">
        <h2 class="text-center py-5">Connect to Our Community</h2>
        <div v-if="error" class="alert alert-danger mb-3" role="alert">
            {{error}}
        </div>
        <form @submit.prevent="Register">
            <div class="form-group">
              <input v-model="form.name" type="text" name="name" placeholder="mohamed abdo"
                  class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
              <has-error :form="form" field="name"></has-error>
            </div>

            <div class="form-group">
              <input v-model="form.email" type="text" name="email" placeholder="exmple@app.com"
                  class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
              <has-error :form="form" field="email"></has-error>
            </div>

            <div class="form-group">
              <input v-model="form.password" type="password" name="password" placeholder="Password"
                  class="form-control" :class="{ 'is-invalid': form.errors.has('password') }" autocomplete>
              <has-error :form="form" field="password"></has-error>
            </div>

            <button :disabled="form.busy" type="submit" class="btn btn-primary">Register</button>
        </form>
    </div>
  </div>  
</template>

<script>
    import { setAuthorization } from "../../helpers/general";

  export default {
  data () {
    return {
      form: new Form({
        name: '',
        email: '',
        password: ''
      }),
      error: "",

    }
  },
  methods: {
    Register(){
      this.form.post('api/auth/register')
      .then((res)=>{
          setAuthorization(res.data.access_token);
          this.$store.commit("loginSuccess", res.data);
          this.$router.push({path: '/home'});
      })
      .catch((err)=>{
          this.error = '';
          this.error = 'The given data was invalid';
      })
    }
  }
}
</script>

<style scoped>
    form,.alert{
        max-width: 500px;
        margin:auto;
    }
</style>