import { View , StyleSheet , Text } from 'react-native';
import { GlobalStyles } from '../constant/styles';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';



function ExpensesOutput({ expenses, expensesPeriod , fallbackText }) {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>;

    if (expenses.length > 0) {
      content = <ExpensesList expenses={expenses} />;
    }
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
     {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: 'gray'
    },
    infoText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
      marginTop: 32,
    },
  });