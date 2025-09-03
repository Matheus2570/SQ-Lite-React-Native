/**
 * Arquivo principal da aplicação.
 * Configura o Stack Navigator para navegação entre as telas.
 * Inclui a tela Home e as demais telas de funcionalidades.
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeTela';
import CreateDbScreen from './components/CriandoDBTela.js';
import CreateTableScreen from './components/CriandoTebelaTela';
import InsertScreen from './components/InserirTela';
import MaintenanceScreen from './components/MainTela';

// Criando o Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    // Container principal da navegação
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#6200ea' }, // Cor de fundo do cabeçalho
          headerTintColor: '#fff', // Cor do texto do cabeçalho
          headerTitleStyle: { fontWeight: 'bold' }, // Estilo do título
        }}
      >
        {/* Tela inicial com botões de navegação */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Gerenciamento de Funcionários' }}
        />
        {/* Tela para criar/verificar o banco de dados */}
        <Stack.Screen
          name="CriarBanco"
          component={CreateDbScreen}
          options={{ title: 'Criar Banco de Dados' }}
        />
        {/* Tela para criar a tabela */}
        <Stack.Screen
          name="CriarTabela"
          component={CreateTableScreen}
          options={{ title: 'Criar Tabela' }}
        />
        {/* Tela para inserir novos funcionários */}
        <Stack.Screen
          name="Inserir"
          component={InsertScreen}
          options={{ title: 'Adicionar Funcionário' }}
        />
        {/* Tela para manutenção (pesquisar, atualizar, deletar, etc.) */}
        <Stack.Screen
          name="Manutencao"
          component={MaintenanceScreen}
          options={{ title: 'Manutenção do Banco' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
