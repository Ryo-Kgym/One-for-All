import type { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <a href={"/top"}>{"<- トップ"}</a>
      <div>{children}</div>
    </div>
  );
};

export default Layout;