import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        width: '90%',
        backgroundColor: '#17003a',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 5,
        margin: 10
    },
    name:{
        flex: 1,
        color: '#FFF',
        fontSize: 20,
    }, 
    button:{
        width: 56,
        height: 56,
        borderRadius: 5,
        backgroundColor: '#e23c44',
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText:{
        color: '#FFF',
        fontSize: 18,
    }
  });