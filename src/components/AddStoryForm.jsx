import { useState } from "react";
import { useRouter } from "next/router";
import { addStory } from "../utils/api";
import ValidateUser from "@/middleware/ValidateUser";

export default function AddStoryForm({ onStoryAdded }) {
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await ValidateUser(router);
    if (!isValid) return;

    try {
      await addStory(content);
      setContent("");
      onStoryAdded();
    } catch (error) {
      console.error("Error adding story:", error);
    }
  };

  return (
    <section className="container font-comfortaa">
      <p className="mt-8 mx-auto max-w-max text-xl font-semibold">
        Submit Ceritamu!
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-11/12 md:w-4/6 mx-auto mt-5 mb-10 flex flex-col gap-5"
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tulis ceritamu..."
          required
          className="w-full border px-6 py-4 bg-[#FFEAA0] border-black rounded-lgm outline-none placeholder:text-black drop-shadow-br h-full"
          rows="4"
        />
        <button
          type="submit"
          className="w-full border px-6 py-[10px] bg-blue-400 font-semibold border-black rounded-lgm hover:bg-neutral-100 transition-all duration-300 drop-shadow-br"
        >
          Posting Ceritamu!
        </button>
      </form>
    </section>
  );
}
