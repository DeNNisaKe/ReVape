import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "../../css/AlertModal-css.css";

type Color = "red" | "green" | "blue";

interface AlertModalProps {
  show: boolean;
  onHide: () => void;
  messages: string[];
  color: Color;
  icon: IconProp;
}

const AlertModal: React.FC<AlertModalProps> = ({
  show,
  onHide,
  messages,
  color,
  icon,
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onHide, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  const colorClasses = {
    red: "bg-red-200 text-red-800",
    green: "bg-green-200 text-green-800",
    blue: "bg-blue-200 text-blue-800",
  };

  const colorClass = colorClasses[color];

  return (
    <div
      className={`${colorClass} absolute top-0 right-0 mt-16 backdrop-blur-md slideIn rounded-2xl ${
        show ? "" : "hidden"
      }`}
    >
      {messages.map((message, index) => (
        <div
          key={index}
          className={`${colorClass} px-3 py-3 my-4 text-lg flex items-center`}
        >
          <FontAwesomeIcon icon={icon} className={`mr-4`} size="lg" />
          <span>{message}</span>
        </div>
      ))}
    </div>
  );
};

export default AlertModal;
