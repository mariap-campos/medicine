import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Home from "../../assets/icons/home.png";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";

export function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image source={Home} style={styles.logo} />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => loginNavigation.navigate("Login")}>
        <Image source={{ uri: user?.avatar_url }} style={styles.avatar} />
      </TouchableOpacity> */}
    </View>
  );
}
