/* eslint-disable consistent-return */
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, View, Text, Image } from "react-native";
import { format, isAfter, parse } from "date-fns";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  TextInput,
  Button,
  ActivityIndicator,
  IconButton,
  Divider,
  Portal,
  Dialog,
} from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animation from "../../assets/icons/filling-cup-animation.gif";
import { Header } from "../../components/Header";
import "react-native-get-random-values";
import { COLORS, FONTS } from "../../theme";
import { globalStyles } from "../../theme/globalStyles";
import { styles } from "./styles";
import useSnackBar from "../../hooks/useSnackbar";

import { HourCard } from "../../components/HourCard";

export function EditRoutine({ route }) {
  const { itemId, itemName, itemDispenser, itemIndex } = route.params;
  const { addSnackbar } = useSnackBar();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [pills, setPills] = useState();
  const [inputError, setInputError] = useState();
  const [hoursError, setHoursError] = useState();
  const [name, setName] = useState(itemName);
  const [routine, setRoutine] = useState();
  const [updatedHours, setUpdatedHours] = useState([]);
  const [time, setTime] = useState(format(new Date(), "HH:mm"));

  const getList = async () => {
    try {
      const list = await AsyncStorage.getItem("PILLS");
      if (list) {
        setPills(JSON.parse(list));
        const index = JSON.parse(list).findIndex((item) => item.id === itemId);
        setUpdatedHours(
          JSON.parse(list)[index].hours.sort((a, b) =>
            isAfter(
              parse(a, "HH:mm", new Date()),
              parse(b, "HH:mm", new Date())
            )
          )
        );
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
    getHours();
    getList();
  }, []);

  const saveRemedy = async () => {
    try {
      const newItem = {
        dispenser: itemDispenser,
        hours: updatedHours,
        id: itemIndex,
        name,
      };

      pills[itemIndex] = newItem;
      await AsyncStorage.setItem("PILLS", JSON.stringify(pills));
      await AsyncStorage.setItem("HOURS", JSON.stringify(routine));

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
      setUpdatedHours(
        [...updatedHours, time].sort((a, b) =>
          isAfter(parse(a, "HH:mm", new Date()), parse(b, "HH:mm", new Date()))
        )
      );

      if (routine.some((item) => item.hour === time)) {
        const index = routine.findIndex((item) => item.hour === time);

        routine[index].pills = [...routine[index].pills, { name, id: itemId }];
        setRoutine(routine);
      } else {
        const newHour = {
          hour: time,
          pills: [{ name, id: itemId }],
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

  const deleteRemedy = async () => {
    setLoading(true);
    try {
      pills[itemIndex] = {
        dispenser: itemDispenser,
        hours: [],
        id: itemIndex,
        name: null,
      };

      routine.forEach((item, index) => {
        const removedRoutine = item.pills.filter((i) => i.id !== itemId);
        routine[index].pills = removedRoutine;
      });

      routine.forEach((item, index) => {
        if (item.pills.length === 0) {
          routine.splice(index, 1);
        }
      });

      await AsyncStorage.setItem("PILLS", JSON.stringify(pills));
      await AsyncStorage.setItem("HOURS", JSON.stringify(routine));
      setLoading(false);
      navigation.navigate("Home");
      addSnackbar(`${itemName} apagado com sucesso`);
    } catch (err) {
      addSnackbar(`Erro ao apagar ${itemName}. Tente novamente`);
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
      <Portal>
        <Dialog
          visible={deleteVisible}
          onDismiss={() => setDeleteVisible(false)}
        >
          <Dialog.Title>Apagar {itemName}?</Dialog.Title>
          <Dialog.Content>
            <Text>
              Tem certeza que deseja apagar este remédio? Esta ação excluirá
              todas as rotinas dele.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              color={COLORS.GRAY_DARK}
              onPress={() => setDeleteVisible(false)}
            >
              Cancelar
            </Button>
            <Button
              color={COLORS.LIGHT_BLUE}
              loading={loading}
              onPress={() => {
                deleteRemedy();
                setDeleteVisible(false);
              }}
            >
              Apagar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog visible={modalVisible} onDismiss={() => setModalVisible(false)}>
          <Dialog.Title>
            {name} - Dispenser {itemDispenser}
          </Dialog.Title>
          <Image source={Animation} style={styles.animation} />
          <Dialog.Content>
            <Text
              style={[
                globalStyles.text,
                { marginTop: 20, textAlign: "justify" },
              ]}
            >
              Ao clicar em salvar, não se esqueca de adicionar o remédio{" "}
              <Text style={{ fontFamily: FONTS.BOLD }}>{name}</Text> no
              <Text style={{ fontFamily: FONTS.BOLD }}>
                {" "}
                Dispenser {itemDispenser}{" "}
              </Text>
              de se dispenser automatico
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              color={COLORS.GRAY_DARK}
              onPress={() => setModalVisible(false)}
            >
              Cancelar
            </Button>
            <Button color={COLORS.LIGHT_BLUE} onPress={() => saveRemedy()}>
              Salvar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Header subtitle="Editar Rotina" hasBackButton />
      <ScrollView>
        <View style={styles.container}>
          <Text style={[globalStyles.title, styles.title]}>
            {itemName
              ? `Editar Remédio - Dispenser ${itemDispenser}`
              : `Novo Remédio - Dispenser ${itemDispenser}`}
          </Text>
          <TextInput
            label="Nome do Remédio"
            value={name}
            error={inputError}
            activeUnderlineColor={COLORS.LIGHT_BLUE}
            onChangeText={(text) => setName(text)}
          />
          {inputError && (
            <Text style={[globalStyles.text, { color: COLORS.RED }]}>
              Nome do remédio não pode ser nulo
            </Text>
          )}
          <Text style={[globalStyles.text, { marginTop: 30 }]}>
            Selecione os horários
          </Text>
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
              name={name}
              deleteHour={deleteRoutine}
              loading={loading}
            />
          ))}
          {hoursError && (
            <Text style={[globalStyles.text, { color: COLORS.RED }]}>
              É preciso cadastrar pelo menos um horário
            </Text>
          )}
          <View style={globalStyles.flex}>
            {itemName && (
              <Button
                icon="delete"
                color={COLORS.GRAY_PRIMARY}
                style={{ marginTop: 30, marginRight: 16, flex: 1 }}
                mode="contained"
                loading={loading}
                onPress={() => {
                  setDeleteVisible(true);
                }}
              >
                Apagar
              </Button>
            )}
            <Button
              icon="content-save"
              color={COLORS.LIGHT_BLUE}
              style={{ marginTop: 30, flex: 1 }}
              mode="contained"
              loading={loading}
              onPress={() => {
                if (name === "" || name === null) {
                  setInputError(true);
                } else {
                  setInputError(false);
                }
                if (updatedHours.length === 0) {
                  setHoursError(true);
                } else {
                  setHoursError(false);
                }

                if (name === "" || name === null || updatedHours.length === 0)
                  return;

                if (itemName) {
                  saveRemedy();
                } else {
                  setModalVisible(true);
                }
              }}
            >
              Salvar
            </Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
