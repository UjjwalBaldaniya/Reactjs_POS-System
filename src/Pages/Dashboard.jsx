import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import MobileMenu from "../Components/MobileMenu";
import {
  locationIcon,
  navbarMobileIcon,
  rightSideArrowIcon,
  timeIcon,
  wrightIcon,
  wrongIcon,
} from "../assets/icons/dashboard";
import { bellIcon } from "../assets/icons/navbar";
import burger from "../assets/images/dashboard/burger.jpg";
import cake from "../assets/images/dashboard/cake.jpg";
import chart from "../assets/images/dashboard/chart.png";
import mac from "../assets/images/dashboard/mac.jpg";
import pepsi from "../assets/images/dashboard/pepsi.jpg";
import pizza from "../assets/images/dashboard/pizza.jpg";
import star from "../assets/images/dashboard/star.webp";
import waterBottle from "../assets/images/dashboard/water-bottle.jpg";
import "../css/dashboard.css";
import i18n from "../utils/i18next";

const Dashboard = ({ language, setLanguage }) => {
  const [selectedBtn, setSelectedBtn] = useState(0);
  const [show, setShow] = useState(false);

  const handleButtonGroup = (id) => {
    setSelectedBtn(id);
  };

  const buttonGroup = [
    t("dashboard.today"),
    t("dashboard.week"),
    t("dashboard.month"),
  ];

  const changeLanguage = () => {
    const newLanguage = language === "EN" ? "AR" : "EN";
    localStorage.setItem("language", newLanguage);
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  useEffect(() => {
    const defaultLanguage = localStorage.getItem("language");
    if (defaultLanguage) {
      setLanguage(defaultLanguage);
      i18n.changeLanguage(defaultLanguage);
    }
  }, [setLanguage]);

  const handelLogout = () => {
    localStorage.setItem("authUser", false);
  };
  return (
    <div className="dashboard">
      {/* NAVBAR */}
      <div className="navbar pt-5 pb-4">
        <div className="w-100 d-flex justify-content-between align-items-center">
          <div className="navbar-title d-none d-lg-block">
            {t("sidebar.dashboard")}
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

      <div className="navbar-title d-block d-lg-none pb-4">
        {t("sidebar.dashboard")}
      </div>

      <div className="row">
        {/* LEFT-SIDE SECTION */}
        <div className="col-xxl-8">
          <div className="pos-card mb-4">
            <div className="pos-card-header d-flex align-items-center justify-content-between">
              <p className="mb-0">{t("dashboard.financial")}</p>
              <div className=" d-flex gap-2">
                {buttonGroup?.map((button, index) => (
                  <button
                    className={
                      selectedBtn === index
                        ? "dashboard-tab-active"
                        : "dashboard-financial"
                    }
                    key={index}
                    onClick={() => handleButtonGroup(index)}
                  >
                    {button}
                  </button>
                ))}
              </div>
            </div>
            <div className="row">
              <div className="col dashboard-financial-revenue">
                <span>{t("dashboard.totalRevenue")}</span>
                <div className="d-flex align-items-center gap-3 mt-2">
                  <h3 className="fw-bold mb-0">0</h3>
                  <div className="dashboard-financial-revenue-discount">
                    + 0%
                  </div>
                </div>
              </div>
              <div className="col dashboard-financial-revenue">
                <span>{t("dashboard.totalOrders")}</span>
                <div className="d-flex align-items-center gap-3 mt-2">
                  <h3 className="fw-bold mb-0">0 SR</h3>
                  <div className="dashboard-financial-revenue-discount">
                    + 0%
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img src={chart} alt="chart" className="mt-3 img-fluid" />
            </div>
          </div>

          <div className="pos-card mb-4">
            <h2 className="pos-card-header">
              {t("dashboard.mostPopularProducts")}
            </h2>
            <div className="pos-card-body text-center">
              <div className="row dashboard-data mpp-date mb-3 text-start">
                <div className="col dashboard-mpp-data">
                  <img src={burger} alt="burger" />
                  <p className="mb-0 ms-3 fw-bolder">
                    {t("dashboard.beafBurger")}
                  </p>
                </div>
                <div className="col d-flex align-items-center">
                  <span>22 SR to 125 SR</span>
                </div>
                <div className="col  d-flex align-items-center">
                  <span style={{ color: "#008D0E" }} className="fw-bolder">
                    +218.75 %
                  </span>
                </div>
                <div className="col d-flex justify-content-between align-items-center">
                  <div>
                    <img src={star} alt="" style={{ width: "30px" }} />
                    <span className="fw-bold ms-2">4.5</span>
                    <span className="ms-2">(238)</span>
                  </div>
                  <div className="">
                    <span>{rightSideArrowIcon}</span>
                  </div>
                </div>
              </div>
              <div className="row dashboard-data mpp-date mb-3 text-start">
                <div className="col dashboard-mpp-data">
                  <img src={pepsi} alt="burger" />
                  <p className="mb-0 ms-3 fw-bolder">
                    {t("dashboard.pepsiCols")}
                  </p>
                </div>
                <div className="col d-flex align-items-center">
                  <span>5 SR</span>
                </div>
                <div className="col  d-flex align-items-center">
                  <span style={{ color: "#008D0E" }} className="fw-bolder">
                    +218.75 %
                  </span>
                </div>
                <div className="col d-flex justify-content-between align-items-center">
                  <div>
                    <img src={star} alt="" style={{ width: "30px" }} />
                    <span className="fw-bold ms-2">4.5</span>
                    <span className="ms-2">(238)</span>
                  </div>
                  <div className="">
                    <span>{rightSideArrowIcon}</span>
                  </div>
                </div>
              </div>
              <div className="row dashboard-data mpp-date mb-3 text-start">
                <div className="col dashboard-mpp-data">
                  <img
                    src={waterBottle}
                    alt="burger"
                    style={{ width: "25px" }}
                  />
                  <p className="mb-0 ms-3 fw-bolder">{t("dashboard.water")}</p>
                </div>
                <div className="col d-flex align-items-center">
                  <span>3 SR</span>
                </div>
                <div className="col  d-flex align-items-center">
                  <span style={{ color: "#008D0E" }} className="fw-bolder">
                    +218.75 %
                  </span>
                </div>
                <div className="col d-flex justify-content-between align-items-center">
                  <div>
                    <img src={star} alt="" style={{ width: "30px" }} />
                    <span className="fw-bold ms-2">4.5</span>
                    <span className="ms-2">(238)</span>
                  </div>
                  <div className="">
                    <span>{rightSideArrowIcon}</span>
                  </div>
                </div>
              </div>
              <div className="row dashboard-data mpp-date mb-3 text-start">
                <div className="col dashboard-mpp-data">
                  <img src={cake} alt="burger" />
                  <p className="mb-0 ms-3 fw-bolder">{t("dashboard.cake")}</p>
                </div>
                <div className="col d-flex align-items-center">
                  <span>15 SR</span>
                </div>
                <div className="col  d-flex align-items-center">
                  <span style={{ color: "#008D0E" }} className="fw-bolder">
                    +218.75 %
                  </span>
                </div>
                <div className="col d-flex justify-content-between align-items-center">
                  <div>
                    <img src={star} alt="" style={{ width: "30px" }} />
                    <span className="fw-bold ms-2">4.5</span>
                    <span className="ms-2">(238)</span>
                  </div>
                  <div className="">
                    <span>{rightSideArrowIcon}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pos-card mb-4">
            <h2 className="pos-card-header">{t("dashboard.branches")}</h2>
            <div className="row dashboard-branches border mb-3 text-start">
              <div className="col dashboard-mpp-data">
                <span>{t("dashboard.locationName")}</span>
              </div>
              <div className="col dashboard-mpp-data">
                <span>12:00 AM</span>
              </div>
              <div className="col dashboard-mpp-data">
                <span>11:59 PM</span>
              </div>
              <div className="col dashboard-mpp-data">
                <span>{t("dashboard.ordersNumber")}</span>
              </div>
            </div>
            <div className="row dashboard-branches border mb-3 text-start">
              <div className="col dashboard-mpp-data">
                <div className="d-flex align-items-center">
                  <span className="dashboard-location-icon">
                    {locationIcon}
                  </span>
                  <p className="mb-0">{t("dashboard.doha")}</p>
                </div>
              </div>
              <div className="col dashboard-mpp-data">
                <span>{t("dashboard.startAt")}</span>
              </div>
              <div className="col dashboard-mpp-data">
                <span>{t("dashboard.endAt")}</span>
              </div>
              <div className="col dashboard-mpp-data">
                <div className="d-flex align-items-center gap-3">
                  <div>
                    <span>{wrightIcon}</span>
                    <span className="ms-2">0</span>
                  </div>
                  <div>
                    <span>{wrongIcon}</span>
                    <span className="ms-2">0</span>
                  </div>
                  <div>
                    <span>{timeIcon}</span>
                    <span className="ms-2">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pos-card mb-4">
            <h2 className="pos-card-header">
              {t("dashboard.almostOutOfStock")}
            </h2>
            <div className="pos-card-body text-center">
              <div className="row dashboard-data mpp-date mb-3 text-start">
                <div className="col dashboard-mpp-data">
                  <img src={mac} alt="burger" />
                  <p className="mb-0 ms-3 fw-bolder">
                    {t("dashboard.frenchFries")}
                  </p>
                </div>
                <div className="col d-flex align-items-center">
                  <span>22 SR to 125 SR</span>
                </div>
                <div className="col  d-flex align-items-center">
                  <span style={{ color: "#008D0E" }} className="fw-bolder">
                    +218.75 %
                  </span>
                </div>
                <div className="col d-flex justify-content-between align-items-center">
                  <div>
                    <img src={star} alt="" style={{ width: "30px" }} />
                    <span className="fw-bold ms-2">4.5</span>
                    <span className="ms-2">(238)</span>
                  </div>
                  <div className="">
                    <span>{rightSideArrowIcon}</span>
                  </div>
                </div>
              </div>
              <div className="row dashboard-data mpp-date mb-3 text-start">
                <div className="col dashboard-mpp-data">
                  <img src={pizza} alt="burger" />
                  <p className="mb-0 ms-3 fw-bolder">{t("dashboard.pizza")}</p>
                </div>
                <div className="col d-flex align-items-center">
                  <span>5 SR</span>
                </div>
                <div className="col  d-flex align-items-center">
                  <span style={{ color: "#008D0E" }} className="fw-bolder">
                    +218.75 %
                  </span>
                </div>
                <div className="col d-flex justify-content-between align-items-center">
                  <div>
                    <img src={star} alt="" style={{ width: "30px" }} />
                    <span className="fw-bold ms-2">4.5</span>
                    <span className="ms-2">(238)</span>
                  </div>
                  <div className="">
                    <span>{rightSideArrowIcon}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT-SIDE SECTION */}
        <div className="col-xxl-4">
          <div className="pos-card mb-4">
            <h2
              className="pos-card-header"
              style={{ fontFamily: "Montserrat Arabic" }}
            >
              {t("dashboard.latestOrders")}
            </h2>
            <div className="dash-latest-order">
              <div className="row">
                <div className="col-3">
                  <img src={burger} alt="burger" style={{ width: "50px" }} />
                </div>
                <div className="col-9">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <p className="fw-bold mb-0">#EA00009</p>
                      <span>2 Sep 2022, 5:48PM</span>
                    </div>
                    <div>
                      <span>{wrightIcon}</span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <p className="fw-bold mb-0">{t("dashboard.source")}</p>
                      <span>{t("dashboard.cashier")}</span>
                    </div>
                    <div className="col-6">
                      <p className="fw-bold mb-0">
                        {t("dashboard.serviceType")}
                      </p>
                      <span>{t("dashboard.dining")}</span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <p className="fw-bold mb-0">{t("dashboard.tableCode")}</p>
                      <span>03</span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <Link>{t("dashboard.viewDetails")}</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pos-card">
            <h2 className="pos-card-header">{t("dashboard.latestReviews")}</h2>
            <div className="dash-latest-reviews">
              <div className="row">
                <div className="col-3">
                  <img src={cake} alt="burger" style={{ width: "50px" }} />
                </div>
                <div className="col-9">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <p className="fw-bold mb-0">#EA00009</p>
                      <span>2 Sep 2022, 5:48PM</span>
                    </div>
                    <div>
                      <span>{wrightIcon}</span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <p className="fw-bold mb-0">{t("dashboard.source")}</p>
                      <span>{t("dashboard.cashier")}</span>
                    </div>
                    <div className="col-6">
                      <p className="fw-bold mb-0">
                        {t("dashboard.serviceType")}
                      </p>
                      <span>{t("dashboard.dining")}</span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <p className="fw-bold mb-0">{t("dashboard.tableCode")}</p>
                      <span>03</span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <Link>{t("dashboard.viewDetails")}</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MobileMenu show={show} onHide={() => setShow(false)} />
    </div>
  );
};

export default Dashboard;
