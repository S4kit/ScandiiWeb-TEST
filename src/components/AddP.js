
import React from "react";
import { useNavigate } from "react-router-dom";


function AddP() {
    let navigate = useNavigate();


    return (
        <button className="btn btn-primary bg-secondary border rounded-0 shadow d-inline float-end" onClick={() => {
            navigate("/add-product");
        }} >ADD</button>

    );
}

export default AddP;
