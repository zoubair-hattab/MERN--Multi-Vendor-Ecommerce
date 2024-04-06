import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { urlServer } from '../../server';
const ActivationShopPage = () => {
  const { token } = useParams();
  const [error, setError] = useState(true);
  useEffect(() => {
    const sendRequest = async () => {
      try {
        await axios.post(`${urlServer}/auth/shop/activation`, {
          token,
        });
        setError(false);
      } catch (error) {
        //console.log(error.message);
        setError(true);
      }
    };
    sendRequest();
  }, [token]);
  return (
    <>
      {error ? (
        <p>expred token</p>
      ) : (
        <p>
          {' '}
          crate toy acount suucefyl <Link to="/sing-in">login</Link>
        </p>
      )}
    </>
  );
};

export default ActivationShopPage;
