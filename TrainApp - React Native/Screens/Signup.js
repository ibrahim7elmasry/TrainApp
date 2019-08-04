import React, { Component } from 'react';
import {
     View,
     TextInput,
     StyleSheet,
     TouchableOpacity,
     Text,
     KeyboardAvoidingView,
     ScrollView,
     SafeAreaView,
     ToastAndroid,
     Alert

} from 'react-native';
import Colors from '../colors';

export default class SignUp extends React.Component {

     static navigationOptions = {
          title: 'حساب جديد',
          headerStyle: {
               backgroundColor: Colors.headerColor.color,
          },
          headerTintColor: 'white',
          headerTitleStyle: {
               fontWeight: 'bold',
               alignSelf: 'center',
               textAlign: "center",
               flex: 1,
               paddingRight: 40,
          },

     };

     state = 
     {
          username: '', 
          password: '',
          confirmPassword:'',
          email: '',
          phone_number: '',

          passwordValid: false,
          confirmPassValid: false,
          emailValid: false,
          phoneValid: false,

          userValidNo: 0,
     }

     onChangeText = (key, val) => {
          this.setState({ [key]: val })
     }

     signUp = () => 
     {    
      
          if(this.state.userValidNo == 4)
          {
               let user = JSON.stringify(
                    {
                         Username: this.state.username,
                         pass: this.state.password,
                         email: this.state.email,
                         phone: this.state.phone_number
                    });
              

               let url = 'http://localhost:5567/api/signup';
               fetch(url,
                    {
                         method: 'POST', // or 'PUT'
                         body: user,
                         headers: ({
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                         })
                    })
                    .then(res => res.json())
                    .then(response => {
                         
                         ToastAndroid.showWithGravity(
                              'تمت إضافة حسابك بنجاح',
                              ToastAndroid.SHORT,
                              ToastAndroid.BOTTOM,
                         );
                         this.props.navigation.navigate('login');
                    })
                    .catch(error => console.error('Failure signing up ::', error));
          }
          
          else
          {
               Alert.alert(
                    ' ', // alert title
                    'البيانات التي أدخلتها غير صحيحة، يرجى التأكد منها واعادة المحاولة', // alert message
                    [
                         {
                              text: 'حسنا'
                         }
                    ],
                    { cancelable: true },
               );
          }
     
     }//end of signup





     // validate user input
     validate(text, type)
     {
           

          if (type == 'password') {
               passRegex = /^[a - zA - Z0-9]\w{8,}$/;
               if (passRegex.test(text)) {
                    this.setState({ passwordValid: true, userValidNo: this.state.userValidNo+1 });
                   
                    
               }
               else {
                    Alert.alert(
                         ' ', // alert title
                         'يجب أن لا تقل كلمة المرور عن ثمانية احرف باللغة الانجليزية، من فضلك حاول مرة أخرى', // alert message
                         [
                              {
                                   text: 'حسنا'
                              }
                         ],
                         { cancelable: true },
                    );
               }
          }

          else if (type == 'confirmPassword') {

               if (this.state.confirmPassword.localeCompare(this.state.password) == 0) {
                    this.setState({ confirmPassValid: true, userValidNo: this.state.userValidNo + 1 });
                   
                  
               }
               else {
                    Alert.alert(
                         ' ', // alert title
                         'تأكيد كلمة المرور لا تتطابق مع كلمة المرور، من فضلك حاول مرة أخرى', // alert message
                         [
                              {
                                   text: 'حسنا'
                              }
                         ],
                         { cancelable: true },
                    );
               }
          }


          else if (type == 'email') {
               emailRegex = /^[a-z0-9]{3,}@(gmail|yahoo|outlook)\.(com|net|org)$/ig;
               if (emailRegex.test(text)) {
                    this.setState({ emailValid: true, userValidNo: this.state.userValidNo + 1  });
                    
                 
               }
               else {
                    Alert.alert(
                         ' ', // alert title
                         'صيغة البريد الالكتروني خاطئة، من فضلك حاول مرة أخرى', // alert message
                         [
                              {
                                   text: 'حسنا'
                              }
                         ],
                         { cancelable: true },
                    );
               }
          }

          else //(type == 'phone_number') 
          {
               phoneRegex = /(01)[0-9]{9}/g;
               if (phoneRegex.test(text)) {
                    this.setState({ phoneValid: true, userValidNo: this.state.userValidNo + 1 });
                   
                   
               }
               else 
               {
                    Alert.alert(
                         ' ', // alert title
                         'يجب أن لا يقل ولا يزيد رقم الهاتف عن 11 رقم، من فضلك حاول مرة أخرى', // alert message
                         [
                              {
                                   text: 'حسنا'
                              }
                         ],
                         { cancelable: true },
                    );
               }


          }

     }   //end of validate

