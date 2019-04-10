import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text,View} from 'react-native';
import {Button,Title} from 'react-native-paper';
import { connect } from 'react-redux';
import {receiveDecks} from '../Actions/index';
import {getDecks } from '../Utils/api';


 

   
class DeckList extends Component { 
    componentDidMount(){
		getDecks()
       .then(decks => this.props.receiveAllDecks(decks))        
	   
    }
    
 

    render() {  
        
       const {decks} = this.props
        
         
          return ( 
             <ScrollView style={styles.container}>             
              {
                  Object.keys(decks).map( (deck) => {
                      const {title, questions} = decks[deck]
                      return(
						<View key ={deck} style={styles.card}>                          
							<Title style={styles.cardText}>{title}</Title>
						      <Text style={styles.cardText}>{questions.length}</Text>
							   <Button
							   	color ="#CB4335"
							     mode="contained"
							     onPress={()=>this.props.navigation.navigate('DeckView',{entryId : deck})}>DeckView
								
								 </Button>
                          </View>
                      )
                  })
              }
             
             </ScrollView>
           );
      }
  }

const styles = StyleSheet.create({
	container: {
        flex: 1,
		alignSelf: 'stretch',
		padding: 5
  },
	card: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: "#A569BD",
		margin: 8,
		height: 200,
		borderRadius: 10,
		shadowColor: 'rgba(0,0,0,0.34)',
		 shadowOffset: {
		 	width: 0,
		 	height: 3,
		 },
		 shadowRadius: 4,
		 shadowOpacity: 1
	},
	cardText: {
		fontSize: 30,
		color:'#ffffff'
	},
	cardBtn: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}

})
   







const mapStateToProps=(decks)=>{
   return {
        decks
    }
}

const mapDispatachToProps=(dispatch)=>{
    return {
        receiveAllDecks: (decks) => dispatch(receiveDecks(decks))
    }
}
   
export default connect(mapStateToProps,mapDispatachToProps)(DeckList);




