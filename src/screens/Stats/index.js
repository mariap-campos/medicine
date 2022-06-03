import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { ActivityIndicator, Divider, IconButton } from "react-native-paper";

import { StackedBarChart } from "react-native-chart-kit";

import { Header } from "../../components/Header";
import "react-native-get-random-values";

import { globalStyles } from "../../theme/globalStyles";
import { styles } from "./styles";

import { COLORS } from "../../theme";

export function Stats() {
  const [history, setHistory] = useState();
  const [data, setData] = useState();

  const getData = () => {
    // eslint-disable-next-line no-undef
    fetch("https://api.jsonbin.io/b/629a0e0805f31f68b3b4efa1/1")
      .then((response) => response.json())
      .then((myJson) => {
        setHistory(myJson);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (history) {
      const labels = history.map((item) => item.date.replace("/2022", ""));
      setData({
        labels,
        data: [[3], [2, 1], [3], [1, 2], [0, 3]],
        barColors: [COLORS.LIGHT_BLUE, "#ced6e0"],
      });
    }
  }, [history]);

  const chartConfig = {
    backgroundGradientFrom: COLORS.GRAY_SECONDARY,
    backgroundGradientTo: COLORS.GRAY_SECONDARY,
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForLabels: {
      fontSize: "12",
      fontWeight: "bold",
      fill: "white",
    },
  };

  if (!history || !data) {
    return (
      <>
        <Header subtitle="Estatísticas" />
        <ScrollView style={{ marginBottom: 60 }}>
          <View style={styles.container}>
            <Text style={[globalStyles.title, styles.title]}>Estatísticas</Text>
            <Text style={[globalStyles.text, styles.text]}>
              Estatísticas de consumo registradas pelo Dispenser Automático na
              última semana
            </Text>
            <Divider style={{ marginVertical: 20 }} />
            <View style={globalStyles.loading}>
              <ActivityIndicator
                animating
                color={COLORS.LIGHT_BLUE}
                size="large"
              />
            </View>
          </View>
        </ScrollView>
      </>
    );
  }

  return (
    <>
      <Header subtitle="Estatísticas" />
      <ScrollView style={{ marginBottom: 60 }}>
        <View style={styles.container}>
          <Text style={[globalStyles.title, styles.title]}>Estatísticas</Text>
          <Text style={[globalStyles.text, styles.text]}>
            Estatísticas de consumo registradas pelo Dispenser Automático na
            última semana
          </Text>
          <Divider style={{ marginVertical: 20 }} />
          <Text style={[globalStyles.title, { fontSize: 16 }]}>
            Quantidades ingeridas
          </Text>
          <View style={[globalStyles.flex, { alignItems: "center" }]}>
            <IconButton icon="square" color={COLORS.LIGHT_BLUE} size={20} />
            <Text style={globalStyles.text}>Remédios Ingeridos</Text>
          </View>
          <View
            style={[
              globalStyles.flex,
              { alignItems: "center", marginTop: -15 },
            ]}
          >
            <IconButton icon="square" color={COLORS.GRAY_PRIMARY} size={20} />
            <Text style={globalStyles.text}>Remédios não ingeridos</Text>
          </View>
          <ScrollView horizontal>
            <StackedBarChart
              style={{
                borderRadius: 20,
                marginLeft: -60,
              }}
              data={data}
              width={500}
              height={220}
              chartConfig={chartConfig}
              withHorizontalLabels={false}
            />
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
}
