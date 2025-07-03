import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '', to = null }) => {
  const classes = `btn ${className}`;

  if (to) {
    return (
      <a href={to} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;