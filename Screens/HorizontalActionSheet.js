import React,{useContext} from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// Assuming you're using Expo for action sheet
import { Icons } from 'react-native-vector-icons'; // Assuming you're using Expo for icons

const HorizontalActionSheet = ({ options }) => {
  const { showActionSheetWithOptions } = useContext(context);

  const showHorizontalActionSheet = () => {
    const optionsLength = options.length;
    const icons = options.map(option => option.iconName); // Extracting icons from options

    showActionSheetWithOptions(
      {
        options: icons, // Icons array will be used as options
        cancelButtonIndex: optionsLength - 1, // Last option will be cancel button
      },
      buttonIndex => {
        // Handle button press
        if (buttonIndex !== optionsLength - 1) { // Exclude cancel button
          options[buttonIndex].onPress(); // Call onPress function of the selected option
        }
      }
    );
  };

  return (
    <TouchableOpacity onPress={showHorizontalActionSheet}>
      <View style={styles.container}>
        {options.map((option, index) => (
          <View key={index} style={styles.optionContainer}>
            <Icons name={option.iconName} size={24} color="black" />
            <Text>{option.title}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  optionContainer: {
    marginRight: 20,
    alignItems: 'center',
  },
});

export default HorizontalActionSheet;
