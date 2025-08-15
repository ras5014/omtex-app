"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const strapiBaseUrl =
  process.env.STRAPI_BASE_URL || "http://localhost:1337/api";

export const authActions = async (formData: unknown) => {
  try {
    const response = await fetch(`${strapiBaseUrl}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();

      // Handle specific error cases
      if (response.status === 400) {
        throw new Error("Invalid email or password");
      } else if (response.status === 429) {
        throw new Error("Too many login attempts. Please try again later");
      } else {
        console.error("Login error:", errorData);
        throw new Error("Login failed");
      }
    }

    const data = await response.json();
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

    return { success: true };
  } catch (error) {
    // Re-throw the error to be handled by the client
    console.error("Login error:", error);
    throw new Error("Login failed");
  }
};
