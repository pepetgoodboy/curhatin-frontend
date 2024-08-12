import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import StoryCard from "../components/StoryCard";
import AddStoryForm from "../components/AddStoryForm";
import Footer from "@/components/Footer";
import { getAllStories } from "../utils/api";
import Image from "next/image";
import Cat from "../../public/images/catCute.png";
import Link from "next/link";
import Swal from "sweetalert2";

const STORIES_PER_PAGE = 5;

const url = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [stories, setStories] = useState([]);
  const [visibleStories, setVisibleStories] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const router = useRouter();

  const isLogin = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      Swal.fire({
        icon: "warning",
        title: "Anda Sudah Login",
        confirmButtonColor: "#87e1a0",
        confirmButtonText: "Oke",
        allowOutsideClick: false,
      });
    }
  };

  const fetchStories = async (pageNum = 1) => {
    try {
      const response = await getAllStories(pageNum);
      if (pageNum === 1) {
        setStories(response.data.data);
        setVisibleStories(response.data.data);
      } else {
        setStories((prevStories) => [...prevStories, ...response.data.data]);
        setVisibleStories((prevStories) => [
          ...prevStories,
          ...response.data.data,
        ]);
      }
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };
  useEffect(() => {
    fetchStories();
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    fetchStories(nextPage);
    setPage(nextPage);
  };

  const handleCommentAdded = (storyId, newComment) => {
    setStories((prevStories) =>
      prevStories.map((story) =>
        story._id === storyId
          ? { ...story, comments: [...story.comments, newComment] }
          : story
      )
    );
    setVisibleStories((prevVisibleStories) =>
      prevVisibleStories.map((story) =>
        story._id === storyId
          ? { ...story, comments: [...story.comments, newComment] }
          : story
      )
    );
  };

  return (
    <Layout>
      <div className="pt-8 md:pt-14 font-comfortaa">
        <div className="w-80 mx-auto mb-2">
          <Image src={Cat} alt="Cat" priority />
        </div>
        <div className="max-w-max mx-auto text-center font-medium text-lg leading-tight pt-4">
          <p className="text-3xl">Curhatin</p>
          <p>Bingung cerita kemana? Curhatin Aja!</p>
        </div>
        <div className="flex justify-center gap-[14px] mt-14 mb-16">
          <button
            type="button"
            onClick={isLogin}
            className="bg-purple-500 py-0.5 px-6 rounded-lgm border border-black drop-shadow-br transition-all duration-300 hover:bg-neutral-100"
            href="/login"
          >
            Login
          </button>
          <Link
            className="bg-[#87e1a0] py-0.5 px-6 rounded-lgm border border-black drop-shadow-br transition-all duration-300 hover:bg-neutral-100"
            href="/register"
          >
            Daftar
          </Link>
        </div>
      </div>
      <AddStoryForm onStoryAdded={fetchStories} />
      <p className="text-center text-xl my-8 font-bold font-comfortaa">
        Curhatan Orang-orang
      </p>
      {visibleStories && visibleStories.length > 0 ? (
        visibleStories.map((story) => (
          <StoryCard
            key={story._id}
            story={story}
            onCommentAdded={handleCommentAdded}
          />
        ))
      ) : (
        <p className="text-center text-lg my-8 font-semibold font-comfortaa">
          Belum ada Cerita....
        </p>
      )}
      {hasMore && (
        <div className="flex justify-center drop-shadow-br font-comfortaa">
          <button
            onClick={loadMore}
            className="mt-4 mx-auto items-center bg-[#8BD3DD] hover:-translate-y-1 transition-all duration-300 px-6 py-2 rounded-lgm border border-black"
          >
            Load More
          </button>
        </div>
      )}
      <Footer />
    </Layout>
  );
}
