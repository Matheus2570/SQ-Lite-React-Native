import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function MaintenanceScreen() {
  // Estado para armazenar a conexão com o banco de dados
  const [db, setDb] = useState(null);
  // Estado para os resultados da consulta
  const [results, setResults] = useState([]);
  // Estados para os campos de pesquisa
  const [searchText, setSearchText] = useState('');
  const [salarioMinimo, setSalarioMinimo] = useState('');
  // Estado para mensagem de status
  const [msg, setMsg] = useState('Preencha os campos e use os botões.');

  // Efeito para inicializar o banco de dados
  useEffect(() => {
    async function setupDatabase() {
      try {
        const database = await SQLite.openDatabaseAsync('meu_banco.db');
        setDb(database);
        await database.execAsync(`
          CREATE TABLE IF NOT EXISTS funcionarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            salario REAL NOT NULL,
            cargo TEXT NOT NULL
          );
        `);
        setMsg('✅ Banco de dados e tabela prontos!');
      } catch (error) {
        console.error('Erro ao conectar ou criar tabela:', error);
        setMsg('❌ Erro ao inicializar o banco. Veja o log.');
        Alert.alert('Erro', 'Não foi possível conectar ao banco de dados.');
      }
    }
    setupDatabase();
  }, []); // Executa apenas na montagem do componente

  // Função genérica para executar consultas SQL
  const executarConsulta = async (query, params = []) => {
    if (!db) {
      Alert.alert('Erro', 'O banco de dados não está pronto.');
      return;
    }
    try {
      const rows = await db.getAllAsync(query, params);
      setResults(rows);
      if (rows.length === 0) {
        Alert.alert('Aviso', 'Nenhum resultado encontrado.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha na consulta. Verifique o console.');
      console.error('Erro na consulta:', error);
    }
  };

  // Função para exibir todos os funcionários
  const exibirTodos = async () => {
    await executarConsulta('SELECT * FROM funcionarios;');
  };

  // Função para pesquisar por nome
  const pesquisarNome = async () => {
    if (!searchText.trim()) {
      Alert.alert('Aviso', 'Digite um nome para pesquisar.');
      return;
    }
    await executarConsulta('SELECT * FROM funcionarios WHERE nome LIKE ?;', [`%${searchText}%`]);
  };

  // Função para pesquisar por salário mínimo
  const pesquisarSalario = async () => {
    const minSalario = parseFloat(salarioMinimo);
    if (isNaN(minSalario)) {
      Alert.alert('Aviso', 'Digite um número válido para o salário.');
      return;
    }
    await executarConsulta('SELECT * FROM funcionarios WHERE salario >= ?;', [minSalario]);
  };

  // Função para pesquisar por cargo
  const pesquisarCargo = async () => {
    if (!searchText.trim()) {
      Alert.alert('Aviso', 'Digite um cargo para pesquisar.');
      return;
    }
    await executarConsulta('SELECT * FROM funcionarios WHERE cargo LIKE ?;', [`%${searchText}%`]);
  };

  // Renderização de cada item da lista
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>ID: {item.id}</Text>
      <Text style={styles.itemText}>Nome: {item.nome}</Text>
      <Text style={styles.itemText}>Salário: R${item.salario.toFixed(2)}</Text>
      <Text style={styles.itemText}>Cargo: {item.cargo}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Manutenção do Banco</Text>
        <Text style={styles.msg}>{msg}</Text>

        {/* Seção de pesquisa */}
        <Text style={styles.section}>Pesquisar Funcionários</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome ou Cargo"
            value={searchText}
            onChangeText={setSearchText}
          />
          <TextInput
            style={styles.input}
            placeholder="Salário Mínimo"
            keyboardType="numeric"
            value={salarioMinimo}
            onChangeText={setSalarioMinimo}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Exibir Todos" onPress={exibirTodos} disabled={!db} color="#6200ea" />
          <Button title="Pesquisar Nome" onPress={pesquisarNome} disabled={!db} color="#6200ea" />
          <Button title="Salários Acima de" onPress={pesquisarSalario} disabled={!db} color="#6200ea" />
          <Button title="Pesquisar Cargo" onPress={pesquisarCargo} disabled={!db} color="#6200ea" />
        </View>
        <FlatList
          style={styles.list}
          data={results}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 40,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  section: {
    marginTop: 12,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#6200ea',
  },
  searchContainer: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#6200ea',
    borderRadius: 6,
    padding: 8,
    marginVertical: 6,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 10,
    marginBottom: 20,
  },
  list: {
    width: '100%',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#eee',
    borderWidth: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  msg: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
});