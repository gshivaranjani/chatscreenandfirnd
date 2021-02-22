import { Alert, StyleSheet, Text, TextInput, View,TouchableOpacity } from 'react-native';
import React,{Component} from 'react';
import {Input} from "react-native-elements";
import firebase from 'firebase';
import db from '../config';


export default class chatScreen extends Component {
    constructor() {
        super();
        this.state = {
            fromId : firebase.auth().currentUser.email,
            toId : "",
            msg: ""
        }
    }

  
    render() {
        return(
                <View style={{ alignItems: "center",flex:1,marginTop:60 }}>
                {console.log("-------   inside chat screen -------------")}
               
               { console.log(this.props.navigation.getParam('myFriend')) }
                <Text style={{fontSize:20}}>Send Message</Text>
                <TextInput
                style={styles.formTextInput}
                label={"Name"}
                placeholder={this.props.navigation.getParam('myFriend')}
                containerStyle={{ marginTop: 60 }}
                onChangeText={(text) => {
                    this.setState({
                      toId: text,
                    });
                  }}
                value={this.state.toId}
            />
              <TextInput
              style ={[styles.formTextInput,{height:300}]}
                containerStyle={{ marginTop: 30 }}
                multiline
                numberOfLines={8}
                label={"Message"}
                placeholder={"Type your Msg"}
                onChangeText={(text) => {
                  this.setState({
                    msg: text,
                  });
                }}
                value={this.state.msg}
              />
              <TouchableOpacity
                style={[styles.button, { marginTop: 30 }]}
                onPress={() => {
                  
                }}
              >
                <Text
                  style={styles.requestbuttontxt}
                >
                  Send
                </Text>
              </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    keyBoardStyle: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10,
      },
    ImageView:{
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center",
      marginTop:20
    },
  
    bookstatus:{
      flex: 0.4,
      alignItems: "center",
  
    },
   
    
    buttonView:{
      flex: 0.2,
      justifyContent: "center",
      alignItems: "center",
    },
    buttontxt:{
      fontSize: 18,
      fontWeight: "bold",
      color: "#fff",
    },
    touchableopacity:{
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10,
      width: "90%",
    },
    requestbuttontxt:{
      fontSize: 20,
      fontWeight: "bold",
      color: "#fff",
    },
    button: {
      width: "75%",
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
      backgroundColor: "#32867d",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
    },
  });