import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import R from 'res/R'

export default function RoundedButton(props) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={props.onPress}
        >
            <Text style={styles.text}>{props.text}</Text>
            <Image
                source={props.icon}
                style={styles.icon}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignSelf: 'center',
        padding: 12,
        borderRadius: 14,
        backgroundColor: R.colors.blue
    },
    text: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    icon: {
        alignSelf: 'center',
        marginStart: 8
    }
})
