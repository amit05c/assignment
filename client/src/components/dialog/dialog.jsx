import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import axios from "axios";
import { Avatar } from "@mui/material";
import { BsFileImage, BsCameraVideo } from "react-icons/bs";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    heading: props.heading,
    description: props.description,
    image_url: props.image_url,
    image_id: props.image_id,
  });

  const [fileIage, setFileImage] = useState(null);

  const handleEditValues = async () => {
    // console.log(props.baseUrl)
    // console.log(editValues);
    console.log("amit is")

    if (fileIage) {
      // setLoading(true);
      const data = new FormData();
      data.append("file", fileIage);
      data.append("upload_preset", "connect_app");
      data.append("cloud_name", "amitconnectapp");
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/amitconnectapp/image/upload",
        {
          method: "post",
          body: data,
        }
      )
      .then((res) => res.json());
 console.log("uploaded image is ",res)
      await axios
        .put(`http://localhost:8080/task_update/${props.id}`, {
          heading: editValues.heading,
          description: editValues.description,
          image_url: res.url,
          old_image_id: editValues.image_id
        })
        .then(async() => {
        await  props.getList();
        });
      handleClose();
    } else {
      console.log("amit in else")
      await axios
        .put(`http://localhost:8080/task_update/${props.id}`, {
          heading: editValues.heading,
          description: editValues.description,
          // image_id: editValues.image_id,
        })
        .then(() => {
          props.getList();
        });
      handleClose();
    }
  };

  const handleDeleteGame = () => {
    axios.delete(`http://localhost:3001/delete/${editValues.id}`);
  };

  const handleChangeValues = (value) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [value.target.id]: value.target.value,
    }));
  };

  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleImageChange = (e) => {
    setFileImage(e.target.files[0]);
    // setData([
    //   ...data,
    //   {
    //     type: "image",
    //     value: e.target.files[0],
    //   },
    // ]);
    // setImage("")
  };

  function fetchUrl(file) {
    const objectUrl = URL.createObjectURL(file);
    return objectUrl;
  }

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="heading"
            label="Heading"
            defaultValue={props.heading}
            type="text"
            onChange={handleChangeValues}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            defaultValue={props.description}
            type="text"
            onChange={handleChangeValues}
            fullWidth
            variant="standard"
          />
          {fileIage == null ? (
            <Avatar alt="Remy Sharp" src={props.image_url} />
          ) : (
            <Avatar src={fetchUrl(fileIage)} />
          )}

          <div>
            <input
              type="file"
              id="customFile"
              accept="image/*"
              onChange={handleImageChange}
            />
            {/* <label htmlFor="customFile">
              <BsFileImage />
            </label> */}
          </div>
          {/* <TextField
                        autoFocus
                        margin="dense"
                        id="category"
                        label="Category"
                        defaultValue={props.category}
                        type="text"
                        onChange={handleChangeValues}
                        fullWidth
                        variant="standard"
                    /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditValues}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
