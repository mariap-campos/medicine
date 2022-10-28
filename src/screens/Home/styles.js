import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  title: {
    marginBottom: 10,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    marginTop: 8,
  },
  logoBack: {
    width: 35,
    height: 35,
    backgroundColor: COLORS.GRAY_PRIMARY,
    borderRadius: 20,
  },
  logo: {
    width: 18,
    height: 18,
    marginLeft: 9,
    marginTop: 8,
  },
  name: {
    marginTop: 8,
    marginLeft: 5,
  },
  time: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    marginLeft: -13,
  },
  watchImage: {
    width: 25,
    height: 25,
    marginTop: 1,
    marginRight: 6,
  },
  cardSmall: {
    marginLeft: 30,
    display: "flex",
    flexDirection: "row",
    marginTop: 8,
  },
  empty: {
    marginRight: 30,
    display: "flex",
    flexDirection: "row",
  },
  search: {
    display: "flex",
    flexDirection: "row",
  },
  dropdown: {
    flex: 1,
  },
  subtitle: {
    fontFamily: FONTS.BOLD,
    color: COLORS.LIGHT_BLUE,
    alignSelf: "center",
    marginTop: -20,
  },
  routine: {
    marginLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.GRAY_DARK,
  },
  list: {
    marginTop: 10,
    display: "flex",
  },
  slot: {
    paddingVertical: 10,
    borderWidth: 2,
    width: "49%",
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  info: {
    display: "flex",
    justifyContent: "center",
  },
  infoText: {
    fontSize: 12,
    color: COLORS.GRAY_DARK,
  },
});
