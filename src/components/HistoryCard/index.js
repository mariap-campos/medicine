/* eslint-disable react/destructuring-assignment */
import React, { useState, useRef, useEffect } from "react";
import { Text, View, Animated, TouchableOpacity } from "react-native";
import { Chip, Divider, IconButton } from "react-native-paper";
import firebase from "firebase/compat/app";
import { styles } from "./styles";
import { globalStyles } from "../../theme/globalStyles";
import { COLORS } from "../../theme";
import { unformatSlot } from "../../utils/formatSlot";

export function HistoryCard({ hour, meds, date }) {
  const [expanded, setExpanded] = useState(false);
  const [medicine, setMedicine] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(new Animated.Value(0)).current;

  const getMedicine = async () => {
    try {
      firebase
        .database()
        .ref(unformatSlot(meds).toString())
        .on("value", (snapshot) => {
          setMedicine(snapshot.val().nome);
        });
    } catch (err) {
      console.debug(err);
    }
  };

  useEffect(() => {
    getMedicine();
  }, []);

  const theme = {
    colors: {
      text: "#ffffff",
    },
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: expanded ? 0 : 1,
      duration: 350,
      useNativeDriver: false,
    }).start();
  };

  const collapse = () => {
    Animated.timing(heightAnim, {
      toValue: expanded ? 0 : 52,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  if (!medicine) {
    return null;
  }

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
        <Text style={[globalStyles.title, styles.title]}>
          {date} - {hour}
        </Text>
      </View>
      <View />
      <IconButton
        icon={expanded ? "chevron-up" : "chevron-down"}
        size={20}
        style={styles.button}
      />
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
        <Chip style={{ marginBottom: 10 }} icon="circle-small">
          Slot {meds} - {medicine}
        </Chip>
      </Animated.View>
    </TouchableOpacity>
  );
}
