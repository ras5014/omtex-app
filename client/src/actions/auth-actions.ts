"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const strapiBaseUrl = process.env.STRAPI_BASE_URL;

export const authActions = async (formData) => {
  console.log("Form Data:", formData);
  // Here you would typically handle the form submission,
  const response = await fetch(`${strapiBaseUrl}/api/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }
  const data = await response.json();
  // Handle the response data, e.g., save token, redirect, etc.
  const { jwt, user } = data;
  // Use cookies instead of sessionStorage
  const cookieStore = await cookies();
  cookieStore.set("jwt", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  cookieStore.set("user", JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  redirect("/dashboard"); // Redirect to the dashboard after successful login
};
