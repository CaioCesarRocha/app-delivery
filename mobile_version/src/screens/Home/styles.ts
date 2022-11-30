import { StyleSheet } from "react-native";
import styled from "styled-components/native";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    info:{
      color: '#751aff',
      fontSize: 35
    },
    form:{
        width: '100%',
        flexDirection: 'row',
        padding: 5,
    },
    input:{
        flex: 1,
        height: 56,
        backgroundColor: '#ececec',
        borderRadius: 10,
        padding: 10,
        fontFamily: 'bold',
        marginRight: 12,
        fontSize: 18
    },
    button:{      
        width: 120,
        height: 56,
        borderRadius: 5,
        backgroundColor: '#31CF67',
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText:{
        color: '#FFF',
        fontSize: 18,
    },

    scrollView:{
        width: '100%',
    }
  });


  export const HighLightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: {paddingHorizontal: 24}
  })``;
  

