import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, router } from 'expo-router';

export default function ConfiguracoesScreen() {
    const [ip, setIp] = useState('');

    useEffect(() => {
        const carregarIp = async () => {
            const ipSalvo = await AsyncStorage.getItem('API_IP');
            if (ipSalvo) setIp(ipSalvo);
        };
        carregarIp();
    }, []);

    const salvarIp = async () => {
        if (!ip.match(/^(\d{1,3}\.){3}\d{1,3}$/)) {
            Alert.alert('Erro', 'IP inválido. Use o formato: 192.168.0.1');
            return;
        }

        try {
            await AsyncStorage.setItem('API_IP', ip);
            Alert.alert('Sucesso', 'Endereço IP atualizado.');
            router.back();
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível salvar o IP.');
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Configurações' }} />
            <Text style={styles.label}>Endereço IP da API:</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: 192.168.0.10"
                value={ip}
                onChangeText={setIp}
                keyboardType="numeric"
            />

            <View style={styles.buttonRow}>
                <View style={styles.button}>
                    <Button title="Salvar" color='green' onPress={salvarIp} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    label: { fontSize: 18, marginBottom: 8 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 12,
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 8,
        overflow: 'hidden',
    },
});
