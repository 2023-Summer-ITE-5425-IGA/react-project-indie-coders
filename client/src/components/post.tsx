import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/feed.css';
import '../styles/Navigation.css';
import profilepic from '../assets/profilepic.png';
import Navigation from '../components/Navigation';

interface Post {
  _id: string;
  username: string;
  date: string;
  time: string;
  like: number;
  comments: string[];
  content: {
    text: string;
    images: string[];
    videos: string[];
  };
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [newPostImages, setNewPostImages] = useState<string[]>([]);
  const [newPostVideos, setNewPostVideos] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commentPostId, setCommentPostId] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchPosts();
    fetchUsername();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3200/api/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchUsername = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch('http://localhost:3200/api/user/username', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUsername(data.username);
      }
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  const createPost = async () => {
    if (newPost.trim() === '' && newPostImages.length === 0 && newPostVideos.length === 0) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3200/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          content: {
            text: newPost,
            images: newPostImages,
            videos: newPostVideos,
          },
        }),
      });
      if (response.ok) {
        setNewPost('');
        setNewPostImages([]);
        setNewPostVideos([]);
        fetchPosts();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const updateLikesCount = async (postId: string) => {
    try {
      const response = await fetch(`http://localhost:3200/api/posts/${postId}/like`, {
        method: 'PUT',
      });
      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error updating likes count:', error);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3200/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleComment = (postId: string) => {
    setCommentPostId(postId);
  };

  const addComment = async () => {
    try {
      const response = await fetch(`http://localhost:3200/api/posts/${commentPostId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: newComment }),
      });
      if (response.ok) {
        setNewComment('');
        setCommentPostId('');
        fetchPosts();
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const deleteComment = async (postId: string, commentId: string) => {
    try {
      const response = await fetch(`http://localhost:3200/api/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <>
      <Navigation />
      <div className="container social-media-feed">
        <div className="post create-post">
          <div className="user-profile">
            <img src={profilepic} alt="Profile" />
            <p>Create a new post</p>
          </div>
          <textarea
            className="post-content"
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <div className="post-actions">
            <input
              type="file"
              multiple
              onChange={(e) => {
                const files = Array.from((e.target as HTMLInputElement).files || []);
                const images = files.filter((file) => file.type.startsWith('image/')).map((file) => URL.createObjectURL(file));
                const videos = files.filter((file) => file.type.startsWith('video/')).map((file) => URL.createObjectURL(file));
                setNewPostImages((prevImages) => [...prevImages, ...images]);
                setNewPostVideos((prevVideos) => [...prevVideos, ...videos]);
              }}
            />
            <button className="create-post-btn" onClick={createPost}>
              Post
            </button>
          </div>
        </div>
        {posts.map((post) => (
          <div key={post._id} className="post">
            <div className="user-profile">
              <img src={profilepic} alt="Profile" />
              <p>{post.username}</p>
            </div>
            <hr />
            <div className="post-content">
              <p>{post.content.text}</p>
              {post.content.images.length > 0 && (
                <div className="post-images">
                  {post.content.images.map((image) => (
                    <img key={image} src={image} alt="Post Image" 
                    style={{ maxWidth: '626px', maxHeight: '417px', margin: '0 auto' }}/>
                  ))}
                </div>
              )}
              {post.content.videos.length > 0 && (
                <div className="post-videos">
                  {post.content.videos.map((video) => (
                    <video key={video} src={video} controls
                    style={{ maxWidth: '626px', maxHeight: '417px', margin: '0 auto' }}>
                      Your browser does not support the video tag.
                    </video>
                  ))}
                </div>
              )}
            </div>
            <div className="post-actions">
              <button className="likeBtn" onClick={() => updateLikesCount(post._id)}>
                Likes: {post.like}
              </button>
              <button className="commentBtn" onClick={() => handleComment(post._id)}>
                Comments: {post.comments.length}
              </button>
              {username === post.username && (
                <button className="deleteBtn" onClick={() => deletePost(post._id)}>
                  Delete
                </button>
              )}
            </div>
            {commentPostId === post._id && (
              <div className="add-comment">
                <textarea
                  className="comment-input"
                  placeholder="Write a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button className="add-comment-btn" onClick={addComment}>
                  Add Comment
                </button>
              </div>
            )}
            <div className="comments-section">
              {post.comments.map((comment, index) => (
                <div key={index} className="comment">
                  <p>{comment}</p>
                  <button className="delete-comment-btn" onClick={() => deleteComment(post._id, comment)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Feed;
