/*export default function TransactionList({ transactions, onEdit, onDelete }) {
  return (
      <ul className="mt-4">
          {transactions.map((tx) => (
              <li key={tx._id} className="flex justify-between p-2 border-b">
                  <span>{tx.description} - ${tx.amount} on {tx.date}</span>
                  <div>
                      <button onClick={() => onEdit(tx)} className="text-green-500 mr-2">Edit</button>
                      <button onClick={() => onDelete(tx._id)} className="text-red-500">Delete</button>
                  </div>
              </li>
          ))}
      </ul>
  );
}*/


export default function TransactionList({ transactions, onEdit, onDelete }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction List</h2>
            <ul className="space-y-4">
    {(Array.isArray(transactions) ? transactions : []).map((tx) => {
        // Ensure amount is a number
        const amount = Number(tx.amount);

                    const formattedAmount = isNaN(amount) ? 0 : amount.toFixed(2); // If NaN, default to 0

                    return (
                        <li key={tx._id} className="flex justify-between p-2 border-b">
                            <span>{tx.description} - ${formattedAmount} on {new Date(tx.date).toLocaleDateString()}</span>
                            <div>
                                <button onClick={() => onEdit(tx)} className="text-green-500 mr-2">Edit</button>
                                <button onClick={() => onDelete(tx._id)} className="text-red-500">Delete</button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
