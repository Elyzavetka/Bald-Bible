import { useEffect, useState } from "react";
import "./GetImages.css";

const GetImages = ({}) => {
  const [images, setImages] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    fetch("http://localhost:8080/api/image", {})
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
      });
  }, []);

  return (
    <div className="image">
      {images.map((imgData) => (
        <div key={imgData._id}>
          <img src={imgData.imageURL} className="image" />
        </div>
      ))}
    </div>
  );
};

export default GetImages;
