import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteIcon } from "../../assets/icons/tables";
import { fetchProducts } from "../../redux/slice/product.slice";
import { supplierOptions } from "../../description/purchases.description";

const AddPurchasesContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productsData } = useSelector((state) => state.product);

  const [productTableData, setProductTableData] = useState([]);

  const handleBack = () => {
    navigate("/purchases");
  };

  const handleDelete = (row) => {
    const deleteProductTableData = productTableData?.filter(
      (item) => item?._id !== row?._id
    );
    setProductTableData(deleteProductTableData);
  };

  const actionsBtn = [
    { name: "delete", icon: deleteIcon, handler: handleDelete },
  ];

  const handleInputChange = (newValue, setFieldValue) => {
    setFieldValue("inputValue", newValue);
    if (!newValue) {
      setFieldValue("options", []);
      return;
    }

    const filteredOptions = productsData
      ?.filter((item) =>
        item?.product_name_en?.toLowerCase()?.includes(newValue?.toLowerCase())
      )
      ?.map((data) => ({
        value: data?.product_name_en,
        label: data?.product_name_en,
      }));

    setFieldValue("options", filteredOptions);
  };

  const handleChange = (option, setFieldValue) => {
    const isDataAvailable = option
      ? productTableData?.some(
          (value) =>
            value?.product_name_en?.toLowerCase() ===
            option?.value?.toLowerCase()
        )
      : false;

    if (isDataAvailable) {
      toast.error("This Product Already Added");
    } else {
      const filterOptionsData = option
        ? productsData
            ?.filter((item) =>
              item?.product_name_en
                ?.toLowerCase()
                ?.includes(option?.label?.toLowerCase())
            )
            ?.map((item) => ({
              ...item,
              qty: 1,
              subtotal: item?.single_details?.product_price,
            }))?.[0]
        : {};
      setProductTableData((prevData) => [...prevData, filterOptionsData]);
      setFieldValue("inputValue", "");
    }
  };

  const calculateTotals = (
    productTableData,
    orderTax,
    orderTaxType,
    discount,
    discountType,
    shipping,
    shippingType
  ) => {
    let grandTotal = productTableData?.reduce(
      (accumulator, item) => accumulator + (parseFloat(item?.subtotal) || 0),
      0
    );

    let taxAmount = 0;
    if (orderTaxType === "%") {
      taxAmount = (grandTotal * (parseFloat(orderTax) || 0)) / 100;
    } else {
      taxAmount = parseFloat(orderTax) || 0;
    }
    grandTotal += taxAmount;

    let discountAmount = 0;
    if (discountType === "%") {
      discountAmount = (grandTotal * (parseFloat(discount) || 0)) / 100;
    } else {
      discountAmount = parseFloat(discount) || 0;
    }
    grandTotal -= discountAmount;

    let shippingAmount = 0;
    if (shippingType === "%") {
      shippingAmount = (grandTotal * (parseFloat(shipping) || 0)) / 100;
    } else {
      shippingAmount = parseFloat(shipping) || 0;
    }
    grandTotal += shippingAmount;

    return { grandTotal, taxAmount, discountAmount, shippingAmount };
  };

  const preventNegative = (event, setFieldValue, name) => {
    const value = event.target.value;
    if (value < 0) {
      setFieldValue(name, 1);
    } else {
      setFieldValue(name, value);
    }
  };

  const AmountDisplay = ({ amount, value, type }) => {
    return (
      <p>
        {`$ ${amount}`} {type === "%" && `(${value || 0}% )`}
      </p>
    );
  };

  const initialValues = {
    search: null,
    supplierInputValue: "",
    inputValue: "",
    options: [],
    date: "",
    supplier: "",
    products: [],
    orderTax: "",
    orderTaxType: "%",
    discount: "",
    discountType: "$",
    shipping: "",
    shippingType: "$",
    status: "",
    note: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    // console.log("🚀 ~ handleSubmit ~ values:", values);
  };

  const supplierNavigate = (e, values) => {
    if (
      e.key === "Enter" &&
      !supplierOptions?.some((option) =>
        option?.label
          ?.toLowerCase()
          .includes(values.supplierInputValue?.toLowerCase())
      )
    )
      navigate("/suppliers/create");
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return {
    handleBack,
    actionsBtn,
    initialValues,
    handleSubmit,
    handleInputChange,
    setProductTableData,
    handleChange,
    productTableData,
    calculateTotals,
    preventNegative,
    AmountDisplay,
    supplierNavigate,
  };
};

export default AddPurchasesContainer;
