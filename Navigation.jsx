import { NavigationContainer } from '@react-navigation/native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Icon } from '@rneui/themed'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { navigationRef } from './RootNavigation';

import LoginScreen from "./src/views/login";
import RegisScreen from "./src/views/register";
import InventoryScreen from "./src/views/inventory";
import RecordsScreen from "./src/views/records";
import UniformsScreen from "./src/views/uniforms";
import MaterialScreen from "./src/views/material";
import MaterialSalidaScreen from "./src/views/salidaMaterial";
import MaterialEntradaScreen from "./src/views/entradaMaterial";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Navigation = () => {
    
    return (
      <NavigationContainer ref={navigationRef}>      
      <Stack.Navigator 
        initialRouteName="Login" 
        screenOptions={{
          headerMode: 'screen',
          headerTintColor: 'White',
          headerStyle: { backgroundColor: '#ff9116' },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={RegisScreen} options={{headerShown:false}}/>

        <Stack.Screen name="Inventario" component={TabNavigator} initialParams={{ screen: "Inventario" }} options={{headerShown:false}}/>
        <Stack.Screen name="NewMaterial" component={MaterialScreen} options={{headerShown:false}}/>
        <Stack.Screen name="NewMaterialSalida" component={MaterialSalidaScreen} options={{headerShown:false}}/>
        <Stack.Screen name="NewMaterialEntrada" component={MaterialEntradaScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
      
    </NavigationContainer>
    );
}
function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: { backgroundColor: '#FFFFFF', flex:0.1,},
      tabBarActiveTintColor: '#A35709' ,
      tabBarInactiveTintColor: "#000000",
      tabBarActiveBackgroundColor:'#F2F4F4',
      headerTitle: () => <CustomHeader />
    }}>
      <Tab.Screen name="Inventario" component={InventoryScreen} options={{headerShown:false, 
        tabBarIcon: ({ focused, color, size }) => (
          <Icon name="home" type='font-awesome' size={25} color="#000000" />
        ),}}/>
      <Tab.Screen name="Registros" component={RecordsScreen} options={{headerShown:false,
        tabBarIcon: ({ focused, color, size }) => (
          <Icon name="pencil-square-o" type='font-awesome' size={25} color="#000000" />
        ),}}/>
      <Tab.Screen name="Uniformes" component={UniformsScreen} options={{headerShown:false, 
        tabBarIcon: ({ focused, color, size }) => (
          <Icon name="skin" type='antdesign' size={25} color="#000000" />
        ),}}/>
      <Tab.Screen name="Perfil" component={RecordsScreen} options={{headerShown:false, 
        tabBarIcon: ({ focused, color, size }) => (
          <Icon name="user" type='font-awesome' size={25} color="#000000" />
        ),}}/>
    </Tab.Navigator>
  );
}
export default Navigation;