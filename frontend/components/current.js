import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';

class Student extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        console.log(props.screenProps);
        this.state = {
            items: [],
            customerKey: " "
        };
        if (props.screenProps) {
            // this.state = {
            //     items: props.screenProps[0].lis,
            //     customerKey: " "
            // };
           

            this.setState({items:props.screenProps[0].lis});
            console.log("current component");
            console.log(props.screenProps[0].lis);
            console.log(this.state.items);
        }

        try{
            this.state.items = this.props.screenProps[0].lis;
        }
        catch{
            console.log("catch");
        }
     


        // if (this.props.screenProps) {
        //     this.setState({ items: this.props.screenProps.lis });
        // }


    }

    componentDidMount() {
        this._isMounted = true;
        // if (this.props.screenProps) {
        //     this.setState({ items: this.props.screenProps.lis });
        // }

    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    setCurrentLaundry() {
        if (this.props.screenProps) {
            // this.state.items = this.props.screenProps;
            // console.log(this.state.items);
            if (this._isMounted) {
                this.setState({ items: this.props.screenProps.lis });
                console.log(this.state.items)
            }

            this.setState({ items: this.props.screenProps.lis });


            // const a = ()=>{this.setState({ items: this.props.screenProps.lis })};
        }
    }


    render() {
        // this.setCurrentLaundry();
        console.log(this.state.items);
        return (

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
                        <TouchableHighlight style={styles.PayBtn}>
                            <Text style={styles.text}>Pay</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        margin: 'auto',
        height: 350,
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
    }
})

export default Student;
