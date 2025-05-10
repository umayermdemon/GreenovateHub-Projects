import { getMyBlogs } from "@/services/blog";
import ManageMemberDashboard from "@/components/modules/Dashboard/Member";

const MemberDashboard = async () => {
  const blogs = await getMyBlogs();
  return (
    <div>
      <ManageMemberDashboard blogs={blogs?.data} />
    </div>
  );
};

export default MemberDashboard;
