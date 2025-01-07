import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

const getFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const shouldFetchData = (key, hours = 3) => {
  const storedData = getFromLocalStorage(key);
  if (!storedData || !storedData.timestamp) return true;
  const now = new Date().getTime();
  const elapsedHours = (now - storedData.timestamp) / (1000 * 60 * 60);
  return elapsedHours >= hours;
};

function useFetchWithLocalStorage(key, fetchFunction, setData, specialRefresh = false ) {
  let { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  
  if (!id) {
    // Since the home page doesn't have id in URL
    id = user.id;
  }
  
  const fetchData = useCallback(async (specialRefresh) => {
    console.log(specialRefresh);
    if (id !== user.id || shouldFetchData(key) || specialRefresh) {
      const data = await fetchFunction(key, token, id);
      
      if (id === user.id) {
        setToLocalStorage(key, { data, timestamp: new Date().getTime() });
      }
      setData(data);
    } else {
      const cachedData = getFromLocalStorage(key);
      setData(cachedData.data);
    }
  }, [key, fetchFunction, id, setData, token, user.id, specialRefresh]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return fetchData; // Return the fetchData function
}

export default useFetchWithLocalStorage;
