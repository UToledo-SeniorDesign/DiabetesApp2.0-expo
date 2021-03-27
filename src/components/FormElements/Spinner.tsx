import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

interface SpinnerProp {
    isShowing?: boolean;
    size?: number | "small" | "large";
    animating?: boolean;
    isHiding?: boolean;
}

const Spinner:React.FC<SpinnerProp> = (prop) => {
    return (
        <View>
            <ActivityIndicator 
                size={prop.size || "large"}
                animating={prop.isShowing || true}
                style={styles.spinner}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    spinner: {
        flex: 1,
        alignSelf: 'center'
    }
})

export default Spinner;