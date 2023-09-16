import React, { ReactNode } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { FooterComponent } from "../components/FooterComponent";
import { LoadingComponent } from "../components/LoadingComponent";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container-fluid layout">
      <LoadingComponent />
      <header className="header">
        <NavbarComponent
          show={false}
          onHide={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </header>

      <main className="main-content">{children}</main>

      <footer className="footer">
        <FooterComponent />
      </footer>
    </div>
  );
};

export default Layout;
