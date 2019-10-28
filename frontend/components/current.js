import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TouchableHighlight, ScrollView } from 'react-native';
import payment from '../_services/payment';
import customerLaundryDetails from '../_services/customer-laundry-details';

class Student extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        console.log(props.screenProps);
        this.state = {
            items: [],
            customerKey: " ",
            amount: " ",
            initialState: "1"
        };
        try {
            console.log("component laundry")
            this.state.items = this.props.screenProps.data.lis;
            this.state.amount = this.props.screenProps.data.amount;
            console.log(this.state.screenProps);
            this.state.customerKey = this.props.screenProps.key;
        }
        catch{
            console.log("catch");
        }

    }

    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    setCurrentLaundry() {
        if (this.props.screenProps) {
            if (this._isMounted) {
                this.setState({ items: this.props.screenProps.lis });
                console.log(this.state.items)
            }
            this.setState({ items: this.props.screenProps.lis });
        }
    }
    resetState = () => {
        this.setState({ initialState: "1" });
    }
    pay(amount) {
        console.log(this.props.screenProps);
        data = {
            key: this.state.customerKey,
            date: this.props.screenProps.data.dateGiven
        }
        console.log(data);
        payment.setDatePickup(data).then((res) => {
            console.log(res);
            this.getCustomerLaundry(this.props.screenProps.key)
        }).catch((e) => {
            console.log(e);
        });
    }

    failureCallback = (data) => {
        console.log(data)
    }

    successCallback = (data) => {
        console.log(data)
    }

    getCustomerLaundry(key) {
        // console.log(customerData);
        customerLaundryDetails.getCustomerLaundry(key).then(res => {
            res.json().then(data => {
                console.log(data)
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
                result = {"current": curr, "history": hist };
                console.log(result);
                this.props.updateState(result);
                // this.setState({ modalVisible: false }, () => this.props.navigation.navigate('customerHome', { returnData: this.returnData, result: result }));

            })
        });
        // setTimeout(() => {
        //     console.log("here")
        // }, 3000);
    }
    render() {
        console.log(this.state.items);
        return (
            <View style={{ flex: 1 }}>
                {/* <FlatList> */}
                <View style={styles.container}>
                    <View style={styles.Date}>
                        <Text>Date- 11-10-2019</Text>
                    </View>
                    <View style={styles.tableView}>
                        <View style={styles.ItemStyle}>
                            <Text>Items</Text>
                            {Object.keys(this.state.items).map((e) => {
                                console.log(e);

                                return (
                                    <View key={e} style={styles.itemStyle}>
                                        <Text>{this.state.items[e].item}</Text>
                                    </View>
                                )
                            })}
                        </View>
                        <View style={styles.qtyStyle}>
                            <Text>Qty</Text>
                            {Object.keys(this.state.items).map((e) => {
                                return (
                                    <View key={e} style={styles.itemStyle}>
                                        <Text>{this.state.items[e].quantity}</Text>
                                    </View>
                                )
                            })}
                        </View>
                        <View style={styles.priceStyle}>
                            <Text>Price</Text>
                            {Object.keys(this.state.items).map((e) => {
                                return (
                                    <View key={e} style={styles.itemStyle}>
                                        <Text>{this.state.items[e].price}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                    <View style={styles.buttons}>
                        <View style={styles.confirm}>

                            <TouchableHighlight style={styles.confirmBtn}>
                                <Text style={styles.text}>Confirm</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.confirm}>
                            <TouchableHighlight style={styles.PayBtn} onPress={() => {
                                this.pay(this.state.amount);
                            }}>
                                <Text style={styles.text}>Pay{this.state.amount}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                {/* </FlatList> */}
            </View>



        )
    }
}



const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        margin: 'auto',
        height: 'auto',
        justifyContent: "center",
        borderWidth: 0.5,
        borderRadius: 5,
        top: 10,
        left: 10,
        right: 10
    },
    rule: {
        flex: 1
    },
    Date: {
        marginTop: 3,
        marginLeft: 5,
        alignItems: 'center',
    },
    tableView: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        padding: 10,
        margin: 10,
        justifyContent: "space-between",
    },
    item: {
        padding: 5,
    },
    ItemStyle: {
        padding: 5,
        margin: 5,
    },

    itemStyle: {
        padding: 5,
        marginTop: 10,
    },
    qtyStyle: {
        padding: 5,
        margin: 5,
    },
    priceStyle: {
        padding: 5,
        margin: 5,
    },
    buttons: {
        padding: 10,
        marginTop: 60,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    confirmBtn: {
        alignItems: 'center',
        backgroundColor: '#0000ff',
        padding: 10,
        borderRadius: 3,
    },
    PayBtn: {
        alignItems: 'center',
        backgroundColor: '#0000ff',
        padding: 10,
        borderRadius: 3,
    },
    text: {
        color: 'white'
    },
    scrollView: {
        top: 0,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
    }
})

export default Student;
