import React, { useState, useEffect, useRef } from 'react';
import './Dropdown.scss';

const Dropdown = ({
  label,
  children,
  className,
  onClick,
  displayText
}) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    const handleDocumentClick = e => {
    	console.log('handleDocumentClick');
      if (
        dropdownRef.current
      ) {

        const dropdownNode = dropdownRef.current;
        let t = e.target

        // if the dropdown is clicked, toggle
        if (dropdownNode.contains(t)) {
        	setIsOpen(!isOpen)
        }else{
        	setIsOpen(false)
        }
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isOpen]);

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
        	ref={dropdownRef}
          className="dropdown-input"
          onClick={() => {
              setIsOpen(!isOpen);
          }}
        >
          <p className="eval-form-default">{displayText}</p>
        </div>
        {isOpen && <ul className="eval-form-input-menu">{children}</ul>}
      </div>
    </div>
  );
};
export default Dropdown;