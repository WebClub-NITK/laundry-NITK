import React from "react";
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableWithoutFeedback } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

import createScreen from '../admin/create'
import currentLaundryScreen from '../customer/current-laundry';
import historyLaundryScreen from '../customer/history-laundry';
import { Dropdown } from 'react-native-material-dropdown';
import customerDetails from '../../_services/customer-details';
import Modal from "react-native-modal";

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
            data: [{
                profilePic: "asdfasdf",
                name: "asdf",
                key: "asdasdf"
            },
            {
                profilePic: "asdfasdf",
                name: "asdf",
                key: "asdasdf"
            }],
            modalVisible: false,

        }
    }


    makeModalVisible = (visible) => {
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({ modalVisible: visible });
        }
    }

    componentDidMount() {
        this._isMounted = true
    }
    componentWillUnmount() {
        this._isMounted = false
    }

    getCustomerProfile() {

        // customerDetailService.getCustomerProfile(this.state.roomno, this.state.blockno).then((res) => {
        //     console.log("post request successfull");
        //     console.log(res)
        // }).catch((e) => {
        //     console.log("here")
        //     console.log(e);
        // });

        this.makeModalVisible(true);
    }
    selectedCustomerKey(key){
        console.log(key);
    }
    _renderList = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={(event) => this.selectedCustomerKey(item.key)}>
                <View style={styles.flatview}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.email}>{item.profilePic}</Text>
                </View>
            </TouchableWithoutFeedback>
        );

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
                        this.setState({ blockno });
                        this.getCustomerProfile();
                    }
                    }
                        label='Block'
                        data={this.state.blockNoData}
                    />
                    <Dropdown onChangeText={(roomno) => {
                        this.setState({ roomno });
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
                    onRequestClose={() => { this.setState({ modalVisible: false }); console.log("request") }}
                >
                    <FlatList
                        data={this.state.data}
                        showsVerticalScrollIndicator={false}
                        renderItem={this._renderList}
                        keyExtractor={item => item.key}
                    />

                </Modal>
                <TabApp />
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
        width: 300
    },
})

