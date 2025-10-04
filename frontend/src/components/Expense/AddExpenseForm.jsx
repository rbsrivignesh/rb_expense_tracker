import React, { useState } from 'react'
import Input from '../inputs/Input'
import EmojiPickerPopUp from '../layouts/EmojiPickerPopUp'

const AddExpenseForm = ({onAddexpense}) => {
   const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: ""
  })

  const handleChange = (key, value) => {
  
    setExpense({ ...expense, [key]: value })
  }
  return (
    <div>
      <EmojiPickerPopUp icon = {expense.icon} onSelect = {(selectedIcon)=> handleChange("icon",selectedIcon)}/>
      
      <Input
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Expense category"
        placeholder="Movie ,Food ,Clothing , etc"
        type="text"
      />
      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="Enter expense amount"
        type="number"
      />
      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder="Enter the date"
        type="date"
      />
      <div className='flex justify-end mt-6'>
        <button onClick={()=>onAddexpense(expense)}  type='button' className='add-btn add-btn-fill'>
          Add Expense
        </button>
      </div>
    </div>
  )
}
export default AddExpenseForm