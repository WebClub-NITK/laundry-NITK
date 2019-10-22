import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

import createScreen from '../admin/create'
import currentLaundryScreen from '../customer/current-laundry';
import historyLaundryScreen from '../customer/history-laundry';

class adminHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blockno:"",
            roomno:"",
            
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
            <View style={styles.rule}>
                <View>
                    <Text>Enter Your Block Number :</Text>
                    <TextInput
                        onChangeText={(blockno) => this.setState({ blockno })}
                        value={this.state.blockno}
                        placeholder={"Block Number"}
                    />
                </View>

                <TabApp />
            </View>

        );
    }
}
export default adminHome;
const styles = StyleSheet.create({
    rule: {
        flex: 1
    },
})

