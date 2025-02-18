"use client";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";

export default function DashboardCards({ transactions, categoryBudgets }) {
    // Calculate total expenses
    const totalExpenses = transactions.reduce((sum, tx) => sum + (tx.amount || 0), 0);

    // Format currency
    const formatCurrency = (amount) => 
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(amount || 0);

    // Calculate category-wise spending
    const categorySpending = transactions.reduce((acc, tx) => {
        const { category, amount } = tx;
        if (category && !isNaN(amount)) {
            acc[category] = (acc[category] || 0) + amount;
        }
        return acc;
    }, {});

    // Convert category spending to array for charts
    const categoryData = Object.entries(categorySpending).map(([category, value]) => ({
        name: category,
        value: value || 0,  
    }));

    // Ensure valid category data
    const hasCategoryData = categoryData.length > 0;

    // Ensure categoryBudgets is always an object
const safeCategoryBudgets = categoryBudgets && typeof categoryBudgets === "object" ? categoryBudgets : {};

// Budget vs Actual Spending Data
const budgetComparisonData = Object.entries(safeCategoryBudgets).map(([category, budget]) => ({
    name: category,
    Budget: budget || 0,
    Spent: categorySpending[category] || 0,
}));


    // Ensure valid budget comparison data
    const hasBudgetData = budgetComparisonData.length > 0;

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EF4", "#FF5E78"];

    return (
        <div className="grid grid-cols-3 gap-4 mb-6">
            {/* Total Expenses Card */}
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-lg font-bold">Total Expenses</h2>
                <p className="text-xl">{formatCurrency(totalExpenses)}</p>
            </div>

            {/* Recent Transactions */}
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-lg font-bold">Recent Transactions</h2>
                <ul className="space-y-2">
                    {transactions.slice(-3).map((tx) => (
                        <li key={tx._id || tx.description} className="flex justify-between">
                            <span>{tx.description}</span>
                            <span>{formatCurrency(tx.amount)}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Category Breakdown */}
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-lg font-bold">Category Breakdown</h2>
                <ul className="space-y-2">
                    {categoryData.map((category, index) => (
                        <li key={index} className="flex justify-between">
                            <span>{category.name}</span>
                            <span>{formatCurrency(category.value)}</span> 
                        </li>
                    ))}
                </ul>
            </div>

            {/* Category-Wise Spending Pie Chart */}
            <div className="p-4 bg-gray-100 rounded-lg shadow-md col-span-3">
                <h2 className="text-lg font-bold">Category-Wise Spending</h2>
                {hasCategoryData ? (
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
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-gray-500">No spending data available.</p>
                )}
            </div>

            {/* Budget vs Actual Spending Bar Chart */}
            <div className="p-4 bg-gray-100 rounded-lg shadow-md col-span-3">
                <h2 className="text-lg font-bold">Budget vs Actual Spending</h2>
                {hasBudgetData ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={budgetComparisonData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Legend />
                            <Tooltip />
                            <Bar dataKey="Budget" fill="#8884d8" />
                            <Bar dataKey="Spent" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-gray-500">No budget data available.</p>
                )}
            </div>
        </div>
    );
}
