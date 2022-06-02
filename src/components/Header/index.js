import React, { useState } from "react";
import { Image, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Appbar,
  Button,
  Dialog,
  Divider,
  IconButton,
  Menu,
  Portal,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../assets/icons/logo.png";

import { COLORS } from "../../theme";
import { styles } from "./styles";

export function Header({ subtitle, updateHome }) {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [dialog, setDialog] = useState(false);

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      updateHome();
      setDialog(false);
    } catch (err) {
      console.log("ERRO AO LIMPAR STORAGE");
    }
  };

  return (
    <>
      <Portal>
        <Dialog visible={dialog} onDismiss={() => setDialog(false)}>
          <Dialog.Title>Limpar todos os dados do aplicativo?</Dialog.Title>
          <Dialog.Content>
            <Text>
              Esta ação limpará todos os dados salvos no aplicativo e não poderá
              ser desfeita
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button color={COLORS.GRAY_DARK} onPress={() => setDialog(false)}>
              Cancelar
            </Button>
            <Button color={COLORS.LIGHT_BLUE} onPress={() => clearStorage()}>
              Apagar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Appbar.Header
        style={{
          backgroundColor: COLORS.LIGHT_BLUE,
          height: 80,
        }}
      >
        <Image
          source={Logo}
          style={{ width: 60, height: 45, marginLeft: 15 }}
        />
        <Appbar.Content title="Dispensador" subtitle={subtitle} />

        <Menu
          style={{ marginRight: 30, marginTop: 40 }}
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              color={COLORS.WHITE}
              onPress={() => setVisible(true)}
            />
          }
        >
          <Menu.Item
            icon="help-circle-outline"
            onPress={() => {}}
            title="Ajuda"
          />
          <Divider />
          <Menu.Item
            icon="delete"
            onPress={() => setDialog(!dialog)}
            title="Limpar Dados"
          />
        </Menu>
      </Appbar.Header>
      <View style={styles.bottomNavigation}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <IconButton icon="home" color={COLORS.WHITE} size={25} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("History")}>
          <IconButton icon="history" color={COLORS.WHITE} size={25} />
          <Text style={styles.navText}>Histórico</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
