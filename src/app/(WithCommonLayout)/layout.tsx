import Nav from "@/components/modules/shared/Nav";
import Footer from "@/components/shared/Footer";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="h-20 bg-gradient-to-r from-green-100 to-green-50">
        <Nav />
      </div>
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default CommonLayout;
