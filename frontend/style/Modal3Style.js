import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2f5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modal:  {
    animationType: 'slide',
  },
  modalStyle: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    margin: 20,
    borderRadius: 15,
  },

  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#E26517",
    marginBottom: 18,
    textAlign: "center",
  },

  content: {
    fontSize: 17,
    color: "#555",
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 30,
    paddingHorizontal: 10,
  },

  button: {
    width: "70%",
    marginTop: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
});
export default styles;