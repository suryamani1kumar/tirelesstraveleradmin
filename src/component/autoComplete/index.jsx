import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import InputAdornment from "@mui/material/InputAdornment";
import { FaAngleDown } from "react-icons/fa6";

const AutoComplete = (props) => {
  const { placeholder, inputValue, setInputValue, listData } = props;
  const [openSubCategory, setOpenSubCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSelectedCategory("");
    setSelectedSubCategory("");
  };

  const highlightText = (text, search) => {
    const parts = text.split(new RegExp(`(${search})`, "gi"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === search?.toLowerCase() ? (
            <span key={index} style={{ color: "red" }}>
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </span>
    );
  };

  const handleSublistToggle = (i) => {
    setOpenSubCategory(openSubCategory === i ? null : i);
  };

  const inputDisplayValue = selectedCategory
    ? selectedCategory + (selectedSubCategory ? `/${selectedSubCategory}` : "")
    : inputValue;

  const labelName = (item, i) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {highlightText(item.categoryName, inputValue)}
        {item.subCategory.length > 0 && (
          <FaAngleDown
            onClick={() => handleSublistToggle(i)}
            style={{ display: "block" }}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      <TextField
        label={placeholder}
        name="searchText"
        value={inputDisplayValue}
        placeholder={placeholder}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <FaCaretDown />
            </InputAdornment>
          ),
        }}
      />
      {listData.length > 0 &&
        listData.map((item, i) => (
          <ul key={i} style={{ listStyle: "none" }}>
            <li>
              <RadioGroup name="list">
                <FormControlLabel
                  value={item.categoryUrl}
                  control={<Radio />}
                  onChange={(e) => {
                    setInputValue(e.target.value)
                    setSelectedCategory(e.target.value);
                    setSelectedSubCategory(""); // reset sublist on main list select
                  }}
                  label={labelName(item, i)}
                />
              </RadioGroup>

              {item.subCategory.length > 0 && openSubCategory === i && (
                <ul style={{ listStyle: "none" }}>
                  {item.subCategory.map((sublist, j) => (
                    <li key={j}>
                      <RadioGroup name="sublist">
                        <FormControlLabel
                          value={sublist.categoryUrl}
                          control={<Radio />}
                          onChange={(e) => {
                            setSelectedSubCategory(e.target.value);
                            setSelectedCategory(item.categoryUrl);
                            setInputValue(`${item.categoryUrl}/${e.target.value}`)
                          }}
                          label={sublist.categoryName}
                        />
                      </RadioGroup>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        ))}
    </div>
  );
};

export default AutoComplete;
