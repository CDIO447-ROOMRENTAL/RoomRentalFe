import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount = 0, onSuccess }) => {
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: `${amount}`
                }
            }]
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            alert('Transaction completed by ' + details.payer.name.given_name);
            onSuccess(details)
        });
    };

    return (
        <PayPalScriptProvider options={{ "client-id": "AXK52v2_mlvCaKzY0Ko55VDjxR7nFhBAqKSLQWSJKxz11OsZ_UdGk7ru3oP4vnpJ_XIsxtW27tu3oVpy" }}>
            <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
        </PayPalScriptProvider>
    );
}

export default PayPalButton;
