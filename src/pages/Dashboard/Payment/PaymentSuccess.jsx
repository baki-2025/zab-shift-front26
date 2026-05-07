import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const updatePayment = async () => {
            try {
                if (!sessionId) return;

                const res = await axiosSecure.patch(
                    `/payment-success?session_id=${sessionId}`
                );

                setPaymentInfo({
                    transactionId: res.data.transactionId,
                    trackingId: res.data.trackingId
                });

            } catch (error) {
                console.error("Error updating payment:", error);
            }
        };

        updatePayment();
    }, [sessionId, axiosSecure]);

    return (
        <div>
            <h2 className='text-4xl'>Payment Successful</h2>
            <p>Your Transaction ID: {paymentInfo.transactionId}</p>
            <p>Your Parcel Tracking ID: {paymentInfo.trackingId}</p>
        </div>
    );
};

export default PaymentSuccess;
