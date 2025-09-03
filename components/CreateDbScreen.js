/**
 * Tela para verificar/criar o banco de dados.
 * Testa a conexão com o banco 'meu_banco.db' e exibe o status.
 */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function CreateDbScreen() {
  // Estado para exibir o status da conexão
  const [status, setStatus] = useState('Verificando conexão com o banco de dados...');

  // Efeito para testar a conexão com o banco
  useEffect(() => {
    async function testarConexao() {
      try {
        const db = await SQLite.openDatabaseAsync('meu_banco.db');
        // Executa um comando simples para verificar a conexão
        await db.execAsync('PRAGMA user_version;');
        setStatus('✅ Conexão com o banco de dados estabelecida com sucesso!');
      } catch (error) {
        console.error('Erro na conexão:', error);
        setStatus('❌ Erro ao conectar com o banco de dados. Veja o log para mais detalhes.');
      }
    }
    testarConexao();
  }, []); // Executa apenas na montagem do componente

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Demonstração de SQLite</Text>
      <Text style={styles.statusText}>{status}</Text>
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
    fontSize: 16,
    color: '#6200ea',
    textAlign: 'center',
  },
});