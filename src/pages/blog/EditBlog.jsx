import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TextEditor from "../../component/textEditor/TextEditor";
import Loader from "../../component/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../utils/fetchData";

const EditBlog = () => {
  const { url } = useParams();
  const { data, loading, error } = useSelector((state) => state.fetchApi);
  const [singleBlog, setSingleBlog] = useState({});
  console.log("singleBlog", singleBlog);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData(`blog?pageurl=${url}`));
  }, [url]);

  useEffect(() => {
    if (!loading && data?.blog) {
      setSingleBlog(data.blog);
    }
  }, [loading, data]);

  const updateBlog = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("content", singleBlog.content);
    form.append("smallDescription", singleBlog.smallDescription);
    form.append("metaTitle", singleBlog.metaTitle);
    form.append("metaDescription", singleBlog.metaDescription);
    form.append("metaKeyword", singleBlog.metaKeyword);
    form.append("pageUrl", singleBlog.pageUrl);
    form.append("heading", singleBlog.heading);
    form.append("category", category);
    form.append("active", singleBlog.active);
    form.append("faqs", JSON.stringify(singleBlog.faqs));
    form.append("authorName", singleBlog.authorName);
    form.append("authorDescription", singleBlog.authorDescription);
    blogForm.images.forEach((file, i) => {
      form.append("files", file); // key must match server field
    });
    form.append("userid", "3123sas2@fsfs");

    dispatch(
      sumbitData({
        url: `updateBlog?pageurl=${url}`,
        requestBody: form,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  };
  console.log(loading);

  return (
    <>
      {loading && <Loader />}
      {Object.keys(singleBlog).length > 0 && !loading && (
        <TextEditor
          blogForm={singleBlog}
          setBlogFrom={setSingleBlog}
          sumbit={updateBlog}
        />
      )}
    </>
  );
};

export default EditBlog;
