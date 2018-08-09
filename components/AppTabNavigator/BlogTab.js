import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Card, CardItem, Content, Thumbnail, H1, H2, H3 } from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import HTML from 'react-native-render-html';

class BlogTab extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         blogs: [],
         blogDetail: false,
         title: '',
         content: '',
         visitor: '',
         date: '',
      }
   }

   componentDidMount = () => {
      axios.get('https://ajatdarojat45.id/api/getBlogsActive')
      .then((response) => {
         this.setState({
            blogs: response.data
         })
      })
      .catch((error) => {
         console.log(error)
      })
   }

   static navigationOptions = {
      tabBarIcon: ({tintColor}) => (
         <Icon name="ios-paper" style={{color: tintColor}}/>
      )
   }

   handleBlogDetail(blog){
      axios.get('https://ajatdarojat45.id/api/getBlog/'+blog.slug)
      .then((response) => {
         this.setState({
            blogDetail: !this.state.blogDetail,
            title: response.data.title,
            content: response.data.content,
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
         blogDetail: !this.state.blogDetail
      })
   }

  render() {
    return (
      <Container>
         <Header>
            {this.state.blogDetail ?
               <Left>
                  <Icon name="ios-arrow-back" style={{paddingTop:10}} onPress={() => this.handleBack()}></Icon>
               </Left>
               : null
            }
            <Body><Text style={{fontWeight: 'bold', fontSize: 20, paddingTop: 10, color: '#000'}}><Icon name="ios-paper" style={{fontSize: 20, color: '#000'}}/> Catatan</Text></Body>
         </Header>
         <Content>
            {!this.state.blogDetail ?
               this.state.blogs.map((blog, index) =>
               {
                  return (
                     <Card key={index}>
                       <CardItem>
                         <Left>
                           <Icon name="ios-paper-outline" style={{fontSize: 50, color: '#636b6f'}}/>
                           <Body>
                              <Text
                                style={{fontWeight: 'bold', fontSize: 20, color: '#636b6f'}}
                                onPress={() => this.handleBlogDetail(blog)}
                              >
                                 {blog.title}
                              </Text>
                              <ScrollView style={{ flex: 1}}>
                                  <HTML style={{color: '#636b6f'}} html={blog.content.substr(0, 50)+'...'} imagesMaxWidth={Dimensions.get('window').width} />
                              </ScrollView>
                           </Body>
                         </Left>
                       </CardItem>
                       <CardItem>
                          <Left>
                             <Icon name="ios-eye-outline" style={{color: '#636b6f'}}/>
                             <Text style={{color: '#636b6f'}}> {blog.visitor} View</Text>
                          </Left>
                          <Right>
                            <Text style={{color: '#636b6f'}}>{blog.created_at.substr(0, 10)}</Text>
                          </Right>
                        </CardItem>
                     </Card>
                  )
               })
               :
               <Container>
                 <Content padder>
                   <Card transparent>
                     <CardItem style={{alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{alignItems: 'center'}}>
                           <Text style={{fontWeight: 'bold', fontSize: 25, paddingTop: 10, color: '#636b6f', alignItems: 'center'}}>{this.state.title}</Text>
                           <Text style={{alignItems: 'center'}}>{this.state.date}</Text>
                        </View>
                     </CardItem>
                     <CardItem>
                       <Body>
                          <ScrollView style={{ flex: 1 }}>
                              <HTML html={this.state.content} imagesMaxWidth={Dimensions.get('window').width} />
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
                 </Content>
               </Container>
            }
         </Content>
      </Container>
    );
  }
}

export default BlogTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
