import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radius } from '../utils/theme';
import { StatBox, Divider, Avatar } from '../components/UI';
import { ORDERS, PRODUCTS, TOAST_EVENTS } from '../utils/data';
import { Auth } from '../utils/auth';

const BARS = [35,50,40,65,55,70,85,60,75,90,80,95,88,100];

export default function DashboardScreen({ navigation }) {
  const [user, setUser]     = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    Auth.get().then(setUser);
    let idx = 0;
    const fire = () => {
      const t = { id:Date.now(), ...TOAST_EVENTS[idx % TOAST_EVENTS.length] };
      setToasts(ts => [...ts.slice(-2), t]);
      setTimeout(() => setToasts(ts => ts.filter(x => x.id !== t.id)), 4000);
      idx++;
    };
    const t1 = setTimeout(() => { fire(); }, 2500);
    const t2 = setInterval(fire, 7000);
    return () => { clearTimeout(t1); clearInterval(t2); };
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={{ fontSize:13, color:Colors.grey3, marginBottom:2 }}>Good morning 👋</Text>
          <Text style={styles.userName}>{user?.name || 'Creator'}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('More')}>
          <LinearGradient colors={['#7C3AED','#C026D3']} style={{ width:42, height:42, borderRadius:21, alignItems:'center', justifyContent:'center' }}>
            <Text style={{ color:'#fff', fontWeight:'800', fontSize:15 }}>
              {(user?.name||'U').slice(0,2).toUpperCase()}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal:16, paddingBottom:100 }}>

        {/* Revenue hero */}
        <LinearGradient colors={['rgba(255,45,32,0.12)',Colors.card]} style={styles.heroCard}>
          <View style={{ flexDirection:'row', alignItems:'flex-start', justifyContent:'space-between', marginBottom:20 }}>
            <View>
              <Text style={{ fontSize:12, color:Colors.grey3, textTransform:'uppercase', letterSpacing:0.7, marginBottom:4 }}>Total Revenue</Text>
              <Text style={{ fontSize:36, fontWeight:'800', color:Colors.white, letterSpacing:-1 }}>₹84,200</Text>
              <View style={{ flexDirection:'row', alignItems:'center', gap:6, marginTop:4 }}>
                <Text style={{ color:Colors.green, fontWeight:'600' }}>↑ 32%</Text>
                <Text style={{ color:Colors.grey3, fontSize:12 }}>vs last month</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('More')}
              style={{ backgroundColor:Colors.red, paddingHorizontal:14, paddingVertical:8, borderRadius:Radius.md }}>
              <Text style={{ color:'#fff', fontWeight:'700', fontSize:13 }}>Withdraw ↗</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection:'row', alignItems:'flex-end', gap:4, height:60 }}>
            {BARS.map((h,i) => (
              <View key={i} style={{ flex:1, height:`${h}%`, borderRadius:3, backgroundColor: i>=9?Colors.red:Colors.grey4 }} />
            ))}
          </View>
          <Text style={{ color:Colors.grey3, fontSize:11, marginTop:6 }}>Last 14 days</Text>
        </LinearGradient>

        {/* Stats row */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom:16 }}>
          <View style={{ flexDirection:'row', gap:10, paddingRight:8 }}>
            {[{label:'New Sales',value:'148',change:'+18%',positive:true},{label:'Churn',value:'2.1%',change:'↓ 0.4%',positive:true},{label:'Affiliates',value:'24',change:'+6',positive:true}].map(s=>(
              <StatBox key={s.label} {...s} />
            ))}
          </View>
        </ScrollView>

        {/* Quick actions */}
        <View style={{ flexDirection:'row', gap:10, marginBottom:16 }}>
          {[['+ Product','📦'],['View Store','🏪'],['Share Link','🔗']].map(([l,e])=>(
            <TouchableOpacity key={l} style={{ flex:1, backgroundColor:Colors.card, borderRadius:Radius.md, borderWidth:1, borderColor:Colors.border, paddingVertical:14, alignItems:'center' }}>
              <Text style={{ fontSize:20, marginBottom:4 }}>{e}</Text>
              <Text style={{ fontSize:12, fontWeight:'600', color:Colors.grey2 }}>{l}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent orders */}
        <View style={styles.section}>
          <View style={{ flexDirection:'row', justifyContent:'space-between', marginBottom:14 }}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <Text style={{ color:Colors.red, fontSize:13, fontWeight:'600' }}>View all</Text>
          </View>
          {ORDERS.map((o,i)=>(
            <View key={o.id}>
              <View style={{ flexDirection:'row', alignItems:'center', gap:12, paddingVertical:12 }}>
                <View style={{ width:36, height:36, borderRadius:18, backgroundColor:Colors.black3, alignItems:'center', justifyContent:'center' }}>
                  <Text style={{ fontSize:16 }}>👤</Text>
                </View>
                <View style={{ flex:1 }}>
                  <Text style={{ fontWeight:'600', color:Colors.white, fontSize:14 }}>{o.buyer}</Text>
                  <Text style={{ color:Colors.grey3, fontSize:12, marginTop:2 }} numberOfLines={1}>{o.product}</Text>
                </View>
                <View style={{ alignItems:'flex-end' }}>
                  <Text style={{ color:o.status==='refund'?Colors.red:Colors.green, fontWeight:'700', fontSize:14 }}>
                    {o.status==='refund'?'-':''}{o.amount}
                  </Text>
                  <Text style={{ color:Colors.grey3, fontSize:11, marginTop:2 }}>{o.time}</Text>
                </View>
              </View>
              {i<ORDERS.length-1 && <Divider />}
            </View>
          ))}
        </View>

        {/* Top products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Products</Text>
          {PRODUCTS.slice(0,3).map((p,i)=>(
            <View key={p.id}>
              <TouchableOpacity style={{ flexDirection:'row', alignItems:'center', paddingVertical:12 }}
                onPress={() => navigation.navigate('Checkout',{product:p})}>
                <Text style={{ fontSize:28, marginRight:12 }}>{p.emoji}</Text>
                <View style={{ flex:1 }}>
                  <Text style={{ color:Colors.white, fontWeight:'600', fontSize:14 }} numberOfLines={1}>{p.name}</Text>
                  <Text style={{ color:Colors.grey3, fontSize:12, marginTop:2 }}>{p.sold} · {p.price}</Text>
                </View>
                <Text style={{ color:Colors.green, fontWeight:'700' }}>+₹{(p.priceNum*12).toLocaleString('en-IN')}</Text>
              </TouchableOpacity>
              {i<2 && <Divider />}
            </View>
          ))}
        </View>

      </ScrollView>

      {/* Live toasts */}
      <View style={{ position:'absolute', bottom:90, left:16, right:16, gap:8 }} pointerEvents="none">
        {toasts.map(t=>(
          <View key={t.id} style={{ flexDirection:'row', alignItems:'center', gap:10, backgroundColor:Colors.card, borderRadius:12, borderWidth:1, borderColor:Colors.border, padding:12 }}>
            <Text style={{ fontSize:16 }}>{t.icon}</Text>
            <Text style={{ color:Colors.grey1, fontSize:13, flex:1 }} numberOfLines={2}>{t.msg}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root:         { flex:1, backgroundColor:Colors.black },
  header:       { flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:20, paddingTop:52, paddingBottom:16 },
  userName:     { fontSize:22, fontWeight:'800', color:Colors.white, letterSpacing:-0.5 },
  heroCard:     { borderRadius:Radius.xl, borderWidth:1, borderColor:Colors.border, padding:20, marginBottom:16 },
  section:      { backgroundColor:Colors.card, borderRadius:Radius.lg, borderWidth:1, borderColor:Colors.border, padding:16, marginBottom:16 },
  sectionTitle: { fontSize:17, fontWeight:'700', color:Colors.white, letterSpacing:-0.3 },
});
