import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ 
        height: 300, 
        clear: "both", 
        margin: "0px 0 20px 0;",
        paddingTop: 120, 
        color: "#FFF",
        textAlign: "center",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        borderRadius: 0,
        backgroundImage: "url(https://images.unsplash.com/photo-1525715843408-5c6ec44503b1)"
       }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
