import { useState, useEffect } from 'react';
import Comment from './components/Comment';
import AddComment from './components/AddComment';
import DeleteModal from './components/DeleteModal';
import initialData from './data.json';
import { getAvatarUrl } from './utils/avatars';

function App() {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  // Process data to replace image paths with imported URLs
  const processUserData = (user) => ({
    ...user,
    image: {
      png: getAvatarUrl(user.username),
      webp: getAvatarUrl(user.username)
    }
  });

  const processCommentData = (comment) => ({
    ...comment,
    user: processUserData(comment.user),
    replies: comment.replies ? comment.replies.map(processCommentData) : []
  });

  useEffect(() => {
    const savedData = localStorage.getItem('commentsData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setComments(parsedData.comments);
      setCurrentUser(parsedData.currentUser);
    } else {
      const processedComments = initialData.comments.map(processCommentData);
      const processedCurrentUser = processUserData(initialData.currentUser);
      setComments(processedComments);
      setCurrentUser(processedCurrentUser);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('commentsData', JSON.stringify({ comments, currentUser }));
    }
  }, [comments, currentUser]);

  const addComment = (content) => {
    const newComment = {
      id: Date.now(),
      content,
      createdAt: 'Just now',
      score: 0,
      user: currentUser,
      replies: []
    };
    setComments([...comments, newComment]);
  };

  const addReply = (commentId, content, replyingTo) => {
    const newReply = {
      id: Date.now(),
      content,
      createdAt: 'Just now',
      score: 0,
      replyingTo,
      user: currentUser
    };

    const addReplyToComment = (commentsList) => {
      return commentsList.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, replies: [...comment.replies, newReply] };
        }
        if (comment.replies && comment.replies.length > 0) {
          return { ...comment, replies: addReplyToComment(comment.replies) };
        }
        return comment;
      });
    };

    setComments(addReplyToComment(comments));
  };

  const updateComment = (commentId, newContent) => {
    const updateInComments = (commentsList) => {
      return commentsList.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, content: newContent };
        }
        if (comment.replies && comment.replies.length > 0) {
          return { ...comment, replies: updateInComments(comment.replies) };
        }
        return comment;
      });
    };

    setComments(updateInComments(comments));
  };

  const deleteComment = (commentId) => {
    const deleteFromComments = (commentsList) => {
      return commentsList.filter(comment => {
        if (comment.id === commentId) {
          return false;
        }
        if (comment.replies && comment.replies.length > 0) {
          comment.replies = deleteFromComments(comment.replies);
        }
        return true;
      });
    };

    setComments(deleteFromComments(comments));
    setDeleteModalOpen(false);
    setCommentToDelete(null);
  };

  const handleDeleteClick = (commentId) => {
    setCommentToDelete(commentId);
    setDeleteModalOpen(true);
  };

  const updateScore = (commentId, increment) => {
    const updateScoreInComments = (commentsList) => {
      return commentsList.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, score: comment.score + increment };
        }
        if (comment.replies && comment.replies.length > 0) {
          return { ...comment, replies: updateScoreInComments(comment.replies) };
        }
        return comment;
      });
    };

    setComments(updateScoreInComments(comments));
  };

  return (
    <div className="min-h-screen bg-very-light-gray py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-4">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
            onReply={addReply}
            onEdit={updateComment}
            onDelete={handleDeleteClick}
            onUpdateScore={updateScore}
          />
        ))}
        <AddComment currentUser={currentUser} onSubmit={addComment} />
      </div>
      {deleteModalOpen && (
        <DeleteModal
          onConfirm={() => deleteComment(commentToDelete)}
          onCancel={() => {
            setDeleteModalOpen(false);
            setCommentToDelete(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
