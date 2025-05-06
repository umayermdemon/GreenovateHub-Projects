"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { registrationValidation } from "./registrationValidation";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { FormInput } from "@/components/shared/FormInput";
import GCImageUploader from "@/components/ui/core/GCImageUploader";
import { useState } from "react";
import ImagePreviewer from "@/components/ui/core/GCImageUploader/ImagePreviewer";
import { registerUser } from "@/services/auth/indes";
import { uploadToCloudinary } from "@/components/shared/uploadToCloudinary";

const RegisterForm = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const form = useForm({
    resolver: zodResolver(registrationValidation),
  });
  const router = useRouter();
  const {
    formState: { isSubmitting },
  } = form;

  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirectPath") || "/";

  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const toastId = toast.loading("Registering....");
      if (imageFiles.length === 0) {
        toast.error("Please upload at least one image.");
        toast.dismiss(toastId);
        return;
      }
      const uploadedImageUrl = await uploadToCloudinary(
        imageFiles[0],
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
      );
      const address = data.address + ", " + data.city + ", " + data.country;
      const userData = {
        ...data,
        address,
        image: uploadedImageUrl,
      };
      const res = await registerUser(userData);
      console.log(res);
      if (!res.success) {
        toast.error(res?.message, { id: toastId });
      } else {
        toast.success(res?.message, { id: toastId });
        router.push(redirectPath);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong, please try again later.");
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2 items-center justify-center mb-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1b2a5e] text-center">
          Welcome To
        </h1>
        <div className="text-3xl sm:text-4xl font-bold text-center">
          <span className="text-green-500">Green</span>
          <span className="text-[#1b2a5e]">Circle</span>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
            <div className="w-full sm:w-[48%]">
              <FormInput
                control={form.control}
                label="Name"
                name="name"
                placeholder="Write your name here"
                type="text"
              />
            </div>
            <div className="w-full sm:w-[48%]">
              <FormInput
                control={form.control}
                label="Email"
                name="email"
                placeholder="Write your email here"
                type="email"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
            <div className="w-full sm:w-[48%]">
              <FormInput
                control={form.control}
                label="Password"
                name="password"
                placeholder="Write your password here"
                type="password"
              />
            </div>
            <div className="w-full sm:w-[48%]">
              <FormInput
                control={form.control}
                label="Confirm Password"
                name="passwordConfirm"
                placeholder="Rewrite your password here"
                type="password"
              />
              {passwordConfirm && password !== passwordConfirm && (
                <p className="text-red-500 text-sm mt-1">
                  Password does not match
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
            <div className="w-full sm:w-[48%]">
              <FormInput
                control={form.control}
                label="Address"
                name="address"
                placeholder="Write your address here"
                type="text"
              />
            </div>

            <div className="w-full sm:w-[48%]">
              <FormInput
                control={form.control}
                label="City"
                name="city"
                placeholder="Write your city here"
                type="text"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-full sm:w-[48%]">
              <FormInput
                control={form.control}
                label="Country"
                name="country"
                placeholder="Write your country here"
                type="text"
              />
            </div>
            <div>
              {imagePreview.length > 0 ? (
                <ImagePreviewer
                  imagePreview={imagePreview}
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                />
              ) : (
                <GCImageUploader
                  label="User Image"
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  className="flex justify-end"
                />
              )}
            </div>
          </div>

          <div className="flex items-center justify-center mb-4">
            <Button
              disabled={
                (passwordConfirm && password !== passwordConfirm) as boolean
              }
              type="submit"
              className="w-full sm:w-36 text-base bg-blue-200 text-[#1b2a5e] font-semibold p-3 sm:p-4 rounded hover:bg-blue-300 cursor-pointer">
              {isSubmitting ? "Registering...." : "Sign Up"}
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
        <Button className="flex items-center justify-center w-full sm:w-52 p-3 sm:p-4 bg-pink-100 hover:bg-pink-200 text-pink-700 font-semibold rounded cursor-pointer">
          <FcGoogle />
          Sign Up With Google
        </Button>
      </div>

      <p className="text-center mt-4 text-sm sm:text-md text-[#1b2a5e]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="hover:text-blue-600 hover:underline font-medium">
          Sign in here
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
