/*"use client";
import { useState, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import ExpensesChart from "./components/ExpensesChart";

export default function Home() {
    const [transactions, setTransactions] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState(null);

    useEffect(() => {
        fetch("/api/transactions").then(res => res.json()).then(setTransactions);
    }, []);

    const handleSave = (tx) => {
        if (editingTransaction) {
            setTransactions(transactions.map((t) => (t._id === tx._id ? tx : t)));
        } else {
            setTransactions([...transactions, tx]);
        }
        setEditingTransaction(null);
    };

    const handleDelete = async (id) => {
        await fetch("/api/transactions", { method: "DELETE", body: JSON.stringify({ id }) });
        setTransactions(transactions.filter((tx) => tx._id !== id));
    };

    return (
        <div className="p-6">
            <TransactionForm onSave={handleSave} transaction={editingTransaction} />
            <TransactionList transactions={transactions} onEdit={setEditingTransaction} onDelete={handleDelete} />
            <ExpensesChart transactions={transactions} />
        </div>
    );
}
*/


/*"use client";
import { useState, useEffect } from "react";
import DashboardCards from "./components/DashboardCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import ExpensesChart from "./components/ExpensesChart";
import CategoryChart from "./components/CategoryChart";
import BudgetManager from "./components/BudgetManager";
import SpendingInsights from "./components/SpendingInsights";

export default function Home() {
    const [transactions, setTransactions] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [budgets, setBudgets] = useState({});

    useEffect(() => {
        fetch("/api/transactions").then(res => res.json()).then(setTransactions);
    }, []);

    const handleSave = (tx) => {
        if (editingTransaction) {
            setTransactions(transactions.map((t) => (t._id === tx._id ? tx : t)));
        } else {
            setTransactions([...transactions, tx]);
        }
        setEditingTransaction(null);
    };

    const handleDelete = async (id) => {
        await fetch("/api/transactions", { method: "DELETE", body: JSON.stringify({ id }) });
        setTransactions(transactions.filter((tx) => tx._id !== id));
    };

    return (
        <div className="p-6">
            <DashboardCards transactions={transactions} />
            <BudgetManager budgets={budgets} setBudgets={setBudgets} />
            <TransactionForm onSave={handleSave} transaction={editingTransaction} />
            <TransactionList transactions={transactions} onEdit={setEditingTransaction} onDelete={handleDelete} />
            <CategoryChart transactions={transactions} budgets={budgets} />
            <ExpensesChart transactions={transactions} />
            <SpendingInsights transactions={transactions} budgets={budgets} />
        </div>
    );
}
*/



"use client";
import { useState, useEffect } from "react";
import DashboardCards from "./components/DashboardCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import ExpensesChart from "./components/ExpensesChart";
import CategoryChart from "./components/CategoryChart";
import BudgetManager from "./components/BudgetManager";
import SpendingInsights from "./components/SpendingInsights";

export default function Home() {
    const [transactions, setTransactions] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [budgets, setBudgets] = useState([]);
    const categories = ["Food", "Entertainment", "Transportation", "Utilities", "Healthcare", "Others"];

    useEffect(() => {
        fetch("/api/transactions").then(res => res.json()).then(setTransactions);
    }, []);

    const handleSave = (tx) => {
        if (editingTransaction) {
            setTransactions(transactions.map((t) => (t._id === tx._id ? tx : t)));
        } else {
            setTransactions([...transactions, tx]);
        }
        setEditingTransaction(null);
    };

    const handleDelete = async (id) => {
        await fetch("/api/transactions", { method: "DELETE", body: JSON.stringify({ id }) });
        setTransactions(transactions.filter((tx) => tx._id !== id));
    };

    return (
        <div className="p-6">
            <DashboardCards transactions={transactions} />
            <BudgetManager categories={categories} budgets={budgets} setBudgets={setBudgets} />
            <TransactionForm categories={categories} onSave={handleSave} transaction={editingTransaction} />
            <TransactionList transactions={transactions} onEdit={setEditingTransaction} onDelete={handleDelete} />
            <CategoryChart transactions={transactions} budgets={budgets} />
            <ExpensesChart transactions={transactions} />
            <SpendingInsights transactions={transactions} budgets={budgets} />
        </div>
    );
}
