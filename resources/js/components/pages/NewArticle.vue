<template>
  <div>
    <div class="container py-5">
        <h3 class="text-center mb-5">Add New Article</h3>
        <div class="card">
            <div class="card-body">
                <form @submit.prevent="AddArticle()">
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" class="form-control" v-model="article.title">
                        <!-- <has-error :article="article" field="title"></has-error> -->
                    </div>
                    <p> http://article.dev/article/ <span style="background-color:yellow">{{ConvertTitle()}}</span> </p>
                    <!-- <has-error :article="article" field="slug"></has-error> -->
                    <div class="form-group">
                        <label>Excerpt</label>
                        <textarea class="form-control" v-model="article.excerpt" cols="30" rows="3"></textarea>
                        <!-- <has-error :article="article" field="excerpt"></has-error> -->
                    </div>
                    <div class="form-group">
                        <label>Content</label>
                        <ckeditor :editor="editor" v-model="article.content"></ckeditor>
                        <!-- <has-error :article="article" field="content"></has-error> -->
                    </div>
                    <button type="submit" class="btn btn-primary">Add Article</button>
                </form>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
    name: 'SingleArticle',
    data(){
      return{
        editor: ClassicEditor,
        article: new Form({
            title: "",
            slug: "",
            excerpt: "",
            content: "",
        }),
      }
    },
    methods:{
        ConvertTitle(){
            this.article.slug = Slug(this.article.title);
            return this.article.slug;
        },
        AddArticle(){
            this.$Progress.start();
            this.article.post('/api/article')
            .then((res)=>{
                this.$router.push('/home');
                this.$Progress.finish();
            })
        }
    }
}
</script>