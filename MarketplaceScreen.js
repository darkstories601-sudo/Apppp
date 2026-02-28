import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radius } from '../utils/theme';
import { Avatar, Badge, Logo } from '../components/UI';
import { PRODUCTS, CATEGORIES, CREATORS } from '../utils/data';

const ProductCard = ({ item, onPress }) => {
  const creator = CREATORS.find(c => c.id === item.creator);
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)} activeOpacity={0.85}>
      <LinearGradient colors={item.gradient} style={styles.thumb}>
        <Text style={{ fontSize: 42 }}>{item.emoji}</Text>
        <View style={{ position:'absolute', top:8, left:8, flexDirection:'row', gap:4 }}>
          {item.badge === 'HOT' && <Badge label="🔥 HOT" color={Colors.red}   />}
          {item.badge === 'NEW' && <Badge label="✨ NEW" color={Colors.green} />}
        </View>
      </LinearGradient>
      <View style={styles.body}>
        {creator && (
          <View style={{ flexDirection:'row', alignItems:'center', gap:5, marginBottom:6 }}>
            <Avatar initials={creator.initials} gradient={creator.gradient} size={18} />
            <Text style={{ fontSize:11, color:Colors.grey3, fontWeight:'600' }}>{creator.name}</Text>
          </View>
        )}
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.desc} numberOfLines={2}>{item.desc}</Text>
        <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:8 }}>
          <Text style={styles.price}>{item.price}{item.period!=='one-time'&&<Text style={{fontSize:12,color:Colors.grey3,fontWeight:'400'}}>{item.period}</Text>}</Text>
          <Text style={{ fontSize:12, color:Colors.amber, fontWeight:'600' }}>★ {item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function MarketplaceScreen({ navigation }) {
  const [q, setQ]     = useState('');
  const [cat, setCat] = useState('all');

  const items = useMemo(() =>
    PRODUCTS.filter(p =>
      (cat === 'all' || p.category === cat) &&
      (!q || p.name.toLowerCase().includes(q.toLowerCase()))
    ), [q, cat]);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.black} />
      <LinearGradient colors={['rgba(255,45,32,0.13)','transparent']} style={StyleSheet.absoluteFill} pointerEvents="none" />

      {/* Header */}
      <View style={styles.header}>
        <Logo size={26} />
        <TouchableOpacity onPress={() => navigation.navigate('Auth')}
          style={{ backgroundColor:Colors.black3, borderRadius:Radius.md, borderWidth:1, borderColor:Colors.border, paddingHorizontal:12, paddingVertical:7 }}>
          <Text style={{ color:Colors.grey1, fontWeight:'700', fontSize:13 }}>Log In</Text>
        </TouchableOpacity>
      </View>

      {/* Hero */}
      <View style={{ paddingHorizontal:20, paddingBottom:20 }}>
        <Text style={{ color:Colors.red, fontSize:11, fontWeight:'700', letterSpacing:1.2, marginBottom:8 }}>THE CREATOR MARKETPLACE</Text>
        <Text style={styles.heroTitle}>Discover products{'\n'}that <Text style={{ color:Colors.red }}>print money.</Text></Text>
        <Text style={{ fontSize:14, color:Colors.grey2, marginTop:6 }}>Courses, communities, SaaS & more.</Text>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <Text style={{ fontSize:16, paddingLeft:14 }}>🔍</Text>
        <TextInput style={styles.searchInput} placeholder="Search products..." placeholderTextColor={Colors.grey3}
          value={q} onChangeText={setQ} />
        {q.length > 0 && <TouchableOpacity onPress={() => setQ('')} style={{ paddingRight:14 }}><Text style={{ color:Colors.grey3, fontSize:18 }}>✕</Text></TouchableOpacity>}
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal:16, gap:8, paddingBottom:12 }}>
        {CATEGORIES.map(c => (
          <TouchableOpacity key={c.id} onPress={() => setCat(c.id)}
            style={[styles.pill, cat===c.id && styles.pillActive]}>
            <Text style={[styles.pillTxt, cat===c.id && { color:Colors.white }]}>{c.emoji} {c.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products */}
      <FlatList
        data={items}
        keyExtractor={i => i.id}
        numColumns={2}
        columnWrapperStyle={{ gap:10, paddingHorizontal:12, marginBottom:10 }}
        contentContainerStyle={{ paddingBottom:100 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Text style={{ color:Colors.grey3, fontSize:12, paddingHorizontal:16, marginBottom:10 }}>{items.length} products</Text>}
        ListEmptyComponent={<View style={{ alignItems:'center', padding:60 }}><Text style={{ fontSize:40 }}>🔍</Text><Text style={{ color:Colors.grey3, marginTop:12 }}>No products found</Text></View>}
        renderItem={({ item }) => (
          <View style={{ flex:1 }}>
            <ProductCard item={item} onPress={p => navigation.navigate('Checkout', { product:p })} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root:        { flex:1, backgroundColor:Colors.black },
  header:      { flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:20, paddingTop:52, paddingBottom:16 },
  heroTitle:   { fontSize:32, fontWeight:'800', color:Colors.white, letterSpacing:-0.8, lineHeight:38 },
  searchRow:   { flexDirection:'row', alignItems:'center', backgroundColor:Colors.card, borderRadius:Radius.md, borderWidth:1, borderColor:Colors.border, marginHorizontal:16, marginBottom:12 },
  searchInput: { flex:1, height:46, paddingHorizontal:10, color:Colors.white, fontSize:15 },
  pill:        { paddingHorizontal:14, paddingVertical:7, borderRadius:Radius.full, backgroundColor:Colors.black3, borderWidth:1.5, borderColor:Colors.border },
  pillActive:  { backgroundColor:Colors.redDim, borderColor:'rgba(255,45,32,0.4)' },
  pillTxt:     { fontSize:13, fontWeight:'600', color:Colors.grey3 },
  card:        { backgroundColor:Colors.card, borderRadius:Radius.lg, borderWidth:1, borderColor:Colors.border, overflow:'hidden', flex:1 },
  thumb:       { height:120, alignItems:'center', justifyContent:'center' },
  body:        { padding:12 },
  name:        { fontSize:14, fontWeight:'700', color:Colors.white, letterSpacing:-0.3, lineHeight:18, marginBottom:4 },
  desc:        { fontSize:11, color:Colors.grey3, lineHeight:15, marginBottom:4 },
  price:       { fontSize:16, fontWeight:'800', color:Colors.white, letterSpacing:-0.3 },
});
