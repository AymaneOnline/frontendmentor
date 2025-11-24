function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 md:p-8 max-w-md w-full">
        <h2 className="text-xl md:text-2xl font-medium text-dark-blue mb-4">Delete comment</h2>
        <p className="text-grayish-blue mb-6 leading-relaxed">
          Are you sure you want to delete this comment? This will remove the comment and can't be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-grayish-blue text-white py-3 rounded-lg font-medium hover:opacity-50 transition"
          >
            NO, CANCEL
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-soft-red text-white py-3 rounded-lg font-medium hover:opacity-50 transition"
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
