<template>
  <div>
      <div class="article container py-5">
        <div class="card mb-5">
          <div class="card-body">
            <h5 class="card-title">{{article.title}}</h5>
            <p class="mb-5 author-details">
              by : {{user.name}}<span class="float-right">in {{article.created_at|myDate}}</span>
            </p>
            <hr>
            <p class="card-text mb-3" v-html="article.content"></p>
          </div>
        </div>
        <input type="text" class="form-control mb-5" v-model="comment" @keypress.enter="AddComment()" placeholder="Your Comment">
        <div class="card mb-2" v-for="comment in comments" :key="comment.id">
          <div class="card-body">
            <p>
              by : {{comment.user.name}}<span class="float-right">in {{comment.created_at|myDate}}</span>
            </p>
            <p>
              {{comment.comment}}
            </p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'SingleArticle',
    data(){
      return{
        article:{},
        user:{},
        comments:{},
        comment: "",
        slug: this.$route.params.slug
      }
    },
    methods:{
      GetArticle(){
        this.$Progress.start();
        axios.get('/api/article/'+this.slug)
        .then((res)=>{
          this.article = res.data[0];
          this.user = res.data[0].user;
          this.comments = res.data[1];
          this.$Progress.finish();
        })
      },
      AddComment(){
        if(this.comment.length > 3){
          axios.post('/api/article/'+this.slug+'/'+this.comment)
          .then((res)=>{
            this.comment = '';
          })
        }
      },
      listen(){
        Echo.channel('article.'+ this.slug)
        .listen('CommentEvent',(comment)=>{
          this.comments.unshift(comment);
        });
      }
    },
    mounted(){
      this.GetArticle();
      this.listen();
    }
}
</script>