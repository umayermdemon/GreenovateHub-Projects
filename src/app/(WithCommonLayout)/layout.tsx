import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="min-h-screen">{children}</div>
    </>
  );
};

export default CommonLayout;
