"use client";
import IdeaCard from "@/components/modules/Idea/IdeaCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/UserContext";
import { getAllIdeas } from "@/services/idea";
import { TIdea } from "@/types/idea.types";
import { useEffect, useState } from "react";
const tabOrder = ["all", "energy", "waste", "transportation"];

const IdeaPage = () => {
  const [ideas, setIdeas] = useState<TIdea[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("all");

  const fetchIdeas = async (category?: string) => {
    const res = await getAllIdeas({ category });
    console.log(res);
    if (res?.data) {
      setIdeas(res.data);
    }
  };
  useEffect(() => {
    fetchIdeas();
  }, []);
  const { user } = useUser();
  console.log(selectedTab);
  return (
    <div className="mx-8">
      <Tabs
        value={selectedTab}
        onValueChange={(val) => {
          setSelectedTab(val);
          fetchIdeas(val === "all" ? undefined : val);
        }}
        className="my-6 mx-5">
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
        {ideas?.map((idea: TIdea) => (
          <IdeaCard
            key={idea.id}
            data={idea}
            refresh={fetchIdeas}
            userId={user?.userId}
          />
        ))}
      </div>
    </div>
  );
};

export default IdeaPage;
