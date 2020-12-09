<template>
  <div>
    <div v-if="articles !=''" class="articles container py-5">
      <input type="text" class="form-control" placeholder="Search Article" v-model="search" @keypress.enter="Search()"><br>
      <div class="card mb-4" v-for="article in articles" :key="article.id">
        <div class="card-body">
          <h5 class="card-title mb-3"><router-link :to="'/article/'+article.slug" class="article-title">{{article.title}}</router-link></h5>
          <p class="card-text mb-3" v-html="(article.content.length>160)?article.content.slice(0,160)+'....':article.content.slice(0,160)"></p>
          <p class="author-details">
            by : {{article.user.name}}<span class="float-right">in {{article.created_at|myDate}}</span>
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="jumbotron mt-3">
        <h1 class="display-4">There Is No Articles Yet</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Home',
    data(){
      return{
        articles:{},
        search: ""
      }
    },
    methods:{
      GetArticles(){
        this.$Progress.start();
        axios.get('/api/articles')
        .then((res)=>{
          this.articles = res.data;
          this.$Progress.finish();
        })
      },
      Search(){
        this.$Progress.start();
        axios.post('/api/articles/search/'+this.search)
        .then((res)=>{
          this.articles = [];
          this.articles = res.data;
          this.$Progress.finish();
        })
      },
      listen(){
        Echo.channel('channel-articles')
        .listen('ArticleEvent',(article)=>{
          this.articles.unshift(article);
        });
      }
    },
    mounted(){
      this.GetArticles();
      this.listen();
    }
}
</script>