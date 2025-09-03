/**
 * Tela inicial da aplicação.
 * Contém quatro botões para navegar às telas de Criar Banco, Criar Tabela,
 * Adicionar Funcionário e Manutenção.
 */
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Funcionários</Text>
      <View style={styles.buttonContainer}>
        {/* Botão para navegar à tela de criar banco */}
        <Button
          title="Criar Banco de Dados"
          onPress={() => navigation.navigate('CriarBanco')}
          color="#6200ea"
        />
        {/* Botão para navegar à tela de criar tabela */}
        <Button
          title="Criar Tabela"
          onPress={() => navigation.navigate('CriarTabela')}
          color="#6200ea"
        />
        {/* Botão para navegar à tela de adicionar funcionário */}
        <Button
          title="Adicionar Funcionário"
          onPress={() => navigation.navigate('Inserir')}
          color="#6200ea"
        />
        {/* Botão para navegar à tela de manutenção */}
        <Button
          title="Manutenção"
          onPress={() => navigation.navigate('Manutencao')}
          color="#6200ea"
        />
      </View>
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
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 15,
    width: '100%',
  },
});