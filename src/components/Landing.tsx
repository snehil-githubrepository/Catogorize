import { FcGoogle } from "react-icons/fc";
import GoogleIcon from "./assets/google.svg";

export const Landing = () => {
  async function onSignin() {}

  return (
    <div className="flex bg-black">
      <div className="w-full md:w-2/5 bg-black flex justify-center items-center h-screen max-sm:hidden max-md:hidden">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-white">Catogorize</h1>
          <img
            src="/images/cato.jpg"
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
              Log In
            </h2>
          </div>
          <div className=" mb-4  justify-center py-1 sm:px-6 lg:px-8 ">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-12 px-4 shadow sm:rounded-lg sm:px-10">
                <div className="flex flex-col items-center justify-center gap-4">
                  <p className="font-normal text-2xl text-gray-900">Welcome</p>

                  <p className="font-light text-sm text-gray-600">
                    Log in to continue to Catogorize.
                  </p>
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-2 py-3 px-4 border rounded font-light text-md hover:bg-gray-200 focus:outline-none focus:ring-2 "
                    onClick={() => onSignin()}
                  >
                    <FcGoogle className="w-5 h-5 mr-2" />
                    Continue with Google
                  </button>
                </div>
              </div>
            </div>
            <div className="p-2 text-center">
              <p className="text-gray-400">
                New to Catogorize?{" "}
                <a href="register" className="text-blue-500">
                  Sign up for an account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
