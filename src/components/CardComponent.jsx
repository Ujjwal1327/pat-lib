import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const CardComponent = ({ title, amount, icon, link, bgColor, textColor }) => {
  return (
    <Link to={link} className="flex-1">
      <div
        id="card"
        className={`shadow-lg transition-all hover:-translate-y-1 p-6 rounded-2xl flex items-center gap-6 ${bgColor}`}
      >
        <div className="flex flex-1 flex-col">
          <span className={`text-4xl ${textColor} font-semibold`}>
            {amount === "Loading..." ? (
              <div className="flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="animate-spin text-4xl text-gray-500"
                />
              </div>
            ) : (
              amount
            )}
          </span>
          <span className="text-lg md:text-xl text-gray-700 font-bold">{title}</span>
        </div>
        <div>
          <FontAwesomeIcon icon={icon} className="text-5xl text-blue-600" />
        </div>
      </div>
    </Link>
  );
};

export default CardComponent;
