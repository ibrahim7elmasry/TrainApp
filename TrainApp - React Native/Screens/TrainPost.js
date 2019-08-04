import {
    ScrollView,
    TouchableOpacity,
    View,
    StyleSheet,
    TextInput,
    Text,
    FlatList,
    KeyboardAvoidingView,
    ToastAndroid

} from 'react-native';
import React, { Component } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../colors';



export default class TrainPost extends Component {

    static navigationOptions =
        {
            title: 'معلومات القطار',

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

    
    constructor (props) 
    {
        super(props);

        this.getPostComments = this.getPostComments.bind(this);
        this.submitComment = this.submitComment.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }
    
    state = 
    {
        postText: '' ,
        postID: '',
        user: {},
        users: [],
        fetchedComments: [],
        enteredComment: '',
        commentsAfterCommenting: [],
        refresh: false,
    }
    

    getPostComments=() => 
    { 
       
        let URL = 'http://localhost:5567/api/getPostComments'.concat(this.state.postID);
        fetch(URL)
        .then(response => response.json())
        .then(comments => { this.setState({ fetchedComments: comments })})
        .catch(error => console.error('Error fetching post comments :: ', error));

    }

    submitComment = () => 
    {
        
        let allComments = [];
        let CFU = JSON.stringify({
            text: this.state.enteredComment,
            timeNow: '2020-03-04T00:00:00',
            PostID: this.state.postID,
            UserID: this.state.user.ID
        });

      
        // alert(CFU);
        let URL = 'http://localhost:5567/api/CommentsOnTrains';
        fetch(URL, 
            {
                method: 'POST',
                body: CFU,  
                headers: {
                    Accept : 'application/json',
                    'Content-Type': 'application/json',
                }           
            })
        .then( response => response.json())
        .then((res) => 
            {
                ToastAndroid.showWithGravity(
                    'تمت إضافة التعليق بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
                
                this.getPostComments();
                this.setState({enteredComment : ''});
            })
        .catch(error => 
            {
                console.error('Error adding a comment :: ', error);
                ToastAndroid.showWithGravity(
                    'حدث خطأ أثناء إرسال التعليق',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            })
        
    }


    getUsers = () =>
    {
        var url = 'http://localhost:5567/api/Login';
        fetch(url)
            .then(response => response.json())
            .then(users => {
                this.setState({ users });
               
            })
            .catch(error => console.error('Error fetching post comments :: ', error));
    }


    getUsername = (ID)=>
    {
        let username = '';
        for(let i =0; i<this.state.users.length; i++)
        {
            this.state.users[i].ID == ID ? username = this.state.users[i].Username : username = username; 
        }
        return username;
    }


    render = () =>
    {
      

        const navParams = this.props.navigation.state.params;

        return (

            <KeyboardAvoidingView behavior='padding' enabled style={styles.container}>
                
                {/* Show the post information */}
                
                <View
                    style={styles.post}
                    onLayout = {()=>
                    {
                        this.setState({
                            postText : navParams.postText, 
                            postID : navParams.postID,
                            user : navParams.user,
                        });

                        
                    }}
                >

                    <Text> 
                        {/* رقم البوست :   {navParams.postID} */}
                        رقم البوست :   {this.state.postID}
                    </Text>
       
                    <Text>                              </Text>
                    
                    <Text>
                        {this.state.postText}
                    </Text>
                    
                    <Text onLayout={this.getUsers}>                                
                    </Text>
                
                </View>


                <ScrollView
                    style={styles.commentsView}
                    ref={ref => this.scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight) => 
                    {
                        this.scrollView.scrollToEnd({ animated: true });
                    }}
                >
                    <FlatList
                        onLayout = {this.getPostComments}
                        data={this.state.fetchedComments}
                        extraData = {this.state}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <View
                                    style={{

                                         
                                        borderColor: 'white',
                                        margin: 10,
                                        marginBottom:15,
                                        borderRadius :30,
                                        borderWidth:1,
                                        backgroundColor:'#eee',
                                        padding:10,
                                    }}
                                >
                                    

                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            padding: 5,
                                        }}
                                    >
                                        {this.getUsername(item.UserID)}

                                    </Text>

                                    <Text
                                        style={{
                                            paddingLeft: 15,
                                        }}
                                    >
                                        {item.text}

                                    </Text>
                                </View>
                            )
                        }}
                    />

                </ScrollView>
                

                <KeyboardAvoidingView
                    style={{

                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        // borderTopWidth: 1,
                        borderRadius: 8,
                        backgroundColor: '#eee',



                    }}
                    behavior = 'padding'
                >
                    <TextInput
                        placeholder='Write a comment'
                        autoGrow={true}
                        maxHeight={60}
                        maxLength={250}
                        dataDetectorTypes='all'
                        enablesReturnKeyAutomatically={true}
                        style={styles.writeComment}
                        value = {this.state.enteredComment}
                        onChangeText = {(text)=>{this.setState({enteredComment: text})}}
                    />
                    <TouchableOpacity
                  
                        onPress={this.submitComment}
                    >
                        <Ionicons
                            name="md-send"
                            size={35}
                            color="#00adff"
                        />
                    </TouchableOpacity>

                </KeyboardAvoidingView>

            </KeyboardAvoidingView>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    post:{
        width: '97%',
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 15,
        margin: 5,
        padding: 5,

    },

    commentsView: {
        width: '97%',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        padding: 7,
        marginLeft: 5,
        backgroundColor: 'white',
        marginBottom :10,

    },

    writeComment:{
        minWidth: '80%',
        borderColor: Colors.headerColor.color,
        width: '85%',
        marginBottom: 15,
        padding: 5,
        fontSize: 16,
        borderRadius:15,
        // backgroundColor :'#eee',
        // borderRadius: 8,
        // borderTopWidth :1,
        // borderBottomWidth: 1,
        // borderLeftWidth :1,

 
    },

    

});
