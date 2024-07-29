import "../../css/sidebar.css";

import React from "react";
import { useTranslation } from "react-i18next";
import { RxDotFilled } from "react-icons/rx";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import CustomAccordion from "../../common/CustomAccordion";
import { menuItems } from "../../description/sidebar.description";

const Sidebar = () => {
  const { t } = useTranslation();
  const language = useSelector((state) => state?.language?.language);
  const logoSrc =
    language === "EN"
      ? "https://pos.flavours.sa/static/media/flavours-pos-black-en.b8b2609d04a9663fd048.png"
      : "https://pos.flavours.sa/static/media/flavours-pos-black-ar.99c4ad79aae8977dc721.png";

  return (
    <div className="sidebar">
      <div className="d-flex py-3 justify-content-start align-items-start">
        <img src={logoSrc} alt="logo" className="sidebar-logo" />
      </div>

      <div className="py-4">
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.type === "item" ? (
              <NavLink
                to={item?.to}
                className={({ isActive }) =>
                  isActive
                    ? "sidebar-menu active d-flex align-items-center mb-4"
                    : "sidebar-menu d-flex align-items-center mb-4"
                }
              >
                <RxDotFilled className="sidebar-dot-icon" />
                <div>{item?.icon}</div>
                <div className="sidebar-menu-name ms-2">{t(item?.name)}</div>
              </NavLink>
            ) : item.type === "accordion" ? (
              <div className="sidebar-menu d-flex mb-4" key={item?.title}>
                <RxDotFilled className="sidebar-dot-icon me-2" />
                <div>{item?.icon}</div>
                <CustomAccordion title={item?.title}>
                  <div className="sidebar-custom-acc">
                    {item?.links?.map((link) => (
                      <NavLink
                        key={link?.to}
                        to={link?.to}
                        className={({ isActive }) =>
                          isActive
                            ? "sidebar-custom-menu-link active"
                            : "sidebar-custom-menu-link"
                        }
                      >
                        {link?.name}
                      </NavLink>
                    ))}
                  </div>
                </CustomAccordion>
              </div>
            ) : (
              <div key={item?.name} className="sidebar-menu-heading">
                {t(item?.name)}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
