import React, { useState } from 'react';
import { useEffect } from 'react';

const DeXie = () => {
  const [num, setNum] = useState(0);
  const reSetData = () => {
    setNum(num + 1);
  };
  useEffect(() => {
    reSetData();
  }, []);
  return (
    <>
      <div>{num}</div>
    </>
  );
};

export default DeXie;
