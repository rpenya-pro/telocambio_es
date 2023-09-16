import React, { ReactNode } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { FooterComponent } from "../components/FooterComponent";
import DashboardMenu from "../components/protected/DashboardMenu";

type LayoutDashboardProps = {
  children: ReactNode;
};

const LayoutDashboard: React.FC<LayoutDashboardProps> = ({ children }) => {
  return (
    <div className="container-fluid layout">
      <header className="header ">
        <NavbarComponent
          show={false}
          onHide={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </header>

      <main className="container-fluid main-content-dashboard">
        <div className="navigation">
          <DashboardMenu />
        </div>
        {children}
      </main>

      <footer className="footer">
        <FooterComponent />
      </footer>
    </div>
  );
};

export default LayoutDashboard;
