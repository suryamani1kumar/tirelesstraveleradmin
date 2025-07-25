import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import {
  Box,
  Button,
  Grid,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Editorformats, Editormodules } from "../Data";
import AutoComplete from "../autoComplete";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../utils/fetchData";

const TextEditor = ({
  blogForm,
  setBlogFrom,
  sumbit,
  category,
  setCategory,
}) => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.fetchApi);
  const handleblogForm = (e) => {
    const { value, name } = e.target;
    setBlogFrom({ ...blogForm, [name]: value });
  };

  const handleImage = (e) => {
    setBlogFrom({ ...blogForm, images: [...e.target.files] });
  };

  const handlemoreFAQ = () => {
    setBlogFrom({
      ...blogForm,
      faqs: [...blogForm.faqs, { ques: "", ans: "" }],
    });
  };

  const handledeleteFAQ = (index) => {
    let Faq = [...blogForm.faqs];
    Faq.splice(index, 1);
    setBlogFrom({
      ...blogForm,
      faqs: Faq,
    });
  };

  const handlefaqs = (value, name, index) => {
    let faqsArray = [...blogForm.faqs];
    faqsArray[index][name] = value;
    setBlogFrom({
      ...blogForm,
      faqs: faqsArray,
    });
  };

  useEffect(() => {
    if (!category) return;

    const handler = setTimeout(() => {
      dispatch(getData(`searchcategory?name=${category}`));
    }, 500);

    return () => clearTimeout(handler);
  }, [category, dispatch]);

  return (
    <Box component="form" onSubmit={sumbit} noValidate>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4, lg: 4 }}>
          <TextField
            label="Meta Title"
            fullWidth
            name="metaTitle"
            value={blogForm.metaTitle}
            onChange={handleblogForm}
            placeholder="Meta Title"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4, lg: 4 }}>
          <TextField
            label="Meta Keyword"
            fullWidth
            name="metaKeyword"
            value={blogForm.metaKeyword}
            onChange={handleblogForm}
            placeholder="Meta Keyword"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4, lg: 4 }}>
          <TextField
            label="Meta Description"
            fullWidth
            name="metaDescription"
            value={blogForm.metaDescription}
            onChange={handleblogForm}
            placeholder="Meta Description"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4, lg: 4 }}>
          <TextField
            label="Page URL"
            fullWidth
            name="pageUrl"
            value={blogForm.pageUrl}
            onChange={handleblogForm}
            placeholder="Page URL"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4, lg: 4 }}>
          <TextField
            label="Heading"
            fullWidth
            name="heading"
            value={blogForm.heading}
            onChange={handleblogForm}
            placeholder="Heading"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4, lg: 2 }}>
          <AutoComplete
            placeholder="Category"
            inputValue={category}
            setInputValue={setCategory}
            listData={data.data || []}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4, lg: 2 }}>
          <TextField
            select
            label="Status"
            fullWidth
            name="active"
            value={blogForm.active}
            onChange={handleblogForm}
          >
            <MenuItem value="true">Active</MenuItem>
            <MenuItem value="false">Inactive</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, md: 4, lg: 4 }}>

          <TextField type="file" fullWidth multiple onChange={handleImage} />

        </Grid>
        <Grid size={{ xs: 12, md: 4, lg: 4 }}>
          <TextField
            label="Author Name"
            fullWidth
            name="authorName"
            value={blogForm.authorName}
            onChange={handleblogForm}
            placeholder="Author Name"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4, lg: 4 }}>
          <TextField
            label="About Author"
            fullWidth
            multiline
            minRows={1}
            name="authorDescription"
            value={blogForm.authorDescription}
            onChange={handleblogForm}
            placeholder="About Author"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4, lg: 4 }}>
          <TextField
            label="Small Description"
            fullWidth
            name="smallDescription"
            multiline
            minRows={1}
            value={blogForm.smallDescription}
            onChange={handleblogForm}
            placeholder="Description"
          />
        </Grid>
        <Grid size={12}>
          <Typography variant="subtitle1" gutterBottom>
            Content
          </Typography>
          <ReactQuill
            value={blogForm.content}
            onChange={(value) => setBlogFrom({ ...blogForm, content: value })}
            formats={Editorformats}
            modules={Editormodules}
          />
        </Grid>
        {blogForm.faqs.map((faqitem, i) => (
          <React.Fragment key={i}>
            <Grid size={{ xs: 12, md: 4, lg: 4 }}>
              <TextField
                label="FAQ Question"
                fullWidth
                value={faqitem.ques}
                onChange={(e) => handlefaqs(e.target.value, "ques", i)}
                placeholder="FAQ Question"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4, lg: 8 }}>
              <ReactQuill
                value={faqitem.ans}
                onChange={(e) => handlefaqs(e, "ans", i)}
              />
            </Grid>

            {blogForm.faqs.length > 1 && (
              <Grid size={{ xs: 12, md: 4, lg: 1 }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handledeleteFAQ(i)}
                  sx={{ mt: 2 }}
                >
                  Delete
                </Button>
              </Grid>
            )}
          </React.Fragment>
        ))}

        <Grid s>
          <Button variant="contained" onClick={handlemoreFAQ} sx={{ mt: 2 }}>
            Add FAQ
          </Button>
          <Button type="submit" variant="contained" sx={{ mt: 3 ,ml:3}}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TextEditor;
