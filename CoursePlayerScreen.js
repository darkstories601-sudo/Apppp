import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radius } from '../utils/theme';
import { Badge, Divider } from '../components/UI';
import { PRODUCTS } from '../utils/data';

export default function CoursePlayerScreen({ route, navigation }) {
  const { item, product: prod } = route.params || {};
  const product  = prod || PRODUCTS[0];
  const modules  = product?.modules || [];
  const [active, setActive] = useState(0);
  const [tab, setTab]       = useState('modules');
  const progress = modules.length ? Math.round(((active+1)/modules.length)*100) : 0;
  const cur      = modules[active];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* Topbar */}
      <View style={styles.topbar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Text style={{ color:Colors.white, fontSize:18 }}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topbarTitle} numberOfLines={1}>{product.name}</Text>
        <View style={{ width:40 }} />
      </View>

      {/* Video player */}
      <LinearGradient colors={product.gradient} style={styles.player}>
        <TouchableOpacity style={styles.playBtn}>
          <Text style={{ fontSize:36 }}>▶️</Text>
        </TouchableOpacity>
        <View style={{ position:'absolute', bottom:16, left:16, right:16 }}>
          <Text style={{ color:'#fff', fontWeight:'700', fontSize:14 }} numberOfLines={1}>{cur?.title || 'Select a module'}</Text>
          {cur && <Text style={{ color:'rgba(255,255,255,0.6)', fontSize:12, marginTop:2 }}>{cur.dur}</Text>}
        </View>
        <View style={{ position:'absolute', bottom:0, left:0, right:0, height:3, backgroundColor:'rgba(255,255,255,0.2)' }}>
          <View style={{ width:`${progress}%`, height:'100%', backgroundColor:Colors.red }} />
        </View>
      </LinearGradient>

      {/* Tabs */}
      <View style={{ flexDirection:'row', borderBottomWidth:1, borderColor:Colors.border }}>
        {['modules','notes','resources'].map(t=>(
          <TouchableOpacity key={t} onPress={()=>setTab(t)}
            style={{ flex:1, paddingVertical:13, alignItems:'center', borderBottomWidth:tab===t?2:0, borderColor:Colors.red }}>
            <Text style={{ fontSize:13, fontWeight:'600', color:tab===t?Colors.white:Colors.grey3 }}>
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom:100 }}>
        {tab==='modules' && (
          <>
            {/* Progress */}
            <View style={{ flexDirection:'row', justifyContent:'space-between', paddingHorizontal:16, paddingTop:16, marginBottom:8 }}>
              <Text style={{ color:Colors.grey3, fontSize:13 }}>Progress</Text>
              <Text style={{ fontSize:13, fontWeight:'700', color:progress===100?Colors.green:Colors.amber }}>{progress}%</Text>
            </View>
            <View style={{ height:4, backgroundColor:Colors.grey4, marginHorizontal:16, borderRadius:2, overflow:'hidden', marginBottom:16 }}>
              <View style={{ width:`${progress}%`, height:'100%', backgroundColor:progress===100?Colors.green:Colors.red }} />
            </View>

            {modules.length === 0 ? (
              <View style={{ alignItems:'center', padding:40 }}>
                <Text style={{ fontSize:40, marginBottom:12 }}>📦</Text>
                <Text style={{ color:Colors.grey2, fontSize:15, textAlign:'center', marginBottom:20 }}>Digital download product.{'\n'}Your files are ready!</Text>
                <TouchableOpacity style={{ backgroundColor:Colors.red, paddingHorizontal:24, paddingVertical:12, borderRadius:Radius.md }}>
                  <Text style={{ color:'#fff', fontWeight:'700' }}>⬇ Download Files</Text>
                </TouchableOpacity>
              </View>
            ) : modules.map((m,i) => (
              <View key={i}>
                <TouchableOpacity onPress={() => !m.locked && setActive(i)} activeOpacity={m.locked?1:0.7}
                  style={[{ flexDirection:'row', alignItems:'center', gap:12, paddingVertical:14, paddingHorizontal:16 }, active===i&&{ backgroundColor:'rgba(255,45,32,0.06)' }]}>
                  <View style={[{ width:32, height:32, borderRadius:16, backgroundColor:Colors.black3, alignItems:'center', justifyContent:'center', borderWidth:1, borderColor:Colors.border }, active===i&&{ borderColor:Colors.red, backgroundColor:Colors.redDim }]}>
                    {m.locked ? <Text style={{ fontSize:12 }}>🔒</Text> : <Text style={[{ fontWeight:'700', fontSize:13, color:Colors.grey2 }, active===i&&{ color:Colors.red }]}>{i+1}</Text>}
                  </View>
                  <View style={{ flex:1 }}>
                    <Text style={{ color:m.locked?Colors.grey3:Colors.white, fontWeight:'600', fontSize:14, lineHeight:19 }}>{m.title}</Text>
                    <Text style={{ color:Colors.grey3, fontSize:12, marginTop:2 }}>{m.dur}</Text>
                  </View>
                  {m.locked ? <Badge label="PRO" color={Colors.grey3} /> : active===i && <View style={{ width:8, height:8, borderRadius:4, backgroundColor:Colors.red }} />}
                </TouchableOpacity>
                {i<modules.length-1 && <Divider />}
              </View>
            ))}
          </>
        )}

        {tab==='notes' && (
          <View style={{ padding:16 }}>
            <Text style={{ color:Colors.grey3, fontSize:11, fontWeight:'700', letterSpacing:0.8, textTransform:'uppercase', marginBottom:12 }}>Notes for: {cur?.title}</Text>
            <View style={{ backgroundColor:Colors.card, borderRadius:Radius.md, borderWidth:1, borderColor:Colors.border, padding:14, minHeight:180 }}>
              <Text style={{ color:Colors.grey3, fontSize:14, lineHeight:22 }}>Tap to add notes for this module...</Text>
            </View>
          </View>
        )}

        {tab==='resources' && (
          <View style={{ padding:16 }}>
            <Text style={{ color:Colors.grey3, fontSize:11, fontWeight:'700', letterSpacing:0.8, textTransform:'uppercase', marginBottom:12 }}>Downloads</Text>
            {['📄 Course Workbook.pdf','🎨 Template Files.zip','🔗 Community Discord Link','📧 Bonus Email Templates'].map(r=>(
              <TouchableOpacity key={r} style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingVertical:14, borderBottomWidth:1, borderColor:Colors.border }}>
                <Text style={{ color:Colors.grey1, fontSize:14 }}>{r}</Text>
                <Text style={{ color:Colors.red, fontSize:13 }}>Download ↗</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Nav buttons */}
      {modules.length > 0 && (
        <View style={{ position:'absolute', bottom:0, left:0, right:0, flexDirection:'row', gap:10, padding:16, backgroundColor:Colors.black, borderTopWidth:1, borderColor:Colors.border }}>
          <TouchableOpacity onPress={() => active>0 && setActive(a=>a-1)}
            style={[styles.navBtn, active===0&&{opacity:0.4}]}>
            <Text style={{ color:Colors.white, fontWeight:'700' }}>← Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { const n=active+1; if(n<modules.length&&!modules[n].locked) setActive(n); }}
            style={[styles.navBtn,{ backgroundColor:Colors.red, borderColor:Colors.red }]}>
            <Text style={{ color:'#fff', fontWeight:'700' }}>Next →</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root:         { flex:1, backgroundColor:Colors.black },
  topbar:       { flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:16, paddingTop:52, paddingBottom:12 },
  back:         { width:40, height:40, borderRadius:10, backgroundColor:Colors.black3, alignItems:'center', justifyContent:'center', borderWidth:1, borderColor:Colors.border },
  topbarTitle:  { fontSize:16, fontWeight:'700', color:Colors.white, flex:1, textAlign:'center', marginHorizontal:8 },
  player:       { height:220, alignItems:'center', justifyContent:'center' },
  playBtn:      { width:64, height:64, borderRadius:32, backgroundColor:'rgba(0,0,0,0.4)', alignItems:'center', justifyContent:'center' },
  navBtn:       { flex:1, height:46, borderRadius:Radius.md, backgroundColor:Colors.black3, borderWidth:1, borderColor:Colors.border, alignItems:'center', justifyContent:'center' },
});
