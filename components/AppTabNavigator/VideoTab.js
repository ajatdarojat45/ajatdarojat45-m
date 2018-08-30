import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Card, CardItem, Content, Thumbnail, H1, H2, H3 } from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import HTML from 'react-native-render-html';

class VideoTab extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         videos: [],
         name: '',
         description: '',
         date: '',
         embed: '',
         visitor: '',
         VideoDetail: false
      }
   }

   componentDidMount = () => {
      axios.get('https://ajatdarojat45.id/api/mobile/getVideosActive')
      .then((response) => {
         this.setState({
            videos: response.data
         })
      })
      .catch((error) => {
         console.log(error)
      })
   }

   static navigationOptions = {
      tabBarIcon: ({tintColor}) => (
         <Icon name="ios-videocam" style={{color: tintColor}}/>
      )
   }

   handleVideoDetail(video){
      axios.get('https://ajatdarojat45.id/api/mobile/getVideo/'+video.slug)
      .then((response) => {
         this.setState({
            videoDetail: !this.state.videoDetail,
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
         videoDetail: !this.state.videoDetail
      })
   }

  render() {
    return (
      <Container>
         <Header>
            {this.state.videoDetail ?
               <Left>
                  <Icon name="md-arrow-back" style={{paddingTop:10}} onPress={() => this.handleBack()}></Icon>
               </Left>
               : null
            }
            <Body><Text style={{fontWeight: 'bold', fontSize: 20, paddingTop: 10, color: '#000'}}><Icon name="ios-videocam" style={{fontSize: 20, color: '#000'}}/> Video</Text></Body>
         </Header>
         <Content>
            {!this.state.videoDetail ?
               this.state.videos.map((video, index) =>
               {
                  return (
                     <Card key={index}>
                       <CardItem>
                         <Left>
                           <Icon name="ios-videocam-outline" style={{fontSize: 50, color: '#636b6f'}}/>
                           <Body>
                             <Text
                                style={{fontWeight: 'bold', fontSize: 20, color: '#636b6f'}}
                                onPress={() => this.handleVideoDetail(video)}
                              >
                                 {video.name}
                              </Text>
                              <ScrollView style={{ flex: 1}}>
                                  <HTML style={{color: '#636b6f'}} html={video.description.substr(0, 50)+'...'} imagesMaxWidth={Dimensions.get('window').width} />
                              </ScrollView>
                           </Body>
                         </Left>
                       </CardItem>
                       <CardItem>
                          <Left>
                             <Icon name="ios-eye-outline" style={{color: '#636b6f'}}/>
                             <Text style={{color: '#636b6f'}}> {video.visitor} View</Text>
                          </Left>
                          <Right>
                            <Text style={{color: '#636b6f'}}>{video.created_at.substr(0, 10)}</Text>
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
                    <HTML html={this.state.description} imagesMaxWidth={Dimensions.get('window').width} />
                  </CardItem>
                  <CardItem style={{alignItems: 'center', justifyContent: 'center'}}>
                    <HTML html={this.state.embed} imagesMaxWidth={Dimensions.get('window').width} />
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

export default VideoTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
