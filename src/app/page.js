"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePosts } from "./GlobalRedux/Features/Posts/postSlice";
import styles from "./page.module.css";
const API_URL = "https://jsonplaceholder.typicode.com/posts";
const PAGE_LIMIT = 10;
const REFRESH_TIME = 5000;
export default function Home() {
  const postsList = useSelector((state) => state.posts.postsList);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataRefreshAt, setDataRefreshAt] = useState(0);
  const dispatch = useDispatch();
  const fetchPost = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      dispatch(updatePosts(data));
      setFilteredData(data.slice(0, PAGE_LIMIT));
      setDataRefreshAt(new Date().getTime());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const startIndexOfPostList = (currentPage - 1) * PAGE_LIMIT;
    setFilteredData(postsList.slice(startIndexOfPostList, startIndexOfPostList + PAGE_LIMIT));
  }, [currentPage]);

  const previousPage = () => {
    setCurrentPage((prev) => (prev - 1 > 0 ? prev - 1 : prev));
  };

  const nextPage = () => {
    const totalPages = postsList.length / PAGE_LIMIT;
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const refreshFeed = () => {
    if (new Date().getTime() - dataRefreshAt > REFRESH_TIME) {
      fetchPost();
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={refreshFeed}>
        Refresh Feed
      </button>
      {filteredData.map((item) => (
        <div className={styles.postItem}>
          <h3 className={styles.id}>ID-{item.id}</h3>
          <p className={styles.title}>Title-{item.title}</p>
        </div>
      ))}
      <div className={styles.paginationContainer}>
        <div className={styles.pagination}>
          <button className={styles.btn} onClick={previousPage}>
            Previous
          </button>
          <p>1</p>
          <button className={styles.btn} onClick={nextPage}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
