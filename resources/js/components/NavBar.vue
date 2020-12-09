<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container">
        <router-link class="navbar-brand" to="/" exact>LaraBlog</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <template v-if="!currentUser">
              <li class="nav-item">
                <router-link class="nav-link" to="/login" exact>Login</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/register" exact>Register</router-link>
              </li>
            </template>
            <template v-if="currentUser">
              <li class="nav-item">
                <router-link class="nav-link" to="/home" exact>Articles</router-link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {{currentUser.name}}
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <router-link class="dropdown-item" to="/new-article">New Article</router-link>
                  <a class="dropdown-item" @click.prevent="logout" href="#">Logout</a>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
    name: 'NavBar',
    methods:{
      logout(){
        axios.post('/api/auth/logout')
        .then((res)=>{
          this.$store.commit('logout');
          this.$router.push('/login');
        });
      }
    },
    computed:{
      currentUser(){
        return this.$store.getters.currentUser;
      }
    }
}
</script>