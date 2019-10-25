import React, { useState } from 'react';
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, StyleSheet, } from 'react-native';
import { Button } from 'react-native-elements';
import * as Google from 'expo-google-app-auth';
import Modal from "react-native-modal";
import customerDetailService from '../_services/customer-details';
import { Dropdown } from 'react-native-material-dropdown';

class customerLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            blockno: "",
            roomno: "",
            phoneno: " ",
            result: {},
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
            }]
        }
    }


    getRoomBlock = (visible) => {
        this.setState({ modalVisible: visible });
    }


    async googleAuth() {
        try {

            const result = {
                type: 'success',
                user: {
                    name: "manan poddar",
                    key: "107682254345676540759",
                    email: "mananpoddarm@gmail.com",
                    profile: "https://lh3.googleusercontent.com/a-/AAuE7mDF2J8FGmLH7YQ1OXZRQNhGkSCAfJHKuufY4bKj"
                }
            }

            // const result = await Google.logInAsync({
            //     androidClientId: "824313572468-sufov0eccf83s3fdsdr2q97g794ill0s.apps.googleusercontent.com",
            //     scopes: ['profile', 'email'],
            // });

            if (result.type === 'success') {
                console.log(result);
                this.getRoomBlock(true);
                this.state.result = result;
                return result.accessToken;
            } else {
                console.log("not success");
                return { cancelled: true };
            }

        } catch (e) {
            console.log(e);
            return { error: true };
        }

    }

    adminLogin() {
        this.props.navigation.navigate('adminHome');
    }

    customerLogin() {
        var authApiResult = this.state.result.user;
        var customerData = {
            key: authApiResult.id,
            roomNo: this.state.roomno,
            blockNo: this.state.blockno,
            name: authApiResult.name,
            key: authApiResult.key,
            email: authApiResult.email,
            phoneNo: this.state.phoneno,
            profilePic: authApiResult.profile
        }
        console.log(customerData);


        customerDetailService.postCustomerDetails(customerData).then((res) => {
            console.log(res)
        }).catch((e) => {
            console.log(e);
        });

        this.setState({ modalVisible: false }, () => this.props.navigation.navigate('customerHome', customerData));


    }


    render() {

        return (

            <KeyboardAvoidingView style={styles.containerView} behavior="padding">

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.loginScreenContainer}>
                        <View style={styles.loginFormView}>
                            <Text style={styles.logoText}>Central Laundry NITK</Text>


                            <Modal animationType={"slide"} transparent={true} style={styles.modalContainer}
                                isVisible={this.state.modalVisible}
                                onNavigate={this.customerLogin}
                                onRequestClose={() => { this.setState({ modalVisible: false }); console.log("request") }}
                            >

                                <View style={styles.modalContainer}>
                                    <View>

                                        <Dropdown onChangeText={(blockno) => {
                                            this.setState({ blockno });
                                        }
                                        }
                                            label='Block'
                                            data={this.state.blockNoData}
                                        />
                                        <Dropdown onChangeText={(roomno) => {
                                            this.setState({ roomno });
                                        }
                                        }
                                            label='Room Number'
                                            data={this.state.roomNoData}
                                        />
                                        <Text>Enter Your Phone Number :</Text>

                                        <TextInput
                                            onChangeText={(phoneno) => this.setState({ phoneno })}
                                            value={this.state.phoneno}
                                            placeholder={'Phone Number'}
                                            keyboardType={'phone-pad'}
                                            style={styles.textInput}
                                        />


                                        <Button
                                            buttonStyle={styles.googleLoginButton}
                                            onPress={() => {
                                                console.log("google");
                                                this.customerLogin();
                                            }}
                                            title="Submit"
                                        />

                                    </View>


                                </View>

                            </Modal>



                            <Button
                                buttonStyle={styles.googleLoginButton}
                                onPress={() => {
                                    console.log("google");
                                    this.googleAuth();
                                }}
                                title="Login with google"
                            />
                            <Button
                                buttonStyle={styles.googleLoginButton}
                                onPress={() => {
                                    console.log("admin");
                                    this.adminLogin()
                                }}
                                title="admin login"
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    containerView: {
        flex: 1,
        padding: 20
    },
    loginScreenContainer: {
        flex: 1,
    },
    logoText: {
        fontSize: 40,
        fontWeight: "800",
        marginTop: 150,
        marginBottom: 30,
        textAlign: 'center',
    },
    googleLoginButton: {
        height: 45,
        marginTop: 10,
        backgroundColor: 'black',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        height:10,
        width:300
    },
    textInput:{
        height:40,
        borderColor:'white',
        borderBottomColor:'grey',
        borderWidth:1
    }
})

export default customerLogin;
