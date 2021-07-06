import React from "react";

/* Functional component to render a loading screen, 
   which is utilized to do delay in async requests */
const LoadingScreen = () => {
  return (
    <div className="container">
      <div className="loading-screen">
        <i className="fa fa-refresh fa-spin"></i>
      </div>
      <h3 className="load-msg">Loading data from the server</h3>
    </div>
  );
};

export default LoadingScreen;
