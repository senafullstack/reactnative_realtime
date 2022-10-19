import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  LogBox,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Globais from "./Configs/Globais";
import Geolocation from "react-native-geolocation-service";

export default function App() {
  const [valor, setValor] = useState("Cidade");
  const [latitude, setLatitude] = useState("51.509865");
  const [longitude, setLongitude] = useState("-0.118092");
  const [temperatura, setTemperatura] = useState("0");
  const [min, setMin] = useState("0");
  const [max, setMax] = useState("0");
  const [umidade, setUmidade] = useState("0");
  function getGeolocalizacao() {
    Geolocation.getCurrentPosition(
      ({ coords }) => {
        console.log(coords.latitude);
        setLatitude(coords.latitude);
        setLongitude(coords.longitude);
      },
      (error) => {
        console.log("ERRO " + error);
        setLatitude("51.509865");
        setLongitude("-0.118092");
      }
    );
  }

  useEffect(() => {
    pegarDados();
  }, []);

  console.log(url);
  const pegarDados = () => {
    /*getGeolocalizacao();*/
    var url =
      "https://api.openweathermap.org/data/2.5/weather?appid=c20f9a317c829284e2fe71c94b5d1224&units=metric&lat=" +
      latitude +
      "&lon=" +
      longitude;
    console.log(url);
    fetch(url, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json);
        const resultado = json;
        console.log(resultado.main.temp);
        setTemperatura(resultado.main.temp);
        setValor(resultado.name);
        setMin(resultado.main.temp_min);
        setMax(resultado.main.temp_max);
        setUmidade(resultado.main.humidity);
      })
      .catch();
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/images/logo.png")}
        style={{ width: 150, height: 150 }}
      />
      <View style={styles.backround}>
        <Text style={{ color: "#FFF", fontSize: 25 }}>{valor}</Text>
      </View>

      <View style={styles.backround}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "red", fontSize: 25, fontWeight: "bold" }}>
            {temperatura}
          </Text>
          <Text style={{ color: "red", fontSize: 25, fontWeight: "bold" }}>
            º C
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "red", fontSize: 25, fontWeight: "bold" }}>
            Min.: {min}
          </Text>
          <Text style={{ color: "red", fontSize: 25, fontWeight: "bold" }}>
            º C
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "red", fontSize: 25, fontWeight: "bold" }}>
            Máx: {max}
          </Text>
          <Text style={{ color: "red", fontSize: 25, fontWeight: "bold" }}>
            º C
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "red", fontSize: 25, fontWeight: "bold" }}>
            Umidade: {umidade}
          </Text>
          <Text style={{ color: "red", fontSize: 25, fontWeight: "bold" }}>
            º C
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          pegarDados();
        }}
      >
        <View style={styles.botao}>
          <View style={{ marginRight: 10 }}>
            <MaterialCommunityIcons
              name="weather-sunset"
              size={36}
              color="#FFF"
            />
          </View>
          <View>
            <Text style={{ color: "#FFF", fontSize: 25, fontWeight: "bold" }}>
              Atualizar Adados
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  backround: {
    backgroundColor: "#F7CB03",
    padding: 6,
    borderRadius: 10,
    alignItems: "center",
    margin: 15,
    width: Globais.percentuallargura(80),
  },
  botao: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7CB03",
    borderRadius: 15,
    color: "#fff",
    marginTop: 15,
    width: Globais.percentuallargura(80),
    padding: 10,
  },
});
