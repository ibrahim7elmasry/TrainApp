import React, { Component } from 'react';
import { SafeAreaView, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import Colors from '../colors';

export default class ViewTrains extends Component {

    constructor(props)
    {
        super(props);

        this.getTrains = this.getTrains.bind(this);
    }

    static navigationOptions =
        {
            title: 'قائمة القطارات',

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
            allPosts: [],
            postTexts: [],
            postIDs: [],
            user: {},
        }

    getTrains () 
    {
        var url = 'http://localhost:5567/api/trainposts';
       
        fetch(url) // get the list of stations
            .then(response => response.json())
            .then(Posts => {
                this.setState({ allPosts: Posts });
                
            }
            )
            .then(() => {
                for (let i = 0; i < this.state.allPosts.length; i++) {
                    this.state.postTexts.push(this.state.allPosts[i].Text);
                    this.state.postIDs.push(this.state.allPosts[i].PostID);
                }

                
            })
            .catch(error => console.error('Error fetching train posts :: ', error));
       
    }



    render() {

        const x = this.props.navigation.state.params.user;


        return (
            <SafeAreaView
                onLayout={this.getTrains}
                style=
                {{
                    flex: .9,
                    width: 350,
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    paddingTop: 30,

                }}
            >


                <FlatList
                    onLayout={() => {
                        this.setState({ user: x });
                      
                    }}
                    data={this.state.postTexts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    //navigate to post and send data to the next screen
                                    this.props.navigation.navigate('trainPost',
                                        {
                                            postText: item,
                                            postID: this.state.postIDs[index],
                                            user: this.state.user
                                        });
                                }}
                                key={index.toString()}

                            >
                                <Text style={styles.textStyle}>
                                    {item}
                                </Text>

                            </TouchableOpacity>

                        )
                    }}
                />

            </SafeAreaView>

        );
    }
}


const styles = StyleSheet.create({
    textStyle:
    {
        backgroundColor: '#1f4e5f',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 7,
        color: 'white',
        fontSize: 16,
        overflow: 'hidden',
        padding: 10,
        textAlign: 'center',
        width: 340,
        marginBottom: 15,
        marginLeft: 8,
    }
});