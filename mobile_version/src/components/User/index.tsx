import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";

interface propsUser{
    name: string
    onRemove: () => void;
}

export function User(props: propsUser) {
    return (
        <View style={styles.container}>
            <Text style={styles.name}> 
                { props.name }
            </Text>
            <TouchableOpacity style={styles.button} onPress={props.onRemove}>
                <Text style={styles.buttonText}> - </Text> 
            </TouchableOpacity>
        </View>
    );
}
