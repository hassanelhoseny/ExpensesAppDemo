import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '../constant/styles';
import { getFormattedDate } from '../util/Date';

function ExpenseItem({ id , description, amount, date }) {
  const navigation = useNavigation();

  function expenseHandler(){
    navigation.navigate('ManageExpense' , {
      expenseId: id
    })
  }


  return (
    <Pressable
     onPress={expenseHandler}
     style={({ pressed }) => pressed && styles.pressed}>

      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  pressed:{
    opacity: 0.75
  } ,
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: 'black',
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 60
  },
  amount: {
    color: 'black',
    fontWeight: 'bold',
  },
});