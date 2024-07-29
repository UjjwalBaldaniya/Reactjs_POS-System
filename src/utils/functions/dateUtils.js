import moment from "moment";

import { YYYY_MM_DD } from "../constants";

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  const year = date?.getUTCFullYear();
  const month = ("0" + (date?.getUTCMonth() + 1))?.slice(-2);
  const day = ("0" + date?.getUTCDate())?.slice(-2);

  return `${year}/${month}/${day}`;
};

export const formattedDate = (value) => moment(value).format(YYYY_MM_DD);
