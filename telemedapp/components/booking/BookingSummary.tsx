import React, { useState, useRef } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { Toast } from "primereact/toast";
import { convertDateToCode } from "@/utils/formatDoctorAvailabilities";
import type { Doctor } from "@/types";
interface BookingSummaryProps {
  selectedSlot: string | null;
  selectedDuration: number;
  selectedType: string;

  doctor: Doctor;
  selectedDate: {
    date: string;
    slots: { id: number; time: string }[];
  };
  appointmentState: string;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  selectedSlot,
  selectedDuration,
  selectedType,
  doctor,
  selectedDate,
  appointmentState,
}) => {
  const [complaint, setComplaint] = React.useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  // Reference for Toast
  const toast = useRef<any>(null);

  const cancelCreate = () => {
    setShowConfirmDialog(false);
  };
  const getDateTime = () => {
    if (!selectedDate || !selectedSlot) return null;

    // Combine the date and time and format it correctly
    const dateStr = new Date(selectedDate.date).toISOString().split("T")[0]; // Extract date in YYYY-MM-DD format
    const timeStr = selectedSlot; // Already in HH:mm format (assumed)

    // Construct the combined datetime string in the correct format
    const combinedDateTime = `${dateStr}T${timeStr}Z`;

    return combinedDateTime;
  };

  const getDay = (date: string) => {
    const dateObj = new Date(date);

    return dateObj.toLocaleDateString("en-US", { weekday: "long" });
  };

  const bookAppointment = () => {
    if (!selectedSlot || !selectedDate) return;
    setLoading(true);
    setTimeout(() => {
      setShowConfirmDialog(true);
      setLoading(false);
    }, 1000);
  };
  const confirmCreate = async () => {
    if (!selectedSlot || !selectedDate) return;

    setLoading(true);
    setErrorMessage(null);
    const body = {
      doctor_id: Number(doctor.id),
      complaint: complaint,
      duration: selectedDuration,
      // appointment_type: appointmentState,
      appointment_type: "First_time", //STATIC FOR NOW
      appointment_date: getDateTime(),
      appointment_parent_reference: null,
      time_slot_code: convertDateToCode(
        getDay(selectedDate.date),
        selectedSlot,
        selectedType,
      ),
    };
    console.log("body: ", body);
    try {
      const token = localStorage.getItem("jwt");

      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_SERVER_NAME}/patient/appointment/book`,
      //   {
      //     method: "POST",
      //     mode: "cors",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },

      //     body: JSON.stringify(body),
      //   }
      // );

      // if (!response.ok) {
      //   throw new Error("doctors can't book appointments");
      // }

      // Close the dialog and show success message

      setTimeout(() => {
        setShowConfirmDialog(false);
        toast.current.show({
          severity: "success",
          detail: `Request sent successfully!`,
          life: 3000,
          className:
            "bg-green-600 ml-2 text-white font-semibold rounded-lg shadow-lg p-3",
        });
      }, 2000);
    } catch (error) {
      toast.current.show({
        severity: "error",
        detail: `Failed to book appointment: ${error}`,
        life: 3000,
        className:
          "bg-red-600 ml-2 text-white font-semibold rounded-lg shadow-lg p-3",
      });
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white rounded-3xl shadow-md p-4  md:p-6 w-full">
      <Toast ref={toast} />
      <div className="flex items-center justify-center">
        <div className="md:my-2 my-1 text-blue-600 font-bold ">
          {selectedSlot ? (
            <div className="flex flex-row  md:gap-2 gap-1 items-center justify-start md:text-base text-[13px]">
              <span className="md:px-4 md:py-2 px-2 py-1 rounded-lg bg-green-600 hover:bg-green-700 text-white">
                {selectedDate?.date} {selectedSlot}
              </span>
              <span>Slot is selected</span>
            </div>
          ) : (
            "No slot selected"
          )}
        </div>
      </div>
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white md:py-3 py-2 rounded-lg font-semibold disabled:cursor-not-allowed disabled:opacity-50 md:text-base text-sm"
        disabled={!selectedSlot || loading}
        onClick={() => bookAppointment()}
      >
        {loading
          ? "Sending..."
          : `Book Now ${
              doctor?.fees60min && doctor?.fees30min
                ? `for ${
                    selectedDuration === 60
                      ? `${doctor.fees60min} EGP`
                      : `${doctor.fees30min} EGP`
                  }`
                : ""
            } `}
      </button>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      <ConfirmDialog
        visible={showConfirmDialog}
        onConfirm={confirmCreate}
        onCancel={cancelCreate}
        loading={loading}
        complaint={complaint}
        setComplaint={setComplaint}
      />
    </div>
  );
};

export default BookingSummary;
