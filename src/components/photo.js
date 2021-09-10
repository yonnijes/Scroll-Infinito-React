import React, { useEffect, useRef } from "react";

// hooks react redux
import { useDispatch, useSelector } from "react-redux";
// importamos la acción
import { getPhotos } from "../redux/photoDuck";

const Photos = () => {
  // declaramos displach para llamar a la acción o acciones
  const dispatch = useDispatch();

  // crearmos el state utilizando nuestra tienda
  // store.photos lo sacamos de la tienda
  const photo = useSelector((store) => store.photo);

  const divLoader = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const loader = divLoader.current;
      const { y } = loader.getBoundingClientRect();
      if (y - window.innerHeight <= 0) {
        dispatch(getPhotos());
      }
    };

    dispatch(getPhotos());

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  // Additional css
  const loadingCSS = {
    height: "100px",
    //margin: "300px",
    background: "red",
  };
  // To change the loading icon behavior
  const loadingTextCSS = { display: photo.loading ? "block" : "none" };

  const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  return (
    <div className="container">
      <div>
        {photo.photos.map((ph) => (
          <img
            key={uuidv4()}
            src={ph.download_url}
            style={{
              width: "500px",
              height: "auto",
              margin: "10px",
              borderRadius: "3px",
            }}
            alt=""
          />
        ))}
      </div>
      <div style={loadingCSS} ref={divLoader}>
        <span style={loadingTextCSS}>Loading...</span>
      </div>
    </div>
  );
};
export default Photos;
