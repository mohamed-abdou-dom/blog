<?php

namespace App\Events;

use App\Article;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class ArticleEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $article;

    public function __construct(Article $article)
    {
        $this->article = $article;
    }

    public function broadcastOn()
    {
        return new Channel('channel-articles');
    }

    public function broadcastWith()
    {
        return [
            'content' => $this->article->content,
            'slug' => $this->article->slug,
            'created_at' => $this->article->created_at,
            'title' => $this->article->title,
            'user' => $this->article->user
        ];
    }
}
