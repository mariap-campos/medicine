import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, View, Text, Image } from "react-native";
import { ActivityIndicator, Button, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../../components/Header";
import Pills from "../../assets/icons/medicine.png";
import Watch from "../../assets/icons/watch.png";
import { styles } from "./styles";
import { globalStyles } from "../../theme/globalStyles";
import { AddButton } from "../../components/AddButton";
import { COLORS } from "../../theme";
import { PillCard } from "../../components/PillCard";
import useSnackBar from "../../hooks/useSnackbar";

export function Home() {
  const navigation = useNavigation();
  const { addSnackbar } = useSnackBar();
  const [pills, setPills] = useState();
  const [routine, setRoutine] = useState();

  const getList = async () => {
    try {
      const list = await AsyncStorage.getItem("PILLS");
      if (list) {
        setPills(JSON.parse(list));
      } else {
        setPills([]);
      }
    } catch (err) {
      addSnackbar(`Erro ao carregar remédios`);
    }
  };

  const getHours = async () => {
    try {
      const list = await AsyncStorage.getItem("HOURS");
      if (list) {
        setRoutine(JSON.parse(list));
      } else {
        setRoutine([]);
      }
    } catch (err) {
      addSnackbar(`Erro ao carregar rotina`);
    }
  };

  useEffect(() => {
    // AsyncStorage.clear();
    getList();
    getHours();
    const updateList = navigation.addListener("focus", () => {
      getList();
      getHours();
    });

    return updateList;
  }, []);

  if (!pills || !routine) {
    return (
      <View style={globalStyles.loading}>
        <ActivityIndicator animating color={COLORS.LIGHT_BLUE} size="large" />
      </View>
    );
  }

  return (
    <>
      <Header />
      <AddButton />
      <ScrollView>
        <View style={styles.container}>
          <Text style={[globalStyles.title, styles.title]}>Meus Remédios</Text>
          <View>
            {pills.length === 0 && (
              <>
                <Text style={globalStyles.text}>Nada cadastrado ainda.</Text>
                <Text style={globalStyles.text}>
                  Clique no botão &quot; ou no botão abaixo para adicionar um
                  remédio
                </Text>
              </>
            )}
            {pills.map((pill) => (
              <PillCard
                pills={pills}
                routine={routine}
                pill={pill}
                updateList={() => {
                  getList();
                  getHours();
                }}
                key={pill.id}
              />
            ))}
          </View>
          <Button
            color={COLORS.LIGHT_BLUE}
            style={{ marginTop: 15 }}
            mode="contained"
            onPress={() => navigation.navigate("AddRemedy")}
          >
            Adicionar Remédios
          </Button>

          <Text
            style={[
              globalStyles.title,
              styles.title,
              { marginTop: 40, marginBottom: 0 },
            ]}
          >
            Minha Rotina
          </Text>
          <View>
            {routine.map((time) => (
              <View key={time.hour}>
                <View style={styles.time}>
                  <Image source={Watch} style={styles.watchImage} />
                  <Text style={globalStyles.title}>{time.hour}</Text>
                </View>
                {time.pills.map((pill) => (
                  <View style={styles.cardSmall} key={pill.id}>
                    <View style={styles.logoBack}>
                      <Image source={Pills} style={styles.logo} />
                    </View>
                    <Text style={[globalStyles.text, styles.name]}>
                      {pill.name}
                    </Text>
                  </View>
                ))}

                <Divider
                  style={{
                    marginTop: 8,
                    height: 0.8,
                    backgroundColor: COLORS.GRAY_PRIMARY,
                  }}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
