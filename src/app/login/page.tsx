import LoginForm from "@/components/modules/auth/login/LoginForm";
import Image from "next/image";
import { Suspense } from "react";
import loginImg from "../assets/login.jpg";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen flex">
        {/* Left - Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-[#f1f7fe] px-4">
          <LoginForm />
        </div>

        {/* Right - Image */}
        <div className="hidden md:block w-1/2">
          <Image
            src={loginImg}
            alt="login"
            width={500}
            height={500}
            className="hidden lg:block w-full object-cover h-screen"
          />
        </div>
      </div>
    </Suspense>
  );
};

export default LoginPage;
