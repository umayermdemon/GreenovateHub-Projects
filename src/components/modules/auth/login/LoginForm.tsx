"use client";
import { Form } from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import GFormInput from "@/components/shared/Form/GFormInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { loginUser } from "@/services/auth/indes";
import { Loader } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const RegisterForm = () => {

  const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const {
    formState: { isSubmitting },
  } = form;


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { email, password } = data;
    const loginData = {
      email,
      password,
    }
    try {
      const res = await loginUser(loginData);
      toast.success(res.message)
      if(res.success){
        window.location.href = "/"; 
      }
    } catch (error) {
      console.log(error)
    }
  };
  const commonWidth = 'w-[400px]'
  return (
    <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-[480px]">

          <div className={`space-y-1 border-2 border-green-300 border-b-0 rounded-2xl pt-6`}>
            <h1 className="text-center text-2xl text-green-500">Enter You Credentials</h1>
            <div className="w-full flex justify-center">
              <GFormInput
                name="email"
                label="Email"
                placeholder="Email"
                control={form.control}
                className={`focus:outline-none rounded-none border ${commonWidth} border-green-500`}
                required
              />
            </div>
            <div className="w-full flex justify-center ">
              <GFormInput
                name="password"
                label="Password"
                placeholder="********"
                control={form.control}
                className={`focus:outline-none rounded-none ${commonWidth}  border border-green-500`}
                type="password"
                required
              />
            </div>
            <div className="flex justify-center">
              <Button type="submit" className={`${commonWidth}  rounded-none mt-3 text-white bg-green-500 cursor-pointer`}>{isSubmitting ? <Loader className="animate-spin" /> : "Login"}</Button>
            </div>
            <h1 className="text-center text-green-500">New here? <Link className="text-black" href='/register'>SignUp</Link></h1>
            <p className="text-center">or</p>
            <div className="flex justify-center">
              <Button className="bg-amber-300 text-amber-700 cursor-pointer"><FcGoogle className="text-xl" />Google</Button>
            </div>
          </div>

        </form>
      </Form>


    </div>
  );
};

export default RegisterForm;
