"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllIdeas } from "@/services/idea";
import { TIdea } from "@/types/idea.types";
import { formatDistanceToNow } from "date-fns";
import { Edit, Eye, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
interface TMeta {
    page: number,
    limit: number,
    total: number,
    totalPage: number
}
const AllIdeaPage = () => {
    const [limit, setLimit] = useState(10);
    const [data, setData] = useState<TIdea[] | []>([]);
    const [meta, setMeta] = useState<TMeta>({} as TMeta);
    const [status, setStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchIdea = async () => {
            const { data, meta } = await getAllIdeas({
                page: currentPage.toString(),
                limit: limit.toString(),
                searchTerm: searchTerm,
                status: status
            });
            setData(data);
            setMeta(meta)
        }
        fetchIdea()
    }, [currentPage, limit, searchTerm, status]);
    console.log(status);
    return (
        <div>
            <div className="flex gap-5">
                <Select onValueChange={(val) => setLimit(Number(val))}>
                    <SelectTrigger
                        className="mb-4 border-green-500 text-green-500 focus:ring-0 focus:ring-offset-0 focus:border-green-500"
                    >
                        <SelectValue placeholder="Set limit" />
                    </SelectTrigger>
                    <SelectContent className="text-green-500">
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                </Select>

                <div className="flex">
                    <Input
                        placeholder="Search Idea..."
                        className="lg:w-[300px] border-green-500 rounded-r-none focus:border-green-500 focus:ring-0 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <Button
                        className="rounded-l-none rounded-r-full cursor-pointer bg-green-500"
                        size="icon"
                    >
                        <Search size={18} />
                    </Button>
                </div>
                <Select onValueChange={(val) => setStatus(val)}>
                    <SelectTrigger
                        className="mb-4 border-green-500 text-green-500 focus:ring-0 focus:ring-offset-0 focus:border-green-500"
                    >
                        <SelectValue placeholder="Set Status" />
                    </SelectTrigger>
                    <SelectContent className="text-green-500">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="unpublished">Unpublished</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Submitted Ideas – Admin Panel</CardTitle>
                    <CardDescription>View and manage all user-submitted ideas with full administrative control
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-5 px-2 divide-y divide-amber-500">
                        {
                            data.map((idea: TIdea) => (<div key={idea.id} className="flex items-center justify-between pb-2">
                                <div className="flex w-[40%]  items-center gap-3">
                                    <Avatar className="w-[50px] h-[50px] border-green-500 border">
                                        <AvatarImage src={idea.images[0]} alt="" />
                                        <AvatarFallback></AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{idea.title.split(" ").slice(0, 6).join(" ")}</p>
                                        <p className="text-sm text-muted-foreground">by
                                            <span className="italic ml-1 text-amber-800">{idea.author.name}</span> | <span className="text-sky-800 italic">
                                                {formatDistanceToNow(new Date(idea.createdAt), {
                                                    addSuffix: true,
                                                })}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-9 w-[60%] justify-end">
                                    <p className="text-green-500">{idea.status}</p>
                                    <p className="bg-amber-500 px-1.5 py-1 rounded-full text-white">{idea.category}</p>
                                    <Button size="sm" variant="outline" className="h-8 w-8 p-0 cursor-pointer bg-sky-500 text-white">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" className="h-8 w-8 p-0 cursor-pointer hover:bg-amber-500 bg-green-500">
                                        <Edit className="h-4 w-4 " />
                                    </Button>
                                    <Button size="sm" className="h-8 w-8 p-0 cursor-pointer bg-red-500 text-white">
                                        <Trash2 className="h-4 w-4 " />
                                    </Button>
                                </div>
                            </div>))
                        }
                    </div>
                </CardContent>
            </Card>
            <div className="mt-3">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <Button disabled={currentPage === 1} className="text-amber-500 bg-white border border-amber-500" onClick={() => setCurrentPage(currentPage - 1)}><BiLeftArrow />Previous</Button>
                        </PaginationItem>
                        <PaginationItem>
                            <div className="flex gap-2">
                                {[...Array(Math.max(1, meta?.totalPage || 1))].map((_, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink onClick={() => setCurrentPage(index + 1)} className={`border text-green-500 border-green-500 hover:bg-amber-500 hover:border-amber-500 hover:text-white ${index === (Number(meta?.page) - 1) ? "bg-green-500 text-white" : ""}`} href="#">{index + 1}</PaginationLink>
                                    </PaginationItem>
                                ))}
                            </div>
                        </PaginationItem>
                        <PaginationItem>
                            <Button disabled={currentPage === meta?.totalPage} className="bg-amber-500 text-white" onClick={() => setCurrentPage(currentPage + 1)}>Next <BiRightArrow /></Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

            </div>
        </div>
    );
};

export default AllIdeaPage;