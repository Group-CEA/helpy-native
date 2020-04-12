import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  SafeAreaView,
} from "react-native";
import { getCountryName } from "../Hooks/Countrycodes";
import cross from "../img/cross.png";
import arrow from "../img/arrow-up.png";
import healing from "../img/healing.png";
import Flag from "react-native-flags";
import Spacer from "../components/Spacer";

function Item({
  country,
  newConfirmed,
  totalConfirmed,
  newDeaths,
  newRecovered,
  totalRecovered,
  TotalDeaths,
}) {
  const countrycode = getCountryName(country);

  return (
    <View style={styles.item}>
      <View style={{ display: "flex", flexDirection: "row", marginBottom: 5 }}>
        <Flag code={countrycode} size={48} />
        <Text style={styles.country}>{country}</Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.total}>{totalConfirmed}</Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Image source={arrow} style={styles.iconArrow}></Image>
            <Text style={styles.newTotal}>{newConfirmed}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Image source={cross} style={styles.img}></Image>
            <Text style={styles.death}>{TotalDeaths}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Image source={arrow} style={styles.iconArrow}></Image>
            <Text style={styles.newDeath}>{newDeaths}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Image source={healing} style={styles.img}></Image>
            <Text style={styles.recovered}>{totalRecovered}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Image source={arrow} style={styles.iconArrow}></Image>
            <Text style={styles.newRecovered}>{newRecovered}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default class Statistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      worldwide: 0,
      worldwiderec: 0,
      worldwidedeath: 0,
    };
  }
  componentDidMount() {
    return fetch("https://api.covid19api.com/summary")
      .then((response) => response.json())
      .then((responseJson) => {
        const { Countries } = responseJson;

        if (Countries && Array.isArray(Countries)) {
          const dataSource = Countries.sort(
            (a, b) => Number(b.TotalConfirmed) - Number(a.TotalConfirmed)
          );

          const uniqe = dataSource
            .map((e) => e["Slug"])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter((e) => Countries[e])
            .map((e) => Countries[e]);

          const worldwide = uniqe
            .map(function (obj) {
              return obj.TotalConfirmed;
            })
            .reduce(function (a, b) {
              return a + b;
            });
          const worldwiderec = uniqe
            .map(function (obj) {
              return obj.TotalRecovered;
            })
            .reduce(function (a, b) {
              return a + b;
            });
          const worldwidedeath = uniqe
            .map(function (obj) {
              return obj.TotalDeaths;
            })
            .reduce(function (a, b) {
              return a + b;
            });

          this.setState({
            isLoading: false,
            dataSource: uniqe,
            worldwide: worldwide,
            worldwiderec: worldwiderec,
            worldwidedeath: worldwidedeath,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { worldwide, worldwidedeath, worldwiderec, dataSource } = this.state;
    let { t } = this.props.screenProps;

    const totalcon = t("totalcon");
    const totalrec = t("totalrec");
    const totalIdea = t("totaldea");
    const derzeit = t("derzeit");

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <SafeAreaView style={{ backgroundColor: "#2c2e3e" }}>
          <Spacer />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              backgroundColor: "#34374c",
              padding: 20,
              marginVertical: 4,
              marginHorizontal: 16,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: "#f6f6f6",
            }}
          >
            <View style={styles.worldwide}>
              <Text
                style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
              >
                {worldwide}
              </Text>
              <Text style={{ color: "grey", fontSize: 12, marginBottom: 5 }}>
                {totalcon}
              </Text>
              <Text
                style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
              >
                {worldwide - worldwiderec}
              </Text>
              <Text style={{ color: "grey", fontSize: 12, marginBottom: 5 }}>
                {derzeit}
              </Text>
            </View>
            <View style={styles.worldwide}>
              <Text style={{ color: "green", fontSize: 20 }}>
                {worldwiderec}
              </Text>
              <Text style={{ color: "grey", fontSize: 12, marginBottom: 15 }}>
                {totalrec}
              </Text>

              <Text style={{ color: "red", fontSize: 20, opacity: 0.7 }}>
                {worldwidedeath}
              </Text>
              <Text style={{ color: "grey", fontSize: 12 }}>{totalIdea}</Text>
            </View>
          </View>

          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <Item
                country={item.Country}
                newConfirmed={item.NewConfirmed}
                totalConfirmed={item.TotalConfirmed}
                newDeaths={item.NewDeaths}
                newRecovered={item.NewRecovered}
                totalRecovered={item.TotalRecovered}
                TotalDeaths={item.TotalDeaths}
              />
            )}
            keyExtractor={(item) => item.Country}
          />
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  worldwide: {
    margin: 10,
  },
  item: {
    flex: 1,
    backgroundColor: "#34374c",
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ee2b47",
  },
  flag: {
    display: "flex",
  },
  country: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    marginLeft: 15,
    marginVertical: 10,
  },

  img: {
    height: 18,
    width: 18,
    marginRight: 10,
    marginTop: 9,
  },
  iconArrow: {
    height: 15,
    width: 15,
    margin: 3,
    marginRight: 13,
    marginTop: 7,
  },
  title: {
    fontSize: 32,
  },
  total: {
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
  },
  newTotal: {
    flex: 1,
    fontSize: 20,
    color: "white",
    opacity: 0.5,
  },
  death: {
    fontSize: 26,
    color: "#FF5151",
    fontWeight: "bold",
  },
  newDeath: {
    fontSize: 20,
    color: "#FF5151",
    fontWeight: "bold",
    opacity: 0.5,
  },
  recovered: {
    fontSize: 26,
    color: "#82FF7E",
    fontWeight: "bold",
  },
  newRecovered: {
    fontSize: 20,
    color: "#82FF7E",
    fontWeight: "bold",
    opacity: 0.5,
  },
});
