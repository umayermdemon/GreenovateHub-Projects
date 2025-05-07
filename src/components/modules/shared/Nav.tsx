import Navbar from "@/components/shared/Navbar";
import { getMe } from "@/services/user";

const Nav = async () => {
  const myProfile = await getMe();
  return (
    <>
      <Navbar userData={myProfile?.data} />
    </>
  );
};

export default Nav;
