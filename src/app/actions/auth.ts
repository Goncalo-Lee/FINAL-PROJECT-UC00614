"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type SignUpState = {
  errors?: {
    email?: string;
    username?: string;
    general?: string;
  };
}

export async function signUpAction(
  prevState: SignUpState,
  formData: FormData
): Promise<SignUpState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullname = formData.get("fullname") as string;
  const username = formData.get("username") as string;

  try {
    await auth.api.signUpEmail({
      body: {email, password, name: fullname, fullname, username}
    });
  } catch (err: any) {
    if (err && typeof err === "object" && "body" in err) {

       const code = err.body?.code;

      if (code === "USER_ALREDAY_EXISTS") {
        return { errors: { email: "An account with this email address already exists." } };
      }
      if (code === "INVALID_EMAIL") {
        return { errors: { email: "Incorrectly formatted email." } };
      }
      return { errors: { general: err.message ?? "Error creating account." } }
    }
    throw err;
  }

  redirect("/");
};

export async function signInAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  redirect("/");
};

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/");
};
