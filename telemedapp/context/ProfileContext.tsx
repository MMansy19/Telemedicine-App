"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

interface ProfileData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: string;
  birthDate: string;
  languages: string;
}

interface ProfileContextType {
  profileData: ProfileData | null;
  loading: boolean;
  setLoading(value: boolean): void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const expiryDate = localStorage.getItem("expiryDate");
    const userRole = localStorage.getItem("userRole");
    const storedProfile = localStorage.getItem("registeredUser");
    if (!token) {
      if (
        pathname !== "/auth/signin" &&
        pathname !== "/auth/signup" &&
        pathname !== "/doctors" &&
        pathname !== "/"
      ) {
        router.push("/auth/signin");
      }
    } else if (
      expiryDate &&
      Math.floor(new Date().getTime() / 1000) > Number(expiryDate)
    ) {
      localStorage.clear();
      router.push("/auth/signin");
    } else if (storedProfile) {
      const parsedProfile =
        userRole === "Patient"
          ? JSON.parse(storedProfile)
          : JSON.parse(storedProfile).personalInfo;
      setProfileData({
        firstName: parsedProfile.fName || parsedProfile.firstName || "",
        lastName: parsedProfile.lName || parsedProfile.lastName || "",
        phone: parsedProfile.phone || "",
        email: parsedProfile.email || "",
        gender: parsedProfile.gender || "",
        birthDate: parsedProfile.birthDate || "",
        languages: parsedProfile.languages || "Arabic, English",
      });
    }
    setLoading(false);
  }, [pathname, router]);

  return (
    <ProfileContext.Provider value={{ profileData, loading, setLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};
