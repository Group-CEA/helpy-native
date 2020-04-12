import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

const NavLink = ({ textTitle, navigatelin, navigation }) => {
  return (
    <>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate(navigatelin)}
      >
        <Text style={{ color: "blue" }}>{textTitle}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  link: {
    marginHorizontal: 15,
  },
});

export default withNavigation(NavLink);
