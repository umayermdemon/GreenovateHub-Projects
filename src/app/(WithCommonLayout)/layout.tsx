import Navbar from "@/components/shared/Navbar";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">{children}</div>
    </>
  );
};

export default CommonLayout;
