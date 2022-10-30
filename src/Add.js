import React from "react";
import { useNavigate } from "react-router-dom";
import AddForm from "./components/Addform";
import Header from './components/Header';

function Add() {
    let navigate = useNavigate();

    return (
        <div>
            <Header title="Product Add" />

            <button className="btn btn-primary bg-secondary border rounded-0 shadow d-inline float-end" onClick={() => {
                navigate("/");
            }} value="Cancel" name="Cancel" >Cancel</button>
            <AddForm />
        </div>
    );
}

export default Add;
