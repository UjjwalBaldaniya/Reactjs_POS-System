export const columns = [
  {
    label: "Product Category",
    accessor: "category_name",
    render: (row) => (
      <>
        {row?.category_image && (
          <div className="dynamic-table-img">
            <img
              src={`${process.env.REACT_APP_IMG_URL}${row?.category_image}`}
              alt=""
            />
            <span>{row?.category_name}</span>
          </div>
        )}
      </>
    ),
  },
];

export const productsCategoriesFields = [
  {
    label: "Product Category",
    name: "email",
    type: "email",
    placeholder: "product category",
  },
  {
    label: "Product Count",
    name: "password",
    type: "password",
    placeholder: "product count",
  },
];
