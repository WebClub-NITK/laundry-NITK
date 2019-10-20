import React, { useState } from 'react';
import { Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import * as Google from 'expo-google-app-auth';

const loginScreen = props => {


    async function signIn() {
        console.log("here");
        try {
            const result = await Google.logInAsync({
                androidClientId: "824313572468-sufov0eccf83s3fdsdr2q97g794ill0s.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                console.log(result);
                props.navigation.navigate('customerHome',result);
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

    async function adminLogin(){
        props.navigation.navigate('adminHome');
    }
    console.log(props); 
    return (

        <KeyboardAvoidingView style={styles.containerView} behavior="padding">

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.loginScreenContainer}>
                    <View style={styles.loginFormView}>
                        <Text style={styles.logoText}>Central Laundry NITK</Text>
                        <Button
                            buttonStyle={styles.googleLoginButton}
                            onPress={() => signIn()}
                            title="Login with Google"
                        />
                        <Button
                            buttonStyle={styles.googleLoginButton}
                            onPress={() => adminLogin()}
                            title="admin login"
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
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
})

export default loginScreen;


