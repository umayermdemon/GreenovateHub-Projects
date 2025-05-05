"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { loginValidation } from "./loginValidation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/services/auth/indes";

const LoginForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginValidation),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Signing....");
    try {
      const res = await loginUser(data);
      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else {
        toast.success(res?.message, {
          id: toastId,
        });
        router.push("/");
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2 items-center justify-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1b2a5e] text-center">
          Welcome To
        </h1>
        <div className=" sm:text-5xl font-bold text-center">
          <span className="text-green-500 text-4xl">Green</span>
          <span className="text-[#1b2a5e] text-4xl">Circle</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-lg sm:text-xl text-gray-500">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Write your email here"
                    {...field}
                    value={field.value || ""}
                    type="email"
                    className="p-4 sm:p-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-lg sm:text-xl">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Write your password here"
                    {...field}
                    value={field.value || ""}
                    type="password"
                    className="p-4 sm:p-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-center mb-4">
            <Button
              type="submit"
              className="w-full sm:w-36 text-base bg-blue-200 text-[#1b2a5e] font-semibold p-4 sm:p-6 rounded hover:bg-blue-300 cursor-pointer">
              {isSubmitting ? "Signing...." : "Sign In"}
            </Button>
          </div>
        </form>
      </Form>

      <div className="my-6 text-center">
        <div className="border-t border-gray-300 mb-4" />
        <p>OR</p>
        <p className="text-sm text-[#1b2a5e] mt-2">Sign up with your email</p>
      </div>

      <div className="flex items-center justify-center mb-4">
        <Button className="flex items-center justify-center w-full sm:w-52 p-4 sm:p-6 bg-pink-100 hover:bg-pink-200 text-pink-700 font-semibold rounded cursor-pointer">
          <FcGoogle />
          Sign Up With Google
        </Button>
      </div>

      <p className="text-center mt-4 text-sm sm:text-md text-[#1b2a5e]">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="hover:text-blue-600 hover:underline font-medium">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
