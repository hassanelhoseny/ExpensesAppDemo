import React, { useContext , useState } from 'react' ;
import { useEffect } from 'react';
import ExpensesOutput from '../component/ExpensesOutput';
import { ExpensesContext } from '../store/expensesContext';
import { getDateMinusDays } from '../util/Date';
import { fetchExpenses } from '../util/http';
import {ActivityIndicator , View} from 'react-native';
import ErrorOverlay from '../component/Ui/ErrorOverlay';
import SplashScreen from 'react-native-splash-screen';

export function RecentExpense(){

        const [isFetching, setIsFetching] = useState(true);
        const [error, setError] = useState();

        const expensesCtx = useContext(ExpensesContext);


     useEffect(() => {
        SplashScreen.hide()
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError('Could not fetch expenses!');
      }
      setIsFetching(false);
    }

    getExpenses();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

          if (isFetching) {
            return (
                <View style={{flex:1 , justifyContent:'center' , alignItems: 'center'}}>
                     <ActivityIndicator size= "large" color = "gray" />
                </View>
            )
          }

        
    

        const recentExpenses = expensesCtx.expenses.filter((expense) => {
            const today = new Date();
            const date7DaysAgo = getDateMinusDays(today, 7);
        
            return expense.date >= date7DaysAgo && expense.date <= today;
          });


        
        return (
          <ExpensesOutput expenses={recentExpenses}
           expensesPeriod="Last 7 Days" 
           fallbackText= "No Expenses Regestered in Last 7 Days"
           />
        );
      }