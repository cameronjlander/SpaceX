import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    Alert
} from 'react-native';
import R from 'res/R'
import LaunchItem from '../library/components/LaunchItem';

export default function Launches() {
    const [isLoading, setLoading] = useState(true);
    const [list, setList] = useState([]);

    useEffect(() => {
        fetchLaunches()
    }, []);

    const fetchLaunches = async () => {
        let baseUrl = 'https://api.spacexdata.com/v3'
        let url = `${baseUrl}/launches`

        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })

            setLoading(false)

            if (response.status == 200) {
                try {
                    let responseJson = await response.json()
                    setList(responseJson)
                } catch (errors) {
                    console.warn(errors)
                }
            } else {
                let errorMsg = 'An error occurred fetching launches.'
                Alert.alert(errorMsg, 'Please try again.')
            }
        } catch (errors) {
            console.warn(errors)
        }
    };

    return (
        <View style={R.palette.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={R.images.spacex_logo}
                    style={styles.logo}
                />
                <Text style={styles.header}>LAUNCHES</Text>
            </View>
            <Image
                source={R.images.launch_home}
                style={styles.launchImg}
            />
            <View style={R.palette.resultsContainer}>
                {isLoading ? <Text>Loading...</Text> : (
                    <FlatList
                        data={list}
                        renderItem={({ item }) =>
                            <LaunchItem
                                flightNumber={item.flight_number}
                                missionName={item.mission_name}
                                date={item.launch_date_utc}
                                rocketName={item.rocket.rocket_name}
                            />
                        }
                        keyExtractor={(item, index) => item.flight_number.toString()}
                    />
                )}
            </View>
        </View>
    );
}

//Get screen width using Dimensions component
var { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    logoContainer: {
        marginTop: 40,
        flexDirection: 'row'
    },
    logo: {
        overflow: 'visible',
        alignSelf: 'center',
        height: width / 15,
        width: (width / 15) * 8.1
    },
    header: {
        fontSize: 20,
        color: R.colors.text,
        paddingTop: 8
    },
    launchImg: {
        margin: 8,
        overflow: 'visible',
        alignSelf: 'center',
        height: width / 3,
        width: (width / 3) * 0.77
    }
});
