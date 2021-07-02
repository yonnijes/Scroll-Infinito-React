import axios from "axios";

// constantes
const dataInicial = {
  loading: false,
  photos: [],
  page: 0,
};

// types
let URL = "https://picsum.photos/v2/list";

let GET_PHOTOS = "GET_PHOTOS";
let GET_PHOTOS_SUCCESS = "GET_PHOTOS_SUCCESS";
let GET_PHOTOS_ERROR = "GET_PHOTOS_ERROR";

// reducer

export default function reducer(state = dataInicial, action) {
  switch (action.type) {
    case GET_PHOTOS:
      return { ...state, loading: true };
    case GET_PHOTOS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case GET_PHOTOS_SUCCESS:
      return {
        ...state,
        photos: [...state.photos, ...action.payload.photo],
        loading: false,
        page: action.payload.page,
      };

    default:
      return state;
  }
}

// actions
export const getPhotos = () => async (dispatch, getState) => {
  const { page, loading } = getState().photo;
  dispatch({
    type: GET_PHOTOS,
  });

  if (!loading) {
    try {
      const res = await axios.get(`${URL}?page=${page}&limit=10`);
      dispatch({
        type: GET_PHOTOS_SUCCESS,
        payload: { photo: res.data, page: page + 1 },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_PHOTOS_ERROR,
        payload: error.response.message,
      });
    }
  }
};
