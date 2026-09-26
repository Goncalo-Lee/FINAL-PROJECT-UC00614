"use client";

import { signUpAction, type SignUpState } from '@/app/actions/auth';
import { useActionState, useState } from 'react';

const initialState: SignUpState = {};

export default function SignUp() {

  const [state, formAction, isPending] = useActionState(signUpAction, initialState);

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordTouched, setPasswordTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const passwordRules = [
    { label: "Between 8 and 128 caracters", test: (p: string) => p.length >= 8 && p.length <= 128 },
    { label: "Needs at least one number", test: (p: string) => /[0-9]/.test(p) },
    { label: "Needs at least one symbol", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
  ];

  const emailRules = [
    {
      label: "Must contain exactly one @ symbol",
      test: (e: string) => e.split('@').length === 2,
    },
    {
      label: "Local part between 1 and 64 characters",
      test: (e: string) => {
        const localPart = e.split('@')[0] ?? "";
        return localPart.length >= 1 && localPart.length <= 64;
      },
    },
    {
      label: "Domain part between 1 and 255 characters",
      test: (e: string) => {
        const domainPart = e.split('@')[1] ?? "";
        return domainPart.length >= 1 && domainPart.length <= 255;
      }
    },
    {
      label: "Domain must contain at least one dot",
      test: (e: string) => {
        const domainPart = e.split('@')[1] ?? "";
        return domainPart.includes('.');
      }
    },
    {
      label: "Domain TLD must be at least 2 characters",
      test: (e: string) => {
        const domainPart = e.split('@')[1] ?? "";
        const tld = domainPart.split('.').pop();
        return tld !== undefined && tld.length >= 2;
      }
    },
    {
      label: "Only allows alphanumeric, dots, hyphens, and underscores",
      test: (e: string) => /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e)
    },
  ];

  const isEmailValid = emailRules.every((rule) => rule.test(email));
  const showEmailRules = emailTouched && !isEmailValid;

  const isPasswordValid = passwordRules.every((rule) => rule.test(password));
  const showPasswordRules = passwordTouched && !isPasswordValid;

  return (
    <form className="mt-10 space-y-9" action={formAction}>
      {/* Full Name + Username */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
        <div>
          <label htmlFor="fullname" className="block text-lg font-bold text-gray-900">
            Full Name
          </label>
          <input
            id="fullname"
            name="fullname"
            type="text"
            autoComplete="name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
            className="mt-3 block w-full h-12 rounded-lg bg-white px-4 text-gray-800 shadow-soft outline-none focus:ring-2 focus:ring-brand/60"
          />
        </div>
        <div>
          <label htmlFor="username" className="block text-lg font-bold text-gray-900">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={`mt-3 block w-full h-12 rounded-lg bg-white px-4 text-gray-800 shadow-soft outline-none focus:ring-2 focus:ring-brand/60 ${
              state.errors?.username ? "border-2 border-red-500" : ""
            }`}
          />
        </div>
      </div>

      {/* Email Address */}
      <div>
        <label htmlFor="email" className="block text-lg font-bold text-gray-900">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setEmailTouched(true)}
          required
          className={`mt-3 block w-full h-12 rounded-lg bg-white px-4 text-gray-800 shadow-soft outline-none focus:ring-2 focus:ring-brand/60 ${
            emailTouched && !isEmailValid ? "border-2 border-red-500" : ""
          }`}
        />
        {showEmailRules && (
          <ul>
            {emailRules.map((rule) => (
              <li
                key={rule.label}
                className={rule.test(email) ? "text-green-600" : "text-red-500"}
              >
                {rule.test(email) ? "✓" : "✗"} {rule.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-lg font-bold text-gray-900">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setPasswordTouched(true)}
          required
          className={`mt-3 block w-full h-12 rounded-lg bg-white px-4 text-gray-800 shadow-soft outline-none focus:ring-2 focus:ring-brand/60 ${
            passwordTouched && !isPasswordValid ? "border-2 border-red-500" : ""
          }`}
        />
        {showPasswordRules && (
          <ul>
            {passwordRules.map((rule) => (
              <li
                key={rule.label}
                className={rule.test(password) ? "text-green-600" : "text-red-500"}
              >
                {rule.test(password) ? "✓" : "✗"} {rule.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {state.errors?.general && <p className="text-red-600">{state.errors.general}</p>}

      {/* Submit */}
      <div className="pt-8">
        <button
          type="submit"
          disabled={!isPasswordValid || isPending}
          className="block mx-auto w-full sm:w-[76%] h-13 py-3.5 rounded-lg bg-brand text-white text-lg font-medium shadow-soft hover:bg-[#4a7de0] active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isPending ? "Creating An Account..." : "Create An Account"}
        </button>
      </div>
    </form>
  );
}
