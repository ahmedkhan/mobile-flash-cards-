import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

 const ActionButton=({ onPress, styles, text, color, disable })=>{
	return (
		<TouchableOpacity onPress={onPress} disabled ={disable}
						  style={[styles.andriodBtn, { backgroundColor: color }]}>
			<Text style={styles.submitBtnText}>{text}</Text>
		</TouchableOpacity>
	)
}
export default ActionButton;