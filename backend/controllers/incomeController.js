const Income = require("../models/Income");
const xlsx = require("xlsx")

exports.addIncome = async (req, res) => {
    try {
        const userId = req.user.id;
        const { icon, source, amount, date } = req.body;

        if (!source || !date || !amount) {
            return res.status(400).json({ message: "All Fields are mandatory" });
        }
        const newIncome = new Income({
            userId,
            icon, source, amount, date: new Date(date)
        });
        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `add Income Error : ${error.message}` })
    }
}

exports.getAllIncome = async (req, res) => {
    try {
        const userId = req.user.id;
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(income);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `get all Income Error : ${error.message}` })
    }
}
exports.deleteIncome = async (req, res) => {
    try {
        const userId = req.user.id;
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Income Deleted Successfully!" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `delete Income Error : ${error.message}` })
    }
}
exports.downloadIncomeExcel = async (req, res) => {
    try {
        const userId = req.user.id;
        const income = await Income.find({ userId }).sort({ date: -1 });
        const data= income.map((item)=> ({
            Source : item.source,
            Amount : item.amount,
            Date : item.date
        }));
        const wb = xlsx.utils.book_new();
        const ws= xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb,ws,"Income");
        xlsx.writeFile(wb,'income_details.xlsx');
        res.download('income_details.xlsx')
     } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `download Income Error : ${error.message}` })
    }
}