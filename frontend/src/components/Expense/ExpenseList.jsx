import React from 'react'

import TransactionInfoCard from '../cards/TransactionInfoCard'
import { LuDownload } from 'react-icons/lu'

const ExpenseList = ({transactions,onDelete,onDownload}) => {
  return (
      <div className='card'>
        <div className='flex items-center justify-between'>
          <h5 className='text-lg'>Expense Categories </h5>
          <button className='card-btn' onClick={onDownload}><LuDownload className='text-base'/>Download</button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2'>
          {transactions?.map((item)=>(
            <TransactionInfoCard key={item._id} 
            title={item.category}
            icon={item.icon}
         date={new Date(item?.date).toLocaleDateString("en-IN")}
          amount = {item.amount}
          type = "expense"
          onDelete={()=>onDelete(item._id)}
  
            />
          ))}
        </div>
      </div>
    )
}


export default ExpenseList