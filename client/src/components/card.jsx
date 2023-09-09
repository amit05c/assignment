import React, { useState} from "react";
import "./card.css"
import FormDialog from "./dialog/dialog";
import axios from "axios";


const Card = ({id,heading,description,image_url,image_id,priority,get_list}) => {
    const [open, setOpen] = React.useState(false);

    const cardOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteGame = () => {
        axios.delete(`http://localhost:8080/delete/${id}`)
        .then(()=>get_list())
    }

    return (
        <>
        <FormDialog open={open} setOpen={setOpen} id={id} heading={heading} description={description} image_url={image_url} image_id={image_id} getList={get_list} />
        <div className="game-card">
            <div className="info">
                <h4>{heading}</h4>
                <p>{description}</p>
                <p>{priority == 1 ? 'High': priority == 2 ? "Medium" : "Low"}</p>
            </div>
            <div>
                <img src={image_url} width={'100px'}/>
            </div>
            <div className="actions">
                <button className="edit" onClick={cardOpen}>Edit</button>
                <button className="delete" onClick={handleDeleteGame}>Delete</button>
            </div>
        </div>
        </>
    );
};

export default Card;
