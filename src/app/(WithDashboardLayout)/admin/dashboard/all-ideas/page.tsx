import AllIdeaPage from "@/components/modules/Idea/AllIdeaPage";

const AllIdeas = async () => {
    return (
        <div className=" lg:mx-6">
            <h1 className="my-5 text-3xl font-bold text-green-500">All Ideas</h1>
            <AllIdeaPage />
        </div>
    );
};

export default AllIdeas;