import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ScrollView, FlatList, Alert } from 'react-native';
import { styles, HighLightCards } from './styles';
import { HighLightCard } from '../../components/HighlightCard';

export function Home() {
    const [names, setNames] = useState<string[]>([])
    const [ newName, setNewName] = useState('')

    function handleAddName(){
        if(names.includes(newName)){
            return Alert.alert("Name já existe", "Este name já está presente na lista");
        }

        setNames( prevState => [...prevState, newName])
        setNewName('')
    }

    function handleRemoveName(nameSelected: string){
        Alert.alert("Remover", `Deseja remover o participante ${nameSelected}?`, [
            {
                text: 'Sim',
                onPress: () => setNames(prevState => prevState.filter(name => name !== nameSelected))
            },
            {
                text: 'Não',
            },
        ])
    }

    return (
        <View style={styles.container}>
     

            <View style={styles.form}>
                <TextInput 
                    style={styles.input}
                    placeholder='Digite o seu nome'
                    placeholderTextColor={'#300570'}
                    onChangeText={setNewName}
                    value={newName}
                />
                <TouchableOpacity style={styles.button} onPress={handleAddName}>
                    <Text style={styles.buttonText}> Adicionar </Text> 
                </TouchableOpacity>
         
            </View>

            <FlatList 
                data={names}
                keyExtractor={item => item}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) =>(
                    <Text>name</Text>
                )}
                ListEmptyComponent={() => (
                    <Text>Nenhum nome adicionado</Text>
                )}
            />

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                { names.map((name, index) =>(
                    <Text>name</Text>
                ))}
            </ScrollView>
        </View>
    );
}
