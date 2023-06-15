import React from 'react' ;
import { useContext } from 'react';
import ExpensesOutput from '../component/ExpensesOutput';
import { ExpensesContext } from '../store/expensesContext';

export function AllExpenses(){ 
    const expensesCtx = useContext(ExpensesContext);
    
    return(
       
             <ExpensesOutput expenses={expensesCtx.expenses} 
              expensesPeriod= "Total" 
              fallbackText= "No Regester found !!"
              />

    )
}
