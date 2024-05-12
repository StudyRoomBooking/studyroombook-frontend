import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Other() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/other/");
        setMessage(response.data.message);
      } catch (error) {
        console.error("There was a problem fetching the data:", error);
      }
    };

    fetchData();
  }, []);

  return <main>{message ? <p>{message}</p> : <p>Loading...</p>}</main>;
}
