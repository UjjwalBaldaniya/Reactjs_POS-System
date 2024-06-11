import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { t } from "i18next";
import { bellIcon } from "../assets/icons/navbar";
import {
  locationIcon,
  navbarMobileIcon,
  rightSideArrowIcon,
  timeIcon,
  wrightIcon,
  wrongIcon,
} from "../assets/icons/dashboard";
import i18n from "../utils/i18next";
import { AiOutlineMan } from "react-icons/ai";
import { exportIcon } from "../assets/icons/product";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../redux/slice/languageSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state?.language?.language);

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const changeLanguage = () => {
    const newLanguage = language === "EN" ? "AR" : "EN";
    localStorage.setItem("language", newLanguage);
    dispatch(setLanguage(newLanguage));
    i18n.changeLanguage(newLanguage);
  };
  const handelLogout = () => {
    localStorage.setItem("authUser", false);
  };
  const handelNavigate = () => {
    navigate("/products/create");
  };
  return (
    <div>
      <div className="navbar pt-5 pb-4">
        <div className="w-100 d-flex justify-content-between align-items-center">
          <div className="navbar-title d-none d-lg-block">
            {/* {t("sidebar.dashboard")} */}
            Products
          </div>
          <div
            className="navbar-mobile-logo d-block d-lg-none"
            onClick={() => setShow(true)}
          >
            {navbarMobileIcon}
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button className="export-all">
              <div
                className="d-flex align-content-center"
                style={{ color: "blue" }}
              >
                {/* <div className="pluse-icon">+</div> */}
                <div className="export-icon me-1"> {exportIcon}</div>
                <span>Export All</span>
              </div>
            </button>
            <button className="add-products" onClick={() => handelNavigate()}>
              <div className="d-flex align-content-center">
                <div className="pluse-icon">+</div>
                <span>New Product</span>
              </div>
            </button>

            <div className="navbar-icon">{bellIcon}</div>
            <DropdownButton
              id="dropdown-basic-button"
              title="AR"
              className="navbar-dropdown1 mx-3"
            >
              <Dropdown.Item onClick={changeLanguage}>
                {language === "EN" ? "العربية" : "English"}
              </Dropdown.Item>
              <Dropdown.Item href="/sign-in" onClick={() => handelLogout()}>
                Sign Out
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>

      <div>
        <button className="add-products">
          <div className="d-flex align-content-center">
            <span>All Item</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProductList;
