import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export default function AppInput(props: TextInputProps) {
  return <TextInput style={styles.input} {...props} />;
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
    fontSize: 16,
  },
});