import React from "react";
import AlertContext from "../../context/alert/alertContext";
import { Alert } from "antd";
const Alerts = () => {
    const alertContext = React.useContext(AlertContext);
    const { alerts } = alertContext;
    return (
        alerts.length > 0 &&
        alerts.map(alert => (
            <Alert
                key={alert.id}
                message="Error"
                description={alert.msg}
                type="error"
                showIcon
            />
        ))
    );
};

export default Alerts;
