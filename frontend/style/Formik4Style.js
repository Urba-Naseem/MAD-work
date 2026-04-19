import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    padding: 20,
    justifyContent: "center"
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#333"
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16
  },

  error: {
    color: "red",
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 13
  },

  btn: {
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden"
  }
});
export default styles;