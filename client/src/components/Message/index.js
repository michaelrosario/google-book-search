import React from "react";
import 'font-awesome/css/font-awesome.min.css';

function Message(props) {

  let styleShow = {
    padding: '6px 20px',
    position: 'fixed',
    width: '100%',
    zIndex: "999",
    bottom: 0,
    textAlign: 'center',
    color: "#FFF",
    fontWeight: "bold",
    margin: '0 10px',
    border: '1px solid #999',
    left: -10,
    borderRadius: 0,
    borderRadius: '4px',
    float: 'right',
    textDecoration: 'none',
    transition: 'all linear .07s',
    backgroundColor: 'rgba(0, 128, 128, 0.8)'
  }
  
  let styleHide = {
    transition: 'all linear .07s',
    padding: '6px 20px',
    position: 'fixed',
    width: '100%',
    textAlign: 'center',
    zIndex: "999",
    bottom: -40,
    color: "#FFF",
    fontWeight: "bold",
    margin: '0 10px',
    border: '1px solid #999',
    float: 'right',
    textDecoration: 'none',
    backgroundColor: 'rgba(0, 128, 128, 0.8)',
    left: -10,
    borderRadius: 0
  }

  if(props.type === "saved"){
    styleShow['backgroundColor'] = 'rgba(0, 128, 128, 0.8)';
  } else {
    styleShow['backgroundColor'] = 'rgba(255, 0, 0, 0.8)';
  }

  return (
    <div style={props.message ? styleShow : styleHide}>
      {props.type === "saved" ?
        <span><i className="fa fa-save"></i> &nbsp; <u><em>{props.message}</em></u> was saved ...</span> :
        <span><i className="fa fa-trash"></i> &nbsp; <u><em>{props.message}</em></u> was deleted ...</span>
      }
    </div> 
  );
}

export default Message;
