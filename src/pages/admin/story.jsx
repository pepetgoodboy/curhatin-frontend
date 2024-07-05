import Image from "next/image";
import Cat from "../../../public/images/catCute.png";
import Link from "next/link";
import NavbarAdmin from "@/components/NavbarAdmin";
import { FaTrashCan } from "react-icons/fa6";
import { getAllStory, removeStory } from "@/utils/api";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import ValidateAdmin from "@/middleware/ValidateAdmin";
import Loading from "../../../public/images/Cat.gif";

export default function Story() {
  ValidateAdmin();
  const [story, setStory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchStory();
  }, []);

  const fetchStory = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = await getAllStory();
      if (response.data.success) {
        setStory(response.data.data);
        console.log(response.data.data);
      } else {
        setError(response.data.message || "Failed to fetch story");
      }
      setIsLoading(false);
    } catch (error) {
      setError(error.message || "Failed to fetch story");
      setIsLoading(false);
    }
  };

  const handleRemoveStory = async (storyId) => {
    try {
      const result = await Swal.fire({
        title: "Apakah Anda yakin ingin menghapus cerita ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#87e1a0",
        cancelButtonColor: "#d33",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        const response = await removeStory(storyId);
        if (response.data.success) {
          fetchStory();
        } else {
          setError(response.data.message || "Failed to remove story");
        }
      }
    } catch (error) {
      setError(error.message || "Failed to remove story");
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
          unoptimized
          className="w-60 h-60 md:w-80 md:h-80"
        />
      </div>
    );
  }

  return (
    <div className=" bg-gray-100">
      <div className="pt-8 md:pt-14 font-comfortaa">
        <div className="w-80 mx-auto mb-2">
          <Image src={Cat} alt="Cat" priority />
        </div>
        <div className="max-w-max mx-auto text-center font-medium text-lg leading-tight pt-4">
          <p className="text-3xl">Admin Panel Curhatin</p>
        </div>
        <div className="flex flex-col justify-center gap-[14px] mt-6 mb-16">
          <div className="flex justify-center gap-[14px]">
            <Link
              className="bg-purple-500 py-0.5 px-6 rounded-lgm border border-black drop-shadow-br transition-all duration-300 hover:bg-neutral-100"
              href="/admin/users"
            >
              Users
            </Link>
            <Link
              className="bg-[#87e1a0] py-0.5 px-6 rounded-lgm border border-black drop-shadow-br transition-all duration-300 hover:bg-neutral-100"
              href="/admin/story"
            >
              Story
            </Link>
          </div>
          <p className="flex justify-center mt-6 font-semibold text-lg">
            Story Management
          </p>
        </div>
        <div className="flex flex-col w-11/12 md:w-4/6 mx-auto">
          <div className="-m-1.5 overflow-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border border-neutral-700 rounded-lg overflow-auto">
                <table className="min-w-full divide-y divide-neutral-700">
                  <thead className="bg-[#87e1a0]">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs md:text-sm font-bold"
                      >
                        Author
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs md:text-sm font-bold"
                      >
                        Content
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs md:text-sm font-bold"
                      >
                        Like
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs md:text-sm font-bold"
                      >
                        Created At
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs md:text-sm font-bold"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-700">
                    {Array.isArray(story) && story.length > 0 ? (
                      story.map((userStory, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-xs md:text-sm">
                            {userStory.author.name}
                          </td>
                          <td className="px-6 py-4 text-xs md:text-sm break-all">
                            {userStory.content}
                          </td>
                          <td className="px-6 py-4 text-xs md:text-sm break-all">
                            {userStory.likes}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs md:text-sm">
                            {new Date(userStory.createdAt).toLocaleString()}
                          </td>
                          <td
                            onClick={() => handleRemoveStory(userStory._id)}
                            className="whitespace-nowrap px-6 py-4 text-xs md:text-sm"
                          >
                            <div className="flex gap-2 items-center cursor-pointer">
                              <FaTrashCan className="text-red-500 hover:text-red-700" />
                              <p className="font-medium ">Delete</p>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium"
                        >
                          No story found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavbarAdmin />
    </div>
  );
}
