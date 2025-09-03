/**
 * Tela para criar a tabela 'funcionarios' no banco de dados.
 * Inclui um botão para executar a criação da tabela.
 */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function CreateTableScreen() {
  // Estados para mensagem de status e conexão com o banco
  const [mensagem, setMensagem] = useState('Inicializando o banco de dados...');
  const [db, setDb] = useState(null);

  // Efeito para inicializar o banco de dados
  useEffect(() => {
    async function setupDatabase() {
      try {
        const database = await SQLite.openDatabaseAsync('meu_banco.db');
        setDb(database);
        setMensagem('✅ Conexão com o banco de dados estabelecida.');
      } catch (error) {
        console.error('Erro ao conectar com o banco de dados:', error);
        setMensagem('❌ Erro ao conectar com o banco de dados.');
      }
    }
    setupDatabase();
  }, []); // Executa apenas na montagem do componente

  // Função para criar a tabela 'funcionarios'
  const criarTabela = async () => {
    if (!db) {
      setMensagem('❌ O banco de dados não está pronto.');
      Alert.alert('Erro', 'Banco de dados não foi inicializado.');
      return;
    }
    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS funcionarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          salario REAL NOT NULL,
          cargo TEXT NOT NULL
        );
      `);
      setMensagem('✅ Tabela "funcionarios" criada com sucesso!');
      Alert.alert('Sucesso', 'Tabela "funcionarios" criada!');
    } catch (error) {
      console.error('Erro ao criar tabela:', error);
      setMensagem('❌ Erro ao criar a tabela. Veja o log.');
      Alert.alert('Erro', 'Falha ao criar a tabela.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Tabela no Banco de Dados</Text>
      <Button
        title="Criar Tabela Funcionários"
        onPress={criarTabela}
        disabled={!db}
        color="#6200ea"
      />
      <Text style={styles.statusText}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  statusText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#6200ea',
  },
});