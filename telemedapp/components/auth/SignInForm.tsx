"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import journeyImage from "@/images/journey.jpg";
import Image from "next/image";

function SignInForm() {
  const router = useRouter();
  const [formValid, setFormValid] = useState(false);
  const [error, setError] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    validateForm();
  }, [formData]);

  const ACCESS_TOKEN_SECRET_KEY = `${process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET_KEY}`;

  const tokenAuthentication = (req: any) => {
    const token = req.token;

    let message = "";
    if (token) {
      jwt.verify(
        token,
        ACCESS_TOKEN_SECRET_KEY,
        (err: any, decodedToken: any) => {
          if (err) {
            message = "Invalid token";
            console.log(message);
            return false;
          }
          req.id = decodedToken.id;
          req.email = decodedToken.email;
          req.userRole = decodedToken.role;
          req.firstName = decodedToken.firstName;
          req.lastName = decodedToken.lastName;
          req.tokenExpiryDate = decodedToken.exp;

          return true;
        }
      );
    } else {
      message = "No token found";
      console.log(message);
      return false;
    }
    return true;
  };

  const submitButtonClass = [
    "bg-gray-500 hover:bg-gray-700 text-white w-full p-2 text-sm transition-all duration-300",
    "disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed"
  ].join(" ");

  const validateForm = () => {
    const { email, password } = formData;
    if (email && password) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!formValid) return;

    try {
      setTimeout(async () => {
        const users = {
          token: "staticToken123",
          tokenExpiryDate: "2024-12-31T23:59:59Z",
          userRole: "Patient",
          id: "user123",
          firstName: "Mahmoud",
          lastName: "Mohamed",
        };

        if (tokenAuthentication(users)) {
          localStorage.setItem("jwt", users.token);
          localStorage.setItem("expiryDate", users.tokenExpiryDate);
          localStorage.setItem("userRole", users.userRole);
          localStorage.setItem("userId", users.id);
          localStorage.setItem("firstName", users.firstName);
          localStorage.setItem("lastName", users.lastName);
          setLoading(false);
          setError(false);
          setSignedIn(true);
          router.replace("/");
        } else {
          console.log("Error During Token Authentication");
        }
      }, 2000);
    } catch (error) {
      console.error("Error During Sign In:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1500&q=80')",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-1/2 max-w-md p-4 bg-white/20 backdrop-blur-sm self-center text-white"
      >
        <div className="mb-3">
          <label className="text-xs text-white/60">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-1 text-sm bg-white/70 border border-gray-300 text-black"
            placeholder="Enter Email"
            required
          />
        </div>
        <div className="mb-3">
          <label className="text-xs text-white/60">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-1 text-sm bg-white/70 border border-gray-300 text-black"
            placeholder="Enter Password"
            required
          />
        </div>
        <p className="text-[10px] text-white/60 mb-2">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="underline">
            Sign up
          </Link>
        </p>
        <button
          type="submit"
          className={submitButtonClass}
          disabled={!formValid || loading}
        >
          {loading ? "Loading..." : "🚀"}
        </button>
        
      </form>
    </div>
  );
}

export default SignInForm;
