import React from "react";

type CustomButtonProps = {
  fontSize?: string;
  padding?: string;
  height?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  fontSize,
  padding,
  height,
  onClick,
  children,
}) => {
  return (
    <button
      style={{
        fontSize: fontSize,
        padding: padding,
        height: height,
      }}
      className="globals__button-primary"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;
