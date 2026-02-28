import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radius } from './theme';

export const Logo = ({ size = 30 }) => (
  <View style={{ flexDirection:'row', alignItems:'center', gap:8 }}>
    <LinearGradient colors={['#FF2D20','#c0150a']} style={{ width:size, height:size, borderRadius:9, alignItems:'center', justifyContent:'center' }}>
      <Text style={{ color:'#fff', fontWeight:'900', fontSize:size*0.42, letterSpacing:-0.5 }}>CC</Text>
    </LinearGradient>
    <Text style={{ fontSize:size*0.65, fontWeight:'800', color:Colors.white, letterSpacing:-1 }}>
      Clip<Text style={{ color:Colors.red }}>Chaos</Text>
    </Text>
  </View>
);

export const Btn = ({ label, onPress, variant='primary', style, loading, icon }) => (
  <TouchableOpacity
    onPress={onPress} activeOpacity={0.8}
    style={[{
      height:50, borderRadius:Radius.md, paddingHorizontal:20,
      flexDirection:'row', alignItems:'center', justifyContent:'center', gap:6,
      backgroundColor: variant==='primary' ? Colors.red : Colors.black3,
      borderWidth: variant==='ghost' ? 1 : 0,
      borderColor: Colors.border,
    }, style]}
  >
    {loading
      ? <ActivityIndicator color="#fff" size="small" />
      : <>
          {icon && <Text style={{ fontSize:16 }}>{icon}</Text>}
          <Text style={{ color:'#fff', fontWeight:'700', fontSize:15, letterSpacing:-0.2 }}>{label}</Text>
        </>
    }
  </TouchableOpacity>
);

export const Card = ({ children, style, onPress }) => {
  const inner = (
    <View style={[{ backgroundColor:Colors.card, borderRadius:Radius.lg, borderWidth:1, borderColor:Colors.border, overflow:'hidden' }, style]}>
      {children}
    </View>
  );
  return onPress ? <TouchableOpacity onPress={onPress} activeOpacity={0.85}>{inner}</TouchableOpacity> : inner;
};

export const Avatar = ({ initials, gradient, size=36 }) => (
  <LinearGradient colors={gradient||[Colors.grey4,Colors.grey3]} style={{ width:size, height:size, borderRadius:size/2, alignItems:'center', justifyContent:'center' }}>
    <Text style={{ color:'#fff', fontWeight:'800', fontSize:size*0.35 }}>{initials}</Text>
  </LinearGradient>
);

export const Badge = ({ label, color=Colors.red }) => (
  <View style={{ paddingHorizontal:9, paddingVertical:3, borderRadius:Radius.full, backgroundColor:color+'22', borderWidth:1, borderColor:color+'44', alignSelf:'flex-start' }}>
    <Text style={{ color, fontSize:11, fontWeight:'700' }}>{label}</Text>
  </View>
);

export const Divider = ({ style }) => (
  <View style={[{ height:1, backgroundColor:Colors.border }, style]} />
);

export const StatBox = ({ label, value, change, positive, style }) => (
  <View style={[{ backgroundColor:Colors.card, borderRadius:Radius.md, borderWidth:1, borderColor:Colors.border, padding:14, minWidth:110 }, style]}>
    <Text style={{ fontSize:11, color:Colors.grey3, textTransform:'uppercase', letterSpacing:0.6, marginBottom:6 }}>{label}</Text>
    <Text style={{ fontSize:22, fontWeight:'800', color:Colors.white, letterSpacing:-0.5 }}>{value}</Text>
    <Text style={{ fontSize:12, color:positive?Colors.green:Colors.red, marginTop:4, fontWeight:'600' }}>{change}</Text>
  </View>
);
