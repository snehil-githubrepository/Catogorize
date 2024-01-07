import React, { useCallback, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginAtom, registerAtom } from "@/store/modelAtom";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [registerIsOpen, setRegisterIsOpen] = useRecoilState(registerAtom);

  const router = useRouter();

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/register", {
        email,
        password,
        name,
        username,
      });
      toast.success("Account Created");
      await signIn("credentials", {
        email,
        password,
      });
      setRegisterIsOpen({ isOpen: false });

      router.push("/home");
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [email, name, password, username, setRegisterIsOpen, router]);

  return (
    <div className="flex bg-black">
      <div className="w-full md:w-2/5 bg-black flex justify-center items-center h-screen max-sm:hidden max-md:hidden">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-white">Catogorize</h1>
          <img
            src="/images/cato2.png"
            alt=""
            style={{ width: "450px", height: "auto", borderRadius: "2%" }}
          />
          <div className="grid grid-cols-3 gap-4">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="opacity-50">
                <i className="fas fa-arrow-down fa-3x"></i>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-screen md:w-3/5 bg-gray-900 flex justify-center items-center">
        <div className="w-full max-w-md">
          <div className="p-5">
            <h2 className="text-2xl font-semibold mb-2 text-white text-center">
              Sign Up
            </h2>
          </div>
          <div className="mb-4 justify-center py-1 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-12 px-4 shadow sm:rounded-lg sm:px-10">
                <form>
                  <div className="flex flex-col items-center justify-center gap-4">
                    <p className="font-normal text-2xl text-gray-900">
                      Register
                    </p>

                    <p className="font-light text-sm text-gray-600">
                      Create an account on Catogorize.
                    </p>

                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full py-2 px-4 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
                      required
                    />
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full py-2 px-4 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full py-2 px-4 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full py-2 px-4 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
                      required
                    />
                    <button
                      type="submit"
                      onClick={onSubmit}
                      className="w-full flex justify-center items-center gap-2 py-3 px-4 border rounded font-light text-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="p-2 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <a href="login" className="text-blue-500">
                  Log in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
