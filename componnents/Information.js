import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Information = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: 'green' }]}>We are group 08</Text>
      <Text style={[styles.text, { color: 'green' }]}>Trương Minh Hiếu - 20110481</Text>
      <Text style={[styles.text, { color: 'green' }]}>Nguyễn Nhật Tính - 20110576</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default Information;
