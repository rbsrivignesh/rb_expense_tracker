import React,{useState,useEffect} from 'react'
import { API_PATHS } from '../../utils/apiPaths';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import ExpenseList from '../../components/Expense/ExpenseList';
import Modal from '../../components/layouts/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import DeleteAlert from '../../components/layouts/DeleteAlert';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const Expense = () => {
  useUserAuth();
  const [openAddexpenseModal, setOpenAddexpenseModal]= useState(false);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show : false, 
    data : null
  });
  const [expenseData, setexpenseData] = useState([]);
  const fetchexpenseDetails = async()=>{
    if(loading) return ;
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);
      if(response.data){
        setexpenseData(response.data);
   
      }

      
    } catch (error) {
      console.log("Something went wrong, Please try Again. ",error)
    }
    finally{
      setLoading(false  );
    }
  }
  const handleAddexpense = async(expense)=>{
   const {category,date,amount,icon}= expense;
   if(!category.trim()){
    toast.error("category is required");
    return ;
   }
   if(!amount || isNaN(amount) || Number(amount)<=0){
    toast.error("Amount should be a number and greater than 0");
    return;
   }
   if(!date){
    toast.error("Date is required!");
    return;
   }

   try {
    await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE,{
      category,amount,date,icon
    });
    setOpenAddexpenseModal(false);
    toast.success("expense Added Successfully");
    fetchexpenseDetails();
   } catch (error) {
    console.log("Something went wrong",error);
    toast.error("Something went wrong");
   }
  }
  const deleteexpense = async(id)=>{
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({show:false, data : null});
      toast.success("Expense Deleted Successfully");
      fetchexpenseDetails();
      
    } catch (error) {
      console.log("Something went wrong",error);
    toast.error("Something went wrong");
    }
  }
  const handleDownloadexpenseDetails = async()=>{
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,{
        responseType : 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download","expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
       toast.success("Expense Downloaded Successfully");
    } catch (error) {
      console.log("Something went wrong",error);
    toast.error("Something went wrong");
    }
  }

  useEffect(()=>{fetchexpenseDetails(); return ()=>{}},[])
  return (
     <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>

          <div className=''>
        <ExpenseOverview transactions={expenseData} onAddexpense={()=> setOpenAddexpenseModal(true)} />
          </div>
          <ExpenseList transactions = {expenseData} onDelete = {(id)=> {
            setOpenDeleteAlert({show : true, data : id});
          }}
          onDownload = {handleDownloadexpenseDetails}
          />
        </div>
        <Modal isOpen={openAddexpenseModal} onClose={()=>setOpenAddexpenseModal(false)} title="Add expense">
        
        <AddExpenseForm onAddexpense={handleAddexpense} />
        </Modal>
        <Modal isOpen={openDeleteAlert.show}
        onClose={()=> setOpenDeleteAlert({show: false, data : null})}
        title="Delete expense"
        >
          <DeleteAlert content = "Are you sure, You want to delete this expense detail?"
          onDelete ={()=> deleteexpense(openDeleteAlert.data)} />


        </Modal>
        
      </div>
      </DashboardLayout>
  )
}

export default Expense