import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radius } from '../utils/theme';
import { Badge, Divider } from '../components/UI';
import { Auth } from '../utils/auth';

const Item = ({ emoji, label, value, onPress, danger, toggle, toggleVal, onToggle }) => (
  <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.7}>
    <Text style={{ fontSize:20, marginRight:12 }}>{emoji}</Text>
    <Text style={[styles.itemLabel, danger&&{ color:Colors.red }]}>{label}</Text>
    <View style={{ flex:1 }} />
    {value && <Text style={styles.itemValue}>{value}</Text>}
    {toggle && <Switch value={toggleVal} onValueChange={onToggle} trackColor={{ true:Colors.red }} thumbColor="#fff" />}
    {!toggle && <Text style={{ color:Colors.grey4, fontSize:16 }}>›</Text>}
  </TouchableOpacity>
);

export default function MoreScreen({ navigation }) {
  const [user, setUser]     = useState(null);
  const [notifs, setNotifs] = useState(true);

  useEffect(() => { Auth.get().then(setUser); }, []);

  const logout = async () => { await Auth.logout(); navigation.replace('Auth'); };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal:16, paddingTop:52, paddingBottom:60 }}>

        {/* Profile */}
        <LinearGradient colors={['rgba(255,45,32,0.1)','transparent']} style={styles.profileCard}>
          <LinearGradient colors={['#7C3AED','#C026D3']} style={styles.avatar}>
            <Text style={{ color:'#fff', fontWeight:'800', fontSize:24 }}>{(user?.name||'U').slice(0,2).toUpperCase()}</Text>
          </LinearGradient>
          <Text style={styles.profileName}>{user?.name || 'Creator'}</Text>
          <Text style={{ fontSize:13, color:Colors.grey3, marginBottom:12 }}>{user?.email || ''}</Text>
          <Badge label="⚡ Pro Creator" color={Colors.red} />
          <View style={{ flexDirection:'row', gap:32, marginTop:20 }}>
            {[['₹84K','Revenue'],['148','Sales'],['4.9★','Rating']].map(([v,l])=>(
              <View key={l} style={{ alignItems:'center' }}>
                <Text style={{ fontSize:18, fontWeight:'800', color:Colors.white, letterSpacing:-0.4 }}>{v}</Text>
                <Text style={{ fontSize:12, color:Colors.grey3, marginTop:2 }}>{l}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* Creator tools */}
        <Text style={styles.sectionLabel}>CREATOR TOOLS</Text>
        <View style={styles.menuCard}>
          <Item emoji="📊" label="Analytics"      value="₹84K this month" onPress={()=>{}} />
          <Divider />
          <Item emoji="📦" label="My Products"    value="6 active"        onPress={()=>{}} />
          <Divider />
          <Item emoji="👥" label="Customers"      value="148"             onPress={()=>{}} />
          <Divider />
          <Item emoji="🤝" label="Affiliates"     value="24 partners"     onPress={()=>{}} />
          <Divider />
          <Item emoji="💸" label="Payouts"        value="₹32,450 pending" onPress={()=>{}} />
          <Divider />
          <Item emoji="📧" label="Email Campaigns"                        onPress={()=>{}} />
        </View>

        <Text style={styles.sectionLabel}>YOUR STORE</Text>
        <View style={styles.menuCard}>
          <Item emoji="🏪" label="My Storefront"      onPress={()=>{}} />
          <Divider />
          <Item emoji="🛠" label="Storefront Builder" onPress={()=>{}} />
          <Divider />
          <Item emoji="🗺" label="Product Roadmap"    onPress={()=>{}} />
        </View>

        <Text style={styles.sectionLabel}>ACCOUNT</Text>
        <View style={styles.menuCard}>
          <Item emoji="⚙️" label="Settings"    onPress={()=>{}} />
          <Divider />
          <Item emoji="🔔" label="Notifications" toggle toggleVal={notifs} onToggle={setNotifs} />
          <Divider />
          <Item emoji="📚" label="Library"    onPress={()=>navigation.navigate('Library')} />
          <Divider />
          <Item emoji="🛒" label="Marketplace" onPress={()=>navigation.navigate('Marketplace')} />
        </View>

        <Text style={styles.sectionLabel}>SUPPORT</Text>
        <View style={styles.menuCard}>
          <Item emoji="❓" label="Help Centre" onPress={()=>{}} />
          <Divider />
          <Item emoji="⭐" label="Rate the App" onPress={()=>{}} />
        </View>

        <View style={styles.menuCard}>
          <Item emoji="🚪" label="Log Out" onPress={logout} danger />
        </View>

        <Text style={{ textAlign:'center', color:Colors.grey4, fontSize:12, marginTop:20 }}>
          ClipChaos v1.0.0 · 🇮🇳 India-first platform
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:        { flex:1, backgroundColor:Colors.black },
  profileCard: { borderRadius:Radius.xl, borderWidth:1, borderColor:Colors.border, padding:24, alignItems:'center', marginBottom:24 },
  avatar:      { width:72, height:72, borderRadius:36, alignItems:'center', justifyContent:'center', marginBottom:12 },
  profileName: { fontSize:22, fontWeight:'800', color:Colors.white, letterSpacing:-0.5, marginBottom:4 },
  sectionLabel:{ fontSize:11, fontWeight:'700', color:Colors.grey3, letterSpacing:1.1, textTransform:'uppercase', marginBottom:8, marginLeft:4, marginTop:20 },
  menuCard:    { backgroundColor:Colors.card, borderRadius:Radius.lg, borderWidth:1, borderColor:Colors.border, overflow:'hidden', marginBottom:4 },
  item:        { flexDirection:'row', alignItems:'center', paddingVertical:15, paddingHorizontal:16 },
  itemLabel:   { fontSize:15, color:Colors.grey1, fontWeight:'500' },
  itemValue:   { fontSize:13, color:Colors.grey3, marginRight:8 },
});
