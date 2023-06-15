import React from 'react' ;
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AllExpenses} from '../screen/AllExpenses'
import {ManageExpense} from '../screen/ManageExpense';
import {RecentExpense} from '../screen/RecentExpense'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GlobalStyles } from '../constant/styles';
import ExpensesContextProvider from '../store/expensesContext';
import IonIcon from 'react-native-vector-icons/MaterialIcons';



const Stack = createNativeStackNavigator() ;
const BottomTabs = createBottomTabNavigator () ;


function ExpensesOverview(){
    return (
        <BottomTabs.Navigator 
          screenOptions={({ navigation }) => ({
           // headerStyle: { backgroundColor: 'gray'},
            headerTintColor: 'black',
            //tabBarStyle: { backgroundColor: 'gray' },
            tabBarActiveTintColor: GlobalStyles.colors.accent500,
            headerRight: () => (
                <IonIcon name="add" size={30} color="black" style={{right:10}}
                onPress={() => {
                  navigation.navigate('ManageExpense');
                }}
              />
            ),
          })}
        >
           

                <BottomTabs.Screen name='RecentExpense' component={RecentExpense} 
                options= {{title: 'Recent Expenses' , tabBarLabel: 'Recent' , tabBarIcon: ({ color, size }) => (
                    <IonIcon name="timer" size={size} color={color} />
                  ),}}/>

                <BottomTabs.Screen name='AllExpenses' component={AllExpenses} 
                options = {{title: 'All Expenes' , tabBarLabel: 'All Expenses' , tabBarIcon: ({ color, size }) => (
                    <IonIcon name="book" size={size} color={color} />
                  ),}}/>

        </BottomTabs.Navigator>
    )
}


export  function Navigation(){ 

    return(
       <ExpensesContextProvider> 
    <Stack.Navigator >
      
        <Stack.Screen  name='ExpensesOverview' component={ExpensesOverview} options={{headerShown:false}}/>
        <Stack.Screen name='ManageExpense' component={ManageExpense} options= {{title: 'Manage Expense'}}/>
       
     
        
    </Stack.Navigator>
    </ExpensesContextProvider>
    
    )
}
