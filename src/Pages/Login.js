import React, { useState, useEffect } from 'react';

export default function Login() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(storedTransactions);
  }, []);

  const handleAddTransaction = (type) => {
    const newTransaction = { amount: parseFloat(amount), description, date, type };
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    setAmount('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleDeleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const calculateTotal = () => {
    return transactions.reduce((total, transaction) => {
      return transaction.type === 'Income'
        ? total + transaction.amount
        : total - transaction.amount;
    }, 0);
  };

  return (
    <div className='body'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 amount-side'>
            <div className='card'>
              <h1 className='text-center'>Total Amount</h1>
              <h1 className='text-center'>${calculateTotal()}</h1>
            </div>
            <div className='card mt-3'>
              <h3>Transactions</h3>
              <div className='amount-form'>
                <div>
                  <div>
                    <label className='mt-2'>Enter Amount:</label><br />
                    <input
                      type="number"
                      placeholder="Amount"
                      className='input-field mt-1'
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className='mt-2'>Description:</label><br />
                    <input
                      type="text"
                      placeholder="Description"
                      className='input-field mt-1'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className='mt-2'>Date:</label><br />
                    <input
                      type="date"
                      className='input-field mt-1'
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className='row mt-5'>
                <div className='col-md-12'>
                  <button onClick={() => handleAddTransaction('Income')} className='income-btn'>Income</button>
                  <button onClick={() => handleAddTransaction('Expense')} className='expense-btn'>Expense</button>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='card'>
              <div className='row'>
                <div className='col-md-6'>
                  <h3>Transactions List</h3>
                </div>
              </div>
              <ul>
                {transactions.map((transaction, index) => (
                  <li key={index} className='transaction-item'>
                    <div>
                      <span><h5 className='text-capitalize'>{transaction.description}</h5></span>
                      <span>{transaction.date}  -  </span>
                      <span>${transaction.amount}  -  </span>
                      <span>{transaction.type}</span>
                    </div>
                    <div className='transaction-buttons'>
                      <button onClick={() => alert(`Viewing transaction:\n${JSON.stringify(transaction, null, 2)}`)} className='action-view-btn'>View</button>
                      <button onClick={() => handleDeleteTransaction(index)} className='action-del-btn'>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
