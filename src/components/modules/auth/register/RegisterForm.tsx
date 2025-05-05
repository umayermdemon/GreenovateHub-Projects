"use client";
import Logo from "@/app/assets/svgs/Logo";
import { Button } from "@/components/ui/button";
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
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { registrationValidation } from "./registrationValidation";
import { toast } from "sonner";
import { registerUser } from "@/services/AuthServices";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registrationValidation),
  });
  const router = useRouter();
  const {
    formState: { isSubmitting },
  } = form;
  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Registering....");
    try {
      const res = await registerUser(data);
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
    <div className="max-w-lg w-full flex-grow bg-[#f6f6f6] rounded-md p-8">
      <div className="space-y-4">
        <div className="flex gap-2 items-center">
          <Logo />
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">Sign up</h1>
            <p className="text-sm text-gray-600">
              Enter your email and phone number to sign up.
            </p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write your name here"
                      {...field}
                      value={field.value || ""}
                      className="rounded-2xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write your email here"
                      {...field}
                      value={field.value || ""}
                      type="email"
                      className="rounded-2xl"
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
                  <FormLabel className="font-bold">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write your password here"
                      {...field}
                      value={field.value || ""}
                      type="password"
                      className="rounded-2xl"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Rewrite your password here"
                      {...field}
                      value={field.value || ""}
                      type="password"
                      className="rounded-2xl"
                    />
                  </FormControl>
                  {passwordConfirm && password !== passwordConfirm ? (
                    <FormMessage> Password does not match </FormMessage>
                  ) : (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />
            <Button
              disabled={
                (passwordConfirm && password !== passwordConfirm) as boolean
              }
              type="submit"
              className="w-full rounded-2xl">
              {isSubmitting ? "Registering...." : "Sign Up"}
            </Button>
          </form>
        </Form>
        <div className="text-center space-y-4">
          <h2 className="font-bold">Or Sign Up with</h2>
          <div className="flex flex-row justify-center gap-8">
            <FaFacebookF className="bg-white p-2 text-4xl rounded-xl cursor-pointer text-blue-600 " />
            <FaLinkedinIn className="bg-white p-2 text-4xl rounded-xl cursor-pointer text-blue-700 " />
            <FcGoogle className="bg-white p-2 text-4xl rounded-xl cursor-pointer " />
          </div>
          <p className="text-sm">
            Already have an account?{" "}
            <Link href="/login" className="cursor-pointer">
              <strong>Sign In</strong>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
