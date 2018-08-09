import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Linking } from 'react-native';
import { Icon, Container, Content, Thumbnail, Header, Left , Right, Body} from 'native-base';
import CardComponent from '../CardComponent';
import axios from 'axios';

class HomeTab extends React.Component {

   static navigationOptions = {
      tabBarIcon: ({tintColor}) => (
         <Icon name="ios-home" style={{color: tintColor}}/>
      )
   }

   constructor(props) {
      super(props)
      this.state = {
         displayPicture: '',
      }
   }

   componentDidMount = () => {
      axios.get('https://ajatdarojat45.id/api/getDisplayPictureActive')
      .then((response) => {
         this.setState({
            displayPicture: response.data.image
         })
      })
      .catch((error) => {
         console.log(error)
      })
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
      <View style={styles.container}>
         <Image
           source = {{ uri: 'https://ajatdarojat45.id/'+this.state.displayPicture }}
           style={{width: 200, height: 200, borderRadius: 100}}
         />

         <View style={{alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 25, paddingTop: 10, color: '#636b6f'}}>Halo, Saya Ajat Darojat <Icon name="ios-beer" style={{color: '#636b6f'}}/></Text>
         </View>
         <View style={{alignItems: 'center', flexDirection: 'row', paddingTop: 20}}>
            <Text
               style={{marginRight: 10, color: '#636b6f'}}
               onPress={() => this.handleOpenURL('http://facebook.com/ajatdarojat45')}
            >
               <Icon name="logo-facebook" style={{fontSize: 15, color: '#636b6f'}}/> Facebook
            </Text>
            <Text
               style={{marginRight: 10, color: '#636b6f'}}
               onPress={() => this.handleOpenURL('http://twitter.com/ajatdarojat45')}
            >
               <Icon name="logo-twitter" style={{fontSize: 15, color: '#636b6f'}}/> Twitter
            </Text>
            <Text
               style={{marginRight: 10, color: '#636b6f'}}
               onPress={() => this.handleOpenURL('http://instagram.com/ajatdarojat45')}
            >
               <Icon name="logo-instagram" style={{fontSize: 15, color: '#636b6f'}}/> Instagram
            </Text>
         </View>
         <View style={{alignItems: 'center', flexDirection: 'row', paddingTop: 10}}>
            <Text
               style={{marginRight: 10, color: '#636b6f'}}
               onPress={() => this.handleOpenURL('http://youtube.com/ajatdarojat45')}
            >
               <Icon name="logo-youtube" style={{fontSize: 15, color: '#636b6f'}}/> Youtube
            </Text>
            <Text
               style={{marginRight: 10, color: '#636b6f'}}
               onPress={() => this.handleOpenURL('http://github.com/ajatdarojat45')}
            >
               <Icon name="logo-github" style={{fontSize: 15, color: '#636b6f'}}/> Github
            </Text>
         </View>
         <View style={{paddingTop: 20, alignItems: 'center'}}>
            <Text style={{alignItems: 'center', flexDirection: 'row', color: '#636b6f'}}>
               Luruskan niat / Perbaiki Sikap
            </Text>
            <Text style={{alignItems: 'center', flexDirection: 'row', color: '#636b6f'}}>
               Luaskan ilmu / Luaskan manfaat
            </Text>
         </View>
         <View style={{paddingTop: 20, alignItems: 'center'}}>
            <Text style={{alignItems: 'center', flexDirection: 'row', color: '#636b6f'}}>
               lazyCode - code with <Icon name="ios-heart" style={{fontSize: 15, color: 'red'}}/>
            </Text>
         </View>
      </View>
    );
  }
}

export default HomeTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
