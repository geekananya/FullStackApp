import React from "react";
import PropTypes from "prop-types";
// import reactLogo from './assets/react.svg'


const HomeLayout = ({ Component, ...rest }) => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='pa4 w-2/5'>
                {/* <img src={reactLogo} alt="Logo" className="w-full" /> */}
                <h1>Logo</h1>
            </div>
            <Component {...rest} />
        </div>
    ) 
  };
  
HomeLayout.propTypes = {
Component: PropTypes.elementType.isRequired,
};
  
export default HomeLayout;
  