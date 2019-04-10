import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {connect} from 'react-redux';
import AddButton from '../Components/AddButton';

class DeckView extends Component {
    render() {
        const deck = this.props.navigation.state.params.entryId 
        const {decks} = this.props
     
        return ( 
            <View style={styles.container} key={deck}> 
              <View style={styles.card}>              
                <Text style={styles.mainText}>{decks[deck].title}</Text>
                <Text style={styles.subText}>Numbers Of Questions : {decks[deck].questions.length}</Text>

                <AddButton styles={styles} text={"Add Card"}  color={"#CB4335"}
                           onPress={()=>this.props.navigation.navigate('AddCard', {entryId : deck} )} />
                <AddButton styles={styles} text={"Quiz Start"}  color={"#4A235A"}
                           onPress={()=>this.props.navigation.navigate('QuizView', {entryId : deck} )} />
                </View>
            </View>
         );
    }
}
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4286f4',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : '#ffffff',
    padding : 10
  },
  andriodBtn:{
    padding: 10,
		borderRadius: 7,
		height: 45,
		margin: 5,
    width: 170,
    backgroundColor: '#9b42f4'
  },
  submitBtnText:{
    color: '#ffffff',
		fontSize: 22,
		textAlign: 'center'
  },
  card: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#A569BD',
		alignSelf: 'stretch',
		borderRadius: 10,
		shadowColor: 'rgba(0,0,0,0.34)',
        shadowOffset: {
        width: 0,
        height: 3
      },
        shadowRadius: 4,
        shadowOpacity: 1
  },
  mainText: {
		fontSize: 40,
		color: '#ffffff'
	},
	subText: {
		fontSize: 30,
		color: '#ffffff',
		marginBottom: 160
	}
  
  
});


const mapStateToProps=(decks)=>{
  return{
    decks
  }
}
 
export default connect(mapStateToProps)(DeckView);