import React, { useEffect, useRef, useState } from "react";
import singleSpa from "single-spa";
import { logoTeLoCambio, homeIcon, profileIcon } from "../assets/images";
import { LoaderGenericComponent } from "@app-shared/react-shared";
import { useGetPayloadFromToken, useFetchUserById } from "teloc-hooks";
import { useAuthContext } from "../helpers/AuthContext";

const HeaderNavBar: React.FC = () => {
  const { authState, login } = useAuthContext();

  const handleLoginSuccess = () => {
    // Realiza las actualizaciones necesarias en respuesta al evento "login-success"
    // Puedes acceder al estado actualizado a través de authState
    console.log("Login exitoso. Nuevo estado de autenticación:", authState);
  };

  useEffect(() => {
    // Agrega un event listener para "login-success" cuando el componente se monta
    window.addEventListener("login-success", handleLoginSuccess);
    console.log("authState", authState);
    // Limpia el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("login-success", handleLoginSuccess);
    };
  }, []);

  // useEffect(() => {
  //   // Ejemplo: Utilizar la información de autenticación
  //   console.log("IsAuthenticated:", authState.isAuthenticated);
  //   console.log("Loading:", authState.loading);

  //   // Ejemplo: Iniciar sesión
  //   login("tu@email.com", "tu_contraseña")
  //     .then((result) => {
  //       console.log("Resultado del inicio de sesión:", result);
  //     })
  //     .catch((error) => {
  //       console.error("Error de inicio de sesión:", error);
  //     });
  // }, [authState, login]);

  //-----------------------------------------------------------
  const handleLogout = () => {
    // Tu lógica para el cierre de sesión
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const closeMenu = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target)
    ) {
      setMenuOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  return <>hola</>;
  // : (
  //   <nav className="navbar navbar-expand-lg navbar-light  navigation">
  //     <div className="container-fluid">
  //       <a className="navbar-brand" href="#">
  //         <img
  //           src={logoTeLoCambio}
  //           alt="TeLoCambioEs, conecta con personas e intercambia"
  //           className="navigation__logotipo"
  //         />
  //       </a>
  //       <button
  //         className="navbar-toggler"
  //         type="button"
  //         data-bs-toggle="collapse"
  //         data-bs-target="#navbarScroll"
  //         aria-controls="navbarScroll"
  //         aria-expanded="false"
  //         aria-label="Toggle navigation"
  //       >
  //         <span className="navbar-toggler-icon"></span>
  //       </button>
  //       <div className="collapse navbar-collapse" id="navbarScroll">
  //         <ul className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll">
  //           <li className="nav-item navigation__item me-3">
  //             <a className="nav-link active" aria-current="page" href="/">
  //               <img
  //                 src={homeIcon}
  //                 alt="Home Page"
  //                 className="navigation__iconos-nav"
  //               />
  //             </a>
  //           </li>
  //           <li className="nav-item navigation__item">
  //             <a className="nav-link" href="/contacta">
  //               Contacta
  //             </a>
  //           </li>
  //           <li className="nav-item navigation__item navigation__item--divider">
  //             <a className="nav-link" href="/faq">
  //               Cómo funciona
  //             </a>
  //           </li>

  //           {authState.isAuth ? (
  //             <li className="nav-item dropdown navigation__item navigation__item--accede">
  //               <div className="d-flex align-items-center justify-content-between">
  //                 <button
  //                   ref={buttonRef}
  //                   className="nav-link"
  //                   onClick={toggleMenu}
  //                 >
  //                   <img
  //                     src={profileIcon}
  //                     alt="Profile"
  //                     className="navigation__profile-icon me-3"
  //                   />
  //                   logueado
  //                   {/* {user?.firstName?.length > 10
  //                     ? user?.firstName?.substring(0, 10) + "..."
  //                     : user?.firstName}{" "}
  //                   {user?.lastName?.length > 10
  //                     ? user?.lastName?.substring(0, 10) + "..."
  //                     : user?.lastName} */}
  //                 </button>
  //                 {menuOpen && (
  //                   <div
  //                     ref={menuRef}
  //                     className={menuOpen ? "menu-open" : "menu-closed"}
  //                   >
  //                     <ul>
  //                       <li>
  //                         <a className="dropdown-item" href="/profile">
  //                           Profile
  //                         </a>
  //                       </li>
  //                       <li>
  //                         <a className="dropdown-item" href="#">
  //                           Historial de intercambio
  //                         </a>
  //                       </li>
  //                       <li>
  //                         <a className="dropdown-item" href="#">
  //                           Historial de intercambio
  //                         </a>
  //                       </li>
  //                       <li>
  //                         <hr className="dropdown-divider" />
  //                       </li>
  //                       <li>
  //                         <button
  //                           className="btn dropdown-item"
  //                           onClick={handleLogout}
  //                         >
  //                           Logout
  //                         </button>
  //                       </li>
  //                     </ul>
  //                   </div>
  //                 )}
  //               </div>
  //             </li>
  //           ) : (
  //             <li className="nav-item dropdown navigation__item navigation__item--accede">
  //               <a className="nav-link" href="/">
  //                 Accede
  //               </a>
  //             </li>
  //           )}
  //         </ul>
  //         {isLanding ? null : (
  //           <form className="d-flex">
  //             <input
  //               className="form-control me-2"
  //               type="search"
  //               placeholder="Search"
  //               aria-label="Search"
  //             />
  //             <button className="btn btn-outline-success" type="submit">
  //               Search
  //             </button>
  //           </form>
  //         )}
  //       </div>
  //     </div>
  //   </nav>
  // );
};

export default HeaderNavBar;
