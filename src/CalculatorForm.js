import React from 'react';

const CalculatorForm = ({ onSubmit, loanAmount, interestRate, loanTerm, onInputChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="loanAmount">Loan Amount:</label>
        <input
          type="number"
          id="loanAmount"
          value={loanAmount}
          onChange={(e) => onInputChange('loanAmount', e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="interestRate">Interest Rate:</label>
        <input
          type="number"
          id="interestRate"
          value={interestRate}
          onChange={(e) => onInputChange('interestRate', e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="loanTerm">Loan Term (in years):</label>
        <input
          type="number"
          id="loanTerm"
          value={loanTerm}
          onChange={(e) => onInputChange('loanTerm', e.target.value)}
          required
        />
      </div>
      <button type="submit">Calculate</button>
    </form>
  );
};

export default CalculatorForm;
