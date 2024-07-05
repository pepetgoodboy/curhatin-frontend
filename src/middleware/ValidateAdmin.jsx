import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ValidateAdmin() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("tokenAdmin");
    if (!token) {
      router.push("/admin");
    }
  }, [router]);
}
