/*"use client";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";

export default function CategoryChart({ transactions, budgets }) {
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        const data = transactions.reduce((acc, tx) => {
            if (!tx.category) return acc;
            const existing = acc.find(d => d.name === tx.category);
            if (existing) existing.value += tx.amount;
            else acc.push({ name: tx.category, value: tx.amount });
            return acc;
        }, []);
        setCategoryData([...data]); // Force update
    }, [transactions]);

    // Budget vs Actual Data
    const budgetComparison = categoryData.map((category) => ({
        name: category.name,
        actual: category.value,
        budget: budgets[category.name] || 0
    }));

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Spending Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={categoryData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                    >
                        {categoryData.map((_, index) => (
                            <Cell key={index} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>

            <h2 className="text-lg font-bold mt-6">Budget vs Actual</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={budgetComparison}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Legend />
                    <Bar dataKey="actual" fill="#FF8042" name="Actual Spending" />
                    <Bar dataKey="budget" fill="#0088FE" name="Budgeted Amount" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
*/


"use client";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";

export default function CategoryChart({ transactions, budgets }) {
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        const data = transactions.reduce((acc, tx) => {
            if (!tx.category) return acc;
            const existing = acc.find(d => d.name === tx.category);
            if (existing) existing.value += tx.amount;
            else acc.push({ name: tx.category, value: tx.amount });
            return acc;
        }, []);
        setCategoryData(data);
    }, [transactions]);

    const budgetComparison = categoryData.map((category) => ({
        name: category.name,
        actual: category.value,
        budget: budgets[category.name] || 0,
    }));

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Spending Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                        {categoryData.map((_, index) => (
                            <Cell key={index} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>

            <h2 className="text-lg font-bold mt-6">Budget vs Actual</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={budgetComparison}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Legend />
                    <Bar dataKey="actual" fill="#FF8042" name="Actual Spending" />
                    <Bar dataKey="budget" fill="#0088FE" name="Budgeted Amount" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
