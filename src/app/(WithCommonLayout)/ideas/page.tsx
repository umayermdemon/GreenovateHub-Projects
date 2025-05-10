"use client";
import IdeaCard from "@/components/modules/Idea/IdeaCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/UserContext";
import { getAllIdeas } from "@/services/idea";
import { TIdea } from "@/types/idea.types";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
const tabOrder = ["all", "energy", "waste", "transportation"];

const IdeaPage = () => {
  const [ideas, setIdeas] = useState<TIdea[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const fetchIdeas = async (category?: string) => {
    const res = await getAllIdeas({ category, searchTerm });
    console.log(res);
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          fetchIdeas(val === "all" ? undefined : val)
        }}
        className="mb-5">
        <TabsList className="w-full">
          {tabOrder.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="w-full data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-3 gap-4 mx-5 ">
        {
          ideas?.map((idea: TIdea) => (<IdeaCard key={idea.id} data={idea} refresh={fetchIdeas} userId={user?.userId} />))
        }
      </div>
    </div>
  );
};

export default IdeaPage;
