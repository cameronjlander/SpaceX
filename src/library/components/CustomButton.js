import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import R from 'res/R'

export default function CustomButton(props) {
    return (
        <TouchableOpacity
            style={props.rounded ? styles.roundedButton : styles.button}
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
    roundedButton: {
        flexDirection: 'row',
        alignSelf: 'center',
        padding: 12,
        borderRadius: 14,
        backgroundColor: R.colors.blue
    },
    button: {
        flexDirection: 'row',
        alignSelf: 'center',
        padding: 12,
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
