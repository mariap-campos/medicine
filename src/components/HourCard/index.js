/* eslint-disable react/destructuring-assignment */
import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import { Button, Dialog, IconButton, Portal } from "react-native-paper";
import Pills from "../../assets/icons/medicine.png";
import { COLORS, FONTS } from "../../theme";

import { styles } from "./styles";
import { globalStyles } from "../../theme/globalStyles";

export function HourCard({ hour, name, deleteHour, loading }) {
  const [visible, setVisible] = useState();
  return (
    <View style={styles.card} key={hour}>
      <View style={styles.logoBack}>
        <Image source={Pills} style={styles.logo} />
      </View>

      <Text style={[globalStyles.text, { marginTop: 6, marginLeft: 10 }]}>
        {name} ás{" "}
        <Text style={[globalStyles.text, { fontFamily: FONTS.BOLD }]}>
          {hour}
        </Text>
      </Text>
      <IconButton
        icon="trash-can-outline"
        color={COLORS.RED}
        style={{ marginLeft: 10, marginTop: -2 }}
        size={24}
        onPress={() => setVisible(true)}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Apagar rotina?</Dialog.Title>
          <Dialog.Content>
            <Text>
              Tem certeza que deseja apagar a rotina das {hour} para o remédio{" "}
              {name}?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button color={COLORS.GRAY_DARK} onPress={() => setVisible(false)}>
              Cancelar
            </Button>
            <Button
              color={COLORS.LIGHT_BLUE}
              loading={loading}
              onPress={() => {
                deleteHour(hour);
                setVisible(false);
              }}
            >
              Apagar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
