import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
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
import { formatHourMinute } from "../../utils/formatHour";

export function Home() {
  const navigation = useNavigation();
  const { addSnackbar } = useSnackBar();
  const [pills, setPills] = useState();
  const [routine, setRoutine] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [searchPill, setSearchPill] = useState("");
  const [pillsList, setPillList] = useState([]);

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
      firebase
        .database()
        .ref("0")
        .on("value", (snapshot) => {
          const status = [
            {
              ...snapshot.val(),
              horariosFormatados: formatHourMinute(snapshot.val().horarios),
            },
          ];
          firebase
            .database()
            .ref("1")
            .on("value", (snapshotB) => {
              status.push({
                ...snapshotB.val(),
                horariosFormatados: formatHourMinute(snapshotB.val().horarios),
              });
              firebase
                .database()
                .ref("2")
                .on("value", (snapshotC) => {
                  status.push({
                    ...snapshotC.val(),
                    horariosFormatados: formatHourMinute(
                      snapshotC.val().horarios
                    ),
                  });
                  firebase
                    .database()
                    .ref("3")
                    .on("value", (snapshotD) => {
                      status.push({
                        ...snapshotD.val(),
                        horariosFormatados: formatHourMinute(
                          snapshotD.val().horarios
                        ),
                      });

                      setPills(status);
                    });
                });
            });
        });

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
    if (pills) {
      setPillList(
        pills.map((pill) => ({ label: pill.nome, value: pill.nome }))
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
                columnWrapperStyle={{ justifyContent: "space-between" }}
                style={styles.list}
                data={pills}
                keyExtractor={(pill) => pill.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={[
                      styles.slot,
                      {
                        borderColor: item.nome
                          ? COLORS.BLUE
                          : COLORS.GRAY_PRIMARY,
                      },
                    ]}
                    onPress={() =>
                      navigation.navigate("EditRoutine", {
                        itemDispenser: item.slot.toString(),
                        itemId: item.id,
                        itemName: item.nome,
                        itemIndex: index,
                        itemQtd: item.quantidade,
                      })
                    }
                  >
                    <View>
                      <IconButton
                        icon={item.nome ? FilledCup : EmptyCup}
                        color={item.nome ? COLORS.LIGHT_BLUE : COLORS.GRAY_DARK}
                        size={35}
                        style={{ marginLeft: -2 }}
                      />
                    </View>
                    <View style={styles.info}>
                      <Text
                        style={[
                          styles.infoText,
                          {
                            color: item.nome
                              ? COLORS.LIGHT_BLUE
                              : COLORS.GRAY_DARK,
                            fontFamily: item.nome ? FONTS.BOLD : FONTS.REGULAR,
                          },
                        ]}
                      >
                        Slot: {item.slot}
                      </Text>

                      <Text
                        style={{
                          fontFamily: item.nome ? FONTS.BOLD : FONTS.REGULAR,
                          fontSize: item.nome ? 14 : 12,
                          color: COLORS.GRAY_DARK,
                        }}
                      >
                        {item.nome || "Vazio"}
                      </Text>

                      <Text style={styles.infoText}>
                        Quantidade: {item.quantidade}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
          <View>
            <Text
              style={[
                globalStyles.title,
                styles.title,
                { marginTop: 20, marginBottom: 10 },
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
                          {pill.nome}
                        </Chip>
                      </View>
                    ) : searchPill.includes(pill.nome) ? (
                      <View style={styles.cardSmall} key={pill.id}>
                        <Chip icon="pill">{pill.nome}</Chip>
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
