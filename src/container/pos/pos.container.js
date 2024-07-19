import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteIcon } from "../../assets/icons/tables";
import { fetchCategory } from "../../redux/slice/categorySlice";
import { fetchCustomers } from "../../redux/slice/customerSlice";
import {
  fetchFilteredProductList,
  setFilteredProductList,
} from "../../redux/slice/posSlice";
import { fetchProductByName } from "../../redux/slice/purchaseSlice";
import { getDropdownOption } from "../../utils/functions/dropdownUtils";

const PosContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersData = [] } = useSelector((state) => state?.customer || {});
  const { categoryData = [] } = useSelector((state) => state?.category || {});
  const { productByNameData = [] } = useSelector(
    (state) => state.purchase || {}
  );
  const { filteredProductList = [], status } = useSelector(
    (state) => state.pos || {}
  );

  const [productTableData, setProductTableData] = useState([]);
  const [categoryTabData, setCategoryTabData] = useState(0);

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchProductByName());
    dispatch(fetchCategory());
    dispatch(fetchFilteredProductList());
  }, [dispatch]);

  const customerOption = getDropdownOption(customersData, "_id", "name");
  const categoryNames = [
    "All categories",
    ...categoryData?.map((category) => category?.category_name),
  ];

  const navigateToCustomer = (e, values, customerOption) => {
    if (
      e?.key === "Enter" &&
      !customerOption?.some((option) =>
        option?.label
          ?.toLowerCase()
          .includes(values.supplierInputValue?.toLowerCase())
      )
    )
      navigate("/customers/create");
  };

  const handleDelete = (row) => {
    const deleteItem = productTableData?.filter(
      (data) => data?.formatted_name !== row?.formatted_name
    );
    setProductTableData(deleteItem);
  };

  const actionsBtn = [
    { name: "delete", icon: deleteIcon, handler: handleDelete },
  ];

  const setCountQty = (updatedData) => {
    setProductTableData(updatedData);
  };

  const handleTabClick = (name, index) => {
    handleCategoryTabClick(index);
    dispatch(setFilteredProductList(name));
  };

  const handleSearchInputChange = (newValue, setFieldValue) => {
    setFieldValue("searchInputValue", newValue);
    if (!newValue) {
      setFieldValue("options", []);
      return;
    }

    const filteredOptions = productByNameData
      ?.filter((item) =>
        item?.formatted_name?.toLowerCase()?.includes(newValue?.toLowerCase())
      )
      ?.map((data) => ({
        value: data?.formatted_name,
        label: data?.formatted_name,
      }));

    setFieldValue("options", filteredOptions);
  };

  const isProductPresent = (item) =>
    productTableData?.some(
      (value) => value?.formatted_name?.toLowerCase() === item?.toLowerCase()
    );

  const handleSearchChange = (option, setFieldValue) => {
    if (option) {
      const isDataAvailable = isProductPresent(option?.value);

      if (isDataAvailable) toast.error("This Product Already Added");
      else {
        const filterOptionsData = productByNameData
          ?.filter((item) =>
            item?.formatted_name
              ?.toLowerCase()
              ?.includes(option?.label?.toLowerCase())
          )
          ?.map((item) => ({
            ...item,
            qty: 1,
            subtotal: item?.product_price,
            product_name: item?.product_name_en,
          }))[0];

        setProductTableData((prevData) => [...prevData, filterOptionsData]);
        setFieldValue("search", null);
      }
    }
    setFieldValue("searchInputValue", "");
  };

  const handleCategoryTabClick = (index) => setCategoryTabData(index);

  const handleProductCardClick = (item, index) => {
    if (item) {
      const isDataAvailable = isProductPresent(item?.formatted_name);

      if (isDataAvailable) toast.error("This Product Already Added");
      else {
        const filterOptionsData = productByNameData
          ?.filter(
            (data) =>
              data?.formatted_name?.toLowerCase() ===
              item?.formatted_name?.toLowerCase()
          )
          ?.map((item) => ({
            ...item,
            qty: 1,
            subtotal: item?.product_price,
            product_name: item?.product_name_en,
          }))[0];

        setProductTableData((prevData) => [...prevData, filterOptionsData]);
      }
    }
  };

  const initialValues = {
    customer: "",
    customerInputValue: "",
    search: null,
    searchInputValue: "",
    options: [],
    orderTax: "",
    orderTaxType: "%",
    discount: "",
    discountType: "$",
    shipping: "",
    shippingType: "$",
  };

  const handleSubmit = async (
    values,
    { setSubmitting, setFieldError, resetForm }
  ) => {};

  return {
    initialValues,
    customerOption,
    actionsBtn,
    productTableData,
    categoryNames,
    categoryTabData,
    productByNameData,
    filteredProductList,
    status,
    handleSubmit,
    navigateToCustomer,
    setCountQty,
    handleTabClick,
    handleSearchInputChange,
    handleSearchChange,
    handleCategoryTabClick,
    handleProductCardClick,
  };
};

export default PosContainer;
