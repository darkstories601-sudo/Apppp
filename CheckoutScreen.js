import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radius } from '../utils/theme';
import { Btn, Avatar, Divider } from '../components/UI';
import { CREATORS } from '../utils/data';

export default function CheckoutScreen({ route, navigation }) {
  const product  = route.params?.product || { name:'Short-Form Mastery', price:'₹4,999', priceNum:4999, emoji:'🎬', gradient:['#1a0a2e','#FF2D20'], rating:4.9, creator:'rk' };
  const creator  = CREATORS.find(c => c.id === product.creator);
  const gst      = Math.round(product.priceNum * 0.18);
  const total    = product.priceNum + gst;

  const [method, setMethod] = useState('upi');
  const [upi, setUpi]       = useState('');
  const [card, setCard]     = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv]       = useState('');
  const [loading, setLoad]  = useState(false);
  const [done, setDone]     = useState(false);

  const pay = async () => {
    if (method==='upi' && !upi.trim()) return Alert.alert('Enter your UPI ID');
    if (method==='card' && card.length < 16) return Alert.alert('Invalid card number');
    setLoad(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoad(false);
    setDone(true);
  };

  if (done) return (
    <View style={[styles.root,{alignItems:'center',justifyContent:'center',padding:32}]}>
      <LinearGradient colors={['rgba(34,197,94,0.15)','transparent']} style={StyleSheet.absoluteFill} />
      <Text style={{ fontSize:72, marginBottom:20 }}>🎉</Text>
      <Text style={styles.successTitle}>Payment Successful!</Text>
      <Text style={{ color:Colors.grey2, textAlign:'center', fontSize:15, lineHeight:22, marginBottom:8 }}>
        You now have access to{'\n'}<Text style={{ color:Colors.white, fontWeight:'700' }}>{product.name}</Text>
      </Text>
      <Text style={{ color:Colors.grey3, fontSize:13, marginBottom:40 }}>Receipt sent to your email.</Text>
      <Btn label="Go to My Library →" onPress={() => navigation.navigate('Library')} style={{ width:260, marginBottom:12 }} />
      <Btn label="Browse More" variant="ghost" onPress={() => navigation.navigate('Marketplace')} style={{ width:260 }} />
    </View>
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}><Text style={{ color:Colors.white, fontSize:18 }}>←</Text></TouchableOpacity>
        <Text style={styles.topbarTitle}>Checkout</Text>
        <View style={{ width:40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding:16, paddingBottom:60 }}>

        {/* Product banner */}
        <LinearGradient colors={product.gradient} style={{ borderRadius:Radius.xl, padding:24, alignItems:'center', marginBottom:16 }}>
          <Text style={{ fontSize:44, marginBottom:8 }}>{product.emoji}</Text>
          <Text style={{ fontSize:18, fontWeight:'800', color:'#fff', textAlign:'center', letterSpacing:-0.4 }}>{product.name}</Text>
          {creator && (
            <View style={{ flexDirection:'row', alignItems:'center', gap:6, marginTop:8 }}>
              <Avatar initials={creator.initials} gradient={creator.gradient} size={20} />
              <Text style={{ color:'rgba(255,255,255,0.7)', fontSize:13 }}>{creator.name}</Text>
            </View>
          )}
        </LinearGradient>

        {/* Order summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {[[product.name, product.price],['Platform fee','FREE'],['GST (18%)','₹'+gst.toLocaleString('en-IN')]].map(([l,v],i)=>(
            <View key={i} style={{ flexDirection:'row', justifyContent:'space-between', marginBottom:8 }}>
              <Text style={{ color:Colors.grey2, fontSize:14 }}>{l}</Text>
              <Text style={{ color: v==='FREE'?Colors.green:Colors.grey1, fontSize:14, fontWeight:'600' }}>{v}</Text>
            </View>
          ))}
          <Divider style={{ marginVertical:10 }} />
          <View style={{ flexDirection:'row', justifyContent:'space-between' }}>
            <Text style={{ color:Colors.white, fontWeight:'800', fontSize:16 }}>Total</Text>
            <Text style={{ color:Colors.white, fontWeight:'800', fontSize:20, letterSpacing:-0.5 }}>₹{total.toLocaleString('en-IN')}</Text>
          </View>
        </View>

        {/* Payment method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={{ flexDirection:'row', flexWrap:'wrap', gap:8 }}>
            {[['upi','📱','UPI'],['card','💳','Card'],['netbank','🏦','Net Banking'],['wallet','👛','Wallet']].map(([m,e,l])=>(
              <TouchableOpacity key={m} onPress={()=>setMethod(m)}
                style={[styles.payBtn, method===m&&styles.payBtnOn]}>
                <Text style={{ fontSize:18 }}>{e}</Text>
                <Text style={[{ fontSize:12, fontWeight:'600', color:Colors.grey2 }, method===m&&{color:Colors.white}]}>{l}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* UPI */}
        {method==='upi' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>UPI ID</Text>
            <TextInput style={styles.input} placeholder="yourname@upi" placeholderTextColor={Colors.grey3}
              value={upi} onChangeText={setUpi} autoCapitalize="none" keyboardType="email-address" />
            <Text style={{ color:Colors.grey3, fontSize:12, marginTop:6 }}>Enter UPI ID linked to any bank</Text>
          </View>
        )}

        {/* Card */}
        {method==='card' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Card Details</Text>
            <TextInput style={[styles.input,{marginBottom:10}]} placeholder="Card number" placeholderTextColor={Colors.grey3}
              value={card} onChangeText={t=>setCard(t.replace(/\D/g,'').slice(0,16))} keyboardType="number-pad" />
            <View style={{ flexDirection:'row', gap:10 }}>
              <TextInput style={[styles.input,{flex:1}]} placeholder="MM/YY" placeholderTextColor={Colors.grey3}
                value={expiry} onChangeText={t=>{const c=t.replace(/\D/g,'');setExpiry(c.length>2?c.slice(0,2)+'/'+c.slice(2,4):c);}} keyboardType="number-pad" maxLength={5} />
              <TextInput style={[styles.input,{flex:1}]} placeholder="CVV" placeholderTextColor={Colors.grey3}
                value={cvv} onChangeText={t=>setCvv(t.replace(/\D/g,'').slice(0,3))} keyboardType="number-pad" secureTextEntry />
            </View>
          </View>
        )}

        {/* Net banking */}
        {method==='netbank' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Bank</Text>
            {['SBI','HDFC','ICICI','Axis','Kotak'].map(b=>(
              <TouchableOpacity key={b} style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingVertical:13, borderBottomWidth:1, borderColor:Colors.border }}>
                <Text style={{ color:Colors.grey1, fontSize:14 }}>🏦 {b} Bank</Text>
                <Text style={{ color:Colors.grey3 }}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Trust */}
        <View style={{ flexDirection:'row', justifyContent:'space-around', marginBottom:20 }}>
          {['🔒 SSL Secured','✅ RBI Compliant','📧 Instant Access'].map(t=>(
            <Text key={t} style={{ fontSize:11, color:Colors.grey3 }}>{t}</Text>
          ))}
        </View>

        <Btn label={`Pay ₹${total.toLocaleString('en-IN')} →`} onPress={pay} loading={loading} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:         { flex:1, backgroundColor:Colors.black },
  topbar:       { flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:16, paddingTop:52, paddingBottom:12 },
  back:         { width:40, height:40, borderRadius:10, backgroundColor:Colors.black3, alignItems:'center', justifyContent:'center', borderWidth:1, borderColor:Colors.border },
  topbarTitle:  { fontSize:18, fontWeight:'800', color:Colors.white },
  section:      { backgroundColor:Colors.card, borderRadius:Radius.lg, borderWidth:1, borderColor:Colors.border, padding:16, marginBottom:14 },
  sectionTitle: { fontSize:16, fontWeight:'700', color:Colors.white, marginBottom:14, letterSpacing:-0.3 },
  payBtn:       { flex:1, minWidth:'45%', height:56, flexDirection:'row', alignItems:'center', gap:8, backgroundColor:Colors.black3, borderRadius:Radius.md, borderWidth:1.5, borderColor:Colors.border, paddingHorizontal:12 },
  payBtnOn:     { borderColor:Colors.red, backgroundColor:Colors.redDim },
  input:        { height:48, backgroundColor:Colors.black3, borderRadius:Radius.md, borderWidth:1, borderColor:Colors.border, paddingHorizontal:14, color:Colors.white, fontSize:15 },
  successTitle: { fontSize:28, fontWeight:'800', color:Colors.white, marginBottom:12, letterSpacing:-0.5 },
});
