"use client";
export default function SpendingInsights({ transactions, budgets }) {
    if (transactions.length === 0) return null;

    const totalSpent = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    const topCategory = transactions.reduce((acc, tx) => {
        acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
        return acc;
    }, {});
    const topCategoryName = Object.keys(topCategory).reduce((a, b) => (topCategory[a] > topCategory[b] ? a : b));

    return (
        <div className="p-4 border rounded-lg shadow-md">
            <h2 className="text-lg font-bold">Spending Insights</h2>
            <p>Total Spent: <strong>${totalSpent}</strong></p>
            <p>Top Spending Category: <strong>{topCategoryName}</strong></p>
            {Object.entries(budgets).map(([category, budget]) => {
                const spent = transactions.filter(tx => tx.category === category).reduce((sum, tx) => sum + tx.amount, 0);
                return spent > budget ? (
                    <p key={category} className="text-red-500">Over Budget in {category} by ${spent - budget}</p>
                ) : null;
            })}
        </div>
    );
}
