import LoginForm from "@/components/modules/auth/login/LoginForm";
import Image from "next/image";
import { Suspense } from "react";
import loginImg from "../assets/login.png";
import Link from "next/link";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="h-screen flex flex-col md:flex-row-reverse bg-[#f1f7fe]">
        {/* Left - Login Form */}
        <div className="w-full md:w-2/3 flex items-center justify-center  px-6 py-8">
          <LoginForm />
        </div>

        {/* Right - Image */}
        <div className="w-full md:w-1/3 hidden md:block relative">
          <div className="absolute top-4 left-4 z-10">
            <Link href="/" className="text-md text-white hover:underline">
              ← Back to Home
            </Link>
          </div>
          <Image
            src={loginImg}
            alt="login"
            fill
            className="w-full h-full"
            priority
          />
        </div>
      </div>
    </Suspense>
  );
};

export default LoginPage;
