import axios from "axios";

const baseUrl = "https://picsum.photos/v2/list";

export const getAll = async (page) => {
    const res = await axios.get(`${baseUrl}?page=${page}&limit=10`);
    return res.data; //photos
};