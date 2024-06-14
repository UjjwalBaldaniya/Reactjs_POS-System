import React from "react";
import { useTranslation } from "react-i18next";
import { RxDotFilled } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import CustomAccordion from "../pages/CustomAccordion";
import {
  applicationsIcon,
  customersIcon,
  dashboardIcon,
  discountIcon,
  inventoryIcon,
  kitchenIcon,
  ordersIcon,
  productsIcon,
  ratingsIcon,
  reportsIcon,
  settingsIcon,
  tablesIcon,
} from "../assets/icons/sidebar";
import "../css/sidebar.css";

const Sidebar = () => {
  const { t } = useTranslation();
  const language = useSelector((state) => state?.language?.language);

  return (
    <div className="sidebar">
      <div className="d-flex py-3 justify-content-start align-items-start">
        <img
          src={
            language === "EN"
              ? "https://pos.flavours.sa/static/media/flavours-pos-black-en.b8b2609d04a9663fd048.png"
              : "https://pos.flavours.sa/static/media/flavours-pos-black-ar.99c4ad79aae8977dc721.png"
          }
          alt="logo"
          className="sidebar-logo"
        />
      </div>
      <div className="py-4">
        <div className="sidebar-menu d-flex align-items-center mb-4 ">
          <RxDotFilled className="sidebar-dot-icon" />
          <div>{dashboardIcon}</div>
          <NavLink to="/dashboard" className="sidebar-menu-name ms-2">
            {t("sidebar.dashboard")}
          </NavLink>
        </div>
        <div className="sidebar-menu d-flex align-items-center mb-4">
          <RxDotFilled className="sidebar-dot-icon" />
          <div className="">{tablesIcon}</div>
          <NavLink to="/table" className="sidebar-menu-name ms-2">
            {t("sidebar.tables")}
          </NavLink>
        </div>
        <div className="sidebar-menu d-flex mb-4">
          <RxDotFilled className="sidebar-dot-icon me-2" />
          <div className="">{productsIcon}</div>

          <CustomAccordion title="Products">
            <div className="sidebar-custom-acc d-flex flex-column">
              <NavLink to="/products" className="sidebar-custom-menu-link">
                Products
              </NavLink>
              <NavLink to="/categories" className="sidebar-custom-menu-link">
                Categories
              </NavLink>
              <NavLink to="/variations" className="sidebar-custom-menu-link">
                Variations
              </NavLink>
              <NavLink to="/units" className="sidebar-custom-menu-link">
                Units
              </NavLink>
              <NavLink to="/base-units" className="sidebar-custom-menu-link">
                Base Units
              </NavLink>
              <NavLink to="/print-barcode" className="sidebar-custom-menu-link">
                Print Barcode
              </NavLink>
            </div>
          </CustomAccordion>
        </div>
        <div className="sidebar-menu d-flex mb-4">
          <RxDotFilled className="sidebar-dot-icon me-2" />
          <div className="">{productsIcon}</div>

          <CustomAccordion title="Purchases">
            <div className="sidebar-custom-acc d-flex flex-column">
              <NavLink to="/purchases" className="sidebar-custom-menu-link">
                Purchases
              </NavLink>
              <NavLink
                to="/purchase-return"
                className="sidebar-custom-menu-link"
              >
                Purchases Return
              </NavLink>
            </div>
          </CustomAccordion>
        </div>

        <div className="sidebar-menu d-flex align-items-center mb-4 ">
          <RxDotFilled className="sidebar-dot-icon" />
          <div className="">{discountIcon}</div>
          <Link to="/dashboard" className="sidebar-menu-name ms-2">
            {t("sidebar.discounts")}
          </Link>
        </div>
        <div className="sidebar-menu d-flex align-items-center mb-4 ">
          <RxDotFilled className="sidebar-dot-icon" />
          <div className="">{customersIcon}</div>
          <Link to="/dashboard" className="sidebar-menu-name ms-2">
            {t("sidebar.customers")}
          </Link>
        </div>

        <div className="sidebar-menu-heading">{t("sidebar.features")}</div>

        <div className="sidebar-menu d-flex align-items-center mb-4 ">
          <RxDotFilled className="sidebar-dot-icon" />
          <div className="">{ordersIcon}</div>
          <Link to="/dashboard" className="sidebar-menu-name ms-2">
            {t("sidebar.orders")}
          </Link>
        </div>
        <div className="sidebar-menu d-flex align-items-center mb-4 ">
          <RxDotFilled className="sidebar-dot-icon" />
          <div className="">{kitchenIcon}</div>
          <Link to="/dashboard" className="sidebar-menu-name ms-2">
            {t("sidebar.kitchen")}
          </Link>
        </div>
        <div className="sidebar-menu d-flex align-items-center mb-4 ">
          <RxDotFilled className="sidebar-dot-icon" />
          <div className="">{inventoryIcon}</div>
          <Link to="/dashboard" className="sidebar-menu-name ms-2">
            {t("sidebar.inventory")}
          </Link>
        </div>
        <div className="sidebar-menu d-flex align-items-center mb-4 ">
          <RxDotFilled className="sidebar-dot-icon" />
          <div className="">{ratingsIcon}</div>
          <Link to="/dashboard" className="sidebar-menu-name ms-2">
            {t("sidebar.ratings")}
          </Link>
        </div>
        <div className="sidebar-menu d-flex align-items-center mb-4 ">
          <RxDotFilled className="sidebar-dot-icon" />
          <div className="">{reportsIcon}</div>
          <Link to="/dashboard" className="sidebar-menu-name ms-2">
            {t("sidebar.reports")}
          </Link>
        </div>
        <div className="sidebar-menu d-flex align-items-center mb-4 ">
          <RxDotFilled className="sidebar-dot-icon" />
          <div className="">{applicationsIcon}</div>
          <Link to="/dashboard" className="sidebar-menu-name ms-2">
            {t("sidebar.applications")}
          </Link>
        </div>
        <div className="sidebar-menu d-flex align-items-center mb-4 ">
          <RxDotFilled className="sidebar-dot-icon" />
          <div className="">{settingsIcon}</div>
          <Link to="/dashboard" className="sidebar-menu-name ms-2">
            {t("sidebar.settings")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
