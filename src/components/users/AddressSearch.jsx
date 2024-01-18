import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

const AddressSearch = ({ onComplete, onClose }) => {
  const handleComplete = (data) => {
    onComplete(data);
    onClose();
  };

  return (
    <div>
      <DaumPostcode autoClose onComplete={handleComplete} />
    </div>
  );
};

export default AddressSearch;