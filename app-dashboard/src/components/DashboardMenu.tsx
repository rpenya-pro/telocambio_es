import React, { useState } from "react";
import menuItems from "../utils/menuConfig.json";

// Define una interfaz para los elementos en menuItems
interface MenuItem {
  title: string;
  submenus: string[][];
}

export const DashboardMenu = () => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const renderSubmenu = (submenuItems: string[]) => {
    return (
      <ul className="list-unstyled">
        {submenuItems.map((item, index) => (
          <li key={index}>
            <a className="dropdown-item" href="#">
              {item}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 dashboard__menu-back w-100 ps-5 pe-5">
          <div className="dashboard__menu d-flex">
            <div className="dashboard__menu-horizontal-scroll">
              {/* Utiliza el tipo MenuItem para tipar cada elemento */}
              {(menuItems as MenuItem[]).map((menuItem, index) => (
                <div
                  className={`item ${
                    activeItem === index ? "active-item" : ""
                  }`}
                  key={index}
                  onClick={() => setActiveItem(index)} // Establece el ítem de menú activo cuando se hace clic
                >
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id={`navbarDropdown${index}`}
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {menuItem.title}
                  </a>
                  <div
                    className="mt-2 dropdown-menu w-100 dashboard__menu-drop-padding"
                    aria-labelledby={`navbarDropdown${index}`}
                  >
                    <div className="row">
                      {menuItem.submenus.map((submenu, i) => (
                        <div className="col-md-4" key={i}>
                          {renderSubmenu(submenu)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              {/* Puedes agregar más items estáticos aquí si lo necesitas */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
