import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import Input from "@/components/Input";
const Auth = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState<"login" | "signup">("login");

  const toggleVariant = () => {
    setVariant((prev) => (prev === "login" ? "signup" : "login"));
  };

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/",
      });
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        name,
        email,
        password,
      });
      login();
    } catch (err) {
      console.log(err);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full  bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-ful h-full lg:bg-opacity-50">
        <nav className=" px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-12 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Sign up"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "signup" && (
                <Input
                  id="name"
                  label="Username"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              )}
              <Input
                id="email"
                label="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Input
                id="password"
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              onClick={variant === "login" ? login : register}
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
