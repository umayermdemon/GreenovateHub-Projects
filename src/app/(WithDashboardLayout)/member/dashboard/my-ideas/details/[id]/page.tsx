"use client";

import IdeaDetailsCard from "@/components/modules/Idea/IdeaDetailsCard";
import { getSingleIdea } from "@/services/idea";
import { getSingleUSer } from "@/services/user";
import IdeaDetailsSkeleton from "@/skeletons/IdeaDetailsSkeleton";
import { TAuthor } from "@/types/blog.types";
import { TIdea } from "@/types/idea.types";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const IdeaDetails = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState<TIdea | null>(null);
  const [user, setUser] = useState<TAuthor | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getSingleIdea(id);
      if (res?.data) {
        setIdea(res.data);
        const userRes = await getSingleUSer(res.data.authorId);
        if (userRes?.data) {
          setUser(userRes.data);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading || !idea || !user) {
    return <IdeaDetailsSkeleton />;
  }

  return <IdeaDetailsCard idea={idea} user={user} refresh={fetchData} />;
};

export default IdeaDetails;
