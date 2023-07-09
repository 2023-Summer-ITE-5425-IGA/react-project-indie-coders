import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/feed.css';
import '../styles/Navigation.css';
import post from '../assets/post1.png';
import song from '../assets/song.mp4'
import profilepic from '../assets/profilepic.png'
import Navigation from '../components/Navigation';
const Feed: React.FC = () => {


    const [posts, setPosts] = useState([
        {
          id: 1,
          user: 'John Doe',
          profile: profilepic,
          type: 'text',
          content: 'This is a text post.',
          likes: 55,
          comments: [
            { id: 1, user: 'Jane Smith', profile: profilepic, comment: 'Comment 1' },
            { id: 2, user: 'Alex Johnson', profile: profilepic, comment: 'Comment 2' },
          ],
        },
        {
            id: 2,
            user: 'Jane Smith',
            profile: profilepic,
            type: 'image',
            content: post,
            likes: 5,
            comments: [
              { id: 1, user: 'Jane Smith', profile: profilepic, comment: 'Comment 1' },
              { id: 2, user: 'Alex Johnson', profile: profilepic, comment: 'Comment 2' },
            ],
          },
          {
            id: 3,
            user: 'Aron Taylor',
            profile: profilepic,
            type: 'video',
            content: song,
            likes: 1,
            comments: [
              { id: 1, user: 'Jane Smith', profile: profilepic, comment: 'Comment 1' },
              { id: 2, user: 'Alex Johnson', profile: profilepic, comment: 'Comment 2' },
            ],
          },
        // Add more posts here
      ]);

      const [activePostId, setActivePostId] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleLike = (postId: number) => {
    setFilteredPosts(prevPosts => {
      return prevPosts.map(post => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      });
    });
    setPosts(filteredPosts);
  };

  const handleComment = (postId: number) => {
    setActivePostId(postId);
  };

  const handleAddComment = (postId: number) => {
    setFilteredPosts(prevPosts => {
      return prevPosts.map(post => {
        if (post.id === postId) {
          const newCommentId = post.comments.length + 1;
          const newCommentObj = {
            id: newCommentId,
            user: 'Vishesh Makwana',
            profile: profilepic,
            comment: newComment,
          };
          return { ...post, comments: [...post.comments, newCommentObj] };
        }
        return post;
      });
    });
    setPosts(filteredPosts);
    setNewComment('');
  };

  const handleCancelComment = () => {
    setActivePostId(null);
    setNewComment('');
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    filterPosts(e.target.value);
  };

  const filterPosts = (query: string) => {
    const filtered = posts.filter(post =>
      post.user.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <>
      <Navigation />
      <div className="container social-media-feed">
      <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchInputChange}
          className='search-input'
        />
      {filteredPosts.map(post => (
        <div key={post.id} className="post">
          <div className="user-profile">
            <img src={post.profile} alt="Profile" />
            <p>{post.user}</p>
          </div>
          <hr />
          {post.type === 'text' && (
            <div className="text-post">
              <p>{post.content}</p>
            </div>
          )}
          {post.type === 'image' && (
            <div className="image-post">
              <img src={post.content} alt="Image" />
            </div>
          )}
          {post.type === 'video' && (
            <div className="video-post">
              <video controls>
                <source src={post.content} type="video/mp4" />
              </video>
            </div>
          )}
          <hr />
          <div className="post-actions">
            <button className='likeBtn' onClick={() => handleLike(post.id)}>
              Likes: {post.likes}
            </button>
            <button className='commentBtn' onClick={() => handleComment(post.id)}>
              Comments: {post.comments.length}
            </button>
          </div>
          {activePostId === post.id && (
            <div className="comments-section">
              <div className="comments-list">
                {post.comments.map(comment => (
                  <div key={comment.id} className="comment">
                    <div className="user-profile">
                      <img src={comment.profile} alt="Profile" />
                      <p>{comment.user}</p>
                    </div>
                    <p>{comment.comment}</p>
                  </div>
                ))}
              </div>
              <div className="add-comment">
              <div className="user-profile"><img src={profilepic} alt="Profile" /></div>

                <input
                  type="text"
                  className='commentTxtBox'
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                />
                <br />
                <button className='likeBtn' onClick={() => handleAddComment(post.id)}>Post</button>
                <button className='likeBtn' onClick={handleCancelComment}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
    </>
  );
};

export default Feed;
