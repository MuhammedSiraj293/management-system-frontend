import React from 'react';

/**
 * A reusable alert component.
 * @param {object} props
 * @param {'error' | 'success' | 'warning'} props.type - The type of alert.
 * @param {string} props.message - The message to display.
 */
const Alert = ({ type, message }) => {
  let bgColor = 'bg-blue-100';
  let textColor = 'text-blue-800';
  let borderColor = 'border-blue-300';

  if (type === 'error') {
    bgColor = 'bg-red-100';
    textColor = 'text-red-800';
    borderColor = 'border-red-300';
  } else if (type === 'success') {
    bgColor = 'bg-green-100';
    textColor = 'text-green-800';
    borderColor = 'border-green-300';
  } else if (type === 'warning') {
    bgColor = 'bg-yellow-100';
    textColor = 'text-yellow-800';
    borderColor = 'border-yellow-300';
  }

  return (
    <div
      className={`w-full p-4 rounded-md border ${bgColor} ${textColor} ${borderColor}`}
      role="alert"
    >
      <p className="font-medium">{message}</p>
    </div>
  );
};

export default Alert;