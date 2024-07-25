import { Field } from "formik";
import React from "react";
import { BsCalculator } from "react-icons/bs";
import { RiShoppingBagLine } from "react-icons/ri";
import { TbPlaceholder } from "react-icons/tb";
import Select from "react-select";
import { burgerIcon } from "../../assets/icons/pos";
import cakeImage from "../../assets/images/dashboard/cake.jpg";
import { useNavigate } from "react-router-dom";

const PosPurchaseItem = ({
  handleSearchInputChange,
  handleSearchChange,
  categoryNames,
  categoryTabData,
  handleTabClick,
  filteredProductList,
  productTableData,
  handleProductCardClick,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
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
                  ) {
                    handleSearchInputChange(newValue, form.setFieldValue);
                  }
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
            <div>{burgerIcon}</div>
          </button>
          <button className="pos-menu-btn">
            <RiShoppingBagLine size={22} />
          </button>
          <button className="pos-menu-btn">
            <BsCalculator size={22} />
          </button>
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
