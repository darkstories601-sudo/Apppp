import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radius } from '../utils/theme';
import { LIBRARY, PRODUCTS } from '../utils/data';

const ProgressBar = ({ v }) => (
  <View style={{ height:4, backgroundColor:Colors.grey4, borderRadius:2, overflow:'hidden' }}>
    <View style={{ width:`${v}%`, height:'100%', backgroundColor: v===100?Colors.green:Colors.red, borderRadius:2 }} />
  </View>
);

export default function LibraryScreen({ navigation }) {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View style={{ paddingHorizontal:20, paddingTop:52, paddingBottom:20 }}>
        <Text style={{ color:Colors.red, fontSize:11, fontWeight:'700', letterSpacing:1.2, marginBottom:6 }}>MY LIBRARY</Text>
        <Text style={{ fontSize:28, fontWeight:'800', color:Colors.white, letterSpacing:-0.6 }}>Your Products</Text>
      </View>

      <FlatList
        data={LIBRARY}
        keyExtractor={i => i.id}
        contentContainerStyle={{ paddingHorizontal:16, paddingBottom:100, gap:12 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ alignItems:'center', paddingTop:80 }}>
            <Text style={{ fontSize:48, marginBottom:16 }}>📚</Text>
            <Text style={{ color:Colors.grey3, fontSize:16, textAlign:'center' }}>Your library is empty.{'\n'}Buy a product to get started!</Text>
            <TouchableOpacity style={{ marginTop:20, backgroundColor:Colors.red, paddingHorizontal:24, paddingVertical:12, borderRadius:Radius.md }}
              onPress={() => navigation.navigate('Marketplace')}>
              <Text style={{ color:'#fff', fontWeight:'700' }}>Browse Marketplace →</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => {
          const product = PRODUCTS.find(p => p.id === item.pid);
          return (
            <TouchableOpacity activeOpacity={0.85}
              onPress={() => navigation.navigate('Player', { item, product })}
              style={{ backgroundColor:Colors.card, borderRadius:Radius.xl, borderWidth:1, borderColor:Colors.border, overflow:'hidden' }}>
              <LinearGradient colors={item.gradient} style={{ height:140, alignItems:'center', justifyContent:'center' }}>
                <Text style={{ fontSize:48 }}>{item.emoji}</Text>
                {item.progress === 100 && (
                  <View style={{ position:'absolute', bottom:10, right:10, backgroundColor:Colors.green, paddingHorizontal:10, paddingVertical:4, borderRadius:100 }}>
                    <Text style={{ color:'#000', fontSize:11, fontWeight:'800' }}>✓ COMPLETE</Text>
                  </View>
                )}
              </LinearGradient>
              <View style={{ padding:16 }}>
                <Text style={{ fontSize:17, fontWeight:'700', color:Colors.white, letterSpacing:-0.3, lineHeight:22, marginBottom:10 }} numberOfLines={2}>{item.name}</Text>
                <View style={{ flexDirection:'row', justifyContent:'space-between', marginBottom:8 }}>
                  <Text style={{ fontSize:12, color:Colors.grey3 }}>Last opened: {item.last}</Text>
                  <Text style={{ fontSize:12, fontWeight:'700', color: item.progress===100?Colors.green:Colors.amber }}>{item.progress}%</Text>
                </View>
                <ProgressBar v={item.progress} />
                {product && <Text style={{ fontSize:12, color:Colors.grey3, marginTop:8 }}>{product.modules?.length>0?`${product.modules.length} modules`:'Digital download'}</Text>}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex:1, backgroundColor:Colors.black },
});
