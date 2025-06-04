import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createAluno } from '../../src/services/alunoService';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CadastroAlunoScreen() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [dataNasc, setDataNasc] = useState<Date>(new Date());
  const [curso, setCurso] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);


  const handleSubmit = async () => {
    if (!nome || !cpf || !email || !dataNasc) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      await createAluno({
        nome,
        cpf,
        email,
        dataNasc: dataNasc.toISOString(), // Aqui continua em ISO para envio à API
        curso,
      });
      Alert.alert('Sucesso', 'Aluno cadastrado com sucesso!');

      setNome('');
      setCpf('');
      setEmail('');
      setDataNasc(new Date());
      setCurso('');
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível cadastrar o aluno.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Aluno</Text>

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
          title={dataNasc.toLocaleDateString('pt-BR')} // ← Aqui a correção
          onPress={() => setShowDatePicker(true)}
        />
      </View>

      <View style={styles.buttonRow}>
        <View style={styles.button}>
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
        </View>
      </View>

      <View style={styles.buttonRow}>
        <View style={styles.button}>
          <Button color="green" title="Cadastrar Aluno" onPress={handleSubmit} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: 'white' },
  title: {
    color: 'green',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    borderTopWidth: 32,
    borderTopColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
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
