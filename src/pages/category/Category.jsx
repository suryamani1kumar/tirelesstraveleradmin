import {
  Button,
  Grid,
  MenuItem,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../utils/fetchData";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { sumbitData } from "../../utils/postData";
import { IoIosArrowDown } from "react-icons/io";

const Category = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.fetchApi);
  const postData = useSelector((state) => state.postApi);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState({
    categoryName: "",
    categoryUrl: "",
    description: "",
    image: [],
    active: true,
  });
  const [subCategory, setSubCategory] = useState({
    categoryName: "",
    categoryUrl: "",
    active: "",
  });
  const [getCategory, setGetCategory] = useState(null);
  const handleImage = (e) => {
    setCategory({ ...category, image: [...e.target.files] });
  };
  useEffect(() => {
    dispatch(getData("getcategory"));
  }, []);

  const handleCategory = (e) => {
    const { value, name } = e.target;
    setCategory({ ...category, [name]: value });
  };
  const handleSubCategory = (e) => {
    const { value, name } = e.target;
    setSubCategory({ ...subCategory, [name]: value });
  };

  const sumbitCategory = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("categoryName", category.categoryName);
    form.append("categoryUrl", category.categoryUrl);
    form.append("description", category.description);
    form.append("active", category.active);
    form.append("userid", "3123sas2@fsfs");
    category.image.forEach((file, i) => {
      form.append("file", file);
    });

    dispatch(
      sumbitData({
        url: "category",
        requestBody: form,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  };

  const sumbitSubCategory = (e) => {
    e.preventDefault();
    const requestData = {
      subcategory: [subCategory],
      userid: "3123sas2@fsfs",
      active: getCategory.active,
    };
    dispatch(
      sumbitData({
        url: `subcategory/${getCategory._id}`,
        requestBody: requestData,
      })
    );
    handleClose();
  };

  const handleClickOpen = (selecteddata) => {
    setGetCategory(selecteddata);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <form
        onSubmit={sumbitCategory}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <label>
          category name*
          <input
            placeholder="category name*"
            name="categoryName"
            style={{ padding: "5px", display: "block" }}
            value={category.categoryName}
            onChange={handleCategory}
          />
        </label>
        <label>
          category url*
          <input
            placeholder="category url*"
            style={{ padding: "5px", display: "block" }}
            name="categoryUrl"
            value={category.categoryUrl}
            onChange={handleCategory}
          />
        </label>
        <label>
          Status
          <select
            style={{ padding: "5px", display: "block" }}
            name="active"
            value={category.active}
            onChange={handleCategory}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </label>
        <label>
          Image
          <input
            type="file"
            style={{ padding: "2px", display: "block", border: "1px solid" }}
            onChange={handleImage}
          />
        </label>
        <label>
          Category Descrption
          <textarea
            placeholder="Category Descrption"
            style={{
              width: "320px",
              border: "1px solid #c4c4c4",
              borderRadius: "5px",
              display:"block"
            }}
            name="description"
            value={category.description}
            onChange={handleCategory}
          ></textarea>
        </label>

        <button type="submit" style={{padding:"10px",borderRadius:"5px"}}>Sumbit</button>
      </form>

      <table className="custom-table">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Category Url</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            data?.data?.map((item, i) => (
              <tr key={i}>
                <td>
                  {item.categoryName}
                  {item.subCategory.length > 0 && <IoIosArrowDown />}
                  {item.subCategory.length > 0 &&
                    item.subCategory.map((subCat, ind) => (
                      <tr key={ind}>
                        <td>{subCat.categoryName}</td>
                        <td>{subCat.categoryUrl}</td>
                        <td>{subCat.active ? <FaEye /> : <IoEyeOff />}</td>
                      </tr>
                    ))}
                </td>
                <td>
                  {item.categoryUrl}
                  {item.subCategory.length > 0 && <IoIosArrowDown />}
                </td>

                {/* <td>
                  {item.subCategory.length > 0 && (
                    <Table striped bordered>
                      <thead>
                        <tr>
                          <th>Category Name</th>
                          <th>Category Url</th>
                          <th>Active</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.subCategory.map((subCat, ind) => (
                          <tr key={ind}>
                            <td>{subCat.categoryName}</td>
                            <td>{subCat.categoryUrl}</td>
                            <td>{subCat.active ? <FaEye /> : <IoEyeOff />}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </td> */}
                <td className="d-flex justify-content-around">
                  {/* <Button
                    variant="outlined"
                    onClick={() => handleClickOpen(item)}
                  >
                    Add SubCategory
                  </Button> */}
                  <p onClick={() => console.log("hello")}>
                    {item.active ? <FaEye /> : <IoEyeOff />}
                  </p>

                  <p onClick={() => console.log("hello")}>
                    {" "}
                    <FaTrash />
                  </p>
                  <p onClick={() => console.log("hello")}>
                    {" "}
                    <FaEdit />
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sub Category</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} marginTop={2}>
            <Grid size={{ xs: 12, md: 4, lg: 4 }}>
              <TextField
                fullWidth
                label="SubCategory name*"
                variant="outlined"
                name="categoryName"
                value={subCategory.categoryName}
                onChange={handleSubCategory}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 4 }}>
              <TextField
                fullWidth
                label="SubCategory url*"
                variant="outlined"
                name="categoryUrl"
                value={subCategory.categoryUrl}
                onChange={handleSubCategory}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4, lg: 4 }}>
              <TextField
                select
                label="Status"
                fullWidth
                name="active"
                value={subCategory.active}
                onChange={handleSubCategory}
              >
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={sumbitSubCategory}>
            Sumbit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Category;