     render() {

          return (
               <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView behavior='padding' enabled>
                         <View>
                        

                              <ScrollView>
                                   <TextInput
                                        style={styles.input}
                                        placeholder='اسم المستخدم'
                                        autoCapitalize="none"
                                        placeholderTextColor='#BFBFBF'
                                        value = {this.state.username}
                                        onChangeText={val => this.onChangeText('username', val)}
                                       
                                        

                                   />
                                   <TextInput
                                        style={styles.input}
                                        placeholder='كلمة المرور'
                                        secureTextEntry={true}
                                        autoCapitalize="none"
                                        placeholderTextColor='#BFBFBF'
                                        value={this.state.password}
                                        onChangeText={val => this.onChangeText('password', val)}
                                        onEndEditing={(e) => this.validate(e.nativeEvent.text, 'password')}
                                   />

                                   <TextInput
                                        style={styles.input}
                                        placeholder='تأكيد كلمة المرور'
                                        secureTextEntry={true}
                                        autoCapitalize="none"
                                        placeholderTextColor='#BFBFBF'
                                        value={this.state.confirmPassword}
                                        onChangeText={val => this.onChangeText('confirmPassword', val)}
                                        onEndEditing={(e) => this.validate(e.nativeEvent.text, 'confirmPassword')}
                                   />

                                   <TextInput
                                        style={styles.input}
                                        placeholder='البريد الاليكتروني'
                                        autoCapitalize="none"
                                        placeholderTextColor='#BFBFBF'
                                        value={this.state.email}
                                        onChangeText={val => this.onChangeText('email', val)}
                                        onEndEditing={(e) => this.validate(e.nativeEvent.text, 'email')}
                                   />
                                   <TextInput
                                        style={styles.input}
                                        placeholder='رقم الهاتف'
                                        autoCapitalize="none"
                                        placeholderTextColor='#BFBFBF'
                                        keyboardType='numeric'
                                        value = {this.state.phone_number}
                                        onChangeText={val => this.onChangeText('phone_number', val)}
                                        onEndEditing={(e) => this.validate(e.nativeEvent.text, 'phone_number')}
                                   />

                                   <TouchableOpacity onPress={this.signUp}>
                                        <Text style={styles.TouchableOpacity}>إنشاء حساب</Text>
                                   </TouchableOpacity>
                              </ScrollView>

                         </View>
                    </KeyboardAvoidingView>

               </SafeAreaView>
          )
     }
}

const styles = StyleSheet.create({
     input: {
          width: 300,
          height: 55,
          margin: 10,
          padding: 8,
          color: 'black',
          borderBottomWidth: 1,
          borderBottomColor: '#79a8a9',
          fontSize: 17,
          textAlign: 'right',

     },
     container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.contentColor.color,
           marginTop: 30,
     },
     TouchableOpacity: {
          backgroundColor: Colors.buttonsColor.color,
          color: Colors.inputColor.color,
          borderColor: 'white',
          borderWidth: 1,
          borderRadius: 10,
          fontSize: 18,
          overflow: 'hidden',
          padding: 10,
          textAlign: 'center',
          width: 300,
          marginTop: 30,
          marginLeft: 10,
     },
})