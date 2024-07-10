import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteIcon } from "../../assets/icons/tables";
import {
  statusOptions,
  supplierOptions,
} from "../../description/purchases.description";
import {
  fetchProductByName,
  fetchPurchaseById,
  setEdit,
} from "../../redux/slice/purchaseSlice";
import { fetchSuppliers } from "../../redux/slice/supplierSlice";
import { getDropdownOptions } from "../../common/functions/getDropdownOptions";
import { addPurchase } from "../../api/services/purchaseService";
import moment from "moment/moment";

const AddPurchasesContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productByNameData, supplierDataById, isEdit } = useSelector(
    (state) => state.purchase
  );
  const { suppliersData } = useSelector((state) => state?.supplier);

  const {
    bill_id,
    date,
    supplier_id,
    order_tax,
    order_tax_sign,
    discount,
    discount_sign,
    shipping,
    shipping_sign,
    status,
    notes,
  } = supplierDataById || {};

  const [productTableData, setProductTableData] = useState([]);
  const [grandTotal, setGrandTotal] = useState("");
  const supplierOption = getDropdownOptions(suppliersData, "_id", "name");

  useEffect(() => {
    dispatch(fetchProductByName());
    dispatch(fetchSuppliers());

    if (id) {
      dispatch(fetchPurchaseById(id));
      dispatch(setEdit(true));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (isEdit) setProductTableData(supplierDataById);
  }, [isEdit, supplierDataById]);

  const addPurchaseColumns = [
    { label: "Product", accessor: isEdit ? "product_name" : "product_name_en" },
    { label: "Variation", accessor: "variation_type_name" },
    { label: "Code", accessor: isEdit ? "product_code" : "code" },
    { label: "Code", accessor: (row) => console.log("row", row) },
    {
      label: "Price",
      accessor: (row) => `$ ${row?.product_price}`,
    },
    { label: "Stock", accessor: "stock" },
    {
      label: "QTY",
      accessor: "qty",
      render: (row, handleQtyChange) => (
        <div>
          <button
            onClick={() => handleQtyChange(row, row?.qty - 1, isEdit)}
            className="dynamic-calc-count-btn me-3"
            type="button"
          >
            -
          </button>
          <span>{row.qty}</span>
          <button
            onClick={() => handleQtyChange(row, row?.qty + 1, isEdit)}
            className="dynamic-calc-count-btn ms-3"
            type="button"
          >
            +
          </button>
        </div>
      ),
    },
    { label: "Subtotal", accessor: (row) => `$ ${row?.subtotal}` },
  ];

  const getSupplierEditOption = (id) =>
    supplierOption?.find((data) => data?.value === id?._id);

  const getStatusEditOptions = (value) =>
    statusOptions?.find((data) => data?.value === value);

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
      ? productTableData?.some(
          (value) =>
            value?.formatted_name?.toLowerCase() ===
            option?.value?.toLowerCase()
        )
      : false;

    if (isDataAvailable) {
      toast.error("This Product Already Added");
    } else {
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
    const findProductTableData = isEdit
      ? productTableData?.items
      : productTableData;

    let grandTotal = findProductTableData?.reduce(
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

  const getGrandTotal = (data) => {
    setTimeout(() => {
      setGrandTotal(data);
    }, 100);
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
    invoiceNo: bill_id || "",
    supplierInputValue: "",
    inputValue: "",
    options: [],
    date: isEdit ? moment(date) : "",
    supplier: getSupplierEditOption(supplier_id) || "",
    products: [],
    orderTax: order_tax || "",
    orderTaxType: order_tax_sign === "per" ? "%" : "$",
    discount: discount || "",
    discountType: discount_sign === "per" ? "%" : "$",
    shipping: shipping || "",
    shippingType: shipping_sign === "per" ? "%" : "$",
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

    formData.append("bill_id", values?.invoiceNo);
    formData.append("date", values?.date);
    formData.append("supplier_id", values?.supplier?.value);

    const appendPurchaseDetails = (variations, formData) => {
      variations?.forEach((data, index) => {
        const variationDetails = {
          product_id: data?._id,
          variation_id: data?.variation_id,
          variation_type_id: data?.variation_type_id,
          qty: data?.qty,
          subtotal: data?.subtotal,
        };
        Object.entries(variationDetails)?.forEach(([key, value]) => {
          formData.append(`items[${index}][${key}]`, value);
        });
      });
    };
    appendPurchaseDetails(productTableData, formData);

    formData.append(
      "order_tax_sign",
      values?.orderTaxType === "%" ? "per" : "doller"
    );
    formData.append("order_tax", values?.orderTax);
    formData.append(
      "discount_sign",
      values?.discountType === "%" ? "per" : "doller"
    );
    formData.append("discount", values?.discount);
    formData.append(
      "shipping_sign",
      values?.shippingType === "%" ? "per" : "doller"
    );
    formData.append("shipping", values?.shipping);
    formData.append("grand_total", grandTotal);
    formData.append("status", values?.status?.value);
    formData.append("notes", values?.note);

    try {
      const response = await addPurchase(formData);

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

  return {
    supplierOption,
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
    getGrandTotal,
    isEdit,
    addPurchaseColumns,
  };
};

export default AddPurchasesContainer;
