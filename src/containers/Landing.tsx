import React from 'react';

const Landing: React.FC<{}> = (props): JSX.Element => {
  fetch('http://localhost:5000/api/currencyData', {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((e) => console.error(e));
  return <div>App</div>;
};

export default Landing;
