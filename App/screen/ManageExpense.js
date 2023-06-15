import { useLayoutEffect , useContext , useState } from 'react';
import { View , StyleSheet , ActivityIndicator} from 'react-native';
import { GlobalStyles } from '../constant/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ExpensesContext } from '../store/expensesContext';
import ExpenseForm from '../component/ManageExpense/ExpenseForm';
import { storeExpense, updateExpense , deleteExpense} from '../util/http';
import ErrorOverlay from '../component/Ui/ErrorOverlay'

export function ManageExpense({ route, navigation }) { 

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();

  const expensesCtx = useContext(ExpensesContext);  
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find( (expense) => expense.id === editedExpenseId )

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense - please try again later!');
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack()
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not save data - please try again later!');
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return (
        <View style={{flex:1 , justifyContent:'center' , alignItems: 'center'}}>
             <ActivityIndicator size= "large" color = "gray" />
        </View>
    )
  }

  

  return (
    <View style={styles.container}>
        <ExpenseForm defaultValues={selectedExpense} 
        onSubmit={confirmHandler} 
         submitButtonLabel={isEditing? 'update' : 'Add'}  onCancel={cancelHandler} />

      {isEditing && (
        <View style={styles.deleteContainer}>
             <MaterialIcons name= 'delete' size={30} color="red" onPress={deleteExpenseHandler}

              />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});

