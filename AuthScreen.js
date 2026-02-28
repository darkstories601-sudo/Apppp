import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform, Alert, StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radius } from '../utils/theme';
import { Logo, Btn } from '../components/UI';
import { Auth } from '../utils/auth';

export default function AuthScreen({ navigation }) {
  const [mode, setMode]     = useState('login');
  const [email, setEmail]   = useState('');
  const [pw, setPw]         = useState('');
  const [name, setName]     = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoad]  = useState(false);

  const submit = async () => {
    if (!email.trim())               return Alert.alert('Email required');
    if (!/\S+@\S+\.\S+/.test(email)) return Alert.alert('Invalid email');
    if (pw.length < 8)               return Alert.alert('Password too short', 'Use at least 8 characters');
    if (mode === 'signup' && !name.trim()) return Alert.alert('Name required');
    setLoad(true);
    await new Promise(r => setTimeout(r, 900));
    await Auth.login(email.trim(), name.trim() || undefined);
    setLoad(false);
    navigation.replace('Main');
  };

  const oAuth = async (provider) => {
    setLoad(true);
    await new Promise(r => setTimeout(r, 700));
    await Auth.login(`user@${provider.toLowerCase()}.com`, provider + ' User');
    setLoad(false);
    navigation.replace('Main');
  };

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS==='ios'?'padding':'height'}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.black} />
      <LinearGradient colors={['rgba(255,45,32,0.15)','transparent']} style={StyleSheet.absoluteFill} />

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

        <View style={styles.logoWrap}><Logo size={34} /></View>

        <Text style={styles.h1}>{mode==='login' ? 'Welcome back.' : 'Start earning.'}</Text>
        <Text style={styles.sub}>
          {mode==='login' ? 'Log in to your ClipChaos account.' : 'Join 50,000+ creators selling on ClipChaos.'}
        </Text>

        {/* Stats (signup only) */}
        {mode==='signup' && (
          <View style={styles.stats}>
            {[['₹42Cr','paid out'],['50K+','creators'],['4.9★','rating']].map(([v,l])=>(
              <View key={l} style={{ alignItems:'center' }}>
                <Text style={styles.statVal}>{v}</Text>
                <Text style={styles.statLbl}>{l}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Card */}
        <View style={styles.card}>
          {/* Toggle */}
          <View style={styles.toggle}>
            {['signup','login'].map(m=>(
              <TouchableOpacity key={m} style={[styles.toggleBtn, mode===m&&styles.toggleOn]} onPress={()=>setMode(m)}>
                <Text style={[styles.toggleTxt, mode===m&&{color:'#fff'}]}>{m==='signup'?'Sign Up':'Log In'}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {mode==='signup' && (
            <View style={styles.field}>
              <Text style={styles.label}>Your name</Text>
              <TextInput style={styles.input} placeholder="Rahul Kaushal" placeholderTextColor={Colors.grey3}
                value={name} onChangeText={setName} autoCapitalize="words" />
            </View>
          )}

          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="you@example.com" placeholderTextColor={Colors.grey3}
              value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <View style={[styles.input,{flexDirection:'row',alignItems:'center',paddingHorizontal:0}]}>
              <TextInput style={{flex:1,color:Colors.white,fontSize:15,paddingHorizontal:14,height:48}}
                placeholder="Min 8 characters" placeholderTextColor={Colors.grey3}
                value={pw} onChangeText={setPw} secureTextEntry={!showPw} />
              <TouchableOpacity onPress={()=>setShowPw(v=>!v)} style={{paddingHorizontal:14}}>
                <Text style={{fontSize:16}}>{showPw?'🙈':'👁'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Btn label={mode==='signup'?'Create Free Account →':'Log In →'} onPress={submit} loading={loading} style={{marginTop:8}} />

          {/* Divider */}
          <View style={{flexDirection:'row',alignItems:'center',marginVertical:16,gap:10}}>
            <View style={{flex:1,height:1,backgroundColor:Colors.border}} />
            <Text style={{color:Colors.grey3,fontSize:12}}>or continue with</Text>
            <View style={{flex:1,height:1,backgroundColor:Colors.border}} />
          </View>

          {/* Social */}
          <View style={{flexDirection:'row',gap:10}}>
            {[['Google','G'],['Apple','']].map(([p,e])=>(
              <TouchableOpacity key={p} onPress={()=>oAuth(p)}
                style={{flex:1,height:46,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:6,
                  backgroundColor:Colors.black3,borderRadius:Radius.md,borderWidth:1,borderColor:Colors.border}}>
                <Text style={{fontSize:16}}>{e}</Text>
                <Text style={{color:Colors.grey1,fontWeight:'600',fontSize:14}}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {mode==='login' && (
            <TouchableOpacity style={{alignSelf:'center',marginTop:14}}>
              <Text style={{color:Colors.grey3,fontSize:13}}>Forgot password?</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={{alignItems:'center',marginTop:20}} onPress={()=>setMode(m=>m==='login'?'signup':'login')}>
          <Text style={{color:Colors.grey3,fontSize:14}}>
            {mode==='login'?"Don't have an account? ":"Already have an account? "}
            <Text style={{color:Colors.red,fontWeight:'700'}}>{mode==='login'?'Sign up free':'Log in'}</Text>
          </Text>
        </TouchableOpacity>

        <Text style={{textAlign:'center',color:Colors.grey4,fontSize:12,marginTop:20}}>
          🇮🇳 India-first platform · No credit card needed
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root:     { flex:1, backgroundColor:Colors.black },
  scroll:   { paddingHorizontal:20, paddingTop:60, paddingBottom:40 },
  logoWrap: { alignItems:'center', marginBottom:28 },
  h1:       { fontSize:32, fontWeight:'800', color:Colors.white, textAlign:'center', letterSpacing:-0.8, marginBottom:8 },
  sub:      { fontSize:15, color:Colors.grey2, textAlign:'center', marginBottom:24, lineHeight:22 },
  stats:    { flexDirection:'row', justifyContent:'space-around', backgroundColor:Colors.black2, borderRadius:Radius.md, borderWidth:1, borderColor:Colors.border, padding:16, marginBottom:24 },
  statVal:  { fontSize:18, fontWeight:'800', color:Colors.white, letterSpacing:-0.5 },
  statLbl:  { fontSize:11, color:Colors.grey3, marginTop:2 },
  card:     { backgroundColor:Colors.card, borderRadius:Radius.xl, borderWidth:1, borderColor:Colors.border, padding:20 },
  toggle:   { flexDirection:'row', backgroundColor:Colors.black3, borderRadius:Radius.md, padding:4, marginBottom:20 },
  toggleBtn:{ flex:1, height:36, borderRadius:8, alignItems:'center', justifyContent:'center' },
  toggleOn: { backgroundColor:Colors.red },
  toggleTxt:{ fontSize:14, fontWeight:'700', color:Colors.grey2 },
  field:    { marginBottom:14 },
  label:    { fontSize:13, fontWeight:'600', color:Colors.grey2, marginBottom:6 },
  input:    { height:48, backgroundColor:Colors.black3, borderRadius:Radius.md, borderWidth:1, borderColor:Colors.border, paddingHorizontal:14, color:Colors.white, fontSize:15 },
});
