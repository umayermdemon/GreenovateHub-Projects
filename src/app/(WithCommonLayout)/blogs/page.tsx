"use client";
import BlogCard from "@/components/modules/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/UserContext";
import { getAllBlogs } from "@/services/blog";
import { TBlog } from "@/types/blog.types";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const tabOrder = ["all", "energy", "waste", "transportation"];

const BlogPage = () => {
  const [ideas, setIdeas] = useState<TBlog[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("all");

  const fetchIdeas = async () => {
    const res = await getAllBlogs();
    if (res?.data) {
      setIdeas(res.data);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  const { user } = useUser();
  return (
    <div className="mx-8 my-6">
      <div className="flex  my-3 gap-2 ">
        <div className="flex">
          <Input
            placeholder="Search Idea..."
            className="lg:w-[300px] border-black rounded-r-none focus:border-green-500 focus:ring-0 focus:outline-none"
          />
          <Button
            className="rounded-l-none rounded-r-full cursor-pointer"
            size="icon"
          >
            <Search size={18} />
          </Button>
        </div>
        <Select>
          <SelectTrigger className="w-[180px] ">
            <SelectValue placeholder="Order By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc"></SelectItem>
            <SelectItem value="desc">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>

      </div>
      <Tabs
        value={selectedTab}
        onValueChange={(val) => {
          setSelectedTab(val);
        }}
        className="mb-5">
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
      </Tabs>
      <div className="grid grid-cols-3 gap-4 mx-5 ">
        {ideas?.map((blog: TBlog) => (
          <BlogCard
            key={blog.id}
            data={blog}
            refresh={fetchIdeas}
            userId={user?.userId}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
