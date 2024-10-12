import { useState, useEffect } from "react";
import baseUrl from "../../../util/baseUrl";

const LikeAmountDisplay = (props) => {
  const [likesAmount, setLikesAmount] = useState(0);

  const getLikesAmount = async () => {
    try {
      const token = window.localStorage.getItem("token");

      const response = await fetch(
        `${baseUrl}/api/image/${props.imageId}/likes`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setLikesAmount(responseData.likes);
      } else {
        console.error("Failed to get likes amount");
      }
    } catch (error) {
      console.error("Error in fetching or parsing data:", error);
    }
  };

  useEffect(() => {
    getLikesAmount();
  }, [props.imageId, props.rerender]);

  return (
    <div>
      <strong>
        {likesAmount} {likesAmount === 1 ? "like" : "likes"}
      </strong>
    </div>
  );
};

export default LikeAmountDisplay;
