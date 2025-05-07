"use client";

import GFormInput from "@/components/shared/Form/GFormInput";
import GFormSelect from "@/components/shared/Form/GFormSelect";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

const categories = [
  {
    label: "Energy",
    value: "energy",
  },
  {
    label: "Waste",
    value: "waste",
  },
  {
    label: "Transportation",
    value: "transportation",
  },
];

const CreateBlog = () => {
  const form = useForm();
  const { register } = form;

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-7xl w-full mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold my-4 text-center">Create Blog</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-3xl mx-auto">
          {/* Title */}
          <div>
            <GFormInput
              control={form.control}
              name="title"
              label="Title"
              type="text"
            />
          </div>

          {/* Images */}
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700">
              Images
            </label>
            <input
              id="images"
              type="file"
              multiple
              {...register("images", { required: true })}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
          </div>

          {/* Description */}
          <div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <Textarea {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Category */}
          <div>
            <GFormSelect
              control={form.control}
              name="category"
              options={categories}
              label="Category"
              placeholder="select a category"
            />
          </div>

          {/* Status */}
          <div></div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              {isSubmitting ? "Submitting..." : "Create Blog"}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateBlog;
