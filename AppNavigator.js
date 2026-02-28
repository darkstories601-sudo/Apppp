import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../utils/theme';

import AuthScreen         from '../screens/AuthScreen';
import MarketplaceScreen  from '../screens/MarketplaceScreen';
import DashboardScreen    from '../screens/DashboardScreen';
import LibraryScreen      from '../screens/LibraryScreen';
import MoreScreen         from '../screens/MoreScreen';
import CheckoutScreen     from '../screens/CheckoutScreen';
import CoursePlayerScreen from '../screens/CoursePlayerScreen';

const Stack = createNativeStackNavigator();
const Tab   = createBottomTabNavigator();

const TABS = [
  { name:'Marketplace', emoji:'🛒', label:'Explore'   },
  { name:'Dashboard',   emoji:'📊', label:'Dashboard' },
  { name:'Library',     emoji:'📚', label:'Library'   },
  { name:'More',        emoji:'⚙️',  label:'More'      },
];

function CustomTabBar({ state, navigation }) {
  return (
    <View style={{
      flexDirection:'row', backgroundColor:Colors.black2,
      borderTopWidth:1, borderTopColor:Colors.border,
      paddingBottom:28, paddingTop:10,
    }}>
      {state.routes.map((route, i) => {
        const { emoji, label } = TABS.find(t => t.name === route.name) || {};
        const focused = state.index === i;
        return (
          <TouchableOpacity key={route.key} style={{ flex:1, alignItems:'center' }}
            onPress={() => !focused && navigation.navigate(route.name)}>
            <Text style={{ fontSize:22, opacity: focused ? 1 : 0.45 }}>{emoji}</Text>
            <Text style={{ fontSize:10, fontWeight:'600', color: focused ? Colors.red : Colors.grey3, marginTop:3, letterSpacing:0.2 }}>{label}</Text>
            {focused && <View style={{ width:4, height:4, borderRadius:2, backgroundColor:Colors.red, marginTop:3 }} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function Tabs() {
  return (
    <Tab.Navigator tabBar={p => <CustomTabBar {...p} />} screenOptions={{ headerShown:false }}>
      {TABS.map(t => {
        const Screen = { Marketplace:MarketplaceScreen, Dashboard:DashboardScreen, Library:LibraryScreen, More:MoreScreen }[t.name];
        return <Tab.Screen key={t.name} name={t.name} component={Screen} />;
      })}
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown:false, contentStyle:{ backgroundColor:Colors.black } }}>
        <Stack.Screen name="Auth"       component={AuthScreen}         />
        <Stack.Screen name="Main"       component={Tabs}               />
        <Stack.Screen name="Checkout"   component={CheckoutScreen}     options={{ animation:'slide_from_bottom' }} />
        <Stack.Screen name="Player"     component={CoursePlayerScreen} />
        <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
        <Stack.Screen name="Library"    component={LibraryScreen}      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
