
import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper';

import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../Charts/CustomBarChart';
import CustomLineChart from '../Charts/CustomLineChart';

const ExpenseOverview = ({ transactions, onAddexpense }
) => {

    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        const result = prepareExpenseBarChartData(transactions);
        setChartData(result);
        console.log(result);
        return () => { }
    }, [transactions])
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <div className=''>

                    <h5 className='text-lg'>Expense Overview</h5>
                    <p className='text-xs text-gray-400 mt-0.5'>Track your spendings over time and analyse your Expense trends. </p>
                </div>
                <button className='add-btn' onClick={onAddexpense}><LuPlus className='text-lg' />Add Expense</button>
            </div>
            <div className='mt-10'>
                {/* <CustomBarChart data={chartData}/> */}
                <CustomLineChart data={chartData} />
            </div>

        </div>
    )
}

export default ExpenseOverview