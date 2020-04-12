import React, { useContext, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { NavigationEvents } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";
import { ListItem } from "react-native-elements";
import { Context as NotificationContext } from "../context/NotificationContext";
import notifiphoto from "../img/notifphoto.png";
import Relax from "../img/relaxing.png";

const NotifiScreen = ({ screenProps }) => {
  const { state, fetchNotification } = useContext(NotificationContext);
  let { t } = screenProps;

  //console.log([state]);
  //console.log(notifi);
  let count = state.notification;
  const defaulttext = t("notifications");

  //console.log(count);
  useEffect;
  return (
    <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
      <NavigationEvents onWillFocus={fetchNotification} />
      {count ? (
        <View style={styles.card}>
          <FlatList
            data={[state]}
            keyExtractor={(item, index) => "item._id" + index}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{ margin: 20, flex: 1, display: "flex" }}
                >
                  <ListItem chevron title={item.notification} />
                  <Image source={Relax} style={{ height: 300, width: 300 }} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={{ padding: 20, fontSize: 20 }}>{defaulttext}</Text>
          <Image style={styles.image} source={notifiphoto}></Image>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    display: "flex",
    padding: 10,
    margin: 20,
    borderRadius: 19,
  },
  image: {
    width: null,
    resizeMode: "contain",
    height: 400,
  },
});

export default NotifiScreen;
