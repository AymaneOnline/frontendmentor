import { useState } from 'react';

function AddComment({ currentUser, onSubmit, placeholder = "Add a comment...", buttonText = "SEND" }) {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  if (!currentUser) return null;

  return (
    <div className="bg-white rounded-lg p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-4">
        <img
          src={currentUser.image.png}
          alt={currentUser.username}
          className="w-10 h-10 rounded-full hidden md:block"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className="flex-1 border border-light-gray rounded-lg p-4 text-grayish-blue resize-none focus:outline-none focus:border-moderate-blue"
          rows="3"
        />
        <div className="flex md:flex-col items-center justify-between md:justify-start gap-4">
          <img
            src={currentUser.image.png}
            alt={currentUser.username}
            className="w-10 h-10 rounded-full md:hidden"
          />
          <button
            onClick={handleSubmit}
            className="bg-moderate-blue text-white px-8 py-3 rounded-lg font-medium hover:opacity-50 transition cursor-pointer"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddComment;
