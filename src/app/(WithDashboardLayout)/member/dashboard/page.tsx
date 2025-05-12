import { getMyBlogs } from "@/services/blog";
import ManageMemberDashboard from "@/components/modules/Dashboard/Member";

const MemberDashboard = async () => {
  const blogs = await getMyBlogs();
  const blogData = blogs?.data || []; // Default to an empty array if blogs or blogs.data is undefined

  return (
    <div>
      <ManageMemberDashboard blogs={blogData} />
    </div>
  );
};

export default MemberDashboard;
