import React from "react";
import './style/Alert.css';

export default function Alert(props) {
  const getAlertClass = (type) => {
    switch(type) {
      case 'success': return 'custom-alert custom-alert-success';
      case 'danger': return 'custom-alert custom-alert-danger';
      case 'warning': return 'custom-alert custom-alert-warning';
      case 'info': return 'custom-alert custom-alert-info';
      default: return 'custom-alert';
    }
  };
  return (
    <div style={{height:'60px', display:'flex', alignItems:'center', justifyContent:'center'}}>
      {props.alert && (
        <div className={getAlertClass(props.alert.type)} role="alert">
          <strong>{(props.alert.type === "danger") ? "ERROR" : props.alert.type}</strong> {props.alert.msg}
        </div>
      )}
    </div>
  );
}
