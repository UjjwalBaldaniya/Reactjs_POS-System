export const productsColumns = [
  {
    label: "Product Name",
    accessor: "product_name_en",
    render: (row) => (
      <>
        {row?.product_name_en && (
          <div className="dynamic-table-img">
            <img
              src={`${process.env.REACT_APP_IMG_URL}${row?.product_images?.[0]?.images}`}
              alt=""
            />
            <span>{row?.product_name_en}</span>
          </div>
        )}
      </>
    ),
  },
  { label: "Code", accessor: "code" },
  {
    label: "Price",
    accessor: (row) => `$ ${row?.single_details?.product_price}`,
  },

  {
    label: "Base-Unit",
    accessor: (row) => row?.base_unit_id?.base_unit_name,
  },
  {
    label: "In Stock",
    accessor: (row) => row?.single_details?.stock,
  },
];

// export const branchOptions = [
//   { value: "all", label: "For all branch" },
//   { value: "doha", label: "doha" },
// ];

export const barcodeSymbologyOption = [
  { value: "code128", label: "Code 128" },
  { value: "code39", label: "Code 39" },
];

export const availabilityOption = [
  { value: "available", label: "Available" },
  { value: "outOfStock", label: "Out of stock" },
];

export const productTypeOption = [
  { value: "Single", label: "Single" },
  { value: "Variation", label: "Variation" },
];

export const itemTypeOption = [
  { value: "veg", label: "Veg" },
  { value: "nonVeg", label: "Non-Veg" },
];
