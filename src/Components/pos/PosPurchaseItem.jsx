import { Field } from "formik";
import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { BsCalculator } from "react-icons/bs";
import { RiFullscreenExitLine, RiShoppingBagLine } from "react-icons/ri";
import { SlSizeFullscreen } from "react-icons/sl";
import { TbPlaceholder } from "react-icons/tb";
import { TfiMenuAlt } from "react-icons/tfi";
import Select from "react-select";
import cakeImage from "../../assets/images/dashboard/cake.jpg";
import useNavigation from "../../hooks/useNavigation";
import Calculator from "./Calculator";

const PosPurchaseItem = ({
  isFullscreen,
  handleSearchInputChange,
  handleSearchChange,
  categoryNames,
  categoryTabData,
  handleTabClick,
  filteredProductList,
  productTableData,
  handleProductCardClick,
  handleToggleFullscreen,
}) => {
  const { handleBack } = useNavigation();

  const popoverBottom = (
    <Popover id="popover-positioned-bottom" title="Popover bottom">
      <Calculator />
    </Popover>
  );

  return (
    <div className="py-4">
      <div className="d-flex">
        <div className="w-100 me-3">
          <Field name="search">
            {({ field, form }) => (
              <Select
                {...field}
                options={form.values.options}
                inputValue={form.values.searchInputValue}
                onInputChange={(newValue, actionMeta) => {
                  if (
                    actionMeta.action !== "input-blur" &&
                    actionMeta.action !== "menu-close"
                  )
                    handleSearchInputChange(newValue, form.setFieldValue);
                }}
                onChange={(option) =>
                  handleSearchChange(option, form.setFieldValue)
                }
                isClearable
                menuIsOpen={form.values.searchInputValue?.length > 0}
                placeholder="Search Product by Name & Code"
              />
            )}
          </Field>
        </div>
        <div className="d-flex  gap-3">
          <button className="pos-menu-btn">
            <TfiMenuAlt size={22} />
          </button>
          <button className="pos-menu-btn">
            <RiShoppingBagLine size={22} />
          </button>
          <button
            className="pos-menu-btn"
            onClick={() => handleToggleFullscreen()}
          >
            {isFullscreen ? (
              <RiFullscreenExitLine size={20} />
            ) : (
              <SlSizeFullscreen size={17} />
            )}
          </button>
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={popoverBottom}
          >
            <button className="pos-menu-btn">
              <BsCalculator size={22} />
            </button>
          </OverlayTrigger>
          <button className="pos-menu-btn" onClick={handleBack}>
            <TbPlaceholder size={22} />
          </button>
        </div>
      </div>
      <div className="mt-4">
        <div className="d-flex overflow-auto gap-1">
          {categoryNames?.map((name, index) => {
            return (
              <button
                key={index}
                type="button"
                className={
                  categoryTabData === index
                    ? "navbar-add-products"
                    : "export-all"
                }
                onClick={() => handleTabClick(name, index)}
              >
                {name}
              </button>
            );
          })}
        </div>
        <div className="mt-4">
          <div className="pos-product-section">
            <div className="d-flex flex-wrap gap-4">
              {filteredProductList?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`pos-product ${
                      productTableData?.some(
                        (dataItem) =>
                          dataItem?.formatted_name === item?.formatted_name
                      )
                        ? "pos-product-card-border"
                        : ""
                    }`}
                    onClick={() => handleProductCardClick(item, index)}
                  >
                    <img src={cakeImage} alt="" className="img-fluid" />
                    <div className="pos-product-desc">
                      <p className="pos-product-title">
                        {item?.formatted_name}
                      </p>
                      <p className="pos-product-price">
                        {`$ ${item?.product_price}.00`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosPurchaseItem;
