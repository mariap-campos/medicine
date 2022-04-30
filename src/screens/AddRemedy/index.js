import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";
import { Header } from "../../components/Header";
import "react-native-get-random-values";
import { COLORS } from "../../theme";
import { globalStyles } from "../../theme/globalStyles";
import { styles } from "./styles";
import useSnackBar from "../../hooks/useSnackbar";

export function AddRemedy() {
  const navigation = useNavigation();
  const [name, setName] = useState();
  const [loading, setLoading] = useState(false);
  const { addSnackbar } = useSnackBar();

  // eslint-disable-next-line consistent-return
  const getList = async () => {
    try {
      const list = await AsyncStorage.getItem("PILLS");
      if (list) {
        return JSON.parse(list);
      }
      return [];
    } catch (err) {
      console.debug(err);
    }
  };

  const saveRemedy = async (remedyName) => {
    setLoading(true);
    const newRemedy = {
      name: remedyName,
      id: uuidv4(),
      hours: [],
    };
    try {
      const existingList = await getList();

      if (existingList.length === 6) {
        setLoading(false);
        addSnackbar(`Já existe um limite máximo de 6 remédios cadastrados`);
        return;
      }

      const updatedList = [...existingList, newRemedy]; // notice the newData here
      await AsyncStorage.setItem("PILLS", JSON.stringify(updatedList));
      setLoading(false);
      addSnackbar(`${remedyName} adicionado com sucesso`);
      navigation.navigate("Home");
    } catch (err) {
      addSnackbar(`Erro ao adicionar remédio`);
    }
  };

  return (
    <>
      <Header subtitle="Adicionar Remédio" hasBackButton />
      <ScrollView>
        <View style={styles.container}>
          <Text style={[globalStyles.title, styles.title]}>
            Adicionar Remédio
          </Text>
          <TextInput
            label="Nome do Remédio"
            value={name}
            activeUnderlineColor={COLORS.LIGHT_BLUE}
            onChangeText={(text) => setName(text)}
          />
          <Button
            icon="content-save"
            color={COLORS.LIGHT_BLUE}
            style={{ marginTop: 30 }}
            mode="contained"
            loading={loading}
            onPress={() => saveRemedy(name)}
          >
            Adicionar
          </Button>
        </View>
      </ScrollView>
    </>
  );
}
