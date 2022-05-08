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
import Button from '../library/components/Button';
import WheelPicker from 'react-native-wheely';

export default function Launches() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [showYearPicker, setShowYearPicker] = useState(false);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(["All"]);
    const [sortDescending, setSortDescending] = useState(true);
    const [sortOrder, setSortOrder] = useState(R.strings.descending);

    useEffect(() => {
        const currentYear = (new Date()).getFullYear();
        let yearOptions = ["All"];
        for (let i = 0; i <= 40; i++) {
            let year = currentYear - i;
            yearOptions.push(year.toString());
        }
        setYears(yearOptions);
        fetchLaunches(sortDescending, selectedYear)
    }, []);

    const refreshList = (sortDescending, selectedYear) => {
        setLoading(true)
        setData([])
        fetchLaunches(sortDescending, selectedYear)
    }

    const fetchLaunches = async (sortDescending, selectedYear) => {
        setLoading(true)

        let baseUrl = 'https://api.spacexdata.com/v3'
        let url = `${baseUrl}/launches`

        if (sortDescending) {
            url += '?sort=launch_date_utc&order=desc'
        } else {
            url += '?sort=launch_date_utc&order=asc'
        }

        if (selectedYear != "All") {
            url += '&launch_year=' + selectedYear
        }

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
                    setData(responseJson);
                } catch (errors) {
                    console.warn(errors)
                }
            } else {
                let errorMsg = R.strings.errorFetchingLaunches
                Alert.alert(errorMsg, R.strings.pleaseTryAgain)
            }
        } catch (errors) {
            console.warn(errors)
        }
    };

    const toggleYearPicker = () => {
        let open = showYearPicker
        setShowYearPicker(!open)
    }

    const yearSelected = (index) => {
        let selectedYear = years[index];
        setSelectedYear(selectedYear);
        refreshList(sortDescending, selectedYear);
    }

    const toggleSortOrder = () => {
        let sortByText = R.strings.ascending
        if (sortDescending) {
            sortByText = R.strings.descending
        }
        setSortOrder(sortByText)
        setSortDescending(!sortDescending);
        refreshList(!sortDescending, selectedYear);
    }

    const renderEmptyContainer = () => {
        return (
            <View>
                <Text>{R.strings.noResults}</Text>
            </View>
        )
    }

    return (
        <View style={R.palette.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={R.images.spacex_logo}
                    style={styles.logo}
                />
                <Text style={styles.header}>{R.strings.launches}</Text>
            </View>
            <View style={styles.horizontalContainer}>
                <Image
                    source={R.images.launch_home}
                    style={styles.launchImg}
                />
                <Button
                    text={R.strings.reload}
                    icon={R.icons.refresh}
                    rounded={true}
                    onPress={() => refreshList(sortDescending, selectedYear)}
                />
            </View>

            <View style={styles.horizontalContainer}>
                <View style={styles.button}>
                    <Button
                        text={R.strings.filter}
                        icon={R.icons.select}
                        onPress={() => toggleYearPicker()}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        text={R.strings.sort + ' ' + sortOrder}
                        icon={R.icons.sort}
                        onPress={() => toggleSortOrder()}
                    />
                </View>
            </View>

            {showYearPicker && (
                <WheelPicker
                    selectedIndex={years.indexOf(selectedYear)}
                    options={years.map(year => year.toString())}
                    onChange={(index) => yearSelected(index)}
                />
            )}

            <View style={R.palette.resultsContainer}>
                {isLoading ? <Text>{R.strings.loading}</Text> : (
                    <FlatList
                        data={data}
                        renderItem={({ item }) =>
                            <LaunchItem
                                flightNumber={item.flight_number}
                                missionName={item.mission_name}
                                date={item.launch_date_utc}
                                rocketName={item.rocket.rocket_name}
                            />
                        }
                        keyExtractor={(item, index) => index}
                        ListEmptyComponent={renderEmptyContainer()}
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
    horizontalContainer: {
        flexDirection: 'row'
    },
    launchImg: {
        marginVertical: 8,
        marginHorizontal: 20,
        overflow: 'visible',
        alignSelf: 'center',
        height: width / 3,
        width: (width / 3) * 0.77
    },
    button: {
        margin: 8
    }
});
