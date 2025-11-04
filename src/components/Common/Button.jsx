import React from 'react';

/**
 * A reusable, styled button component.
 * @param {object} props
 * @param {React.ReactNode} props.children - The content of the button.
 * @param {Function} props.onClick - The click handler.
 * @param {'primary' | 'secondary' | 'danger'} [props.variant='primary'] - The button style.
 * @param {'submit' | 'button' | 'reset'} [props.type='button'] - The button type.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {string} [props.className] - Additional CSS classes.
 */
const Button = ({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
}) => {
  // Base classes for all buttons
  let baseClasses =
    'inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2';

  // Variant-specific classes
  let variantClasses = '';
  switch (variant) {
    case 'danger':
      variantClasses =
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
      break;
    case 'secondary':
      variantClasses =
        'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-blue-500';
      break;
    case 'primary':
    default:
      variantClasses =
        'bg-blue-600 text-white hover:bg-blue-7Example focus:ring-blue-500';
      break;
  }

  // Disabled classes
  const disabledClasses =
    'disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;