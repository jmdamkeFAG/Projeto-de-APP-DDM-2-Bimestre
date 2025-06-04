import { useCallback, useEffect, useState } from 'react';
import {
  View, Text, FlatList, ActivityIndicator, StyleSheet,
  TouchableOpacity, Button, Alert, TextInput
} from 'react-native';
import { getAlunos, deleteAluno, Aluno } from '../../src/services/alunoService';
import { router, Stack, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [alunoSelecionado, setAlunoSelecionado] = useState<string | null>(null);
  const [acessoLiberado, setAcessoLiberado] = useState(false);
  const [senhaDigitada, setSenhaDigitada] = useState('');
  const [usuarioDigitado, setUsuarioDigitado] = useState('');
  const [menuVisivel, setMenuVisivel] = useState(false);

  const carregarAlunos = async () => {
    try {
      const data = await getAlunos();
      setAlunos(data);
    } catch (error) {
      console.error('Erro ao carregar alunos. Tente alterar o endereco IP da API nas configuracoes.', error, );
      Alert.alert('Erro', 'Nao foi possivel se conectar com a API. Tente alterar o endereco IP da API nas configuracoes.');
    }
  };

  useEffect(() => {
    const verificarAcesso = async () => {
      const valor = await AsyncStorage.getItem('acessoLiberado');
      if (valor === 'true') {
        setAcessoLiberado(true);
      }
    };
    verificarAcesso();
    carregarAlunos().finally(() => setLoading(false));
  }, []);

  useFocusEffect(useCallback(() => {
    carregarAlunos();
  }, []));

  const confirmarRemocao = (id: string) => {
    Alert.alert(
      'Confirmar remoção',
      'Tem certeza que deseja remover este aluno?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => removerAluno(id),
        },
      ]
    );
  };

  const removerAluno = async (id: string) => {
    try {
      await deleteAluno(id);
      setAlunoSelecionado(null);
      await carregarAlunos();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover o aluno.');
      console.error(error);
    }
  };

  if (!acessoLiberado) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Realize o login:</Text>
        <TextInput
          style={styles.input}
          value={usuarioDigitado}
          onChangeText={setUsuarioDigitado}
          placeholder="Usuário"
        />
        <TextInput
          style={styles.input}
          value={senhaDigitada}
          onChangeText={setSenhaDigitada}
          placeholder="Senha"
          secureTextEntry
        />
        <Button
          title="Entrar"
          onPress={async () => {
            if (senhaDigitada === 'admin' && usuarioDigitado === 'admin') {
              await AsyncStorage.setItem('acessoLiberado', 'true');
              setAcessoLiberado(true);
            } else {
              Alert.alert('Acesso negado', 'Usuário ou senha incorretos.');
            }
          }}
        />
      </View>
    );
  }

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Lista de Alunos' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Alunos</Text>
        <FlatList
          data={alunos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            const isSelecionado = alunoSelecionado === item.id;

            return (
              <TouchableOpacity
                style={[
                  styles.item,
                  !isSelecionado && alunoSelecionado ? styles.embacado : null
                ]}
                onPress={() =>
                  setAlunoSelecionado(prev => (prev === item.id ? null : item.id))
                }
              >
                <Text style={styles.nome}>{item.nome}</Text>
                <Text>{item.email}</Text>
                <Text>Curso: {item.curso}</Text>

                {isSelecionado && (
                  <View style={styles.detalhes}>
                    <Text>CPF: {item.cpf}</Text>
                    <Text>
                      Data de Nascimento:{' '}
                      {new Date(item.dataNasc).toLocaleDateString('pt-BR')}
                    </Text>

                    <View style={styles.buttonRow}>
                      <View style={styles.button}>
                        <Button
                          title="Alterar"
                          color="green"
                          onPress={() =>
                            router.push({
                              pathname: '/editar',
                              params: {
                                id: item.id,
                                nome: item.nome,
                                cpf: item.cpf,
                                email: item.email,
                                dataNasc: item.dataNasc,
                                curso: item.curso,
                              },
                            })
                          }
                        />
                      </View>
                      <View style={styles.button}>
                        <Button
                          title="Remover"
                          color="red"
                          onPress={() => confirmarRemocao(item.id)}
                        />
                      </View>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
        />

        {menuVisivel && (
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={async () => {
              setAcessoLiberado(false);
              setUsuarioDigitado('');
              setSenhaDigitada('');
              await AsyncStorage.removeItem('acessoLiberado'); // <- Adicione isso!
            }}>
              <Text style={styles.menuItemText}>Sair</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => {
              router.push('../configuracoes');
            }}>
              <Text style={styles.menuItemText}>Configurações</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={styles.fab}
          onPress={() => setMenuVisivel(!menuVisivel)}
        >
          <Text style={styles.fabIcon}>☰</Text>
        </TouchableOpacity>


      </View>
    </>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center' },
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: {
    color: 'green',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    borderTopWidth: 32,
    borderTopColor: 'white',
  },
  item: {
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
  },
  nome: { fontWeight: 'bold', fontSize: 16 },
  detalhes: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 8,
  },
  embacado: {
    opacity: 0.3,
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: 'green',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 10,
  },
  fabIcon: {
    fontSize: 24,
    color: '#fff',
  },
  menu: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    zIndex: 11,
    paddingVertical: 8,
    width: 160,
  },
  menuItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuItemText: {
    fontSize: 16,
  },
});