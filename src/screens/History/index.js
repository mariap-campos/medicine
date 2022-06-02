import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { TextInput, Button, Divider } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";
import { Header } from "../../components/Header";
import "react-native-get-random-values";
import { COLORS } from "../../theme";
import { globalStyles } from "../../theme/globalStyles";
import { styles } from "./styles";
import useSnackBar from "../../hooks/useSnackbar";
import { HistoryCard } from "../../components/HistoryCard";

export function History() {
  const navigation = useNavigation();

  const meds = ["Metformina", "Asmed", "Teste"];
  const meds2 = ["Metformina", "Asmed"];
  const meds3 = [
    "Metformina",
    "Asmed",
    "Metformina",
    "Asmed",
    "Metformina",
    "Metformina",
  ];

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
          <Text style={[globalStyles.title, { fontSize: 14 }]}>24/04/2022</Text>
          <View style={{ marginBottom: 20 }}>
            <HistoryCard meds={meds} />
            <HistoryCard meds={meds3} />
            <HistoryCard meds={meds2} />
          </View>
          <Text style={[globalStyles.title, { fontSize: 14 }]}>25/04/2022</Text>
          <View>
            <HistoryCard meds={meds} />
            <HistoryCard meds={meds2} />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
