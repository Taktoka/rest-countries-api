import axios from "axios";
import { useEffect, useState } from "react";

const CustomData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("data.json").then((res) => {
      setData((data) => res.data);
    });
  }, []);

  const hndleClick = (ref, ref2, ref3) => {
    if (!ref.classList.contains("hide")) {
      ref.classList.add("hide");
      ref2.classList.remove("hide");
      if (ref3.current.classList.contains("App")) {
        ref3.current.classList.toggle("dark-theme");
      } else {
        ref3.current.classList.toggle("clicked");
      }
    } else {
      ref.classList.add("hide");
      ref2.classList.add("show");
    }
  };

  return [hndleClick, data];
};
export default CustomData;
