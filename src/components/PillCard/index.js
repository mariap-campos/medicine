/* eslint-disable react/destructuring-assignment */
import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import {
  Button,
  Dialog,
  Divider,
  IconButton,
  Portal,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Pills from "../../assets/icons/medicine.png";
import { COLORS } from "../../theme";
import useSnackBar from "../../hooks/useSnackbar";

import { styles } from "./styles";
import { globalStyles } from "../../theme/globalStyles";

export function PillCard({ pills, routine, pill, updateList }) {
  const { addSnackbar } = useSnackBar();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteRemedy = async () => {
    setLoading(true);
    try {
      const updatedList = pills.filter((obj) => obj.id !== pill.id);

      routine.forEach((item, index) => {
        const removedRoutine = item.pills.filter((i) => i.id !== pill.id);
        routine[index].pills = removedRoutine;
      });

      routine.forEach((item, index) => {
        if (item.pills.length === 0) {
          routine.splice(index, 1);
        }
      });

      await AsyncStorage.setItem("PILLS", JSON.stringify(updatedList));
      await AsyncStorage.setItem("HOURS", JSON.stringify(routine));
      setLoading(false);
      updateList();
      addSnackbar(`${pill.name} apagado com sucesso`);
    } catch (err) {
      addSnackbar(`Erro ao apagar ${pill.name}. Tente novamente`);
    }
  };

  return (
    <View>
      <View style={styles.card}>
        <View style={styles.logoBack}>
          <Image source={Pills} style={styles.logo} />
        </View>
        <Text style={[globalStyles.text, styles.name]}>{pill.name}</Text>
        <IconButton
          icon="trash-can-outline"
          color={COLORS.RED}
          style={{ position: "absolute", right: 0, bottom: -8 }}
          size={24}
          onPress={() => setVisible(true)}
        />
        <IconButton
          icon="clock"
          color={COLORS.LIGHT_BLUE}
          style={{ position: "absolute", right: 45, bottom: -8 }}
          size={24}
          onPress={() =>
            navigation.navigate("EditRoutine", {
              itemId: pill.id,
              itemName: pill.name,
            })
          }
        />
        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Title>Apagar {pill.name}?</Dialog.Title>
            <Dialog.Content>
              <Text>
                Tem certeza que deseja apagar este remédio? Esta ação excluirá
                todas as rotinas dele.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                color={COLORS.GRAY_DARK}
                onPress={() => setVisible(false)}
              >
                Cancelar
              </Button>
              <Button
                color={COLORS.LIGHT_BLUE}
                loading={loading}
                onPress={() => {
                  deleteRemedy();
                  setVisible(false);
                }}
              >
                Apagar
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
      <Divider
        style={{
          marginTop: 8,
          height: 0.8,
          backgroundColor: COLORS.GRAY_PRIMARY,
        }}
      />
    </View>
  );
}
