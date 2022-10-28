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
import { LinearGradient } from "expo-linear-gradient";
import firebase from "firebase/compat/app";
import Logo from "../../assets/icons/logo.png";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

import { COLORS } from "../../theme";
import { styles } from "./styles";

export function Header({ subtitle, updateHome }) {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const clearStorage = async () => {
    try {
      setLoading(true);
      await AsyncStorage.clear();

      const dispenser0 = firebase.database().ref("0");
      const dispenser1 = firebase.database().ref("1");
      const dispenser2 = firebase.database().ref("2");
      const dispenser3 = firebase.database().ref("3");

      dispenser0.set({
        slot: 0,
        quantidade: 0,
        id: 0,
        nome: null,
      });

      dispenser1.set({
        slot: 1,
        quantidade: 0,
        id: 1,
        nome: null,
      });

      dispenser2.set({
        slot: 2,
        quantidade: 0,
        id: 2,
        nome: null,
      });

      dispenser3.set({
        slot: 3,
        quantidade: 0,
        id: 3,
        nome: null,
      });

      updateHome();
      setDialog(false);
      setLoading(false);
    } catch (err) {
      setDialog(false);
      console.log("ERRO AO LIMPAR DADOS");
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
            <Button
              loading={loading}
              color={COLORS.LIGHT_BLUE}
              onPress={() => clearStorage()}
            >
              Apagar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <LinearGradient
        colors={[COLORS.BLUE, COLORS.LIGHT_BLUE]}
        style={styles.container}
      >
        <Appbar.Header
          dark
          style={{
            height: 80,
            backgroundColor: "transparent",
            borderWidth: 0,
            shadowOpacity: 0,
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
      </LinearGradient>
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
