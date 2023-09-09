import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/card";
import { BsFileImage, BsCameraVideo } from "react-icons/bs";
import { Cloudinary } from "@cloudinary/url-gen";
import FilterTask from "./components/Filter";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function App() {
  const baseUrl = "http://localhost:8080";

  const cld = new Cloudinary({ cloud: { cloudName: "dw4u8az8k" } });

  const [values, setValues] = useState({
    heading: "",
    description: "",
    priority: "",
    image: "",
  });
  const [tasks, setTasks] = useState();
  const [image, setImage] = useState();
  const [coludPic, setCloudPic] = useState();
  const [dbImageId, setDbImgId] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleChangeValues = (value) => {
    console.log(value.target.value);
    // let newVal;
    // if(value.target == 'change'){
    //   newVal = value.target.checked ? 1 : 0
    // }
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));

    console.log(values);
  };

  const handleClickButton = async () => {
    if (image?.type === "image/jpeg" || image?.type === "image/png") {
      setLoading(true);
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "connect_app");
      data.append("cloud_name", "amitconnectapp");
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/amitconnectapp/image/upload",
        {
          method: "post",
          body: data,
        }
      )
        .then((res) => res.json())

        .then(async (res) => {
          await Axios.post(`${baseUrl}/add/image`, {
            image_url: res.url,
          }).then((response) => {
            console.log(response.data.insertId);
            Axios.post(`${baseUrl}/add`, {
              heading: values.heading,
              description: values.description,
              image_id: response.data.insertId,
              priority: 1,
            }).then((response) => {
              console.log(response);
              setValues({
                heading: "",
                description: "",
                priority: "",
                image: "",
              });
              getList();
              setLoading(false);
            });
          });
        });
      // setCloudPic(res.url);

      // console.log("clound pic is",coludPic)
      // await Axios.post(`${baseUrl}/add/image`, {
      //     image_url: res.url,
      //   })
      //   .then((response) => {
      //     console.log(response.data.insertId);
      //     Axios.post(`${baseUrl}/add`, {
      //         heading: values.heading,
      //         description: values.description,
      //         image_id:   response.data.insertId,
      //         priority: 1
      //       }).then((response) => {
      //         console.log(response);
      //         setValues({
      //           heading:"",
      //           description:"",
      //           priority:"",
      //           image:""
      //         })
      //       });
      //   });
    } else {
      Axios.post(`${baseUrl}/add`, {
        heading: values.heading,
        description: values.description,
        priority: values.priority,
      }).then((response) => {
        console.log(response);
        setValues({
          heading: "",
          description: "",
          priority: "",
          image: "",
        });
        getList();
      });
    }

    console.log("imageId", dbImageId);
  };

  useEffect(() => {
    Axios.get(`${baseUrl}/list`).then((response) => {
      // console.log(response)
      setTasks(response.data);
    });
  }, []);

  const getList = async () => {
    await Axios.get(`${baseUrl}/list`).then((response) => {
      // console.log(response)
      setTasks(response.data);
    });
  };

  const filteredList = async (value) => {
    await Axios.get(`${baseUrl}/list?priority=${value}`).then((response) => {
      // console.log(response)
      setTasks(response.data);
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    // setData([
    //   ...data,
    //   {
    //     type: "image",
    //     value: e.target.files[0],
    //   },
    // ]);
    // setImage("")
  };

  function fetchUrl() {
    const objectUrl = URL.createObjectURL(image);
    return objectUrl;
  }

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">TASK APP</h1>
        {isLoading ?? <h1 style={{ color: "red" }}>Loading...</h1>}
        <h3>Add a Taske</h3>
        {/* <FilterTask filteredList={filteredList}/> */}
        <div className="register-box">
          <input
            className="register-input"
            type="text"
            name="heading"
            value={values.heading}
            placeholder="Heading"
            onChange={handleChangeValues}
          />
          <input
            className="register-input"
            type="text"
            name="description"
            value={values.description}
            placeholder="Description"
            onChange={handleChangeValues}
          />
          <button className="register-button" onClick={handleClickButton}>
            Add
          </button>
        </div>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Priority
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="3"
              name="priority"
              control={<Radio />}
              label="Low"
              onChange={handleChangeValues}
            />
            <FormControlLabel
              value="2"
              name="priority"
              control={<Radio />}
              label="Medium"
              onChange={handleChangeValues}
            />
            <FormControlLabel
              value="1"
              name="priority"
              control={<Radio />}
              label="High"
              onChange={handleChangeValues}
            />
          </RadioGroup>
        </FormControl>
        <div>
          <input
            className="imagefile"
            type="file"
            id="customFile"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label htmlFor="customFile">
            <BsFileImage style={{ width: "2rem", height: "2rem" }} />
          </label>
          <label>{image?.name}</label>
        </div>
        <br />
        <div className="filter">
          <FilterTask filteredList={filteredList} />
        </div>
        <div className="cards">
          {typeof tasks !== "undefined" &&
            tasks.map((task) => {
              return (
                <Card
                  key={task.id}
                  id={task.id}
                  heading={task.heading}
                  description={task.description}
                  image_url={task.image_url}
                  image_id={task.image_id}
                  priority={task.priority}
                  get_list={getList}
                ></Card>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
