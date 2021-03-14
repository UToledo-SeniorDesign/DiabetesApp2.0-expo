import React, { useState, memo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

interface InputProp {
    onInput: (val: string) => void;     // Returns the current state of the component
    label: string;                      // The text to use for the floating label
    value?: string;                     // Value of the input
    placeholder?: string;               // Placeholder for the input
    error?: boolean;                    // Whether to style the input with error style
    errorMsg?: string | undefined;      // Error message to display if the input has an error/invalid
    disabled?: boolean;                 // If true, user won't be able to interact with the component
    mode?: 'flat' | 'outlined' | undefined;  // Flat or outlined input, defauled to flat from react native papers
    isSensitive?: boolean;              // If the input contains sensitive data, aka password -> Defaulted to false
}

const Input:React.FC<InputProp> = (prop) => {
    const {
        label, 
        value, 
        placeholder,
        error,
        disabled,
        mode,
        isSensitive,
        errorMsg,
        onInput
    } = prop;

  const [text, setText] = useState<string>(value || '');

  const onChange = (newText: string) => {
      setText(newText);                 // To mantain the as a controlled component
      onInput(text);                    // Return the current text state to parent component
  }

  return (
        <View style={styles.container}>
            <TextInput
                label={label}
                value={text}
                placeholder={placeholder}
                onChangeText={text => onChange(text)}
                disabled={disabled}
                error={error}
                mode={mode}
                secureTextEntry={isSensitive || false}
            />
            {error && errorMsg && 
                <Text style={styles.error}>
                    {errorMsg}
                </Text>
            }
        </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: 12,
    },
    error: {
      fontSize: 14,
      paddingHorizontal: 4,
      paddingTop: 4,
    },
  });

export default memo(Input);