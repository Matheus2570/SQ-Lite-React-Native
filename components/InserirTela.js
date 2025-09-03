/**
 * Tela para inserir novos funcionários na tabela.
 * Inclui campos para nome, salário e cargo.
 */
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';

// Função para abrir a conexão com o banco
async function openDb() {
  const db = await SQLite.openDatabaseAsync('meu_banco.db');
  return db;
}

export default function InsertScreen() {
  // Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [salario, setSalario] = useState('');
  const [cargo, setCargo] = useState('');

  // Função para adicionar um novo funcionário
  const adicionarFuncionario = async () => {
    if (!nome.trim() || !salario.trim() || !cargo.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    try {
      const conn = await openDb();
      await conn.runAsync(
        'INSERT INTO funcionarios (nome, salario, cargo) VALUES (?, ?, ?);',
        [nome, parseFloat(salario), cargo]
      );
      Alert.alert('Sucesso', 'Funcionário adicionado com sucesso!');
      setNome('');
      setSalario('');
      setCargo('');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao adicionar funcionário.');
      console.error('Erro ao inserir:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Adicionar Novo Funcionário</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Funcionário"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Salário"
        keyboardType="numeric"
        value={salario}
        onChangeText={setSalario}
      />
      <TextInput
        style={styles.input}
        placeholder="Cargo"
        value={cargo}
        onChangeText={setCargo}
      />
      <Button
        title="Adicionar Funcionário"
        onPress={adicionarFuncionario}
        color="#6200ea"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#6200ea',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});