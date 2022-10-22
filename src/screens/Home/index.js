import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, View, Text, FlatList } from "react-native";
import {
  ActivityIndicator,
  Divider,
  IconButton,
  Avatar,
  Chip,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import DropDown from "react-native-paper-dropdown";
import { isAfter, parse } from "date-fns";
import firebase from "firebase/compat/app";
import { Header } from "../../components/Header";
import EmptyCup from "../../assets/icons/empty-cup.png";
import FilledCup from "../../assets/icons/filled-cup.png";
import { styles } from "./styles";
import { globalStyles } from "../../theme/globalStyles";
import { COLORS, FONTS } from "../../theme";
import useSnackBar from "../../hooks/useSnackbar";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

export function Home() {
  const navigation = useNavigation();
  const { addSnackbar } = useSnackBar();
  const [pills, setPills] = useState();
  const [routine, setRoutine] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [searchPill, setSearchPill] = useState("");
  const [pillsList, setPillList] = useState();

  const firebaseConfig = {
    apiKey: "AIzaSyCdyRG_G1Bg7rw7-QHvkF2YtoeB3bEJS88",
    authDomain: "medicine-49e2c.firebaseapp.com",
    databaseURL: "https://medicine-49e2c-default-rtdb.firebaseio.com",
    projectId: "medicine-49e2c",
    storageBucket: "medicine-49e2c.appspot.com",
    messagingSenderId: "44152165212",
    appId: "1:44152165212:web:bbe6c4c64a58886087e799",
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const getList = async () => {
    try {
      const hourList = await AsyncStorage.getItem("HOURS");
      if (!hourList) {
        setRoutine([]);
      } else {
        setRoutine(
          JSON.parse(hourList).sort((a, b) =>
            isAfter(
              parse(a.hour, "HH:mm", new Date()),
              parse(b.hour, "HH:mm", new Date())
            )
          )
        );
      }
    } catch (err) {
      console.debug(err);
      addSnackbar(`Erro ao carregar remédios`);
    }
  };

  useEffect(() => {
    getList();

    const updateList = navigation.addListener("focus", () => {
      getList();
    });

    return updateList;
  }, []);

  useEffect(() => {
    firebase
      .database()
      .ref("A")
      .on("value", (snapshot) => {
        const status = [snapshot.val()];
        firebase
          .database()
          .ref("B")
          .on("value", (snapshotB) => {
            status.push(snapshotB.val());
            firebase
              .database()
              .ref("C")
              .on("value", (snapshotC) => {
                status.push(snapshotC.val());
                setPills(status);
              });
          });
      });
  }, []);

  useEffect(() => {
    if (pills) {
      setPillList(
        pills.map((pill) => ({ label: pill.name, value: pill.name }))
      );
    }
  }, [pills]);

  const hasPassed = (hour) =>
    isAfter(new Date(), parse(hour, "HH:mm", new Date()));

  if (!pills || !routine) {
    return (
      <>
        <Header subtitle="Home" />
        <View style={globalStyles.loading}>
          <ActivityIndicator animating color={COLORS.LIGHT_BLUE} size="large" />
        </View>
      </>
    );
  }

  return (
    <>
      <Header subtitle="Home" updateHome={getList} />
      <ScrollView>
        <View style={styles.container}>
          <Text style={globalStyles.title}>Meus Remédios</Text>
          <View>
            <View style={globalStyles.flex}>
              <FlatList
                style={styles.list}
                columnWrapperStyle={{ justifyContent: "space-around" }}
                data={pills}
                keyExtractor={(pill) => pill.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <View>
                    <IconButton
                      icon={item.name ? FilledCup : EmptyCup}
                      color={item.name ? COLORS.LIGHT_BLUE : COLORS.GRAY_DARK}
                      size={85}
                      onPress={() =>
                        navigation.navigate("EditRoutine", {
                          itemDispenser: item.dispenser,
                          itemId: item.id,
                          itemName: item.name,
                          itemIndex: index,
                        })
                      }
                    />
                    <Text
                      style={[
                        globalStyles.text,
                        styles.subtitle,
                        {
                          color: item.name
                            ? COLORS.LIGHT_BLUE
                            : COLORS.GRAY_DARK,
                        },
                      ]}
                    >
                      {item.dispenser}
                    </Text>
                    {item.name && (
                      <Text
                        style={{
                          fontFamily: FONTS.REGULAR,
                          color: COLORS.GRAY_DARK,
                          alignSelf: "center",
                          marginTop: -5,
                        }}
                      >
                        {item.name}
                      </Text>
                    )}
                  </View>
                )}
              />
            </View>
          </View>
          <View>
            <Text
              style={[
                globalStyles.title,
                styles.title,
                { marginTop: 40, marginBottom: 10 },
              ]}
            >
              Minha Rotina
            </Text>
            {routine.length > 0 && (
              <View style={styles.search}>
                <Avatar.Icon
                  size={52}
                  icon="magnify"
                  color={COLORS.GRAY_DARK}
                  style={{
                    marginLeft: -10,
                    backgroundColor: COLORS.GRAY_SECONDARY,
                    marginBottom: 10,
                  }}
                />
                <View style={styles.dropdown}>
                  <DropDown
                    label="Procurar Medicamento"
                    mode="outlined"
                    visible={showDropDown}
                    showDropDown={() => setShowDropDown(true)}
                    onDismiss={() => setShowDropDown(false)}
                    value={searchPill}
                    setValue={setSearchPill}
                    list={pillsList.filter((item) => item.label)}
                    activeColor={COLORS.LIGHT_BLUE}
                    multiSelect
                  />
                </View>
              </View>
            )}
            {searchPill.length > 0 && (
              <Chip
                mode="flat"
                icon="close"
                onPress={() => setSearchPill("")}
                style={{
                  backgroundColor: COLORS.GRAY_PRIMARY,
                  width: 150,
                  position: "absolute",
                  top: 35,
                  right: 2,
                }}
                textStyle={{ fontFamily: FONTS.REGULAR }}
              >
                Limpar Filtro
              </Chip>
            )}
            <View style={{ marginBottom: 80 }}>
              {routine.length === 0 && (
                <View style={styles.empty}>
                  <Avatar.Icon
                    size={52}
                    icon="text-search"
                    color={COLORS.GRAY_PRIMARY}
                    style={{
                      marginLeft: -10,
                      backgroundColor: COLORS.GRAY_SECONDARY,
                      marginTop: -10,
                    }}
                  />
                  <View>
                    <Text style={globalStyles.text}>
                      Cadastre uma rotina em um dispenser para começar.
                    </Text>
                  </View>
                </View>
              )}
              {routine.map((time) => (
                <View
                  key={time.hour}
                  style={[
                    styles.routine,
                    {
                      borderLeftColor: hasPassed(time.hour)
                        ? COLORS.LIGHT_BLUE
                        : COLORS.GRAY_DARK,
                    },
                  ]}
                >
                  <View style={styles.time}>
                    <View
                      style={{
                        width: 25,
                        height: 25,
                        backgroundColor: COLORS.GRAY_SECONDARY,
                      }}
                    >
                      <IconButton
                        icon={hasPassed(time.hour) ? "clock" : "clock-outline"}
                        size={30}
                        color={
                          hasPassed(time.hour)
                            ? COLORS.LIGHT_BLUE
                            : COLORS.GRAY_DARK
                        }
                        style={{ marginLeft: -10, marginTop: -10 }}
                      />
                    </View>
                    <Text style={[globalStyles.title, { marginLeft: 10 }]}>
                      {time.hour}
                    </Text>
                  </View>
                  {time.pills.map((pill) =>
                    // eslint-disable-next-line no-nested-ternary
                    searchPill === "" ? (
                      <View style={styles.cardSmall} key={pill.id}>
                        <Chip
                          icon="pill"
                          textStyle={{ color: COLORS.GRAY_DARK }}
                        >
                          {pill.name}
                        </Chip>
                      </View>
                    ) : searchPill.includes(pill.name) ? (
                      <View style={styles.cardSmall} key={pill.id}>
                        <Chip icon="pill">{pill.name}</Chip>
                      </View>
                    ) : null
                  )}

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
        </View>
      </ScrollView>
    </>
  );
}
