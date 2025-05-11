"use client"

import { TIdea } from "@/types/idea.types";
interface TData {
    data: TIdea[]
}
const AllIdeaPage = ({ data }: TData) => {
    return (
        <div>
            <h1>admin idea</h1>
        </div>
    );
};

export default AllIdeaPage;