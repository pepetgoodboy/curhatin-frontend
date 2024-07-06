import { useState } from "react";
import CommentSection from "./CommentSection";
import { FaCommentDots, FaHeart } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import Link from "next/link";
import { addLike } from "@/utils/api";
import Swal from "sweetalert2";

export default function StoryCard({ story, onCommentAdded }) {
  const [showComments, setShowComments] = useState(false);
  const [storyComments, setStoryComments] = useState(story.comments || []);
  const [showLikeTooltip, setShowLikeTooltip] = useState(false);
  const [showCommentTooltip, setShowCommentTooltip] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [likeCount, setLikeCount] = useState(story.likes);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = async () => {
    try {
      const response = await addLike(story._id);
      if (response.data.success) {
        setIsLiked((prevIsLiked) => !prevIsLiked);
        setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: error.response.data.message || "Anda sudah menyukai cerita ini",
        confirmButtonColor: "#87e1a0",
        focusConfirm: true,
      });
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleCommentAdded = (storyId, newComment) => {
    setStoryComments((prevComments) => [...prevComments, newComment]);
    if (onCommentAdded) {
      onCommentAdded(storyId, newComment);
    }
  };

  const toogleShare = () => {
    Swal.fire({
      icon: "warning",
      title: "Coming Soon",
      confirmButtonColor: "#87e1a0",
      focusConfirm: true,
    });
  };

  return (
    <section className="container font-comfortaa">
      <div className="w-11/12 md:w-4/6 mx-auto">
        <div className="mb-5 text-lg">
          <div className="bg-neutral-100 border border-black rounded-lgm px-6 pt-3 pb-12 drop-shadow-br">
            <div className="flex">
              <p className="text-gray-800 mb-2 text-xs">
                Dari{" "}
                {story.author?._id ? (
                  <Link
                    href={`/profile/${story.author._id}`}
                    className="font-bold text-lg hover:underline"
                  >
                    {story.author?.name || "Anonymous"}
                  </Link>
                ) : (
                  <span className="font-bold text-lg">
                    {story.author?.name || "Anonymous"}
                  </span>
                )}
              </p>
            </div>
            <div className="text-sm md:text-base">
              <p className="mb-2 break-words">{story.content}</p>
            </div>
            <div className="absolute w-max flex justify-end left-6 bottom-4">
              <p className="text-[11px] md:text-sm">
                {new Date(story.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="absolute w-max flex gap-2 md:gap-3 justify-end right-6 bottom-4">
              <div
                onClick={toggleLike}
                onMouseEnter={() => setShowLikeTooltip(true)}
                onMouseLeave={() => setShowLikeTooltip(false)}
                className="w-6 h-6 rounded-full flex justify-center items-center border border-black drop-shadow-br hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-red-500"
              >
                <FaHeart className="w-5 h-5 px-1" />
              </div>
              {showLikeTooltip && (
                <div className="absolute bottom-full transform -translate-x-12 md:-translate-x-14 -translate-y-3 px-2 bg-white text-black p-1 rounded-full border border-black drop-shadow-rd text-xs whitespace-nowrap">
                  {likeCount} likes
                </div>
              )}
              <div
                onClick={toggleComments}
                onMouseEnter={() => setShowCommentTooltip(true)}
                onMouseLeave={() => setShowCommentTooltip(false)}
                className="flex gap-2 items-center"
              >
                <div className="bg-[#87e1a0] w-6 h-6 rounded-full flex justify-center items-center border border-black drop-shadow-br hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <FaCommentDots className="w-5 h-5 px-1" />
                </div>
                {showCommentTooltip && (
                  <div className="absolute bottom-full transform -translate-x-8 -translate-y-3 px-2 bg-white text-black p-1 rounded-full border border-black drop-shadow-rd text-xs whitespace-nowrap">
                    {storyComments.length} comments
                  </div>
                )}
              </div>
              <div
                onClick={toogleShare}
                onMouseEnter={() => setShowShareTooltip(true)}
                onMouseLeave={() => setShowShareTooltip(false)}
                className="bg-blue-500 w-6 h-6 rounded-full flex justify-center items-center border border-black drop-shadow-br hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <IoMdShare className="w-5 h-5 px-1" />
              </div>
              {showShareTooltip && (
                <div className="absolute bottom-full transform translate-x-4 -translate-y-3 px-2 bg-white text-black p-1 rounded-full border border-black drop-shadow-rd text-xs whitespace-nowrap">
                  Share
                </div>
              )}
            </div>
            {showComments && (
              <CommentSection
                storyId={story._id}
                initialComments={storyComments}
                onCommentAdded={handleCommentAdded}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
