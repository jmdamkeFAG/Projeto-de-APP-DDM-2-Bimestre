import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, router } from 'expo-router';
import { updateAluno } from '../src/services/alunoService';

export default function EditarAlunoScreen() {
    const { id, nome: nomeParam, cpf: cpfParam, email: emailParam, dataNasc: dataNascParam, curso: cursoParam } = useLocalSearchParams();

    const [nome, setNome] = useState(nomeParam as string);
    const [cpf, setCpf] = useState(cpfParam as string);
    const [email, setEmail] = useState(emailParam as string);
    const [curso, setCurso] = useState(cursoParam as string);
    const [dataNasc, setDataNasc] = useState<Date>(
        dataNascParam ? new Date(dataNascParam as string) : new Date()
    );
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleSubmit = async () => {
        if (!nome || !cpf || !email || !dataNasc) {
            Alert.alert('Erro', 'Preencha todos os campos.');
            return;
        }

        try {
            await updateAluno(id as string, {
                nome,
                cpf,
                email,
                dataNasc: dataNasc.toISOString(),
                curso,
            });

            Alert.alert('Sucesso', 'Aluno atualizado com sucesso!');
            router.back();
        } catch (err) {
            console.error(err);
            Alert.alert('Erro', 'Não foi possível atualizar o aluno.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Editar aluno</Text>

            <TextInput
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
                style={styles.input}
            />

            <TextInput
                placeholder="CPF"
                value={cpf}
                onChangeText={setCpf}
                style={styles.input}
            />

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.input}
            />

            <TextInput
                placeholder="Curso"
                value={curso}
                onChangeText={setCurso}
                style={styles.input}
            />

            <View style={styles.input}>
                <Text style={{ marginBottom: 6 }}>Data de Nascimento:</Text>
                <Button
                    color="green"
                    title={dataNasc.toLocaleDateString('pt-BR')}
                    onPress={() => setShowDatePicker(true)}
                />
            </View>

            {showDatePicker && (
                <DateTimePicker
                    value={dataNasc}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) setDataNasc(selectedDate);
                    }}
                />
            )}
            <View style={styles.buttonRow}>
                <View style={styles.button}>
                    <Button color="green" title="Salvar Alterações" onPress={handleSubmit} />
                </View>
                <View style={styles.button}>
                    <Button
                          title="Cancelar"
                          color="red"
                          onPress={() => router.push(`/(tabs)`)}
                        />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 16, backgroundColor: '#acd6c3' },
    title: {
        fontSize: 22,
        color: 'green',
        fontWeight: 'bold',
        borderTopWidth: 32,
        marginBottom: 20,
        textAlign: 'center',
        borderTopColor: '#acd6c3',
    },
    input: {
        borderWidth: 1,
        borderColor: '#789587',
        padding: 12,
        marginBottom: 16,
        borderRadius: 6,
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
