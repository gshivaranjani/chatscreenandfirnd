import React, { Component} from 'react';
import {StyleSheet, View, Text,TouchableOpacity,FlatList} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { DrawerItems} from 'react-navigation-drawer'

import firebase from 'firebase';
import db from '../config';
import { Alert } from 'react-native';

export default class FrendsList extends Component {
    constructor() {
        super();
        this.state = {
            friendsList : []
        }
        this.firendsRef = null
    }

    getFriendsList = () => {
        console.log("11111111111111111111111111111111");
        console.log(firebase.auth().currentUser.email);
        console.log("_____________________________________________");
        this.requestRef = db.collection("friends")
        .where("myId", "==", firebase.auth().currentUser.email)
        .onSnapshot((snapshot)=>{
            var allFriends =  [];
            snapshot.docs.map((doc) =>{
                var friend = doc.data()
                friend["doc_id"] = doc.id
                allFriends.push(friend)
            });

            this.setState({
                friendsList : allFriends
            });
        })

        console.log("Finished");
    }

    componentDidMount() {
        this.getFriendsList();

    }

    componentWillUnmount() {
        this.firendsRef();
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({item,i}) =>{
        return (
            // <ListItem key={i} bottomDivider>
            //     <ListItem.Content 
            //         title = {item.friend}
            //         subtitle={"Send Message"}
            //         leftElemet={<Icon name="book" type="font-awesome" color='#696969' />}
            //         titleStyle = {{color:'black', fontWeight: 'bold'}}
            //         rightElement = {
            //             <TouchableOpacity style={styles.button}>
            //                 <Text style={{color : '#ffff'}}>Send Message</Text>
            //             </TouchableOpacity>
            //         }
            //     />
            // </ListItem>

            <ListItem key={i} bottomDivider>
           <ListItem.Content>
           
              <ListItem.Title>{item.friend}</ListItem.Title>
              {console.log(item.friend)}
              <ListItem.Subtitle>{"Say hi"}</ListItem.Subtitle>
              <View>
                <TouchableOpacity style={styles.button} 
                  onPress = {()=>{
                           var x = item.friend;
                           console.log("---------1111---------       >"+x);
                            this.props.navigation.navigate('ChatScreen', {'myFriend' : x})
                              Alert.alert("Sending message to " );
                            }}
                >
                  <Text style={{color:'#ffff', fontSize:10}}>Send Message</Text>
                </TouchableOpacity>
              </View>

           </ListItem.Content>
          

      </ListItem>
        )
   }
    
    render() {
        return(
            // <View style={{flex:1}}>
            //     <Text style={{fontSize:20, marginTop:30}}>friends list</Text>
            // </View>


            <View style={styles.container}>
            <Text>Hello
            </Text>
            {console.log(this.state.friendsList)}
                <View style={{flex:1.0}}>
                    {
                        this.state.friendsList.length === 0
                        ?(
                            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                                <Text style={{fontSize:25}}>You have no Friends</Text>
                            </View>
                        )
                        :(
                            <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.friendsList}
                            renderItem={this.renderItem}
                          />
                        )
                    }
                </View>
            </View>
        ) 
    }
}


const styles = StyleSheet.create({
    container :{
        flex : 1,
        marginTop : 30
    },
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    }
  })