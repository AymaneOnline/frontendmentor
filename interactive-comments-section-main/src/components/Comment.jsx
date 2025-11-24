import { useState } from 'react';
import AddComment from './AddComment';
import iconPlus from '../assets/images/icon-plus.svg';
import iconMinus from '../assets/images/icon-minus.svg';
import iconDelete from '../assets/images/icon-delete.svg';
import iconEdit from '../assets/images/icon-edit.svg';
import iconReply from '../assets/images/icon-reply.svg';

function Comment({ comment, currentUser, onReply, onEdit, onDelete, onUpdateScore }) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [voted, setVoted] = useState(null);

  const isCurrentUser = currentUser && comment.user.username === currentUser.username;

  const handleReply = (content) => {
    onReply(comment.id, content, comment.user.username);
    setIsReplying(false);
  };

  const handleEdit = () => {
    onEdit(comment.id, editedContent);
    setIsEditing(false);
  };

  const handleVote = (increment) => {
    if (voted === increment) {
      onUpdateScore(comment.id, -increment);
      setVoted(null);
    } else if (voted !== null) {
      onUpdateScore(comment.id, increment * 2);
      setVoted(increment);
    } else {
      onUpdateScore(comment.id, increment);
      setVoted(increment);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Score - Desktop */}
          <div className="hidden md:flex flex-col items-center bg-very-light-gray rounded-lg p-2 h-fit">
            <button
              onClick={() => handleVote(1)}
              className={`p-2 hover:opacity-50 transition cursor-pointer ${voted === 1 ? 'text-moderate-blue' : 'text-light-grayish-blue'}`}
              aria-label="Upvote"
            >
              <img src={iconPlus} alt="Plus" className="w-3 h-3" />
            </button>
            <span className="font-medium text-moderate-blue my-2">{comment.score}</span>
            <button
              onClick={() => handleVote(-1)}
              className={`p-2 hover:opacity-50 transition cursor-pointer ${voted === -1 ? 'text-moderate-blue' : 'text-light-grayish-blue'}`}
              aria-label="Downvote"
            >
              <img src={iconMinus} alt="Minus" className="w-3 h-auto" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={comment.user.image.png}
                  alt={comment.user.username}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium text-dark-blue">{comment.user.username}</span>
                {isCurrentUser && (
                  <span className="bg-moderate-blue text-white text-sm px-2 py-0.5 rounded">you</span>
                )}
                <span className="text-grayish-blue">{comment.createdAt}</span>
              </div>

              {/* Desktop Actions */}
              <div className="hidden md:flex items-center gap-4">
                {isCurrentUser ? (
                  <>
                    <button
                      onClick={() => onDelete(comment.id)}
                      className="flex items-center gap-2 text-soft-red font-medium hover:opacity-50 transition cursor-pointer"
                    >
                      <img src={iconDelete} alt="Delete" />
                      Delete
                    </button>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-2 text-moderate-blue font-medium hover:opacity-50 transition cursor-pointer"
                    >
                      <img src={iconEdit} alt="Edit" />
                      Edit
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsReplying(!isReplying)}
                    className="flex items-center gap-2 text-moderate-blue font-medium hover:opacity-50 transition cursor-pointer"
                  >
                    <img src={iconReply} alt="Reply" />
                    Reply
                  </button>
                )}
              </div>
            </div>

            {/* Comment Text */}
            {isEditing ? (
              <div className="space-y-4">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full border border-light-gray rounded-lg p-4 text-grayish-blue resize-none focus:outline-none focus:border-moderate-blue"
                  rows="4"
                />
                <button
                  onClick={handleEdit}
                  className="bg-moderate-blue text-white px-8 py-3 rounded-lg font-medium hover:opacity-50 transition"
                >
                  UPDATE
                </button>
              </div>
            ) : (
              <p className="text-grayish-blue leading-relaxed">
                {comment.replyingTo && (
                  <span className="text-moderate-blue font-medium">@{comment.replyingTo} </span>
                )}
                {comment.content}
              </p>
            )}

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center justify-between mt-4">
              {/* Score - Mobile */}
              <div className="flex items-center bg-very-light-gray rounded-lg p-2">
                <button
                  onClick={() => handleVote(1)}
                  className={`px-3 py-1 hover:opacity-50 transition cursor-pointer ${voted === 1 ? 'text-moderate-blue' : 'text-light-grayish-blue'}`}
                  aria-label="Upvote"
                >
                  <img src={iconPlus} alt="Plus" className="w-3 h-3" />
                </button>
                <span className="font-medium text-moderate-blue mx-3">{comment.score}</span>
                <button
                  onClick={() => handleVote(-1)}
                  className={`px-3 py-1 hover:opacity-50 transition cursor-pointer ${voted === -1 ? 'text-moderate-blue' : 'text-light-grayish-blue'}`}
                  aria-label="Downvote"
                >
                  <img src={iconMinus} alt="Minus" className="w-3 h-auto" />
                </button>
              </div>

              <div className="flex items-center gap-4">
                {isCurrentUser ? (
                  <>
                    <button
                      onClick={() => onDelete(comment.id)}
                      className="flex items-center gap-2 text-soft-red font-medium hover:opacity-50 transition cursor-pointer"
                    >
                      <img src={iconDelete} alt="Delete" />
                      Delete
                    </button>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-2 text-moderate-blue font-medium hover:opacity-50 transition cursor-pointer"
                    >
                      <img src={iconEdit} alt="Edit" />
                      Edit
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsReplying(!isReplying)}
                    className="flex items-center gap-2 text-moderate-blue font-medium hover:opacity-50 transition cursor-pointer"
                  >
                    <img src={iconReply} alt="Reply" />
                    Reply
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reply Form */}
      {isReplying && (
        <div className="ml-0 md:ml-10">
          <AddComment
            currentUser={currentUser}
            onSubmit={handleReply}
            placeholder={`Reply to @${comment.user.username}...`}
            buttonText="REPLY"
          />
        </div>
      )}

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-4 md:ml-10 pl-4 md:pl-10 border-l-2 border-light-gray space-y-4">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              currentUser={currentUser}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
              onUpdateScore={onUpdateScore}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
