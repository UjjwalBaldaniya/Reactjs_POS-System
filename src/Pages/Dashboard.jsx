import React from "react";
import "../css/dashboard.css";
import { bellIcon } from "../assets/icons/navbar";
import {
  locationIcon,
  rightSideArrowIcon,
  timeIcon,
  wrightIcon,
  wrongIcon,
} from "../assets/icons/dashboard";
import { Dropdown, DropdownButton } from "react-bootstrap";
import burger from "../assets/images/dashboard/burger.jpg";
import cake from "../assets/images/dashboard/cake.jpg";
import pepsi from "../assets/images/dashboard/pepsi.jpg";
import waterBottle from "../assets/images/dashboard/water-bottle.jpg";
import star from "../assets/images/dashboard/star.webp";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* NAVBAR */}
      <div className="navbar py-5 ">
        <div className="w-100 d-flex justify-content-between align-items-center  ">
          <div className="navbar-title">Dashboard</div>
          <div className="d-flex align-items-center justify-content-center">
            <div className="navbar-icon">{bellIcon}</div>
            <DropdownButton
              id="dropdown-basic-button"
              title="AR"
              className="navbar-dropdown1 ms-3"
            >
              <Dropdown.Item href="#/action-1">العربية</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Sign Out</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>

      <div className="row">
        {/* LEFT-SIDE SECTION */}
        <div className="col-xxl-8">
          <div className="pos-card mb-4">
            <h2 className="pos-card-header">Financial</h2>
            <div className="pos-card-body text-center">hello</div>
          </div>

          <div className="pos-card mb-4">
            <h2 className="pos-card-header">Most popular products</h2>
            <div className="pos-card-body text-center">
              <div className="row dashboard-data mpp-date mb-3 text-start">
                <div className="col dashboard-mpp-data">
                  <img src={burger} alt="burger" />
                  <p className="mb-0 ms-3 fw-bolder">Beaf Burger</p>
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
                  <p className="mb-0 ms-3 fw-bolder">Pepsi Cols 330ml</p>
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
                  <p className="mb-0 ms-3 fw-bolder">Water 250ml</p>
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
                  <p className="mb-0 ms-3 fw-bolder">Cake</p>
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
            <h2 className="pos-card-header">Branches</h2>
            <div className="row dashboard-branches border mb-3 text-start">
              <div className="col dashboard-mpp-data">
                <span>Location Name</span>
              </div>
              <div className="col dashboard-mpp-data">
                <span>12:00 AM</span>
              </div>
              <div className="col dashboard-mpp-data">
                <span>11:59 PM</span>
              </div>
              <div className="col dashboard-mpp-data">
                <span>Orders Number</span>
              </div>
            </div>
            <div className="row dashboard-branches border mb-3 text-start">
              <div className="col dashboard-mpp-data">
                <div className="d-flex align-items-center">
                  <span className="dashboard-location-icon">
                    {locationIcon}
                  </span>
                  <p className="mb-0">doha</p>
                </div>
              </div>
              <div className="col dashboard-mpp-data">
                <span>Start At</span>
              </div>
              <div className="col dashboard-mpp-data">
                <span>End At</span>
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
        </div>

        {/* RIGHT-SIDE SECTION */}
        <div className="col-xxl-4">
          <div className="pos-card mb-4">
            <h2
              className="pos-card-header"
              style={{ fontFamily: "Montserrat Arabic" }}
            >
              Latest Orders
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
                      <p className="fw-bold mb-0">Source</p>
                      <span>Cashier</span>
                    </div>
                    <div className="col-6">
                      <p className="fw-bold mb-0">Service Type</p>
                      <span>Dining</span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <p className="fw-bold mb-0">Table Code</p>
                      <span>03</span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <Link>View Details</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pos-card">
            <h2 className="pos-card-header">Latest Reviews</h2>
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
                      <p className="fw-bold mb-0">Source</p>
                      <span>Cashier</span>
                    </div>
                    <div className="col-6">
                      <p className="fw-bold mb-0">Service Type</p>
                      <span>Dining</span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <p className="fw-bold mb-0">Table Code</p>
                      <span>03</span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <Link>View Details</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM-SIDE SECTION */}
      <div className="pos-card mt-4 mt-xxl-0 mb-4">
        <h2 className="pos-card-header">Almost Out of Stock</h2>
        <div className="row">
          <div className="col-4">
            <div className="pos-card-body text-center">
              <div className="dashboard-data">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <span className="dashboard-location-icon">
                      {locationIcon}
                    </span>
                    <p className="mb-0">No Name</p>
                  </div>
                  <div>
                    <span>{rightSideArrowIcon}</span>
                  </div>
                </div>
              </div>
              <div className="my-4">No out of stock product</div>
            </div>
          </div>
          <div className="col-4"></div>
          <div className="col-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
