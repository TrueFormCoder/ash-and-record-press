import { useState } from "react";
const STATS = { tables: 30, encounters: 19, products: 18, specs: 11, frameworks: 7 };
const LAYERS = [
  { id: "entry", label: "Entry layer — threshold engine", nodes: [
    { id: "threshold", title: "Threshold engine", sub: "3-path entry · PVA · flip detection", status: "spec", detail: "3-path entry (Explore/Decide/Discharge), image-based state detection, PVA, flip detection, room routing." },
    { id: "explore", title: "Explore path", sub: "8 images · state mapping", detail: "Visual/intuitive. 8 abstract images mapped to states (Flame, Mirror, Cosmos, Warmth, Fracture, Grid, Gold, Fortress). PVA computed from selection coherence." },
    { id: "decide", title: "Decide path", sub: "4 questions · routing", detail: "Structured entry. Q1 clarity, Q2 urgency, Q3 reversibility, Q4 conditions vs people." },
    { id: "discharge", title: "Discharge path", sub: "5 registers · regulation", detail: "Emotional regulation entry. Free text (not stored). 5 registers: Relationships, Work, Health, Identity, Money." },
  ]},
  { id: "os", label: "OS layer — ELE · MirrorTone · MirrorBloom", nodes: [
    { id: "ele", title: "ELE — emotional OS", sub: "16 archetypes · shame · trust", status: "live", detail: "16 archetypes, combo signatures, resource profiles, shame cascade (0-5), withdrawal types. D1: archetypes, archetype_resource_meta, combo_signatures, hidden_costs, micro_scenarios.", link: "https://eleos-api.ellari.workers.dev", linkLabel: "ELEOS API" },
    { id: "mirrortone", title: "MirrorTone — cognitive", sub: "Bayesian trust · SPRT · LLR", status: "live", detail: "Bayesian trust posterior, SPRT sequential testing, log-likelihood ratio scoring. Mirror OS v1.2 (4,687 formulas, 17 tabs)." },
    { id: "mirrorbloom", title: "MirrorBloom — somatic", sub: "BodyOS · somatic markers", status: "planned", detail: "Somatic marker tracking, embodiment scoring. Currently Somatic_Present boolean. Full BodyOS planned for v2.0." },
  ]},
  { id: "verify", label: "Verification — MirrorProof", nodes: [
    { id: "mirrorproof", title: "MirrorProof", sub: "5 gates · falsifiability", status: "live", detail: "G1 Register, G2 Doctrine, G3 Precedent, G4 Falsifiability, G5 Residual. Case Reproduction Standard. Null Behavior Policy. Contradiction Register." },
    { id: "roletest", title: "ELEOS role test", sub: "9 roles x 4 dimensions", status: "live", detail: "9 Crystal Gem roles scored on Strength/Health/Shadow/Load (0-5). Traffic light: Green/Yellow/Red/Black. D1: role_test_scores, role_test_interpretations." },
    { id: "sed", title: "SED diagnostic", sub: "17 classes · 5 cases", status: "live", detail: "Sacred Evidence Destabilization. 17 classes, 6 anchor types, 6 metrics, 7-tier intervention ladder. D1: sed_cases (5 canonical cross-domain cases)." },
  ]},
  { id: "kernel", label: "Kernels", isKernel: true, nodes: [
    { id: "sba", title: "Symbolic behavioral architecture", sub: "30 D1 tables · 5 layers", status: "live", detail: "30 tables: Classification (13), Scoring (4), Distortion Detection (3), Intervention (3), Runtime (7).", link: "https://eleos-api.ellari.workers.dev", linkLabel: "ELEOS API" },
    { id: "chrono", title: "Chrono-synchrony engine", sub: "Temporal model · scheduling", status: "spec", detail: "Encounter scheduling, trajectory tracking. Reality-anchor 14d, balancing-check 21d, anchor-audit 28d." },
    { id: "proofloops", title: "Proof loops", sub: "19 encounter templates", status: "live", detail: "19 templates: 10 original + 5 Threshold Engine + 4 SED." },
  ]},
  { id: "govern", label: "Governance layer", nodes: [
    { id: "constitution", title: "System constitution", sub: "Root authority", status: "live", detail: "Authority order (6 levels), Promotion ladder, 3 silent failures, 10 Operational State Labels.", link: "https://github.com/TrueFormCoder/ash-and-record-press/blob/main/specs/SYSTEM_CONSTITUTION_v1.md", linkLabel: "View on GitHub" },
    { id: "compiler", title: "Governance compiler", sub: "7-stage · 7 domains", status: "live", detail: "Intake to Output. 9 signal codes, Bayesian math, 5 gates. 7 domain configs in D1.", link: "https://compiler.naci.systems", linkLabel: "compiler.naci.systems" },
    { id: "mirrorsolve", title: "MirrorSolveRT", sub: "Residual strategies", detail: "For what the ruling cannot resolve: residual + strategy + goal." },
  ]},
  { id: "output", label: "Output layer — products", nodes: [
    { id: "dmp", title: "DMP series", sub: "7 episodes · proof footers", detail: "7 narrative episodes with mandatory Proof Footer Spec." },
    { id: "setk", title: "Safe enough to keep", sub: "Graphic novel · SLA pipeline", detail: "SLA Prompt Compiler pipeline. Canon review at Ash and Record Press.", link: "https://ashandrecord.com", linkLabel: "ashandrecord.com" },
    { id: "hlw", title: "Hidden Line World", sub: "Doctrinal fiction", detail: "TriadOS Linebreaker Field Manual, Canon Promotion Gate, Story Bible. 4 promoted docs." },
    { id: "press", title: "Ash and Record Press", sub: "Publishing arm", status: "live", detail: "Gallery, compiler, architecture map, and all public-facing Ellari products.", link: "https://ashandrecord.com", linkLabel: "ashandrecord.com" },
  ]},
];
const GLOSSARY = [
  { term: "ELEOS", def: "Behavioral pattern engine. Named after the Greek concept of mercy/compassion." },
  { term: "ELE", def: "Emotional OS. 16 archetypes, shame cascade scoring." },
  { term: "MirrorTone", def: "Cognitive clarity layer. Bayesian trust, SPRT, LLR." },
  { term: "MirrorBloom", def: "Somatic architecture. BodyOS for embodiment scoring. Planned v2.0." },
  { term: "MirrorProof", def: "Verification layer. 5 governance gates (G1-G5)." },
  { term: "SED", def: "Sacred Evidence Destabilization. Belief collapse diagnostic framework." },
  { term: "D1", def: "Cloudflare serverless SQL database. 30 tables in production." },
  { term: "Governance Compiler", def: "7-stage judicial pipeline producing structured rulings." },
  { term: "Mirror OS", def: "Behavioral scoring workbook. 4,687 formulas, 17 tabs." },
  { term: "MirrorSolveRT", def: "Residual strategy engine for unresolvable constraints." },
  { term: "Archetype", def: "One of 16 behavioral patterns. Core unit of ELEOS analysis." },
  { term: "Encounter", def: "Scripted interaction triggered by pattern detection. 19 in D1." },
  { term: "V", def: "OpenAI collaborator. Conceptual design and theoretical architecture." },
];
const TRADEMARKS = ["ELEOS","ELEOS OS","ELE","MirrorTone","MirrorBloom","MirrorProof","Mirror Protocol","Mirror Protocol OS","MirrorSolveRT","Governance Compiler","Sacred Evidence Destabilization","SED","Threshold Engine","Chrono-Synchrony Engine","Ash and Record Press","Hidden Line World","TriadOS","Safe Enough To Keep","Developmental Mirror Protocol","DMP","Recursive Coherence Architecture","BodyOS","Ellari"];
const DISCIPLINES = ["Architectural disciplines","Applied disciplines","Meta disciplines"];
const SC = {live:{bg:"#E1F5EE",color:"#0F6E56",label:"live"},spec:{bg:"#E6F1FB",color:"#185FA5",label:"spec"},planned:{bg:"#FAEEDA",color:"#854F0B",label:"planned"}};
export default function App(){
  const [active,setActive]=useState(null);const [search,setSearch]=useState("");const [panel,setPanel]=useState(null);
  const toggle=id=>setActive(active===id?null:id);
  const find=id=>{for(const l of LAYERS){const n=l.nodes.find(x=>x.id===id);if(n)return n;}return null;};
  const an=active?find(active):null;const f=search.length>1;
  const fg=f?GLOSSARY.filter(g=>g.term.toLowerCase().includes(search.toLowerCase())||g.def.toLowerCase().includes(search.toLowerCase())):GLOSSARY;
  return(
    <div style={{minHeight:"100vh",background:"#08080d",color:"#e0ddd4",fontFamily:"'Cormorant Garamond',Georgia,serif",padding:"32px 16px"}}>
      <div style={{maxWidth:720,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:11,letterSpacing:4,color:"#555",fontFamily:"monospace",textTransform:"uppercase"}}>ellari ecosystem</div>
          <h1 style={{fontSize:28,fontWeight:300,color:"#c9a96e",margin:"6px 0 0"}}>Architecture map</h1>
          <p style={{fontSize:12,color:"#444",fontFamily:"monospace",marginTop:4}}>ELEOS OS v2.0 — mapped to deployed infrastructure</p>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:16,marginBottom:20,flexWrap:"wrap"}}>
          {Object.entries(STATS).map(([k,v])=><span key={k} style={{fontSize:12,fontFamily:"monospace",color:"#666"}}><strong style={{color:"#c9a96e"}}>{v}</strong> {k}</span>)}
        </div>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search architecture, glossary, trademarks..." style={{width:"100%",background:"#0e0e14",border:"1px solid #1a1a24",borderRadius:8,padding:"10px 14px",color:"#e0ddd4",fontFamily:"monospace",fontSize:13,marginBottom:20}}/>
        {LAYERS.map((layer,li)=>{const vis=f?layer.nodes.filter(n=>n.title.toLowerCase().includes(search.toLowerCase())||n.sub.toLowerCase().includes(search.toLowerCase())||(n.detail&&n.detail.toLowerCase().includes(search.toLowerCase()))):layer.nodes;if(f&&vis.length===0)return null;return(<div key={layer.id}>{li>0&&!layer.isKernel&&<div style={{textAlign:"center",color:"#333",fontSize:16,padding:"6px 0"}}>↓</div>}<div style={layer.isKernel?{border:"1px solid #1a1a24",borderRadius:12,padding:12,marginBottom:12}:{marginBottom:12}}><div style={{fontSize:10,fontFamily:"monospace",color:"#555",letterSpacing:2,textTransform:"uppercase",marginBottom:6,paddingLeft:4,textAlign:layer.isKernel?"center":"left"}}>{layer.label}</div><div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{vis.map(node=><button key={node.id} onClick={()=>toggle(node.id)} style={{flex:"1 1 140px",minWidth:120,padding:"10px 12px",borderRadius:8,border:active===node.id?"1px solid rgba(201,169,110,0.5)":"1px solid #1a1a24",background:active===node.id?"rgba(201,169,110,0.05)":"#0e0e14",cursor:"pointer",textAlign:"left",fontFamily:"inherit",color:"inherit",position:"relative",transition:"all 0.2s"}}>{node.status&&SC[node.status]&&<span style={{position:"absolute",top:-6,right:8,fontSize:9,padding:"1px 6px",borderRadius:8,fontWeight:500,fontFamily:"monospace",background:SC[node.status].bg,color:SC[node.status].color}}>{SC[node.status].label}</span>}<div style={{fontSize:13,fontWeight:500}}>{node.title}</div><div style={{fontSize:11,color:"#777",marginTop:2,fontFamily:"monospace"}}>{node.sub}</div></button>)}</div></div></div>);})}
        <div style={{display:"flex",gap:6,marginTop:8}}>{DISCIPLINES.map(d=><div key={d} style={{flex:1,textAlign:"center",padding:"6px 4px",fontSize:10,color:"#444",borderTop:"1px solid #1a1a24",letterSpacing:1,fontFamily:"monospace"}}>{d}</div>)}</div>
        {an&&<div style={{marginTop:16,padding:20,borderRadius:12,border:"1px solid #1a1a24",background:"#0e0e14",fontSize:13,lineHeight:1.7,color:"#999"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><h3 style={{fontSize:16,fontWeight:300,color:"#c9a96e"}}>{an.title}</h3><button onClick={()=>setActive(null)} style={{background:"none",border:"none",color:"#555",cursor:"pointer",fontSize:16}}>x</button></div><p>{an.detail}</p>{an.link&&<a href={an.link} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",marginTop:12,padding:"6px 14px",borderRadius:6,border:"1px solid rgba(201,169,110,0.3)",color:"#c9a96e",fontSize:12,fontFamily:"monospace",textDecoration:"none"}}>{an.linkLabel} ↗</a>}</div>}
        <div style={{display:"flex",gap:8,marginTop:24}}>
          <button onClick={()=>setPanel(panel==="g"?null:"g")} style={{flex:1,padding:"8px",borderRadius:8,border:panel==="g"?"1px solid rgba(201,169,110,0.5)":"1px solid #1a1a24",background:panel==="g"?"rgba(201,169,110,0.05)":"#0e0e14",color:"#e0ddd4",cursor:"pointer",fontFamily:"monospace",fontSize:11}}>Glossary ({GLOSSARY.length})</button>
          <button onClick={()=>setPanel(panel==="t"?null:"t")} style={{flex:1,padding:"8px",borderRadius:8,border:panel==="t"?"1px solid rgba(201,169,110,0.5)":"1px solid #1a1a24",background:panel==="t"?"rgba(201,169,110,0.05)":"#0e0e14",color:"#e0ddd4",cursor:"pointer",fontFamily:"monospace",fontSize:11}}>Trademarks ({TRADEMARKS.length})</button>
        </div>
        {panel==="g"&&<div style={{marginTop:12,padding:20,borderRadius:12,border:"1px solid #1a1a24",background:"#0e0e14"}}><h3 style={{fontSize:14,fontWeight:300,color:"#c9a96e",marginBottom:12}}>Glossary</h3>{fg.map(g=><div key={g.term} style={{marginBottom:10,fontSize:13,lineHeight:1.6}}><span style={{color:"#c9a96e",fontWeight:500,fontFamily:"monospace"}}>{g.term}</span><span style={{color:"#666",margin:"0 8px"}}>—</span><span style={{color:"#999"}}>{g.def}</span></div>)}</div>}
        {panel==="t"&&<div style={{marginTop:12,padding:20,borderRadius:12,border:"1px solid #1a1a24",background:"#0e0e14"}}><h3 style={{fontSize:14,fontWeight:300,color:"#c9a96e",marginBottom:12}}>Trademarks and proprietary terms</h3><p style={{fontSize:12,color:"#777",lineHeight:1.6,marginBottom:12}}>The following names, terms, and frameworks are proprietary to the Ellari ecosystem. All rights reserved.</p><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{TRADEMARKS.map(t=><span key={t} style={{padding:"3px 10px",borderRadius:4,border:"1px solid #1a1a24",fontSize:11,fontFamily:"monospace",color:"#888"}}>{t}</span>)}</div></div>}
        <div style={{textAlign:"center",marginTop:40,fontSize:9,fontFamily:"monospace",color:"#222"}}>© 2026 Ellari. All rights reserved.</div>
      </div>
    </div>
  );
}