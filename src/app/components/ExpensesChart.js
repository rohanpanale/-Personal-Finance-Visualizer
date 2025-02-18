"use client";
import { useEffect, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function ExpensesChart({ transactions }) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // Set data after the component mounts to avoid hydration issues
        const data = transactions.map(tx => ({
            date: tx.date,
            amount: tx.amount,
        }));
        setChartData(data);
    }, [transactions]);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}
