import Swal from "sweetalert2";

export default async function ValidateUser(router) {
  const token = localStorage.getItem("token");
  if (!token) {
    const result = await Swal.fire({
      title: "Mohon login terlebih dahulu",
      icon: "warning",
      confirmButtonColor: "#87e1a0",
      confirmButtonText: "OK",
      allowOutsideClick: false,
    });

    if (result.isConfirmed) {
      router.push("/login");
    }
    return false;
  }
  return true;
}
