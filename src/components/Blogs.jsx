import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectSearchInput, setBlogData } from "../features/userSlice";
import { useDispatch } from "react-redux";
import "../style/blog.css";

const Blogs = () => {
  const searchInput = useSelector(selectSearchInput);
  const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=bd56f2642c9e56dc0336f6a200335da2`;

  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(blog_url)
      .then((res) => {
        dispatch(setBlogData(res.data));
        setBlogs(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [searchInput]);
  return (
    <div className="blog__page">
      <h1 className="blog__page__header">BLOGS</h1>
      {loading ? (
        <h1 className="loading">Loading...</h1>
      ) : (
        <div className="blogs">
          {blogs?.articles?.map((blog) => (
            <a
              className="blog"
              target="_blank"
              href={blog.url}
              rel="noreferrer"
            >
              <img src={blog.image} alt={blog.name} />
              <div>
                <h3 className="sourceName">
                  <span>{blog.source.name}</span>
                  <p>{blog.publishedAt}</p>
                </h3>
                <h1>{blog.title}</h1>
                <p>{blog.description}</p>
              </div>
            </a>
          ))}

          {blogs?.totalArticles === 0 && (
            <h1 className="no__blogs">
              No blogs available 😞. Search something else to read blogs on the
              greatest platform.
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Blogs;
