import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { t } from "i18next";
import { bellIcon } from "../assets/icons/navbar";
import { navbarMobileIcon } from "../assets/icons/dashboard";
import i18n from "../utils/i18next";
import { backIcon } from "../assets/icons/product";
import { useNavigate } from "react-router-dom";
import { Field } from "formik";
import Select from "react-select";

const AddProduct = ({ language, setLanguage }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const [activeTime, setActiveTime] = useState(null);
  console.log(
    "🚀 ~ file: AddProduct.jsx:17 ~ AddProduct ~ activeTime:",
    activeTime
  );
  //   const [minuts, setMinuts] = useState(activeTime);
  const changeLanguage = () => {
    const newLanguage = language === "EN" ? "AR" : "EN";
    localStorage.setItem("language", newLanguage);
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };
  const handelLogout = () => {
    localStorage.setItem("authUser", false);
  };
  const handleBack = () => {
    navigate("/products");
  };
  const options = [
    { value: "all", label: "For all branch" },
    { value: "doha", label: "doha" },
  ];
  const options2 = [
    { value: "branch", label: "🥤 For all branch" },
    { value: "steak", label: " 🥩 Steak" },
    { value: "sandwiches", label: "🌯 Sandwiches" },
    { value: "hoot_drinks", label: "☕ Hot Drinks" },
    { value: "side_dishes", label: "🍱 Side Dishes" },
    { value: "Ice_cream", label: "🍦 Ice cream" },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [selectedOption2, setSelectedOption2] = useState(options2[0]);
  const handleTimeButtonClick = (time) => {
    setActiveTime(time);
  };
  return (
    <div>
      <div className="navbar pt-5 pb-4">
        <div className="w-100 d-flex justify-content-between align-items-center">
          <div className="navbar-title d-none d-lg-block">
            {/* {t("sidebar.dashboard")} */}
            <button className="back-btn" onClick={() => handleBack()}>
              {backIcon}
            </button>
            Add New Product
          </div>
          <div
            className="navbar-mobile-logo d-block d-lg-none"
            onClick={() => setShow(true)}
          >
            {navbarMobileIcon}
          </div>
          <div className="d-flex align-items-center justify-content-center">
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
      <div className="col-12">
        <div className="lable-input">
          <label htmlFor="">Branch</label>
          <div className="input-div">
            <div className="input-div-inner">
              <Select
                id="branch-select"
                options={options}
                value={selectedOption}
                onChange={setSelectedOption}
              />
            </div>
          </div>
        </div>
        <div className="user-pass row mb-3 mt-4">
          <div className=" col-12  col-md-6">
            <div className="lable-input">
              <label htmlFor="">Product Name (English)</label>
              <div className="input-div">
                <div className="input-div-inner">
                  <input
                    type="text"
                    className="login-input"
                    id="username"
                    name="username"
                    placeholder="Enter product Name"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" col-12  col-md-6">
            <div className="lable-input">
              <label htmlFor="">Product Name (Arabic)</label>
              <div className="input-div">
                <div className="input-div-inner">
                  <input
                    type="email"
                    className="login-input"
                    name="email"
                    placeholder="Enter product Name"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="lable-input mt-4">
            <label htmlFor="">Branch</label>
            <div className="input-div">
              <div className="input-div-inner">
                <Select
                  //   id="branch-select"
                  options={options2}
                  // value={selectedOption2}
                  onChange={setSelectedOption2}
                  placeholder="Select product category"
                />
              </div>
            </div>
          </div>
          <div className="col-12 mt-4 lable-input">
            <label>Preparation Time</label>
            <div className="row">
              <div className="col-12  col-md-6 d-flex justify-content-between">
                <div>
                  <button
                    className={`pre-time-btn ${
                      activeTime === "10m" ? "active-btn" : ""
                    }`}
                    onClick={() => handleTimeButtonClick("10m")}
                  >
                    10m
                  </button>
                  <button
                    className={`pre-time-btn ${
                      activeTime === "15m" ? "active-btn" : ""
                    }`}
                    onClick={() => handleTimeButtonClick("15m")}
                  >
                    15m
                  </button>
                  <button
                    className={`pre-time-btn ${
                      activeTime === "20m" ? "active-btn" : ""
                    }`}
                    onClick={() => handleTimeButtonClick("20m")}
                  >
                    20m
                  </button>
                  <button
                    className={`pre-time-btn ${
                      activeTime === "30m" ? "active-btn" : ""
                    }`}
                    onClick={() => handleTimeButtonClick("30m")}
                  >
                    30m
                  </button>
                  <button
                    className={`pre-time-btn ${
                      activeTime === "45m" ? "active-btn" : ""
                    }`}
                    onClick={() => handleTimeButtonClick("45m")}
                  >
                    45m
                  </button>
                  <button
                    className={`pre-time-btn ${
                      activeTime === "1h" ? "active-btn" : ""
                    }`}
                    onClick={() => handleTimeButtonClick("1h")}
                  >
                    1h
                  </button>
                </div>
                <div className="or">OR</div>
              </div>

              {/* <div className="col-12  col-md-6">11</div> */}
              <div className="col-12 col-md-6">
                <div className="row">
                  <div className=" col-6 col-md-6">
                    <div className="lable-input">
                      <div className="input-div">
                        <div className="input-div-inner">
                          <input
                            type="text"
                            className="login-input"
                            id="username"
                            name="username"
                            value={activeTime === "1h" ? "1" : ""}
                            placeholder="Hourse"
                            style={{ fontWeight: 700 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" col-6 ">
                    <div className="lable-input">
                      <div className="input-div">
                        <div className="input-div-inner">
                          <input
                            type="text"
                            className="login-input"
                            id="username"
                            value={activeTime === "1h" ? "0" : activeTime}
                            // name="username"
                            placeholder="Minutes"
                            style={{ fontWeight: 700 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12  lable-input mt-4">
            <label htmlFor="">Stock</label>
            <div className="row">
              {" "}
              <div className="col-12 col-md-6 ">
                <div className="input-div">
                  <div className="input-div-inner">
                    <input
                      type="text"
                      className="login-input"
                      id="username"
                      name="username"
                      placeholder="Enter stock"
                    />
                  </div>
                </div>
              </div>
              <div className=" col-12 col-md-6">
                <div className="input-div">
                  <div className="input-div-inner">
                    <input
                      type="email"
                      className="login-input"
                      name="email"
                      placeholder="Infinite Stock"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 lable-input mt-4">
            <label htmlFor="">Product Images</label>
            <div className="img-uploade">
            <p>Or drag images here</p>
                <div className="btn-div">
                <button className="img-uploade-btn"></button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
