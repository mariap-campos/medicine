import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  title: {
    marginBottom: 20,
  },
  selectTime: {
    display: "flex",
    flexDirection: "row",
  },
  ghostView: {
    width: 100,
    height: 65,
    position: "absolute",
    zIndex: 5,
  },
  button: {
    width: 100,
    height: 65,
  },
  icon: {
    backgroundColor: COLORS.LIGHT_BLUE,
    width: 40,
    height: 40,
    borderRadius: 30,
    marginTop: 14,
    marginLeft: 14,
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
  card: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
  },
  animation: {
    display: "flex",
    alignSelf: "center",
    width: 100,
    height: 112,
    marginVertical: 15,
  },
});
