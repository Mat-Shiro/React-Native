import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default props => (
    <TextInput
        style={style.numero}
        value={props.num}
        onChangeText={valorDoCampo => props.atualizaValor(props.nome, valorDoCampo)}
    />
);

const style = StyleSheet.create({
    numero: {
        width: 140,
        height: 80,
        fontSize: 20
    }
});
