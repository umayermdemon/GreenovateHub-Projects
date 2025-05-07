"use client";

import { categoryOptions } from "@/components/modules/Idea/Category/Category";
import GFormImageUpload from "@/components/shared/Form/GFormImageUploader";
import GFormInput from "@/components/shared/Form/GFormInput";
import GFormSelect from "@/components/shared/Form/GFormSelect";
import { PageHeader } from "@/components/singles/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const tabOrder = ["general", "solution", "info"];

const CreateIdea = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [mounted, setMounted] = useState(false);
  const [ImageUrls, setImageUrls] = useState<File | File[]>([]);
  console.log(ImageUrls);
  const form = useForm();
  const {} = form;

  const goToNext = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };
  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    // Handle form submission
  };

  if (!mounted) return null; // Or a loading spinner
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Create An Idea"
          description="Got something unique in mind? Write it down!"
        />
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <Form {...form}>
          <form>
            {/* Tabs Header */}
            <TabsList className="w-full">
              {tabOrder.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="w-full data-[state=active]:bg-green-500 data-[state=active]:text-white">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tabs Content */}

            <TabsContent className="mt-5" value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Information</CardTitle>
                  <CardDescription>
                    Provide General Information about your website
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GFormInput
                    name="title"
                    defaultValue=""
                    label="Idea Title"
                    placeholder="Idea Title"
                    control={form.control}
                    className="border-green-500 hover:border- mb-4 hover:border-amber-400"
                    required
                  />
                  <GFormSelect
                    name="category"
                    label="Category"
                    control={form.control}
                    options={categoryOptions}
                    className="w-full border-green-500 hover:border-amber-400 mb-4"
                    required
                  />
                  <div className="space-y-2">
                    <Label htmlFor="image">Event Banner *</Label>
                    <div className="border-2 border-dashed rounded-lg p-12 text-center border-green-500 hover:border-amber-400 transition-colors cursor-pointer">
                      <GFormImageUpload
                        control={form.control}
                        name="images"
                        multiple={false}
                        onImageUpload={setImageUrls}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" onClick={onSubmit}>
                    Submit
                  </Button>
                  <Button
                    style={{ backgroundColor: "#22c55e" }}
                    onClick={goToNext}
                    type="button">
                    Next: Solution{" "}
                    <ArrowRight className="ml-2 h-4 w-4 cursor-pointer" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="solution">
              <Card>
                <CardContent>
                  <GFormInput
                    name="description"
                    label="Description"
                    placeholder="Description"
                    control={form.control}
                    required
                  />
                </CardContent>
                <CardFooter className="flex justify-between pt-4">
                  <Button
                    style={{ backgroundColor: "#22c55e" }}
                    onClick={() => setActiveTab("general")}
                    type="button">
                    <ArrowLeft className="ml-2 h-4 w-4 cursor-pointer" /> Prev:
                    General
                  </Button>
                  <Button
                    style={{ backgroundColor: "#22c55e" }}
                    onClick={goToNext}
                    type="button">
                    Next: Solution{" "}
                    <ArrowRight className="ml-2 h-4 w-4 cursor-pointer" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="info">
              <Card>
                <CardContent>
                  <GFormInput
                    name="price"
                    label="Price"
                    placeholder="Price"
                    control={form.control}
                    required
                  />
                  <GFormInput
                    name="solution"
                    label="Idea"
                    placeholder="Idea"
                    control={form.control}
                    required
                  />
                </CardContent>
                <CardFooter>
                  <Button
                    style={{ backgroundColor: "#22c55e" }}
                    onClick={() => setActiveTab("solution")}
                    type="button">
                    <ArrowLeft className="ml-2 h-4 w-4 cursor-pointer" /> Prev:
                    Solution
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default CreateIdea;
