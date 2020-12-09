<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Article;
use App\Comment;
use App\Events\CommentEvent;
use App\Events\ArticleEvent;
class ArticleController extends Controller
{
    public function Articles()
    {
        $articles = Article::with('user')->get();
        return response()->json($articles);
    }
   
    public function SingleArticle($slug)
    {
        $article = Article::where('slug','=',$slug)->with('user')->first();
        $comments = Comment::where('article_id','=',$article->id)->with('user')->get();
        return response()->json([$article,$comments]);
    }
   
    public function AddComment($slug,$comment)
    {
        $article = Article::where('slug','=',$slug)->select('id')->first();
        $comment =  $article->comments()->create([
            'comment' => $comment,
            'user_id' => auth('api')->user()->id,
        ]);
        
        $comment = Comment::where('id',$comment->id)->with('user')->first();
        event(new CommentEvent($comment));
    }

    public function AddArticle(Request $request)
    {
        $this->validate($request,[
            'title' => 'required|min:5|max:255',
            'slug' => 'required|unique:articles',
            'excerpt' => 'required|min:50',
            'content' => 'required|min:100',
        ]);

        $article = new Article;
        $article->title = $request->title;
        $article->slug = $request->slug;
        $article->excerpt = $request->excerpt;
        $article->content = $request->content;
        $article->status = 1;
        $article->user_id = auth('api')->user()->id;
        $article->save();
        
        event(new ArticleEvent($article));
    }

    public function SearchArticle($search)
    {
        $articles = Article::where('title', 'like', '%' . $search . '%')
        ->orWhere('content', 'like', '%' . $search . '%')
        ->with('user')
        ->get();

        return response()->json($articles);

    }
}
