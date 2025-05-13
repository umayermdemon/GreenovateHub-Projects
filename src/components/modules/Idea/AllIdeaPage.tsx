"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllIdeas } from "@/services/idea";
import { TIdea } from "@/types/idea.types";
import { formatDistanceToNow } from "date-fns";
import { Edit, Eye, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

interface TMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

const AllIdeaPage = () => {
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState<TIdea[]>([]);
  const [meta, setMeta] = useState<TMeta>({} as TMeta);
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchIdeas = async () => {
      const { data, meta } = await getAllIdeas({
        page: currentPage.toString(),
        limit: limit.toString(),
        searchTerm,
        status,
      });
      setData(data);
      setMeta(meta);
    };
    fetchIdeas();
  }, [currentPage, limit, searchTerm, status]);

  return (
    <div>
      <div className="lg:flex gap-5 mb-5 space-y-2 lg:space-y-0">
        <div className="flex gap-3 flex-1">
          <Select onValueChange={(val) => setLimit(Number(val))}>
            <SelectTrigger className="border-green-500 text-green-500 flex-1">
              <SelectValue placeholder="Set limit" />
            </SelectTrigger>
            <SelectContent>
              {[2, 10, 20, 50].map((val) => (
                <SelectItem key={val} value={val.toString()}>{val}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(val) => setStatus(val)}>
            <SelectTrigger className="border-green-500 text-green-500 flex-1">
              <SelectValue placeholder="Set Status" />
            </SelectTrigger>
            <SelectContent>
              {["pending", "published", "unpublished"].map((val) => (
                <SelectItem key={val} value={val}>{val}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-1">
          <Input
            placeholder="Search Idea..."
            className="border-green-500 rounded-r-none rounded-l-full w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="rounded-r-full bg-green-500" size="icon">
            <Search size={18} />
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="space-y-5 divide-y divide-amber-500">
          {data.map((idea) => (
            <div key={idea.id} className="lg:flex justify-between pb-5">
              <div className="flex items-center gap-3 lg:w-[40%]">
                <Avatar className="border border-green-500">
                  <AvatarImage src={idea.images[0]} />
                  <AvatarFallback />
                </Avatar>
                <div>
                  <p className="font-medium">{idea.title.split(" ").slice(0, 6).join(" ")}</p>
                  <p className="text-sm text-muted-foreground">
                    by <span className="italic text-amber-800">{idea.author.name}</span> |{" "}
                    <span className="italic text-sky-800">
                      {formatDistanceToNow(new Date(idea.createdAt), { addSuffix: true })}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col lg:gap-8 lg:flex-row lg:items-center lg:justify-end lg:w-[60%]">
                <div className="flex gap-5 justify-between lg:mt-0 mt-2.5">
                  <p className="text-green-500 bg-green-100  px-2 py-1 rounded-full w-[120px] text-center truncate">{idea.status}</p>
                  <p className="bg-amber-500 text-white px-2 py-1 rounded-full w-[120px] text-center truncate">{idea.category}</p>
                </div>
                <div className="flex lg:gap-8 justify-evenly lg:mt-0 mt-2">
                  <Button size="sm" variant="outline" className="bg-sky-500 text-white h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-green-500 hover:bg-amber-500 h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-red-500 text-white h-8 w-8 p-0">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="text-amber-500 border border-amber-500 bg-white"
              >
                <BiLeftArrow /> Previous
              </Button>
            </PaginationItem>

            <PaginationItem>
              <div className="flex gap-2">
                {[...Array(Math.max(1, meta?.totalPage || 1))].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => setCurrentPage(index + 1)}
                      href="#"
                      className={`border text-green-500 border-green-500 hover:bg-amber-500 hover:border-amber-500 hover:text-white ${index === currentPage - 1 ? "bg-green-500 text-white" : ""
                        }`}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </div>
            </PaginationItem>

            <PaginationItem>
              <Button
                disabled={currentPage === meta?.totalPage}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="bg-amber-500 text-white"
              >
                Next <BiRightArrow />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default AllIdeaPage;
