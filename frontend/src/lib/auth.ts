"use server";

import {
  Token,
  loginForAccessTokenTokenPost,
  User,
  createUserUsersPost,
} from "@/client";

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
