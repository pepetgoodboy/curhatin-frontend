import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { addComment } from "../utils/api";
import ValidateUser from "@/middleware/ValidateUser";

export default function CommentSection({
  storyId,
  initialComments = [],
  onCommentAdded,
}) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(initialComments);
  const router = useRouter();

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await ValidateUser(router);
    if (!isValid) return;

    if (!newComment.trim()) return; // Prevent empty comments

    try {
      const response = await addComment(storyId, newComment);
      if (response.success) {
        const newCommentObj = response.data;
        setComments((prevComments) => [...prevComments, newCommentObj]);
        setNewComment("");
        if (onCommentAdded) {
          onCommentAdded(storyId, newCommentObj);
        }
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="font-bold mb-2">Comments</h3>
      {comments && comments.length > 0 ? (
        comments.map((comment, index) => (
          <div
            key={comment._id || index}
            className="mb-2 rounded-lgm border border-black/40 p-4"
          >
            <p className="text-xs">
              Dari{" "}
              <span className="text-lg font-bold">
                {comment?.author?.name || "Anonymous"}
              </span>
            </p>
            <p className="text-sm md:text-base">
              {comment?.content || "No content"}
            </p>
            <p className="text-[11px] md:text-sm text-gray-500">
              Dikomentari pada{" "}
              {comment?.createdAt
                ? new Date(comment.createdAt).toLocaleString()
                : "Unknown date"}
            </p>
          </div>
        ))
      ) : (
        <p className="text-sm">Tidak ada komentar.</p>
      )}
      <form onSubmit={handleSubmit} className="mt-4 mb-8">
        <textarea
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Berikan komentar..."
          required
          rows="4"
          className="w-full  px-4 py-4 bg-[#FFEAA0] rounded-lgm outline-none placeholder:text-black drop-shadow-br h-full"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-400 font-semibold px-4 py-2 rounded-lgm hover:bg-neutral-100 transition-all duration-300 drop-shadow-br"
        >
          Add Comment
        </button>
      </form>
    </div>
  );
}
