import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { userName, review: card, user_photoURL } = review;

  return (
    <div className="card w-80 bg-base-100 shadow-xl border border-gray-200 rounded-xl p-6 hover:shadow-2xl transition-all duration-300">
      {/* Quote Icon */}
      <FaQuoteLeft className="text-3xl text-primary mb-3" />

      {/* Review Text */}
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{card}</p>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-300 my-4"></div>

      {/* Profile Section */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="avatar">
          <div className="w-12 rounded-full ring ring-primary ring-offset-2">
            <img
              src={user_photoURL}
              alt=''
            />
          </div>
        </div>

        {/* Name & Profession */}
        <div>
          <h4 className="font-semibold text-gray-800">{userName}</h4>
          
          
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
