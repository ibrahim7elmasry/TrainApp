import React, { Component } from 'react'
import { Text, FlatList, View } from 'react-native'

export default class HomeScreen extends Component {
    state = {
        todos: [],
        loading: false,
    }
    componentDidMount() {

        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: "GET"
        })
            .then(async response => {
                console.warn('succeed')
                if (response.ok) {
                    const todos = await response.json();
                    this.setState({ todos })
                }
            })
            .catch(() => {
                console.warn('error happend')
            })
    }
    render() {
        console.warn(this.state.todos)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                    data={this.state.todos}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return <Text>{item.title}</Text>
                    }}
                />
            </View>
        )
    }
}
