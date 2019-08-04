import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    SafeAreaView,
    Alert,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    ToastAndroid,

} from 'react-native';
import Colors from '../colors';


export default class Login extends Component {
    state =
        {
            loginPassword: '', // entered password
            user: '', // entered username
            userObj: {},
            users: [], // the list of users from the DB
            userExist: false, // does the user exist in DB?

        }

    //handle login 
    LoginHandler = () => {
      
        var url = 'http://localhost:5567/api/Login';
        fetch(url) // get the list of users
            .then(response => response.json())
            .then(users => {
                this.setState({ users });
                
            }
            )
            .then(() => {
                //check if the user exists in the list of users
                this.state.users.forEach((item) => {
                    
                    if (this.state.user.localeCompare(item.Username) == 0
                        && this.state.loginPassword.localeCompare(item.pass) == 0) {
                        this.setState({ userExist: true });
                        this.setState({ userObj: item });
                        
                        return;
                    }
                });
            })
            .then(() => {
                // handle if the user exists or not
                if (this.state.userExist == true) {
                    ToastAndroid.showWithGravity(
                        'تم تسجيل الدخول بنجاح',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                    );


                    this.props.navigation.navigate('trainList', { user: this.state.userObj });
                }
                else {
                    Alert.alert(
                        ' ', // alert title
                        'اسم المستخدم أو كلمة المرور غير صحيحة، من فضلك حاول مرة أخرى', // alert message
                        [
                            {
                                text: 'حسنا'//, onPress: () => console.log('Ask me later pressed') 
                            },
                        ],
                        { cancelable: true },
                    );
                }
            })
            .catch(error => console.error('Error occured :: ', error));
    }


    //Navigation options for the stack navigator
    static navigationOptions =
        {
            title: 'تسجيل الدخول',

            headerStyle: {
                backgroundColor: Colors.headerColor.color,
            },

            headerTintColor: 'white',

            headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center',
                textAlign: "center",
                flex: 1,
            },
            headerLeft: null,

        };

    render() {
        return (

            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView behavior='position'>
                    <TextInput
                        placeholder='اسم المستخدم'
                        placeholderTextColor='#BFBFBF'
                        style={styles.inputs}
                        value={this.state.user}
                        onChangeText={(text) => {
                            this.setState({ user: text })
                        }
                        }
                    />

                    <TextInput
                        placeholder='كلمة المرور'
                        placeholderTextColor='#BFBFBF'
                        style={styles.inputs}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({ loginPassword: text })
                        }
                        }
                    />
                </KeyboardAvoidingView>

                <SafeAreaView style={styles.TouchableOpacityContainer}>
                    <TouchableOpacity
                        onPress={this.LoginHandler}
                    >
                        <Text style={styles.TouchableOpacity}> تسجيل الدخول </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('signup');
                        }}
                    >
                        <Text style={styles.TouchableOpacity}> حساب جديد </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('about');
                        }}
                    >
                        <Text style={styles.TouchableOpacity1}> عن البرنامج   </Text>
                    </TouchableOpacity>

                </SafeAreaView>
            </SafeAreaView>
        );
    }
}

const styles =
    StyleSheet.create(
        {
            container: {
                flex: 1,
                justifyContent: 'center',
                fontSize: 17,
                backgroundColor: Colors.inputColor.color,
                color: Colors.inputColor.color,
            },
            inputs: {
                width: '85%',
                padding: 10,
                margin: 20,
                marginLeft: 25,
                marginBottom: 15,
                borderBottomWidth: 2,
                borderRadius: 20,
                borderBottomColor: '#79a8a9',
                color: 'black',
                fontSize: 17,
                textAlign: 'right',
            },
            TouchableOpacity: {
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                alignContent: 'center',
                textAlign: 'center',
                borderColor: 'white',
                borderWidth: 1,
                borderRadius: 10,
                fontSize: 18,
                width: 300,
                padding: 10,
                marginLeft: 30,
                marginTop: 40,
                backgroundColor: Colors.buttonsColor.color,
                color: Colors.inputColor.color,
            },
            TouchableOpacity1: {
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                alignContent: 'center',
                textAlign: 'center',


                borderRadius: 10,
                fontSize: 20,
                width: 100,
                height: 50,
                padding: 5,
                marginLeft: 130,
                marginTop: 130,
                backgroundColor: Colors.inputColor.color,
                color: Colors.buttonsColor.color,
            }
        }
    );
