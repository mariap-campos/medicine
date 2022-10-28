import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, FlatList } from "react-native";
import { ActivityIndicator, Divider } from "react-native-paper";

import firebase from "firebase/compat/app";
import { Header } from "../../components/Header";
import "react-native-get-random-values";

import { globalStyles } from "../../theme/globalStyles";
import { styles } from "./styles";

import { HistoryCard } from "../../components/HistoryCard";
import { COLORS } from "../../theme";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

export function History() {
  const [history, setHistory] = useState();

  const getData = () => {
    firebase
      .database()
      .ref("historico")
      .on("value", (snapshot) => {
        setHistory(snapshot.val());
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
                  {item.data}
                </Text>
                <View style={{ marginBottom: 20 }}>
                  <HistoryCard
                    hour={`${item.hora}:${item.minuto}`}
                    meds={item.slots}
                  />
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
