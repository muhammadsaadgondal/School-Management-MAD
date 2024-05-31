// screens/FeeStatusScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const FeeStatusScreen = () => {
  const [feeStatus, setFeeStatus] = useState([]);

  useEffect(() => {
    const fetchFeeStatus = async () => {
      try {
        const feeStatusSnapshot = await firestore().collection('FeeStatus').get();
        const feeStatusData = feeStatusSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFeeStatus(feeStatusData);
      } catch (error) {
        console.error('Error fetching fee status:', error.message);
      }
    };

    fetchFeeStatus();
  }, []);

  return (
    <View>
      <Text>Fee Status Screen</Text>
      <FlatList
        data={feeStatus}
        renderItem={({ item }) => (
          <View>
            <Text>{item.studentName}: {item.status}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default FeeStatusScreen;
