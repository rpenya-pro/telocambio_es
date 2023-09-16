import { menuDashboard } from "../../../core/domain/menuDashboard";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function DashboardMenu() {
  return (
    <div className="dashboard-navigation">
      <Navbar
        expand="lg"
        variant="dark"
        className="bg-body-primary d-flex align-items-center"
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto justify-content-center">
            {menuDashboard.map((menu, index) => {
              return (
                <NavDropdown
                  className="ms-2 me-2"
                  title={menu.title}
                  id={`basic-nav-dropdown-${index}`}
                  key={index}
                >
                  {menu.submenus.map((submenu, sIndex) => {
                    return (
                      <NavDropdown.Item href={submenu.link} key={sIndex}>
                        {submenu.title}
                      </NavDropdown.Item>
                    );
                  })}
                </NavDropdown>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default DashboardMenu;
