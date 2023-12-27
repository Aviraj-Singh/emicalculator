import React from 'react';

const ResultsTable = ({ tableData }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Tenure</th>
            <th>Balance</th>
            <th>Payment</th>
            <th>Interest</th>
            <th>Principal</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.tenure}>
              <td>{row.tenure}</td>
              <td>{row.balance}</td>
              <td>{row.payment}</td>
              <td>{row.interest}</td>
              <td>{row.principal}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>EMI: {tableData[0].payment}</p>
        <p>
          Total Payable: {(
            tableData[tableData.length - 1].balance * 1 +
            tableData[tableData.length - 1].interest * 1
          ).toFixed(2)}
        </p>
        <p>Total Interest: {tableData[tableData.length - 1].interest}</p>
      </div>
    </div>
  );
};

export default ResultsTable;
