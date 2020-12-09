<template>
  <div>
      <div class="header">
        <nav-bar/>
      </div>
      <div class="content">
        <router-view></router-view>
        <vue-progress-bar></vue-progress-bar>
      </div>
  </div>
</template>

<script>
import NavBar from './NavBar';

export default {
    name: "MainApp",
    components :{
      NavBar,
    }
}
</script>