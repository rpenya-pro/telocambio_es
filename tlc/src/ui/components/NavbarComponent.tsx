import React, { useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { ModalLoginComponent } from "./ModalLoginComponent";
import { useNavigate } from "react-router-dom";
import { homeIcon, logoTeLoCambio } from "../../assets/images";
import { useUserData } from "../../services/useUserData";
import { ModalFillData } from "./ModalFillData";
import { useAuth } from "../hooks/useAuth";

interface ModalLoginProps {
  show: boolean;
  onHide: () => void;
}
//TODO tutorial, si dicen "no mostrar más", se setea en false el campo tutorial en la bbdd (implementar)
const NavbarComponent: React.FC<ModalLoginProps> = () => {
  const [modalShow, setModalShow] = useState(false);
  const { isAuthenticated, logout, userData } = useAuth();

  const navigation = useNavigate();

  const handleLogout = () => {
    logout();
    navigation("/");
  };

  const { data, isLoading, isError, error } = useUserData(
    userData?._id || "defaultValue"
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError && error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary navigation">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logoTeLoCambio}
              alt="Home Icon"
              className="navigation__logotipo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav " />
          <Navbar.Collapse id="basic-navbar-nav" className="pt-3">
            <Nav className="ms-auto">
              <Nav.Link href="/">
                <img
                  src={homeIcon}
                  alt="Home Icon"
                  className="navbar-home-icon"
                />
              </Nav.Link>
              <Nav.Link href="/login">Contacta</Nav.Link>
              <Nav.Link href="/login">¿Cómo funciona?</Nav.Link>
              <div className="navbar-divider">&nbsp;</div>
              <Nav.Item>
                {isAuthenticated ? (
                  data?.firstName === undefined ? (
                    userData?._id != undefined ? (
                      userData?._id ? (
                        <ModalFillData identificador={userData._id} />
                      ) : null
                    ) : null
                  ) : (
                    <>
                      {data?.privateProfile &&
                        "<p>al comienzo, tu perfil es privado, si deseas abrirlo al rest ode personas ,cambia esa opción en tu área privada</p>"}

                      <NavDropdown
                        title={`${
                          data?.firstName != undefined
                            ? data?.firstName
                            : data?.email
                        }  ${
                          data?.lastName != undefined ? data?.lastName : ""
                        }`}
                        id="basic-nav-dropdown"
                      >
                        <NavDropdown.Item href="/dashboard">
                          Área Privada
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                          Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">
                          Something
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                          <Button
                            className="navigation__logout-btn"
                            variant="primary"
                            onClick={logout}
                          >
                            Logout
                          </Button>
                        </NavDropdown.Item>
                      </NavDropdown>

                      <Button
                        variant="primary"
                        className="navigation_logout-btn"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </>
                  )
                ) : (
                  <Button
                    variant="primary"
                    className="navigation__btn"
                    onClick={() => setModalShow(true)}
                  >
                    Iniciar Sesión
                  </Button>
                )}
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ModalLoginComponent
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default NavbarComponent;
