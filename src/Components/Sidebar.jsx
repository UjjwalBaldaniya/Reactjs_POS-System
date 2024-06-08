import React from "react";
import { useTranslation } from "react-i18next";
import { RxDotFilled } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
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
  return (
    <div className="sidebar">
      <div className="d-flex py-3">
        <img
          src="https://pos.flavours.sa/static/media/flavours-pos-black-en.b8b2609d04a9663fd048.png"
          alt="logo"
          className="sidebar-logo"
        />
        <div></div>
      </div>
      <div className="py-4">
        <div className="sidebar-menu d-flex align-items-center mb-4 ">
          <RxDotFilled className="sidebar-dot-icon active " />
          <div className="active">{dashboardIcon}</div>
          <NavLink to="/dashboard" className="sidebar-menu-name ms-2">
            {t("sidebar.dashboard")}
          </NavLink>
        </div>
        <div className="sidebar-menu d-flex align-items-center mb-4">
          <RxDotFilled className="sidebar-dot-icon" />
          <div className="">{tablesIcon}</div>
          <Link to="/dashboard" className="sidebar-menu-name ms-2">
            {t("sidebar.tables")}
          </Link>
        </div>
        <div className="sidebar-menu d-flex align-items-center mb-4 ">
          <RxDotFilled className="sidebar-dot-icon" />
          <div className="">{productsIcon}</div>
          <Link to="/dashboard" className="sidebar-menu-name ms-2">
            {t("sidebar.products")}
          </Link>
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
