import React from "react";
import { Card } from "react-native-shadow-cards";
import { Text, StyleSheet, FlatList } from "react-native";
import Constants from "expo-constants";
import { Card as CardImage } from "react-native-elements";

const Activity = (props) => {
  const title = props.title;
  const subTitle = props.subTitle;

  const movieTitle = props.movieTitle;
  const studyingTitle = props.studyingTitle;
  const sportTitle = props.sportTitle;
  const yogaTitle = props.yogaTitle;
  const pilatesTitle = props.pilatesTitle;

  const DATA = [
    {
      id: "1",
      title: `${movieTitle}`,
      imagePath: require("../../assets/Activity/movie.png"),
    },
    {
      id: "2",
      title: `${studyingTitle}`,
      imagePath: require("../../assets/Activity/school.png"),
    },
    {
      id: "3",
      title: `${sportTitle}`,
      imagePath: require("../../assets/Activity/sport.png"),
    },
    {
      id: "4",
      title: `${yogaTitle}`,
      imagePath: require("../../assets/Activity/yoga.png"),
    },
    {
      id: "5",
      title: `${pilatesTitle}`,
      imagePath: require("../../assets/Activity/pilates.png"),
    },
  ];

  function Item({ imagePath, title }) {
    return (
      <CardImage
        image={imagePath}
        style={styles.item}
        containerStyle={{ borderRadius: 0, width: 250 }}
      >
        <Text style={styles.title}>{title}</Text>
      </CardImage>
    );
  }

  return (
    <Card
      elevation={20}
      cornerRadius={19}
      style={{ padding: 30, margin: 20, marginBottom: 0 }}
    >
      <Text
        style={{
          fontSize: 50,
          marginBottom: 10,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginBottom: 10,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {subTitle}
      </Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={DATA}
        renderItem={({ item }) => (
          <Item title={item.title} imagePath={item.imagePath} />
        )}
        keyExtractor={(item) => item.id}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    borderRadius: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
  },
});

export default Activity;
