import React from "react";
import { NavLink, Offcanvas } from "react-bootstrap";
import { RxDotFilled } from "react-icons/rx";
import { Link } from "react-router-dom";
import { leftSideArrow } from "../../assets/icons/dashboard";
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
} from "../../assets/icons/sidebar";
import "../../css/mobile-sidebar.css";

const MobileSidebar = (props) => {
  const { show, onHide } = props;
  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      {...props}
      className="offcanvas-mobile-menu"
    >
      <Offcanvas.Header className="mt-4">
        <Offcanvas.Title>
          <img
            src="https://pos.flavours.sa/static/media/flavours-pos-black-en.b8b2609d04a9663fd048.png"
            alt="logo"
            className="sidebar-logo"
          />
        </Offcanvas.Title>
        <div className="navbar-mobile-close-logo" onClick={onHide}>
          {leftSideArrow}
        </div>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="mobile-sidebar">
          <div className="py-4">
            <div className="sidebar-menu d-flex align-items-center mb-4 ">
              <RxDotFilled className="sidebar-dot-icon active " />
              <div className="active">{dashboardIcon}</div>
              <NavLink to="/dashboard" className="sidebar-menu-name ms-2">
                Dashboard
              </NavLink>
            </div>
            <div className="sidebar-menu d-flex align-items-center mb-4">
              <RxDotFilled className="sidebar-dot-icon " />
              <div className="">{tablesIcon}</div>
              <Link to="/dashboard" className="sidebar-menu-name ms-2">
                Tables
              </Link>
            </div>
            <div className="sidebar-menu d-flex align-items-center mb-4 ">
              <RxDotFilled className="sidebar-dot-icon" />
              <div className="">{productsIcon}</div>
              <Link to="/dashboard" className="sidebar-menu-name ms-2">
                Products
              </Link>
            </div>
            <div className="sidebar-menu d-flex align-items-center mb-4 ">
              <RxDotFilled className="sidebar-dot-icon" />
              <div className="">{discountIcon}</div>
              <Link to="/dashboard" className="sidebar-menu-name ms-2">
                Discounts
              </Link>
            </div>
            <div className="sidebar-menu d-flex align-items-center mb-4 ">
              <RxDotFilled className="sidebar-dot-icon" />
              <div className="">{customersIcon}</div>
              <Link to="/dashboard" className="sidebar-menu-name ms-2">
                Customers
              </Link>
            </div>

            <div className="sidebar-menu-heading">Features</div>

            <div className="sidebar-menu d-flex align-items-center mb-4 ">
              <RxDotFilled className="sidebar-dot-icon" />
              <div className="">{ordersIcon}</div>
              <Link to="/dashboard" className="sidebar-menu-name ms-2">
                Orders
              </Link>
            </div>
            <div className="sidebar-menu d-flex align-items-center mb-4 ">
              <RxDotFilled className="sidebar-dot-icon" />
              <div className="">{kitchenIcon}</div>
              <Link to="/dashboard" className="sidebar-menu-name ms-2">
                Kitchen
              </Link>
            </div>
            <div className="sidebar-menu d-flex align-items-center mb-4 ">
              <RxDotFilled className="sidebar-dot-icon" />
              <div className="">{inventoryIcon}</div>
              <Link to="/dashboard" className="sidebar-menu-name ms-2">
                Inventory
              </Link>
            </div>
            <div className="sidebar-menu d-flex align-items-center mb-4 ">
              <RxDotFilled className="sidebar-dot-icon" />
              <div className="">{ratingsIcon}</div>
              <Link to="/dashboard" className="sidebar-menu-name ms-2">
                Ratings
              </Link>
            </div>
            <div className="sidebar-menu d-flex align-items-center mb-4 ">
              <RxDotFilled className="sidebar-dot-icon" />
              <div className="">{reportsIcon}</div>
              <Link to="/dashboard" className="sidebar-menu-name ms-2">
                Reports
              </Link>
            </div>
            <div className="sidebar-menu d-flex align-items-center mb-4 ">
              <RxDotFilled className="sidebar-dot-icon" />
              <div className="">{applicationsIcon}</div>
              <Link to="/dashboard" className="sidebar-menu-name ms-2">
                Applications
              </Link>
            </div>
            <div className="sidebar-menu d-flex align-items-center mb-4 ">
              <RxDotFilled className="sidebar-dot-icon" />
              <div className="">{settingsIcon}</div>
              <Link to="/dashboard" className="sidebar-menu-name ms-2">
                Settings
              </Link>
            </div>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default MobileSidebar;
