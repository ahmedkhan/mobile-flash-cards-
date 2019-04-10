import React from 'react';
import { StyleSheet, Text, View,StatusBar,AsyncStorage } from 'react-native';
import DeckList from './Components/DeckList';
import DeckView from './Components/DeckView';
import { Provider as StoreProvider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper';
import { createStore } from 'redux'
import reducer from './Reducer/reducer';
import AddDeck from './Components/AddDeck';
import {createBottomTabNavigator,createAppContainer,createStackNavigator} from 'react-navigation';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Constants } from 'expo';
import AddCard from './Components/AddCard';
import QuizView from './Components/QuizView';

 

const MyStatusBar= ({backgroundColor, ...props})=> {
  return (
      <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
          <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
      </View>
    )
}

const Tabs = createBottomTabNavigator ({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor}/>
    }
  },
    AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
    }
  },
 
  
}, {
  tabBarOptions: {
    activeTintColor: '#ffffff',
    style: {
      height: 70,
      backgroundColor: '#4A235A',
      

    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      title: 'Deck Info',
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#4A235A'
      } 
    }
  },
  AddCard : {
    screen : AddCard,
    navigationOptions :{
      title : 'Add Card View',
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#4A235A'
      } 

    }
  },
  QuizView :{ 
    screen : QuizView,
    navigationOptions :{
      title : ' Quiz',
      headerTintColor :'#ffffff',
      headerStyle : {
        backgroundColor : '#4A235A'
      }
    }
  }
})



const  Navigation = createAppContainer(MainNavigator);


export default class App extends React.Component {
  componentDidMount(){
    AsyncStorage.clear();
  }
  
  render() {
    return (
      <StoreProvider store={createStore(reducer)}>
       <PaperProvider>
        <MyStatusBar  backgroundColor={'#4A235A'} barStyle='light-content'/>
        <Navigation/>
       </PaperProvider> 
      </StoreProvider>
    );
  }
}


  

