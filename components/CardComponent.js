import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Icon, Card, CardItem, Thumbnail, Body, Left, Right, Button } from 'native-base';

class CardComponent extends React.Component {

  render() {

     const images = {
        "1" : require('../assets/me.jpg'),
        "2" : require('../assets/me.jpg'),
        "3" : require('../assets/me.jpg'),
     }

    return (
      <Card>
         <CardItem>
            <Left>
               <Thumbnail source={require('../assets/me.jpg')} />
               <Body>
                  <Text> Ajat</Text>
                  <Text note> Jan 15, 2019</Text>
               </Body>
            </Left>
         </CardItem>
         <CardItem cardBody>
            <Image
                source={images[this.props.imageSource]}
                style={{height: 200, width: null, flex: 1}}
            />
         </CardItem>
         <CardItem style={{height: 45}}>
            <Left>
               <Button transparent>
                  <Icon
                     name="ios-heart-outline"
                     style={{color: "black"}}
                  />
               </Button>
               <Button transparent>
                  <Icon
                     name="ios-chatbubbles-outline"
                     style={{color: "black"}}
                  />
               </Button>
               <Button transparent>
                  <Icon
                     name="ios-send-outline"
                     style={{color: "black"}}
                  />
               </Button>
            </Left>
         </CardItem>
         <CardItem style={{height : 20}}>
            <Text>{this.props.likes} Likes</Text>
         </CardItem>
         <CardItem>
            <Body>
               <Text>
                  <Text style={{fontWeight: "900"}}>Ajat </Text>
                   Work until your idols become your rivals
               </Text>
            </Body>
         </CardItem>
      </Card>
    );
  }
}

export default CardComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
