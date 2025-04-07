import React from 'react';

export default function SeriesItem({ onClick, imageSrc, title, className = '', titleClassName = '' }) {
  return (
    <div
      onClick={onClick}
      className={`${className}`}
    >
      <img
        src={imageSrc}
        alt="img-err"
        className="w-full bg-white rounded-16"
      />
      <p className={`${titleClassName}`}>
        {title}
      </p>
    </div>
  );
}