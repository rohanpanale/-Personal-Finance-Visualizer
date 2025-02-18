/*import { NextResponse } from "next/server";
import { connectDB } from "@/app/db";
import Transaction from "./model";

// GET All Transactions
export async function GET() {
    await connectDB();
    const transactions = await Transaction.find();
    return NextResponse.json(transactions);
}

// ADD a Transaction
export async function POST(req) {
    await connectDB();
    const { description, amount, date } = await req.json();
    if (!description || !amount || !date) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    const newTransaction = new Transaction({ description, amount, date });
    await newTransaction.save();
    return NextResponse.json(newTransaction);
}

// UPDATE a Transaction
export async function PUT(req) {
    await connectDB();
    const { id, description, amount, date } = await req.json();
    if (!id || !description || !amount || !date) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    const updatedTransaction = await Transaction.findByIdAndUpdate(
        id,
        { description, amount, date },
        { new: true }
    );
    return NextResponse.json(updatedTransaction);
}

// DELETE a Transaction
export async function DELETE(req) {
    await connectDB();
    const { id } = await req.json();
    await Transaction.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" });
}
*/

import { NextResponse } from "next/server";
import { connectDB } from "@/app/db";
import Transaction from "./model";

// GET All Transactions
export async function GET() {
    try {
        await connectDB();
        const transactions = await Transaction.find();
        return NextResponse.json(transactions);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
    }
}

// ADD a Transaction
export async function POST(req) {
    try {
        await connectDB();
        const { description, amount, date, category } = await req.json();

        // Basic validation
        if (!description || !amount || !date || !category) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const newTransaction = new Transaction({ description, amount, date, category });
        await newTransaction.save();
        return NextResponse.json(newTransaction, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add transaction" }, { status: 500 });
    }
}

// UPDATE a Transaction
export async function PUT(req) {
    try {
        await connectDB();
        const { id, description, amount, date, category } = await req.json();

        // Basic validation
        if (!id || !description || !amount || !date || !category) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            id,
            { description, amount, date, category },
            { new: true }
        );

        if (!updatedTransaction) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        return NextResponse.json(updatedTransaction);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 });
    }
}

// DELETE a Transaction
export async function DELETE(req) {
    try {
        await connectDB();
        const { id } = await req.json();

        // Validate ID presence
        if (!id) {
            return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
        }

        const deletedTransaction = await Transaction.findByIdAndDelete(id);

        if (!deletedTransaction) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Transaction deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete transaction" }, { status: 500 });
    }
}
