import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';

interface InputProp {
    onInput: (val: string) => void;     // Returns the current state of the component
    label: string;                      // The text to use for the floating label
    value?: string;                     // Value of the input
    placeholder?: string;               // Placeholder for the input
    error?: boolean;                    // Whether to style the input with error style
    disabled?: boolean;                 // If true, user won't be able to interact with the component
    mode?: 'flat' | 'outlined' | undefined;  // Flat or outlined input, defauled to flat from react native papers
}

const MyComponent:React.FC<InputProp> = (prop) => {
    const {
        label, 
        value, 
        placeholder,
        error,
        disabled,
        mode,
        onInput
    } = prop;

  const [text, setText] = useState<string>(value || '');

  const onChange = (newText: string) => {
      setText(newText);                 // To mantain the as a controlled component
      onInput(text);                    // Return the current text state to parent component
  }

  return (
    <TextInput
      label={label}
      value={text}
      placeholder={placeholder}
      onChangeText={text => onChange(text)}
      disabled={disabled}
      error={error}
      mode={mode}
    />
  );
};

export default MyComponent;