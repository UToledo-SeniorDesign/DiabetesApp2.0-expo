import React from 'react';
import { Button as ButtonPaper} from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

interface ButtonProp {
    onPress: () => void;
    text: string;
    uppercase?: boolean;                        // Make the text uppercase
    mode?: 'text' | 'contained' | 'outlined';
    icon?: IconSource
    disabled?: boolean;
    onLongPress?: () => void;
    isLoading?: boolean;                        // Whether to show a loading indicator
}

const Button:React.FC<ButtonProp> = (prop) => {
    return (
        <ButtonPaper
            onPress={prop.onPress}
            mode={prop.mode || 'contained'}
            icon={prop.icon}
            disabled={prop.disabled}
            uppercase={prop.uppercase}
            onLongPress={prop.onLongPress}
            loading={prop.isLoading}
        >
            {prop.text}
        </ButtonPaper>
    )
}

export default Button;