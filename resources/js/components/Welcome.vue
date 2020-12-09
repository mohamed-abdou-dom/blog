<template>
  <div>
      <div class="welcome">
        <div class="wel-overlay">
          <h3 class="text-center">Connect to Laravel Bloggers</h3>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'welcome',
    created(){
      this.$Progress.start();
      this.$Progress.finish();
    }
}
</script>