import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInventory, updatePaint } from '../api/api';
import Modalshow from './Modalshow';

const Painter = () => {
  const [state, setState] = useState({
    user: {},
    loading: false,
    userList: []
  });

  const [paint, setPaint] = useState([]);

  const navigate = useNavigate();

  const changeState = updatedState => {
    setState(prevState => ({ ...prevState, ...updatedState }));
  };

  const [credentials, setCredentials] = useState('');

  const [error, setError] = useState('');

  const handleChange = e => {
    setCredentials(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInventory();

        console.log('Paint:', response);
        setPaint(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePaint = async e => {
    e.preventDefault();
    if (!state.loading) {
      changeState({ loading: true });
      try {
        const response = await updatePaint(credentials);
        if (response) {
          navigate('/dashboard');
        }
      } catch (error) {
        setError(`Failed to login here. ${error}`);
      } finally {
        changeState({ loading: false });
      }
    }
  };

  return (
    <div id="paintTable">
      <h4>Paint Details</h4>
      <div className="container">
        <div className="row">
          <div className="col-auto">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paint.map((item, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <Modalshow />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Painter;
