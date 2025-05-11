import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TIdea } from "@/types/idea.types";
import { Check, X } from "lucide-react";

interface PIdea {
    data: TIdea
}
const PendingBlog = ({ data }: PIdea) => {
    console.log(data,'blogs');
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Pending Blogs</CardTitle>
                    <CardDescription>You have 6 pending Blogs</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src="" alt="" />
                                <AvatarFallback></AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium"></p>
                                <p className="text-sm text-muted-foreground"></p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 cursor-pointer">
                                <X className="h-4 w-4" />
                                <span className="sr-only">Decline</span>
                            </Button>
                            <Button size="sm" className="h-8 w-8 p-0 cursor-pointer">
                                <Check className="h-4 w-4 " />
                                <span className="sr-only">Accept</span>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PendingBlog;