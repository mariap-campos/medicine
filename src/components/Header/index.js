import React from "react";
import { Image } from "react-native";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../assets/icons/logo.png";

import { COLORS } from "../../theme";

// const MORE_ICON = "dots-vertical";

export function Header({ subtitle, hasBackButton }) {
  const navigation = useNavigation();

  return (
    <Appbar.Header
      style={{
        backgroundColor: COLORS.LIGHT_BLUE,
        height: 80,
      }}
    >
      {hasBackButton && (
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
      )}

      <Image
        source={Logo}
        style={{ width: 60, height: 45, marginLeft: !hasBackButton ? 15 : 0 }}
      />
      <Appbar.Content title="Dispensador" subtitle={subtitle} />
      {/* <Appbar.Action icon={MORE_ICON} onPress={() => {}} /> */}
    </Appbar.Header>
  );
}
