import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableWithoutFeedback } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

import createScreen from '../admin/create'
import currentLaundryScreen from '../customer/current-laundry';
import historyLaundryScreen from '../customer/history-laundry';
import { Dropdown } from 'react-native-material-dropdown';
import customerDetailService from '../../_services/customer-details';
import Modal from "react-native-modal";
import customerLaundryDetails from '../../_services/customer-laundry-details';

class adminHome extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            blockno: "",
            roomno: "",
            roomNoData: [{
                value: '1',
            }, {
                value: '2',
            }, {
                value: '3',
            }],
            blockNoData: [{
                value: "8th block",
            }, {
                value: 'Mega Towers 1',
            }, {
                value: '3rd Block',
            }],
            data: [],
            modalVisible: false,
            customerKey: "",
            result: {}

        }
        this._isMounted = false;
    }


    makeModalVisible = (visible) => {
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({ modalVisible: visible });
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    getCustomerProfile() {
        if (this.state.roomno != "" && this.state.blockno != "") {
            customerDetailService.getCustomerProfile(this.state.roomno, this.state.blockno).then(res => {
                res.json().then(dataa => {
                    const v1 = JSON.parse(dataa);
                    if (this._isMounted) {
                        this.setState({ modalVisible: true })
                        this.setState({ data: v1 });
                    }
                })
            })
        }



    }
    selectedCustomerKey(key) {
        // console.log(key);
        if (this._isMounted) {
            this.setState({ customerKey: key });
            this.setState({ modalVisible: false });
            customerLaundryDetails.getCustomerLaundry(key).then(res => {
                res.json().then(data => {
                    var curr = [];
                    var hist = [];
                    data = JSON.parse(data)

                    data.forEach(function (obj) {
                        //console.log(obj.id);
                        if (obj.datePickup === "None") {
                            curr.push(obj);
                        }
                        else {
                            hist.push(obj);
                        }
                    });
                    result = { "current": curr, "history": hist };
                    this.setState({result:result});
                })
            });

        }
    }
    _renderList() {
        return (
            this.state.data.map((data) => {
                return (
                    <TouchableWithoutFeedback onPress={(event) => this.selectedCustomerKey(data.key)}>
                        <View>
                            <Text>{data.name}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )
            })
        )
    }
    setBlockNo(blockno) {
        if (this._isMounted) {
            this.setState({ blockno });
        }
    }
    setRoomNo(roomno) {
        if (this._isMounted) {
            this.setState({ roomno });
        }
    }

    render() {

        tab = createMaterialTopTabNavigator({
            AddLaundry: createScreen,
            current: currentLaundryScreen,
            history: historyLaundryScreen
        })
        TabApp = createAppContainer(tab);
        return (
            <View style={styles.container}>
                <View>
                    <Dropdown onChangeText={(blockno) => {
                        this.setBlockNo(blockno);
                        this.getCustomerProfile();
                    }
                    }
                        label='Block'
                        data={this.state.blockNoData}
                    />
                    <Dropdown onChangeText={(roomno) => {
                        this.setRoomNo(roomno);
                        this.getCustomerProfile();
                    }
                    }
                        label='Room Number'
                        data={this.state.roomNoData}
                    />
                </View>
                <Modal animationType={"slide"} transparent={true}
                    isVisible={this.state.modalVisible}
                    onNavigate={this.customerLogin}
                    onRequestClose={() => { this.setState({ modalVisible: false }); }}
                >
                    <View>{this._renderList()}</View>


                </Modal>
                <TabApp screenProps={{ customerKey: this.state.customerKey, result: this.state.result }} />
            </View>

        );
    }
}
export default adminHome;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 3,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 300,
        backgroundColor: 'white'
    },
})

