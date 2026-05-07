import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h2>Payment is cancelled. Please try again</h2>
            <Link to="/dashboard/my-parcels"></Link>
            <button className='btn btn-primary text-black'>Try Again</button>
        </div>
    );
};

export default PaymentCancelled;