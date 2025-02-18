/*"use client";
import { useState, useEffect } from "react";

export default function TransactionForm({ onSave, transaction }) {
    const [form, setForm] = useState({ description: "", amount: "", date: "" });

    useEffect(() => {
        if (transaction) setForm(transaction);
    }, [transaction]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.description || !form.amount || !form.date) {
            return alert("All fields are required!");
        }

        const method = transaction ? "PUT" : "POST";
        const res = await fetch("/api/transactions", {
            method,
            body: JSON.stringify(transaction ? { ...form, id: transaction._id } : form),
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            onSave(await res.json());
            setForm({ description: "", amount: "", date: "" });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
            <input
                type="text"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="p-2 border w-full mb-2"
                required
            />
            <input
                type="number"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="p-2 border w-full mb-2"
                required
            />
            <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="p-2 border w-full mb-2"
                required
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                {transaction ? "Update Transaction" : "Add Transaction"}
            </button>
        </form>
    );
}
*/


/*"use client";
import { useState, useEffect } from "react";

const categories = ["Food", "Rent", "Transport", "Entertainment", "Shopping", "Other"];

export default function TransactionForm({ onSave, transaction }) {
    const [form, setForm] = useState({ description: "", amount: "", date: "", category: "" });

    useEffect(() => {
        if (transaction) setForm(transaction);
    }, [transaction]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.description || !form.amount || !form.date || !form.category) {
            return alert("All fields are required!");
        }

        const method = transaction ? "PUT" : "POST";
        const res = await fetch("/api/transactions", {
            method,
            body: JSON.stringify(transaction ? { ...form, id: transaction._id } : form),
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            onSave(await res.json());
            setForm({ description: "", amount: "", date: "", category: "" });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
            <input
                type="text"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="p-2 border w-full mb-2"
                required
            />
            <input
                type="number"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="p-2 border w-full mb-2"
                required
            />
            <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="p-2 border w-full mb-2"
                required
            />
            <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="p-2 border w-full mb-2"
                required
            >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                {transaction ? "Update Transaction" : "Add Transaction"}
            </button>
        </form>
    );
}
*/



"use client";
import { useState } from "react";

export default function TransactionForm({ categories, onSave, transaction }) {
    const [newTransaction, setNewTransaction] = useState(transaction || { description: "", amount: "", date: "", category: "" });

    const handleChange = (e) => {
        setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(newTransaction);
        setNewTransaction({ description: "", amount: "", date: "", category: "" });
    };

    return (
        <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-lg mb-6">
            <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">Transaction Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={newTransaction.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={newTransaction.amount}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={newTransaction.date}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            name="category"
                            value={newTransaction.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select a Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            {transaction ? "Update Transaction" : "Add Transaction"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
