import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInventory } from '../api/api';

const Manager = () => {
  const [paint, setPaint] = useState([]);

  const navigate = useNavigate();

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
                    <th scope="col">Color name</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {paint.length > 0 ? (
                    paint.map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manager;
