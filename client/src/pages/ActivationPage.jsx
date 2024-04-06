import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { urlServer } from '../server';
const ActivationPage = () => {
  const { token } = useParams();
  const [error, setError] = useState(true);
  useEffect(() => {
    const sendRequest = async () => {
      try {
        await axios.post(`${urlServer}/auth/activation/${token}`);
        setError(false);
      } catch (error) {
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

export default ActivationPage;
