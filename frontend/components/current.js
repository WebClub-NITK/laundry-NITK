import React from "react";
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';

class Student extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: {
                obj1:{
                    name: "shirts",
                    qty: 2,
                    price: 10,
                },
                obj2:{
                    name: "trousers",
                    qty: 3,
                    price:40,
                }
            }
        };
    }
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.Date}>
                <Text>Date- 11-10-2019</Text>
                </View>
                <View style={styles.tableView}>
                <View style={styles.ItemStyle}>
                    <Text>Items</Text>
                {Object.keys(this.state.items).map((e) => {
                    return(
                        <View key={e} style={styles.itemStyle}>  
                            <Text>{this.state.items[e].name}</Text>
                        </View>
                    )
                })}
                </View>
                <View style={styles.qtyStyle}>
                    <Text>Qty</Text>
                        {Object.keys(this.state.items).map((e) => {
                            return(
                                <View key={e} style={styles.itemStyle}>  
                                    <Text>{this.state.items[e].qty}</Text>
                                </View>
                            )
                        })}
                </View>
                <View style={styles.priceStyle}>
                    <Text>Price</Text>
                        {Object.keys(this.state.items).map((e) => {
                            return(
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
                        <Text>Confirm</Text>
                    </TouchableHighlight>
                    </View>
                    <View style={styles.confirm}>
                    
                    <TouchableHighlight style={styles.PayBtn}>
                        <Text>Pay</Text>
                    </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        margin: 'auto',
        height: 200,
        justifyContent: "center",
        borderWidth: 0.5,    
        borderRadius: 5,
        top: 10,
        left: 10,
        right: 10
   
    },
    Date:{
        marginTop: 3,
        marginLeft: 5,
        alignItems: 'center',
    },
    tableView:{
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        padding: 10,
        margin: 10,
        justifyContent: "space-between",
    },
    item:{
        padding: 5,
    },
    ItemStyle:{
        padding: 5,
        margin: 5,
    },

    itemStyle:{
        padding: 5,
        marginTop: 10,
    },
    qtyStyle:{
        padding: 5,
        margin: 5,
    },
    priceStyle:{
        padding: 5,
        margin: 5,
    },
    buttons:{
        padding: 10,
        marginTop: 60,
        flexDirection:'row',
        justifyContent: 'space-between'
    }, 
    confirmBtn:{
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 3,
    },
    PayBtn:{
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 3,
    }
    
})

export default Student;
