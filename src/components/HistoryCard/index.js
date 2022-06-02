/* eslint-disable react/destructuring-assignment */
import React, { useState, useRef } from "react";
import { Text, View, Animated, TouchableOpacity } from "react-native";
import { Button, Chip, Divider } from "react-native-paper";

import { styles } from "./styles";
import { globalStyles } from "../../theme/globalStyles";
import { COLORS } from "../../theme";

export function HistoryCard({ meds }) {
  const [expanded, setExpanded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(new Animated.Value(0)).current;

  const theme = {
    colors: {
      text: "#ffffff",
    },
  };

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: expanded ? 0 : 1,
      duration: 350,
    }).start();
  };

  const collapse = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(heightAnim, {
      toValue: expanded ? 0 : meds.length * 52,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setExpanded(!expanded);
        fadeIn();
        collapse();
      }}
      activeOpacity={1}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Chip
          icon="pill"
          theme={theme}
          textStyle={{ color: "#ffffff" }}
          style={{ backgroundColor: COLORS.GREEN }}
        >
          Ingerido
        </Chip>
        <Text style={[globalStyles.title, styles.title]}>08:00</Text>
      </View>
      <View />
      <Button type="outlined" color={COLORS.GRAY_PRIMARY} style={styles.button}>
        Expandir
      </Button>
      <Animated.View
        style={[
          styles.expand,
          {
            opacity: fadeAnim,
            height: heightAnim,
          },
        ]}
      >
        <Divider style={{ marginVertical: 10 }} />
        {meds.map((item) => (
          <Chip style={{ marginBottom: 10 }} icon="circle-small">
            {item}
          </Chip>
        ))}
      </Animated.View>
    </TouchableOpacity>
  );
}
