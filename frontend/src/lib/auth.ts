"use server";

import {
  Token,
  loginForAccessTokenTokenPost,
  User,
  createUserUsersPost,
  OpenAPI
} from "@/client";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";


export async function loginUser(
  username: string,
  password: string
): Promise<Token | ServerError> {
  try {
    const token = await loginForAccessTokenTokenPost({
      formData: { username, password },
    });
    return token;
  } catch (error: any) {
    if (error.response) {
      return {
        error: error.response.data.detail,
      };
    } else if (error.request) {
      return {
        error: "No response from the server",
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
}

export async function createUser(
  email: string,
  password: string
): Promise<User | ServerError> {
  try {
    const user = await createUserUsersPost({
      requestBody: { email, password },
    });
    return user;
  } catch (error: any) {
    if (error.response) {
      // The client was given an error response (5xx, 4xx)
      return {
        error: error.response.data.detail,
      };
    } else if (error.request) {
      // The client never received a response, and the request was never left
      return {
        error: "No response from the server",
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
}

export async function configureRequestWithAuth() {
  OpenAPI.interceptors.request.use(async (request) => {
    const token = cookies().get("access_token");
    if (!token) redirect("/login");
    if (token && request.headers) {
      request.headers.Authorization = `Bearer ${token.value}`;
    }
    return request;
  });
}
