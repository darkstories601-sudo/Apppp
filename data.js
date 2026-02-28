export const CATEGORIES = [
  { id: 'all',         label: 'All',          emoji: '⚡' },
  { id: 'courses',     label: 'Courses',      emoji: '🎬' },
  { id: 'communities', label: 'Communities',  emoji: '🌐' },
  { id: 'saas',        label: 'SaaS & Tools', emoji: '🛠' },
  { id: 'clips',       label: 'Clip Packs',   emoji: '📦' },
  { id: 'ebooks',      label: 'Ebooks',       emoji: '📚' },
  { id: 'ai',          label: 'AI & Prompts', emoji: '🤖' },
];

export const CREATORS = [
  { id: 'rk', initials: 'RK', name: 'Rahul Kaushal',  gradient: ['#7C3AED','#C026D3'] },
  { id: 'pp', initials: 'PP', name: 'Priya Patel',    gradient: ['#0ea5e9','#6366f1'] },
  { id: 'nm', initials: 'NM', name: 'Nikhil Mehta',   gradient: ['#f59e0b','#ef4444'] },
  { id: 'as', initials: 'AS', name: 'Aryan Sharma',   gradient: ['#22c55e','#16a34a'] },
  { id: 'sa', initials: 'SA', name: 'Shreya Agarwal', gradient: ['#818cf8','#a78bfa'] },
  { id: 'vk', initials: 'VK', name: 'Vijay Kumar',    gradient: ['#22d3ee','#0ea5e9'] },
];

export const PRODUCTS = [
  {
    id:'p1', name:'Short-Form Mastery: 0 to 1M Views',
    desc:'The complete system for building a viral short-form video brand from scratch.',
    price:'₹4,999', priceNum:4999, period:'one-time', rating:4.9, sold:'2.1k students',
    emoji:'🎬', gradient:['#1a0a2e','#3d1159','#FF2D20'], category:'courses', creator:'rk', badge:'HOT',
    modules:[
      { title:'Welcome & Orientation',  dur:'5 min',  locked:false },
      { title:'The Viral Framework',    dur:'22 min', locked:false },
      { title:'Hook Engineering',       dur:'18 min', locked:true  },
      { title:'Content Batching OS',    dur:'31 min', locked:true  },
      { title:'Algorithm Secrets',      dur:'25 min', locked:true  },
      { title:'Monetisation Blueprint', dur:'40 min', locked:true  },
    ],
  },
  {
    id:'p2', name:'Creator Cash Collective',
    desc:'Private community of 800+ creators monetizing content. Weekly calls, live feedback.',
    price:'₹999', priceNum:999, period:'/mo', rating:4.8, sold:'846 members',
    emoji:'💰', gradient:['#0a1628','#1e3a5f','#0ea5e9'], category:'communities', creator:'pp', badge:'NEW',
    modules:[],
  },
  {
    id:'p3', name:'500 Premium B-Roll Clip Pack',
    desc:'4K cinematic B-roll clips. Cities, nature, tech, lifestyle. Royalty-free.',
    price:'₹1,499', priceNum:1499, period:'one-time', rating:5.0, sold:'4.3k sold',
    emoji:'🎞', gradient:['#0a2010','#1a4d28','#22c55e'], category:'clips', creator:'as', badge:null,
    modules:[],
  },
  {
    id:'p4', name:'AI Content OS — 300 Prompts',
    desc:'300 battle-tested prompts across scripts, hooks, captions, thumbnails, and ad copy.',
    price:'₹799', priceNum:799, period:'one-time', rating:4.7, sold:'6.8k sold',
    emoji:'🤖', gradient:['#1a1200','#4d3600','#f59e0b'], category:'ai', creator:'nm', badge:'HOT',
    modules:[],
  },
  {
    id:'p5', name:'Faceless YouTube Masterclass',
    desc:'Step-by-step blueprint for building a ₹1L/month faceless YouTube channel.',
    price:'₹6,999', priceNum:6999, period:'one-time', rating:4.9, sold:'1.4k students',
    emoji:'🎓', gradient:['#150a2e','#2d1b6e','#818cf8'], category:'courses', creator:'sa', badge:'HOT',
    modules:[
      { title:'Niche Selection',         dur:'12 min', locked:false },
      { title:'Channel Setup Blueprint', dur:'18 min', locked:false },
      { title:'Script Writing with AI',  dur:'24 min', locked:true  },
      { title:'Voiceover & Editing',     dur:'35 min', locked:true  },
      { title:'Monetisation Strategy',   dur:'28 min', locked:true  },
    ],
  },
  {
    id:'p6', name:'ThumbnailAI Pro — SaaS Access',
    desc:'Generate click-worthy YouTube thumbnails with AI. 500+ generations/month.',
    price:'₹499', priceNum:499, period:'/mo', rating:4.6, sold:'3.2k users',
    emoji:'🛠', gradient:['#001a1a','#003d3d','#22d3ee'], category:'saas', creator:'vk', badge:null,
    modules:[],
  },
];

export const LIBRARY = [
  { id:'l1', pid:'p1', name:'Short-Form Mastery',        progress:35,  emoji:'🎬', gradient:['#1a0a2e','#FF2D20'], last:'2 days ago' },
  { id:'l2', pid:'p5', name:'Faceless YouTube Masterclass', progress:10, emoji:'🎓', gradient:['#150a2e','#818cf8'], last:'Today'     },
  { id:'l3', pid:'p4', name:'AI Content OS',              progress:100, emoji:'🤖', gradient:['#1a1200','#f59e0b'], last:'1 week ago' },
];

export const ORDERS = [
  { id:'o1', buyer:'Arjun K.',  product:'Short-Form Mastery',    amount:'₹4,999', time:'2m ago',   status:'paid'   },
  { id:'o2', buyer:'Sneha R.',  product:'AI Content OS',         amount:'₹799',   time:'14m ago',  status:'paid'   },
  { id:'o3', buyer:'Dev M.',    product:'ThumbnailAI Pro',       amount:'₹499',   time:'1hr ago',  status:'paid'   },
  { id:'o4', buyer:'Pooja T.',  product:'Faceless Masterclass',  amount:'₹6,999', time:'3hr ago',  status:'paid'   },
  { id:'o5', buyer:'Rohan S.',  product:'B-Roll Clip Pack',      amount:'₹1,499', time:'Yesterday', status:'refund' },
];

export const TOAST_EVENTS = [
  { icon:'💸', msg:'Arjun bought "Short-Form Mastery" · ₹4,999'       },
  { icon:'⭐', msg:'5-star review: "Absolute game changer!"'            },
  { icon:'🚀', msg:'New affiliate conversion · ₹1,200 commission'       },
  { icon:'💰', msg:'Payout of ₹32,450 sent to your UPI'                },
  { icon:'🎉', msg:'Priya hit ₹1L this month on ClipChaos!'            },
];
