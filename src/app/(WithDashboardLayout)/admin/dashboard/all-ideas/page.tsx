import AllIdeaPage from "@/components/modules/Idea/AllIdeaPage";
import { getAllIdeas } from "@/services/idea";

const AllIdeas = async () => {
    const { data } = await getAllIdeas();
    return (
        <div>
            <AllIdeaPage data={data} />
        </div>
    );
};

export default AllIdeas;