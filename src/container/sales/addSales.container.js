import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addSale,
  deleteSaleByName,
  editSale,
} from "../../api/services/saleService";
import { deleteIcon } from "../../assets/icons/tables";
import { statusOptions } from "../../description/purchases.description";
import { fetchCustomers } from "../../redux/slice/customerSlice";
import { fetchProductByName } from "../../redux/slice/purchaseSlice";
import { fetchSaleById, setEdit } from "../../redux/slice/saleSlice";
import { formattedDate } from "../../utils/functions/dateUtils";
import { getDropdownOption } from "../../utils/functions/dropdownUtils";
import {
  getValueSign,
  getValueSignName,
} from "../../utils/functions/salesAndPurchasesUtils";

const AddSalesContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersData = [] } = useSelector((state) => state?.customer || {});
  const {
    saleDataById = {},
    isEdit,
    status: loading,
  } = useSelector((state) => state.sale || {});
  const { productByNameData = [] } = useSelector(
    (state) => state.purchase || {}
  );

  const [productTableData, setProductTableData] = useState([]);
  const [grandTotal, setGrandTotal] = useState("");

  useEffect(() => {
    dispatch(fetchProductByName());
    dispatch(fetchCustomers());

    if (id) {
      dispatch(fetchSaleById(id));
      dispatch(setEdit(true));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (isEdit) setProductTableData(saleDataById);
  }, [isEdit, saleDataById]);

  const {
    order_id,
    date,
    customer_id,
    order_tax,
    order_tax_sign,
    discount,
    discount_sign,
    shipping,
    shipping_sign,
    status,
    notes,
  } = saleDataById || {};

  const currentProductData = isEdit
    ? productTableData?.items
    : productTableData;

  const customerOption = getDropdownOption(customersData, "_id", "name");

  const handleBack = () => {
    navigate("/sales");
  };

  const getGrandTotal = (data) => {
    setTimeout(() => {
      setGrandTotal(data);
    }, 100);
  };

  const getSupplierEditOption = (id) =>
    customerOption?.find((data) => data?.value === id?._id);

  const getStatusEditOptions = (value) =>
    statusOptions?.find((data) => data?.value === value);

  const setCountQty = (updatedData) => {
    if (isEdit)
      setProductTableData((prevData) => ({
        ...prevData,
        items: updatedData,
      }));
    else setProductTableData(updatedData);
  };

  const supplierNavigate = (e, values) => {
    if (
      e.key === "Enter" &&
      !customerOption?.some((option) =>
        option?.label
          ?.toLowerCase()
          .includes(values.supplierInputValue?.toLowerCase())
      )
    )
      navigate("/customers/create");
  };

  const filterDataByKey = (data, key, value) =>
    data?.filter((item) => item[key] !== value);

  const handleDelete = async (row) => {
    const itemId = row?.item_id;
    const rowId = row?.formatted_name;

    const addDeleteProduct = filterDataByKey(
      currentProductData,
      "formatted_name",
      rowId
    );

    const isItemIdKeyPresent = (row) => {
      return "item_id" in row;
    };
    const isKeyPresent = isItemIdKeyPresent(row);

    if (isEdit) {
      if (isKeyPresent) await deleteSaleByName(id, { itemId });
      setProductTableData((prevData) => ({
        ...prevData,
        items: addDeleteProduct,
      }));
    } else setProductTableData(addDeleteProduct);
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

  const handleChange = (option, setFieldValue) => {
    const isDataAvailable = option
      ? currentProductData?.some(
          (value) =>
            value?.formatted_name?.toLowerCase() ===
            option?.value?.toLowerCase()
        )
      : false;

    if (isDataAvailable) toast.error("This Product Already Added");
    else {
      const filterOptionsData = option
        ? productByNameData
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
            }))?.[0]
        : {};

      if (isEdit)
        setProductTableData((prevData) => ({
          ...prevData,
          items: [...prevData.items, filterOptionsData],
        }));
      else setProductTableData((prevData) => [...prevData, filterOptionsData]);
      setFieldValue("inputValue", "");
    }
  };

  const initialValues = {
    search: null,
    invoiceNo: order_id || "",
    customerInputValue: "",
    inputValue: "",
    options: [],
    date: isEdit ? date : "",
    customer: getSupplierEditOption(customer_id) || "",
    products: [],
    orderTax: order_tax || "",
    orderTaxType: getValueSign(order_tax_sign),
    discount: discount || "",
    discountType: getValueSign(discount_sign),
    shipping: shipping || "",
    shippingType: getValueSign(shipping_sign),
    grandTotal: 0,
    status: getStatusEditOptions(status) || "",
    note: notes || "",
  };

  const handleSubmit = async (
    values,
    { setSubmitting, setFieldError, resetForm }
  ) => {
    setSubmitting(true);
    const formData = new FormData();

    formData.append("order_id", values?.invoiceNo);
    formData.append("date", formattedDate(values?.date));
    formData.append("customer_id", values?.customer?.value);

    const appendPurchaseDetails = (variations, formData) => {
      variations?.forEach((data, index) => {
        const variationDetails = {
          product_id: data?.product_id || data?._id,
          variation_id: data?.variation_id,
          variation_type_id: data?.variation_type_id,
          qty: data?.qty,
          subtotal: data?.subtotal,
        };
        Object.entries(variationDetails)?.forEach(([key, value]) => {
          if (value) formData.append(`items[${index}][${key}]`, value || "");
        });
      });
    };

    appendPurchaseDetails(currentProductData, formData);

    formData.append("order_tax_sign", getValueSignName(values.orderTaxType));
    formData.append("order_tax", values?.orderTax);
    formData.append("discount_sign", getValueSignName(values.discountType));
    formData.append("discount", values?.discount);
    formData.append("shipping_sign", getValueSignName(values.shippingType));
    formData.append("shipping", values?.shipping);
    formData.append("grand_total", grandTotal);
    formData.append("status", values?.status?.value);
    formData.append("notes", values?.note);

    try {
      const response = isEdit
        ? await editSale(id, formData)
        : await addSale(formData);

      if (response) {
        handleBack();
        resetForm();
      }
    } catch (error) {
      setFieldError(
        "general",
        error.response?.data?.msg || "An error occurred"
      );
    }
    setSubmitting(false);
  };

  return {
    initialValues,
    customerOption,
    actionsBtn,
    currentProductData,
    productTableData,
    loading,
    isEdit,
    getGrandTotal,
    handleBack,
    setCountQty,
    supplierNavigate,
    handleSubmit,
    handleInputChange,
    handleChange,
  };
};

export default AddSalesContainer;
