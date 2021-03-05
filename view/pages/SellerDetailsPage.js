
import React, { useState, useEffect } from 'react';
import {
    ScrollView, TouchableHighlight,
    StyleSheet, Text, Image, View, FlatList,
} from 'react-native';
import { Chip, Card, Title, Button, Paragraph, RadioButton } from 'react-native-paper';

import Spinner from 'react-native-loading-spinner-overlay';

import AletPopUp from '../components/AletPopUp';
import { siteUrl } from '../api/environment';
import axios from 'axios';

const SellerDetailsPage = ({ route }) => {



    useEffect(() => {
        getSlots();
    }, []);

    const { item } = route.params;
    const selectedChip = true;

    const [timeSlots, setTimeSlots] = useState([]);

    const [popUpVisible, setPopUpVisiblity] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [title, setAlertTitle] = useState('');
    const [selectedSlot, selectTimeSlot] = useState('');
    const [loader, showLoader] = useState(false);


    const hideDialog = () => setPopUpVisiblity(false);

    const showAlert = (title, message) => {
        setAlertTitle(title);
        setAlertMessage(message);
        setPopUpVisiblity(true);
    }

    const getSlots = async () => {

        const url = siteUrl + 'getSlots?seller=' + route.params.item._id;
        console.log({ url })
        const response = await fetch(url);

        const data = await response.json();
        setTimeSlots(data);

    }

    const selectChip = (chipIndex) => {
        let timeSlotCopy = timeSlots.slice();
        timeSlotCopy.forEach((time, index) => {
            if (chipIndex === index) {
                time.selected = true;
                selectTimeSlot(time.slot);
            }
            else
                time.selected = false;
        });
        setTimeSlots(timeSlotCopy);
    }

    const getChipStyle = (selectedTheChip) => {
        if (selectedTheChip) {
            return {
                backgroundColor: '#663399'
            }
        } else {
            return {
                backgroundColor: '#bfb4ac'
            };
        }
    }

    const getTextStyle = (selectedTheChip) => {
        if (selectedTheChip) {
            return {
                color: 'white'
            }
        } else {
            return {
                color: 'black'
            };
        }
    }

    const bookAppointment = async () => {
        if (!selectedSlot) {
            showAlert("Warning", "Please select timeslot");
        }
        showLoader(true);
        const url = siteUrl + 'addSlotRequest';
        const slotData = {
            slot: selectedSlot,
            to: item._id
        };
        console.log({ slotData })
        try {
            const data = await axios.post(url, slotData);
            if (data) {
                showAlert("Success", "Created Appoitment Succesfully")
            }
        } catch {

        }
        finally {
            showLoader(false)
        }


    }


    return (
        <View style={styles.main}>
            <Spinner
                visible={loader}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />

            <View>
                <Card>
                    <Card.Content>
                        <Title>{item.name}</Title>
                        <Paragraph>Phone :{item.phone}</Paragraph>
                    </Card.Content>
                    <Card.Cover source={{ uri: item.image }} />
                </Card>

                <Text style={styles.slotText}>Availabe Slots</Text>
                <ScrollView horizontal={true}>

                    <View style={styles.timeSlotSection}>
                        {
                            timeSlots.map((time, index) => {
                                return (
                                    <View key={time._id}>
                                        <Chip style={{ ...styles.timeChip, ...getChipStyle(time.selected) }} mode="outlined" onPress={() => {
                                            console.log('Pressed');
                                            selectChip(index);
                                        }}>
                                            <Text style={{ ...getTextStyle(time.selected) }}> {time.slot}</Text>
                                        </Chip>
                                    </View>
                                )
                            })
                        }


                    </View>

                </ScrollView>
                <Button mode="contained" onPress={bookAppointment}>

                    <Text style={styles.whiteColor}> Book Appoinment</Text>
                </Button>

            </View>
            <AletPopUp visible={popUpVisible} message={alertMessage}
                hideDialog={hideDialog} title={title} />
        </View >
    );
};

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },

    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
    },
    whiteColor: {
        color: 'white'

    },
    slotText: {

        marginTop: 10,
        marginLeft: 5,
        fontSize: 20
    },
    timeSlotSection: {
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
    },
    timeChip: {
        marginRight: 10,
        width: 120,
    }, main: {
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20
    }

});

export default SellerDetailsPage;
