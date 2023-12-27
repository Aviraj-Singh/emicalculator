import React, { useState } from 'react';
import { Chart, ArcElement } from 'chart.js';
import CalculatorForm from './CalculatorForm';
import ChartContainer from './ChartContainer';
import ResultsTable from './ResultsTable';

Chart.register(ArcElement);

const App = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [monthly, setMonthly] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [userAmount, setUserAmount] = useState(0);

  const onInputChange = (field, value) => {
    switch (field) {
      case 'loanAmount':
        setLoanAmount(value);
        break;
      case 'interestRate':
        setInterestRate(value);
        break;
      case 'loanTerm':
        setLoanTerm(value);
        break;
      default:
        break;
    }
  };

  const calculateResults = () => {
    const userAmount = Number(loanAmount);
    const calculatedInterest = Number(interestRate) / 100 / 12;
    const calculatedPayments = Number(loanTerm) * 12;
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (userAmount * x * calculatedInterest) / (x - 1);
    const totalPayable = monthly * calculatedPayments;
    const totalInterest = totalPayable - userAmount;
    const balance = [];
    const tenure = [];
    let currentBalance = userAmount;

    for (let i = 0; i < calculatedPayments; i++) {
      tenure.push(i + 1);
      const interest = currentBalance * calculatedInterest;
      const principal = monthly - interest;
      currentBalance -= principal;
      balance.push(currentBalance.toFixed(2));
    }

    setTableData(
      tenure.map((t, index) => ({
        tenure: t,
        balance: balance[index],
        payment: monthly.toFixed(2),
        interest: (balance[index] * calculatedInterest).toFixed(2),
        principal: (monthly - balance[index] * calculatedInterest).toFixed(2),
      }))
    );

    const chartConfig = {
      labels: ['EMI', 'Interest', 'Principal'],
      datasets: [
        {
          data: [monthly.toFixed(2), totalInterest.toFixed(2), userAmount.toFixed(2)],
          backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f'],
        },
      ],
    };

    setChartData(chartConfig);
    setMonthly(monthly);
    setTotalInterest(totalInterest);
    setUserAmount(userAmount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateResults();
  };

  return (
    <div>
      <h1>Loan Calculator</h1>
      <CalculatorForm
        onSubmit={handleSubmit}
        loanAmount={loanAmount}
        interestRate={interestRate}
        loanTerm={loanTerm}
        onInputChange={onInputChange}
      />
      {Object.keys(chartData).length > 0 && <ChartContainer chartData={chartData} />}
      {tableData.length > 0 && <ResultsTable tableData={tableData} />}
    </div>
  );
};

export default App;