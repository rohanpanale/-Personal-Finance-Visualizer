"use client";
import { useState } from "react";

export default function BudgetManager({ categories, budgets, setBudgets }) {
    const [newBudget, setNewBudget] = useState({ category: "", amount: "" });
    const [editingBudget, setEditingBudget] = useState(null);

    const handleAddBudget = () => {
        if (newBudget.category && newBudget.amount) {
            if (editingBudget) {
                setBudgets(
                    budgets.map((budget) =>
                        budget.category === editingBudget.category
                            ? { ...budget, amount: newBudget.amount }
                            : budget
                    )
                );
                setEditingBudget(null);
            } else {
                setBudgets([...budgets, newBudget]);
            }
            setNewBudget({ category: "", amount: "" });
        } else {
            alert("Please fill in both fields.");
        }
    };

    const handleDeleteBudget = (category) => {
        setBudgets(budgets.filter((budget) => budget.category !== category));
    };

    const handleEditBudget = (budget) => {
        setNewBudget({ category: budget.category, amount: budget.amount });
        setEditingBudget(budget);
    };

    return (
        <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold text-center text-green-600 mb-4">Manage Budgets</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        value={newBudget.category}
                        onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                        <option value="">Select a Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                        type="number"
                        value={newBudget.amount}
                        onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="text-center">
                    <button
                        onClick={handleAddBudget}
                        className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        {editingBudget ? "Update Budget" : "Add Budget"}
                    </button>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-semibold text-gray-800">Current Budgets</h3>
                <ul className="mt-2 space-y-2">
                    {budgets.map((budget, index) => (
                        <li key={index} className="flex justify-between items-center text-gray-700">
                            <span>{budget.category}: ${budget.amount}</span>
                            <div>
                                <button
                                    onClick={() => handleEditBudget(budget)}
                                    className="text-blue-500 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteBudget(budget.category)}
                                    className="text-red-500"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
