import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { AuthContext } from '../../auth/AuthContext';

const FeeStatusScreen = () => {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fee Status</Text>
      <View>
        <Text style={styles.studentName}>{user.data.name}</Text>
        <FlatList
          data={user.data.fee}
          renderItem={({ item }) => (
            <View style={styles.feeItem}>
              <Text>Due Date: {item.dueDate.toDate().toDateString()}</Text>
              <Text>Payable Amount: {item.payableAmount}</Text>
              <Text>Paid Amount: {item.paidAmount}</Text>
              <Text>Status: {item.status ? 'Paid' : 'Unpaid'}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  feeItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default FeeStatusScreen;
