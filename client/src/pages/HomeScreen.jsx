import React, { useEffect, useState } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { axiosInstance } from '../lib/axios'; 
import toast from 'react-hot-toast';

const HomeScreen = () => {
    
    const [expenses, setExpenses] = useState([]);
    const [loading,setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: '',
        date: '',
        description: '',
    });

    const fetchExpenses = async()=>{
        try {
            setLoading(true);
            const res = await axiosInstance.get("/get-expenses")
            setExpenses(res.data.data);
            
        } catch (error) {
            console.log("Error fetching data:",error);
            toast.error("Failed to retrieve expenses");
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchExpenses()
    },[]);



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const res = await axiosInstance.post("/add-expense",formData);
            setFormData({title:'',amount:'',category:'',description:'',date:''});
            fetchExpenses();
            toast.success("Expenses added successfully")
        } catch (error) {
            console.log("Error in submission: ",error);
            toast.error("Failure in adding expense")
        }
        
    };

    const handleDelete = async(id) => {
        try {
            const res = await axiosInstance.delete(`/delete-expense/${id}`);
            setExpenses(expenses.filter(item => item._id !== id));
            toast.success("Expense Removed Successfully")
        } catch (error) {
            console.log("Error in deleting expense: ",error);
            toast.error("Failed to Remove expense");
        }
    };

    const totalExpense = expenses.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

    return (
   <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                
                
                <header className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-gray-200 pb-6">
                    <h1 className="text-2xl font-bold">Expense Tracker</h1>
                    <div className="mt-4 md:mt-0 text-right">
                        <p className="text-sm text-gray-500 uppercase">Total Spent</p>
                        <p className="text-3xl font-bold text-gray-900">${totalExpense.toFixed(2)}</p>
                    </div>
                </header>

                
   <div className="flex flex-col md:flex-row gap-12">
    
    
    <div className="w-full md:w-1/3">
        <h2 className="text-lg font-semibold mb-4">Add New</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Expense Title" 
                className="w-full p-3 bg-white border border-gray-200 rounded focus:outline-none focus:border-black transition-colors"
                required
            />
            <div className="flex gap-4">
                <input 
                    type="number" 
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00" 
                    className="w-1/2 p-3 bg-white border border-gray-200 rounded focus:outline-none focus:border-black transition-colors"
                    required
                />
                <select 
                    name="category" 
                    value={formData.category}
                    onChange={handleChange}
                    className="w-1/2 p-3 bg-white border border-gray-200 rounded focus:outline-none focus:border-black transition-colors"
                    required
                >
                    <option value="" disabled>Category</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Bills">Bills</option>
                    <option value="Subscriptions">Subscriptions</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description (Optional)"
                rows="2"
                className="w-full p-3 bg-white border border-gray-200 rounded focus:outline-none focus:border-black transition-colors resize-none"
            />

            <input 
                type="date" 
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 bg-white border border-gray-200 rounded focus:outline-none focus:border-black transition-colors text-gray-600"
                required
            />
            <button 
                type="submit" 
                className="mt-2 w-full bg-black text-white py-3 rounded font-medium hover:bg-gray-800 transition-colors flex justify-center items-center gap-2"
            >
                <FaPlus size={12}/>
            </button>
        </form>
    </div>

    
    
    <div className="w-full md:w-2/3">
        <h2 className="text-lg font-semibold mb-4">History</h2>
        
        {expenses.length === 0 ? (
            <p className="text-gray-400 italic">
                {
                    loading? <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span> : <p>No transactions yet.</p>
                }
            </p>
        ) : (
            <div className="flex flex-col gap-2 max-h-[350px] overflow-y-auto pr-2">
                {expenses.map((item) => (
                    <div 
                        key={item._id} 
                        className="group flex items-center justify-between p-4 bg-white border border-transparent hover:border-gray-200 rounded transition-all"
                    >
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-900">{item.title}</span>
                            <div className="flex gap-2 text-xs text-gray-400 mt-1">
                                <span>{item.category}</span>
                                <span>•</span>
                                <span>{new Date(item.date).toLocaleDateString()}</span>
                                {item.description && (
                                                    <>
                                                        <span>•</span>
                                                        <span className="italic truncate max-w-[150px]">{item.description}</span>
                                                    </>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <span className="font-semibold text-gray-900">${item.amount}</span>
                            <button 
                                onClick={() => handleDelete(item._id)}
                                className="text-gray-300 hover:text-red-500 transition-colors"
                            >
                                <FaTrash size={14} />
                            </button>
                        </div>
                    </div>
                  ))}
                </div>
            )}
        </div>

      </div>
    </div>
  </div>
    );
};

export default HomeScreen;