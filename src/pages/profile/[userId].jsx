import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import StoryCard from "../../components/StoryCard";
import { getUserProfile } from "../../utils/api";
import Footer from "@/components/Footer";
import Image from "next/image";
import ProfileImage from "../../../public/images/kitty.png";
import Loading from "../../../public/images/Cat.gif";
import Head from "next/head";

export default function UserProfile() {
  const router = useRouter();
  const { userId } = router.query;
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      fetchUserProfile(userId);
    }
  }, [userId]);

  const fetchUserProfile = async (id) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = await getUserProfile(id);
      if (response.success) {
        setUserProfile(response.data);
      } else {
        setError(response.message || "Failed to load user profile");
      }
      setIsLoading(false);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load user profile"
      );
      setIsLoading(false);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center -mt-20 lg:-mt-28">
        <Image
          src={Loading}
          alt="Loading"
          className="w-60 h-60 md:w-80 md:h-80"
        />
      </div>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Profile - Curhatin</title>
      </Head>
      <div className="w-full bg-neutral-100 mx-auto sticky top-0 pt-4 z-20 mb-4 font-comfortaa">
        <div className="w-11/12 md:w-4/6 mx-auto p-4 border border-black drop-shadow-br rounded-lgm mb-6 bg-white">
          <div className="flex gap-4 sm:gap-8 items-center mb-1 sm:mb-0">
            <div className="rounded-full bg-white border border-black drop-shadow-br w-20 h-20 sm:w-24 sm:h-24 aspect-square overflow-hidden">
              <Image
                src={ProfileImage}
                alt="Profile"
                unoptimized
                className="w-full h-full object-cover aspect-square p-2 md:p-3"
              />
            </div>
            <div className="flex-1">
              <div className="md:flex gap-4 items-center mb-2">
                <p className="text-2xl font-bold">{userProfile.user.name}</p>
                <p className="text-xs">1K followers - 1K following</p>
              </div>
              <div>
                <p className="text-sm hidden sm:block"></p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-11/12 md:w-4/6 mx-auto pb-4 font-comfortaa text-lg font-bold">
          <h2>Cerita dari {userProfile.user.name}</h2>
        </div>
      </div>
      <div className="container mx-auto px-4 font-comfortaa">
        <div className="mb-8">
          {userProfile.stories.length > 0 ? (
            userProfile.stories.map((story) => (
              <StoryCard key={story._id} story={story} />
            ))
          ) : (
            <p className="text-center text-lg font-medium">
              Belum ada cerita dari {userProfile.user.name}
            </p>
          )}
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
