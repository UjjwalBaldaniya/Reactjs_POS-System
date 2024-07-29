import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { deleteIcon } from "../../assets/icons/tables";
import { fetchProducts } from "../../redux/slice/product.slice";
import { fetchPurchase } from "../../redux/slice/purchaseSlice";
import { fetchSuppliers } from "../../redux/slice/supplierSlice";

const AddPurchaseReturnContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productsData = [] } = useSelector((state) => state.product || {});
  const { purchaseData = [] } = useSelector((state) => state.purchase || {});
  const { suppliersData = [] } = useSelector((state) => state?.supplier || {});

  const [productTableData, setProductTableData] = useState([]);

  useEffect(() => {
    dispatch(fetchPurchase());
    dispatch(fetchProducts());
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const handleBack = () => {
    navigate("/purchases");
  };

  const getSupplierName = (purchaseData, suppliersData) => {
    const results = [];

    suppliersData?.forEach((suppliers) => {
      purchaseData?.forEach((purchase) => {
        if (suppliers?._id === purchase?.supplier_id?._id) {
          results.push({
            label: `${purchase?.bill_id}(${suppliers?.name})`,
            value: `${purchase?.bill_id}(${suppliers?.name})`,
          });
        }
      });
    });

    return results;
  };
  const billNoSupplierOption = getSupplierName(purchaseData, suppliersData);

  const purchaseReturnItems = (value) => {
    if (!value?.supplier?.value) return [];

    const [invoiceNo, supplierName] = value.supplier.value.split("(");
    const cleanSupplierName = supplierName?.slice(0, -1);

    const findSupplierId = suppliersData?.find(
      (data) => data?.name === cleanSupplierName
    )?._id;

    if (!findSupplierId) return [];

    const findSupplierName = purchaseData
      ?.find(
        (data) =>
          data?.bill_id === invoiceNo &&
          data?.supplier_id?._id === findSupplierId
      )
      ?.items?.map((item) => ({
        value: item?.subtotal,
        label: item?.subtotal,
      }));

    return findSupplierName || [];
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
            }))
        : [];
      setProductTableData((prevData) => [...prevData, ...filterOptionsData]);
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
    const value = event?.target?.value;
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

  const handleSubmit = async () => {};

  return {
    productTableData,
    actionsBtn,
    initialValues,
    billNoSupplierOption,
    handleBack,
    setProductTableData,
    handleChange,
    handleSubmit,
    calculateTotals,
    preventNegative,
    AmountDisplay,
    purchaseReturnItems,
  };
};

export default AddPurchaseReturnContainer;
