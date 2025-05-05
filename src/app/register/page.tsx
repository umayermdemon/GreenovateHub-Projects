import Image from "next/image";
import { Suspense } from "react";
import registerImg from "../assets/login.png";
import Link from "next/link";
import RegisterForm from "@/components/modules/auth/register/RegisterForm";

const RegisterPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="h-screen flex flex-col md:flex-row bg-[#f1f7fe]">
        {/* Left - Login Form */}
        <div className="w-full md:w-2/3 flex items-center justify-center  px-6 py-8">
          <RegisterForm />
        </div>

        {/* Right - Image */}
        <div className="w-full md:w-1/3 hidden md:block relative">
          <div className="absolute top-4 left-4 z-10">
            <Link href="/" className="text-md text-white hover:underline">
              ← Back to Home
            </Link>
          </div>
          <Image
            src={registerImg}
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

export default RegisterPage;
