import React, { useState, useEffect } from "react";
import { Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MotiView, AnimatePresence } from "moti";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Dialog, Portal } from "react-native-paper";
import Plus from "../../assets/icons/plus.png";
import { COLORS } from "../../theme";

import { styles } from "./styles";

export function AddButton({ updateHome }) {
  const [menu, setMenu] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const updateList = navigation.addListener("focus", () => {
      setMenu(false);
    });

    return updateList;
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setMenu(!menu)}>
        <Image source={Plus} style={styles.logo} />
      </TouchableOpacity>
      <AnimatePresence>
        {menu && (
          <MotiView
            key="menu"
            style={styles.menu}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 20 }}
            transition={{ type: "timing", duration: 300 }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("AddRemedy")}>
              <Text
                style={[
                  styles.menuOption,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.GRAY_PRIMARY,
                  },
                ]}
              >
                Adicionar Remédio
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisible(true)}>
              <Text style={styles.menuOption}>Limpar Dados</Text>
            </TouchableOpacity>
            <Portal>
              <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                <Dialog.Title>
                  Limpar todos os dados do aplicativo?
                </Dialog.Title>
                <Dialog.Content>
                  <Text>
                    Esta ação limpará todos os dados salvos no aplicativo e não
                    poderá ser desfeita
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
                    onPress={() => {
                      AsyncStorage.clear();
                      updateHome();
                      navigation.navigate("Home");
                      setVisible(false);
                    }}
                  >
                    Apagar
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </MotiView>
        )}
      </AnimatePresence>
    </View>
  );
}
