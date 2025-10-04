const Expense = require("../models/Expense");
const xlsx = require("xlsx")

exports.addExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        const { icon, category, amount, date } = req.body;

        if (!category || !date || !amount) {
            return res.status(400).json({ message: "All Fields are mandatory" });
        }
        const newExpense = new Expense({
            userId,
            icon, category, amount, date: new Date(date)
        });
        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `add Expense Error : ${error.message}` })
    }
}

exports.getAllExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.status(200).json(expense);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `get all expense Error : ${error.message}` })
    }
}
exports.deleteExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Expense Deleted Successfully!" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `delete Expense Error : ${error.message}` })
    }
}
exports.downloadExpenseExcel = async (req, res) => {
    try {
        const userId = req.user.id;
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        const data= expense.map((item)=> ({
            Category : item.category,
            Amount : item.amount,
            Date : item.date
        }));
        const wb = xlsx.utils.book_new();
        const ws= xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"Expense");
        xlsx.writeFile(wb,'expense_details.xlsx');
        res.download('expense_details.xlsx')
     } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `download expense Error : ${error.message}` })
    }
}