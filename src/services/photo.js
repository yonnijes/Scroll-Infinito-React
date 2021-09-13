import axios from "axios";

const baseUrl = "https://picsum.photos/v2/list";

export const getAll = async (page = 0) => {
  if (page === undefined || typeof page !== "number") {
    throw new Error("You must provide a number.");
  }

  try {
    const res = await axios.get(`${baseUrl}?page=${page}&limit=10`);
    return res.data; //photos
  } catch (error) {
    throw new Error("page not found");
  }
};