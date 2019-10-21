import React, { useState } from 'react';
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, StyleSheet,} from 'react-native';
import { Button } from 'react-native-elements';
import * as Google from 'expo-google-app-auth';
import Modal from "react-native-modal";

class customerLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            blockno: "",
            roomno: "",
            phoneno: " ",
            result: {}
        }
    }


    getRoomBlock = (visible) => {
        console.log("room");
        console.log(visible)
        this.setState({ modalVisible: visible });
        console.log(this.state.modalVisible);
    }


    async googleAuth() {
        try {

            const result = {
                type:'success',
                user: {
                    name: "manan poddar",
                    id: "107682254345676540759",
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
        console.log("admin login")
        this.props.navigation.navigate('adminHome');
    }

    customerLogin() {
        console.log(this.state.roomno);
        console.log(this.state.blockno);
        console.log(this.state.result);
        var authApiResult = this.state.result.user;
        console.log(authApiResult);
        var customerData = {
            roomNo: this.state.roomno,
            blockNo: this.state.blockno,
            phoneNo: this.state.phoneno,
            name: authApiResult.name,
            id: authApiResult.id,
            email: authApiResult.email,
            profile: authApiResult.profile
        }
        console.log(customerData);
        // this.state.modalVisible = false;
        // this.props.navigator.dismissAllModals();
        this.setState({ModalVisible: false}, () => this.props.navigation.navigate('customerHome',customerData));
        console.log(this.modalVisible);
        // this.props.navigation.navigate('customerHome', customerData);

    }


    render() {



        console.log(this.props);
        return (

            <KeyboardAvoidingView style={styles.containerView} behavior="padding">

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.loginScreenContainer}>
                        <View style={styles.loginFormView}>
                            <Text style={styles.logoText}>Central Laundry NITK</Text>


                            <Modal animationType={"slide"} transparent={true}
                                isVisible={this.state.modalVisible}
                                onNavigate={this.customerLogin}
                                >

                                <View style={styles.modalContainer}>
                                    <View style={styles.innerContainer}>
                                        <Text>Enter Your Block Number :</Text>
                                        <TextInput
                                            onChangeText={(blockno) => this.setState({ blockno })}
                                            value={this.state.blockno}
                                            placeholder={"Block Number"}
                                        />

                                        <Text>Enter Your Block Number :</Text>

                                        <TextInput
                                            onChangeText={(roomno) => this.setState({ roomno })}
                                            value={this.state.roomno}
                                            placeholder={"Room Number"}
                                        />


                                        <Text>Enter Your Phone Number :</Text>

                                        <TextInput
                                            onChangeText={(phoneno) => this.setState({ phoneno })}
                                            value={this.state.phoneno}
                                            placeholder={"Phone Number"}
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
        justifyContent: "center"
    },
    containerView: {
        flex: 1,
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
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerContainer: {
        alignItems: 'center',
    },
})

export default customerLogin;


