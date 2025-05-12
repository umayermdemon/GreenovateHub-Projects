import AllUserPage from "@/components/modules/Dashboard/Admin/User/AllUserPage";
import { getAllUser } from "@/services/user";

const ManageUsers = async () => {
  const users = await getAllUser();
  console.log(users);
  return (
    <div>
      <AllUserPage users={users?.data} />
    </div>
  );
};

export default ManageUsers;
