import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Card, CardItem, Content, Thumbnail, H1, H2, H3 } from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import HTML from 'react-native-render-html';

class PodcastTab extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         podcasts: [],
         name: '',
         description: '',
         date: '',
         embed: '',
         visitor: '',
         podcastDetail: false
      }
   }

   componentDidMount = () => {
      axios.get('https://ajatdarojat45.id/api/mobile/getPodcastsActive')
      .then((response) => {
         this.setState({
            podcasts: response.data
         })
      })
      .catch((error) => {
         console.log(error)
      })
   }

   static navigationOptions = {
      tabBarIcon: ({tintColor}) => (
         <Icon name="ios-microphone" style={{color: tintColor}}/>
      )
   }

   handlePodcastDetail(podcast){
      axios.get('https://ajatdarojat45.id/api/mobile/getPodcast/'+podcast.slug)
      .then((response) => {
         this.setState({
            podcastDetail: !this.state.podcastDetail,
            name: response.data.name,
            description: response.data.description,
            embed: response.data.embed,
            visitor: response.data.visitor,
            date: response.data.created_at,
         })
      })
      .catch((error) => {
         console.log(error)
      })
   }

   handleBack(){
      this.setState({
         podcastDetail: !this.state.podcastDetail
      })
   }

  render() {
    return (
      <Container>
         <Header>
            {this.state.podcastDetail ?
               <Left>
                  <Icon name="md-arrow-back" style={{paddingTop:10}} onPress={() => this.handleBack()}></Icon>
               </Left>
               : null
            }
            <Body><Text style={{fontWeight: 'bold', fontSize: 20, paddingTop: 10, color: '#000'}}><Icon name="ios-microphone" style={{fontSize: 20, color: '#000'}}/> Podcast</Text></Body>
         </Header>
         <Content>
            {!this.state.podcastDetail ?
               this.state.podcasts.map((podcast, index) =>
               {
                  return (
                     <Card key={index}>
                       <CardItem>
                         <Left>
                           <Icon name="ios-microphone-outline" style={{fontSize: 50, color: '#636b6f'}}/>
                           <Body>
                             <Text
                                style={{fontWeight: 'bold', fontSize: 20, color: '#636b6f'}}
                                onPress={() => this.handlePodcastDetail(podcast)}
                              >{podcast.name}</Text>
                              <ScrollView style={{ flex: 1}}>
                                  <HTML style={{color: '#636b6f'}} html={podcast.description.substr(0, 50)+'...'} imagesMaxWidth={Dimensions.get('window').width} />
                              </ScrollView>
                           </Body>
                         </Left>
                       </CardItem>
                       <CardItem>
                          <Left>
                             <Icon name="ios-eye-outline" style={{color: '#636b6f'}}/>
                             <Text style={{color: '#636b6f'}}> {podcast.visitor} View</Text>
                          </Left>
                          <Right>
                            <Text style={{color: '#636b6f'}}>{podcast.created_at.substr(0, 10)}</Text>
                          </Right>
                        </CardItem>
                    </Card>
                  )
               })
               :
                <Card transparent>
                     <CardItem style={{alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{alignItems: 'center'}}>
                           <Text style={{fontWeight: 'bold', fontSize: 25, paddingTop: 10, color: '#636b6f', alignItems: 'center'}}>{this.state.name}</Text>
                           <Text style={{alignItems: 'center'}}>{this.state.date}</Text>
                        </View>
                     </CardItem>
                     <CardItem style={{alignItems: 'center', justifyContent: 'center'}}>
                       <Text>{this.state.description}</Text>
                     </CardItem>
                     <CardItem style={{alignItems: 'center', justifyContent: 'center'}}>
                       <Body>
                          <ScrollView style={{ flex: 1 }}>
                              <HTML html={this.state.embed} imagesMaxWidth={Dimensions.get('window').width} />
                          </ScrollView>
                       </Body>
                     </CardItem>
                     <CardItem>
                       <Left>
                           <Icon name="ios-eye-outline" style={{color: '#636b6f'}}/>
                           <Text style={{color: '#636b6f'}}> {this.state.visitor} View</Text>
                       </Left>
                       <Right>
                          <Text style={{color: '#636b6f'}}>{this.state.date.substr(0, 10)}</Text>
                       </Right>
                      </CardItem>
                   </Card>
            }
         </Content>
      </Container>
    );
  }
}

export default PodcastTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
