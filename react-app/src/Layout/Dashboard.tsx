import React, { useState } from "react";
// import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import NavBar from "../Components/NavBar";


const Dashboard = ({ Page, ...rest }) => {

    const [searchField, setSearchField] = useState('')

    return (
        <>
            <NavBar setSearchField={setSearchField}/>
            <div className="p-4">
                <Page searchTag={searchField} {...rest} />
            </div>
        </>
    )
  };
  
  Dashboard.propTypes = {
    Component: PropTypes.elementType,
  };
  
  export default Dashboard;
  