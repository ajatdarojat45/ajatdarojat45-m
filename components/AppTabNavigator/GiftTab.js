import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, Linking } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Card, CardItem, Content, Thumbnail, H1, H2, H3 } from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import HTML from 'react-native-render-html';

class GiftTab extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         gifts: [],
      }
   }

   componentDidMount = () => {
      axios.get('https://ajatdarojat45.id/api/mobile/getGiftsActive')
      .then((response) => {
         this.setState({
            gifts: response.data
         })
      })
      .catch((error) => {
         console.log(error)
      })
   }

   static navigationOptions = {
      tabBarIcon: ({tintColor}) => (
         <Icon name="ios-rose" style={{color: tintColor}}/>
      )
   }

   handleOpenURL(url){
      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          console.log('Can\'t handle url: ' + url);
        } else {
          return Linking.openURL(url);
        }
      }).catch(err => console.error('An error occurred', err));
   }

  render() {
    return (
      <Container>
         <Header>
            <Body style={{alignItems: 'center'}}><Text style={{fontWeight: 'bold', fontSize: 20, paddingTop: 10, color: '#000'}}><Icon name="ios-rose" style={{fontSize: 20, color: '#000'}}/> Gift</Text></Body>
         </Header>
         <Content>
            { this.state.gifts.map((gift, index) =>
               {
                  return (
                     <Card key={index}>
                       <CardItem>
                         <Left>
                           <Icon name="ios-rose-outline" style={{fontSize: 50, color: '#636b6f'}}/>
                           <Body>
                             <Text
                                style={{fontWeight: 'bold', fontSize: 20, color: '#636b6f'}}
                                onPress={() => this.handleOpenURL(gift.link)}
                              >
                               {gift.name}
                            </Text>
                            <HTML html={gift.content} imagesMaxWidth={Dimensions.get('window').width} />
                           </Body>
                         </Left>
                       </CardItem>
                       <CardItem>
                          <Left>
                          </Left>
                          <Right>
                            <Text style={{color: '#636b6f'}}>{gift.created_at.substr(0, 10)}</Text>
                          </Right>
                        </CardItem>
                    </Card>
                  )
               })
            }
         </Content>
      </Container>
    );
  }
}

export default GiftTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
