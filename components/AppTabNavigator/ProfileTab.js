import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Icon, Container, Content, Thumbnail, Header, Left, Right, Body, Button } from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import CardComponent from '../CardComponent';

var images = [
   require('../../assets/me.jpg'),
   require('../../assets/me.jpg'),
   require('../../assets/me.jpg'),
   require('../../assets/me.jpg'),
   require('../../assets/me.jpg'),
   require('../../assets/me.jpg'),
   require('../../assets/me.jpg'),
   require('../../assets/me.jpg'),
   require('../../assets/me.jpg'),
   require('../../assets/me.jpg'),
   require('../../assets/me.jpg'),
   require('../../assets/me.jpg'),
]

var {width, height} = Dimensions.get('window')

class ProfileTab extends React.Component {

   static navigationOptions = {
      tabBarIcon: ({tintColor}) => (
         <Icon name="person" style={{color: tintColor}}/>
      )
   }

   constructor(props){
      super(props)
      this.state = {
         activeIndex: 0
      }
   }

   segmentClicked = (index) => {
      this.setState({
         activeIndex: index
      });
   }

   renderSectionOne = () => {
      return images.map((image, index) => {
         return (
            <View
               key={index}
               style={[ {width: (width) / 3}, {height: (width) / 3}, {marginBottom: 2}, index % 3 !== 0 ? {paddingLeft: 2} : {paddingLeft: 0}]}
            >
               <Image
                  style={{flex: 1, width: undefined, height: undefined}}
                  source={image}
               />
            </View>
         )
      })
   }

   renderSection = () => {
      if(this.state.activeIndex == 0) {
         return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
               {this.renderSectionOne()}
            </View>
         )
      }else if (this.state.activeIndex == 1) {
         return (
            <View>
               <CardComponent imageSource="1" likes="100"></CardComponent>
               <CardComponent imageSource="2" likes="100"></CardComponent>
               <CardComponent imageSource="3" likes="100"></CardComponent>
            </View>
         )
      }
   }

  render() {
    return (
      <Container style={{flex: 1, backgroundColor: 'white'}}>
         <Header>
            <Left><Icon name="md-person-add" style={{paddingLeft: 10}}></Icon></Left>
            <Body><Text>ajatdarojat45</Text></Body>
            <Right><EntypoIcon name="back-in-time" style={{paddingRight: 10, fontSize: 32 }}></EntypoIcon></Right>
         </Header>
         <Content>
            <View style={{paddingTop: 10}}>
               <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1, alignItems: 'center'}}>
                     <Image
                        source={require('../../assets/me.jpg')}
                        style={{width: 75, height: 75, borderRadius: 37.5}}
                     />
                  </View>
                  <View style={{flex: 3}}>
                     <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
                     <View style={{alignItems: 'center'}}>
                        <Text>20</Text>
                        <Text style={{fontSize: 10, color: 'grey'}}>Post</Text>
                     </View>
                     <View style={{alignItems: 'center'}}>
                        <Text>20</Text>
                        <Text style={{fontSize: 10, color: 'grey'}}>Followers</Text>
                     </View>
                     <View style={{alignItems: 'center'}}>
                        <Text>20</Text>
                        <Text style={{fontSize: 10, color: 'grey'}}>Following</Text>
                     </View>
                  </View>

                     <View style={{flexDirection: 'row', paddingTop: 10}}>
                     <Button
                        bordered dark
                        style={{flex: 3, marginLeft: 10, justifyContent: 'center', height: 30}}
                     >
                        <Text>Edit Profile</Text>
                     </Button>
                     <Button
                        bordered dark
                        style={{flex: 1, marginRight: 10, marginLeft: 5, justifyContent: 'center', height: 30}}
                     >
                        <Icon name="settings"/>
                     </Button>
                  </View>
                  </View>
               </View>
               <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
                  <Text style={{fontWeight: 'bold'}}>Ajat Darojat</Text>
                  <Text>IT Ethusias | Hamba Allah</Text>
                  <Text>ajatdarojat45.id/</Text>
               </View>
            </View>

            <View>
               <View style={{flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#eae5e5'}}>
                  <Button
                     transparent
                     onPress={() => this.segmentClicked(0)}
                     active={this.state.activeIndex == 0}
                  >
                     <Icon name="ios-apps-outline"
                        style={[this.state.activeIndex == 0 ? {} : {color: 'grey'} ]}
                     />
                  </Button>
                  <Button
                     transparent
                     onPress={() => this.segmentClicked(1)}
                     active={this.state.activeIndex == 1}
                  >
                     <Icon name="ios-list-outline"
                        style={[this.state.activeIndex == 1 ? {} : {color: 'grey'} ]}
                     />
                  </Button>
                  <Button
                     transparent
                     onPress={() => this.segmentClicked(2)}
                     active={this.state.activeIndex == 2}
                  >
                     <Icon name="ios-people-outline"
                        style={[this.state.activeIndex == 2 ? {} : {color: 'grey'} ]}
                     />
                  </Button>
                  <Button
                     transparent
                     onPress={() => this.segmentClicked(3)}
                     active={this.state.activeIndex == 3}
                  >
                     <Icon name="ios-bookmark-outline"
                        style={[this.state.activeIndex == 3 ? {} : {color: 'grey'} ]}
                     />
                  </Button>
               </View>

               {this.renderSection()}
            </View>
         </Content>
      </Container>
    );
  }
}

export default ProfileTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
