import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, FlatList } from "react-native";
import { ActivityIndicator, Divider } from "react-native-paper";

import { Header } from "../../components/Header";
import "react-native-get-random-values";

import { globalStyles } from "../../theme/globalStyles";
import { styles } from "./styles";

import { HistoryCard } from "../../components/HistoryCard";
import { COLORS } from "../../theme";

export function History() {
  const [history, setHistory] = useState();

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

  if (!history) {
    return (
      <>
        <Header subtitle="Histórico" hasBackButton />
        <ScrollView style={{ marginBottom: 60 }}>
          <View style={styles.container}>
            <Text style={[globalStyles.title, styles.title]}>Histórico</Text>
            <Text style={[globalStyles.text, styles.text]}>
              Assim como registrado pelo Dispenser Automático na última semana
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
      <Header subtitle="Histórico" hasBackButton />
      <ScrollView style={{ marginBottom: 60 }}>
        <View style={styles.container}>
          <Text style={[globalStyles.title, styles.title]}>Histórico</Text>
          <Text style={[globalStyles.text, styles.text]}>
            Assim como registrado pelo Dispenser Automático na última semana
          </Text>
          <Divider style={{ marginVertical: 20 }} />
          <FlatList
            data={history}
            keyExtractor={(item) => item.id}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <>
                <Text style={[globalStyles.title, { fontSize: 14 }]}>
                  {item.date}
                </Text>
                <View style={{ marginBottom: 20 }}>
                  {item.hours.map((hour) => (
                    <HistoryCard hour={hour.hour} meds={hour.pills} />
                  ))}
                </View>
                <Divider style={{ marginBottom: 10 }} />
              </>
            )}
          />
        </View>
      </ScrollView>
    </>
  );
}
