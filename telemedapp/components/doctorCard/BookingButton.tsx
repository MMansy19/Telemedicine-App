import { useRouter } from "next/navigation"; // next/navigation for App Router
import stylesButton from "../navbarComp/navbar.module.css";
import type { Doctor } from "@/types";
const BookingButton = ({ doctor }: { doctor: any }) => {
  const router = useRouter();

  // Navigate to booking page with doctor info
  const handleBookNow = () => {
    if (!localStorage.getItem("jwt")) {
      window.location.href = "/auth/signin";
    } else if (
      Math.floor(new Date().getTime() / 1000) >
      Number(localStorage.getItem("expiryDate"))
    ) {
      localStorage.clear();
      window.location.href = "/auth/signin";
    } else {
      const doctorBooking: Doctor = {
        id: doctor.id,
        name: doctor.name,
        title: doctor.title,
        numSessions: doctor.numSessions,
        nearestApp: doctor.nearestApp,
        fees60min: doctor.fees60min,
        fees30min: doctor.fees30min,
        interests: doctor.interests,
        rating: doctor.rating,
        numReviews: doctor.numReviews,
      };

      const encodedDoctor = encodeURIComponent(JSON.stringify(doctorBooking)); // Encode the doctor object
      // router.push(`/booking?doctor=${encodedDoctor}`);
      router.push(`doctors/${doctorBooking.id}?doctorBooking=${encodedDoctor}`);
    }
  };

  return (
    <button
      className={
        stylesButton.gradient_button +
        " text-xs md:text-md text-white py-1 px-1 md:px-0 md:py-3 rounded-xl w-full hover:scale-110 transition "
      }
      onClick={handleBookNow}
    >
      Book Now
    </button>
  );
};

export default BookingButton;
