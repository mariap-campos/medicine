/* eslint-disable consistent-return */
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View, Text } from "react-native";
import { format, isBefore, parseISO } from "date-fns";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  TextInput,
  Button,
  ActivityIndicator,
  IconButton,
  Divider,
} from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Header } from "../../components/Header";
import "react-native-get-random-values";
import { COLORS } from "../../theme";
import { globalStyles } from "../../theme/globalStyles";
import { styles } from "./styles";
import useSnackBar from "../../hooks/useSnackbar";

import { HourCard } from "../../components/HourCard";

export function EditRoutine({ route }) {
  const { itemId, itemName } = route.params;
  const { addSnackbar } = useSnackBar();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pills, setPills] = useState();
  const [routine, setRoutine] = useState();
  const [updatedHours, setUpdatedHours] = useState([]);
  const [time, setTime] = useState(format(new Date(), "HH:mm"));

  const getList = async () => {
    try {
      const list = await AsyncStorage.getItem("PILLS");
      if (list) {
        setPills(JSON.parse(list));
        const index = JSON.parse(list).findIndex((item) => item.id === itemId);
        setUpdatedHours(JSON.parse(list)[index].hours);
      } else {
        setPills([]);
      }
    } catch (err) {
      console.debug(err);
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
    getList();
    getHours();
  }, []);

  console.debug(routine);

  const saveRemedy = async () => {
    try {
      const index = pills.findIndex((item) => item.id === itemId);
      pills[index].hours = updatedHours;
      await AsyncStorage.setItem("PILLS", JSON.stringify(pills));
      await AsyncStorage.setItem(
        "HOURS",
        JSON.stringify(
          routine.sort((a, b) => isBefore(parseISO(a.hour), parseISO(b.hour)))
        )
      );

      addSnackbar(`Rotina salva com sucesso`);
      navigation.navigate("Home");
    } catch (err) {
      addSnackbar(`Erro ao salvar rotina`);
    }
  };

  const AddHours = async () => {
    if (updatedHours.some((item) => item === time)) {
      addSnackbar(`O horário adicionado já existe na rotina selecionada`);

      return null;
    }
    setLoading(true);
    try {
      setUpdatedHours([...updatedHours, time]);

      if (routine.some((item) => item.hour === time)) {
        const index = routine.findIndex((item) => item.hour === time);

        routine[index].pills = [
          ...routine[index].pills,
          { name: itemName, id: itemId },
        ];
        setRoutine(routine);
      } else {
        const newHour = {
          hour: time,
          pills: [{ name: itemName, id: itemId }],
        };

        setRoutine([...routine, newHour]);
      }
      setLoading(false);
    } catch (err) {
      console.debug(err);
      addSnackbar(`Erro ao adicionar horário`);
    }
  };

  const deleteRoutine = async (hour) => {
    setLoading(true);
    try {
      const index = pills.findIndex((item) => item.id === itemId);
      const removedHours = updatedHours.filter((item) => item !== hour);
      pills[index].hours = removedHours;

      const hourIndex = routine.findIndex((item) => item.hour === hour);

      if (routine[hourIndex].pills.length === 1) {
        routine.splice(hourIndex, 1);
      } else {
        const removedRoutine = routine[hourIndex].pills.filter(
          (item) => item.id !== itemId
        );
        routine[hourIndex].pills = removedRoutine;
      }

      await AsyncStorage.setItem("PILLS", JSON.stringify(pills));
      await AsyncStorage.setItem("HOURS", JSON.stringify(routine));

      getList();
      setLoading(false);
      addSnackbar(`Rotina removida com sucesso`);
    } catch (err) {
      setLoading(false);
      console.debug(err);
      addSnackbar(`Erro ao remover horário`);
    }
  };

  if (!pills) {
    return (
      <>
        <Header subtitle="Editar Rotina" hasBackButton />
        <View style={globalStyles.loading}>
          <ActivityIndicator animating color={COLORS.LIGHT_BLUE} size="large" />
        </View>
      </>
    );
  }

  return (
    <>
      <Header subtitle="Editar Rotina" hasBackButton />
      <ScrollView>
        <View style={styles.container}>
          <Text style={[globalStyles.title, styles.title]}>
            Editar Rotina - {itemName}
          </Text>
          <Text style={[globalStyles.text]}>Selecione o horário</Text>
          <View style={styles.selectTime}>
            <View style={styles.ghostView}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setVisible(true)}
              />
            </View>
            <TextInput
              mode="outlined"
              label="Horário"
              style={{ width: 100 }}
              value={time}
              editable={false}
              onFocus={() => setVisible(true)}
              outlineColor={COLORS.GRAY_PRIMARY}
              onPressIn={() => setVisible(true)}
            />

            <View style={styles.icon}>
              <IconButton
                icon="plus"
                style={{ marginLeft: -2, marginTop: -2 }}
                color={COLORS.WHITE}
                size={30}
                onPress={() => AddHours()}
              />
            </View>
          </View>
          <DateTimePickerModal
            isVisible={visible}
            mode="time"
            onConfirm={(hour) => {
              setTime(format(hour, "HH:mm"));
              setVisible(false);
            }}
            onCancel={() => setVisible(false)}
          />
          <Divider
            style={{
              marginTop: 20,
              height: 0.8,
              backgroundColor: COLORS.GRAY_PRIMARY,
            }}
          />
          {updatedHours.map((hour) => (
            <HourCard
              key={hour}
              hour={hour}
              name={itemName}
              deleteHour={deleteRoutine}
              loading={loading}
            />
          ))}

          <Button
            icon="content-save"
            color={COLORS.LIGHT_BLUE}
            style={{ marginTop: 30 }}
            mode="contained"
            loading={loading}
            onPress={() => saveRemedy()}
          >
            Salvar
          </Button>
        </View>
      </ScrollView>
    </>
  );
}
