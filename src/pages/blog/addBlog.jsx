import React, { useState } from "react";
import TextEditor from "../../component/textEditor/TextEditor";
import { useDispatch, useSelector } from "react-redux";
import { sumbitData } from "../../utils/postData";

const AddBlog = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.postApi);
  const [blogForm, setBlogFrom] = useState({
    content: "",
    smallDescription: "",
    metaTitle: "",
    metaDescription: "",
    metaKeyword: "",
    pageUrl: "",
    heading: "",
    active: "",
    images: [],
    faqs: [],
    authorName: "",
    authorDescription: "",
  });
  const [category, setCategory] = useState("");

  const sumbitBlog = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("content", blogForm.content);
    form.append("smallDescription", blogForm.smallDescription);
    form.append("metaTitle", blogForm.metaTitle);
    form.append("metaDescription", blogForm.metaDescription);
    form.append("metaKeyword", blogForm.metaKeyword);
    form.append("pageUrl", blogForm.pageUrl);
    form.append("heading", blogForm.heading);
    form.append("category", category);
    form.append("active", blogForm.active);
    form.append("faqs", JSON.stringify(blogForm.faqs));
    form.append("authorName", blogForm.authorName);
    form.append("authorDescription", blogForm.authorDescription);
    blogForm.images.forEach((file, i) => {
      form.append("files", file); // key must match server field
    });
    form.append("userid", "3123sas2@fsfs");

    dispatch(
      sumbitData({
        url: "addBlog",
        requestBody: form,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  };
  return (
    <>
      <TextEditor
        blogForm={blogForm}
        setBlogFrom={setBlogFrom}
        sumbit={sumbitBlog}
        category={category}
        setCategory={setCategory}
      />
    </>
  );
};

export default AddBlog;
