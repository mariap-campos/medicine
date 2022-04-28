import React, { useState, useEffect } from "react";
import { Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MotiView, AnimatePresence } from "moti";
import { useNavigation } from "@react-navigation/native";
import Plus from "../../assets/icons/plus.png";
import { COLORS } from "../../theme";

import { styles } from "./styles";

export function AddButton() {
  const [menu, setMenu] = useState(false);
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
            <TouchableOpacity onPress={() => setMenu(!menu)}>
              <Text style={styles.menuOption}>Editar Rotina</Text>
            </TouchableOpacity>
          </MotiView>
        )}
      </AnimatePresence>
    </View>
  );
}
