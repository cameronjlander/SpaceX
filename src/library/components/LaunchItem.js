import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import R from 'res/R'
import moment from 'moment'

export default function LaunchItem(props) {
    return (
        <View style={styles.container}>
            <View style={styles.primaryContainer}>
                <Text numberOfLines={1} style={styles.flightNumber}>#{props.flightNumber}</Text>
                <Text numberOfLines={1} style={styles.missionName}>{props.missionName}</Text>
            </View>
            <View style={styles.verticalTextContainer}>
                <Text numberOfLines={1} style={styles.date}>{moment(props.date).format("Do MMM YYYY")}</Text>
                <Text numberOfLines={1} style={styles.rocketName}>{props.rocketName}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '97%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 4,
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    primaryContainer: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    verticalTextContainer: {
        flex: 1,
        alignItems: 'flex-end',
        marginVertical: 4
    },
    flightNumber: {
        padding: 5,
        fontSize: 24,
        color: R.colors.text
    },
    missionName: {
        padding: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: R.colors.text
    },
    date: {
        padding: 5,
        fontSize: 12,
        color: R.colors.text
    },
    rocketName: {
        padding: 5,
        fontSize: 16,
        color: R.colors.text,
        fontWeight: 'bold'
    }
})
