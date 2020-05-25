import React, { useState } from 'react';
import './Dropdown.scss';

const Dropdown = ({
  label,
  children,
  className,
  onClick,
  displayText
}) => {
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={onClick && onClick}
      className={`${className && className} dropdown`}
    >
      {label && (
        <label className="dropdown-label">
          {label}
        </label>
      )}

      <div className="dropdown-wrapper">
        <div
          className="dropdown-input"
          // onClick={() => {
          //     setIsOpen(!isOpen);
          // }}
        >
          <p className="eval-form-default">{displayText}</p>
        </div>
        {isOpen && <ul className="eval-form-input-menu">{children}</ul>}
      </div>
    </div>
  );
};
export default Dropdown;
