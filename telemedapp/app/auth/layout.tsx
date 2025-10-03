"use client";
import { useState, useEffect } from "react";
import ImageContainer from "@/components/auth/ImageContainer";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import React from "react";
import "../globals.css";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      if (
        Math.floor(new Date().getTime() / 1000) >
        Number(localStorage.getItem("expiryDate"))
      ) {
        localStorage.clear();
        setLoading(false);
      } else {
        router.push("/");
      }
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex h-screen  bg-neutral-100 flex-col lg:flex-row">
      {loading ? (
        <CircularProgress className="absolute top-1/2 left-1/2" />
      ) : (
        <>
          {children}
          <ImageContainer />
        </>
      )}
    </div>
  );
}
