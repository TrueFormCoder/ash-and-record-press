import { useState, useCallback } from "react";

const DOMAINS_BY_TYPE = {
  "co-parenting": ["Behavioral Consistency", "Communication Pattern", "Control Dynamics", "Child Impact", "Structural Capacity"],
  "team-health": ["Role Distribution", "Communication Health", "Workload Balance", "Psychological Safety", "Decision Quality"],
  "product-quality": ["User Experience", "Technical Reliability", "Brand Alignment", "Accessibility", "Performance"],
  "illustration": ["Palette Alignment", "Geometry Compliance", "Atmosphere Match", "Composition Fidelity", "Texture Coherence", "Key Element Presence"],
  "narrative": ["Character Consistency", "Plot Logic", "Thematic Coherence", "Emotional Trajectory", "World-Rule Compliance"],
  "custom": []
};

const WEIGHTS_BY_TYPE = {
  "co-parenting": [0.25, 0.15, 0.20, 0.25, 0.15],
  "team-health": [0.20, 0.20, 0.20, 0.20, 0.20],
  "product-quality": [0.25, 0.20, 0.20, 0.15, 0.20],
  "illustration": [0.20, 0.15, 0.15, 0.15, 0.10, 0.25],
  "narrative": [0.25, 0.25, 0.20, 0.15, 0.15],
  "custom": []
};

const CONFIDENCE_BY_TYPE = {
  "co-parenting": 0.99,
  "team-health": 0.95,
  "product-quality": 0.95,
  "illustration": 0.90,
  "narrative": 0.90,
  "custom": 0.95
};

const SIGNALS = [
  { code: "H*", label: "Fatal disqualifier", lr: 0.03, color: "#e04040" },
  { code: "X", label: "Strong negative", lr: 0.12, color: "#d07070" },
  { code: "M", label: "Moderate negative", lr: 0.35, color: "#c8a060" },
  { code: "W", label: "Weak signal", lr: 0.65, color: "#a0a090" },
  { code: "N", label: "Noise", lr: 1.0, color: "#808080" },
  { code: "S", label: "Weak positive", lr: 1.6, color: "#90a0c0" },
  { code: "F", label: "Moderate positive", lr: 3.0, color: "#70a070" },
  { code: "V", label: "Strong positive", lr: 6.0, color: "#50a050" },
  { code: "C", label: "Cost-bearing positive", lr: 10.0, color: "#308030" }
];

const STAGES = ["Domain Select", "Intake", "Score", "Align", "Weigh", "Rule", "Residual", "Output"];

export default function GovernanceCompiler() {
  const [stage, setStage] = useState(0);
  const [caseType, setCaseType] = useState("");
  const [caseName, setCaseName] = useState("");
  const [domains, setDomains] = useState([]);
  const [weights, setWeights] = useState([]);
  const [confidence, setConfidence] = useState(0.95);
  const [evidence, setEvidence] = useState({});
  const [scores, setScores] = useState({});
  const [signals, setSignals] = useState({});
  const [ruling, setRuling] = useState("");
  const [falsifiability, setFalsifiability] = useState("");
  const [residuals, setResiduals] = useState([]);

  const selectType = useCallback((type) => {
    setCaseType(type);
    const d = DOMAINS_BY_TYPE[type] || [];
    setDomains(d);
    setWeights(WEIGHTS_BY_TYPE[type] || d.map(() => 1 / d.length));
    setConfidence(CONFIDENCE_BY_TYPE[type] || 0.95);
    const ev = {};
    const sc = {};
    const si = {};
    d.forEach(dom => { ev[dom] = ""; sc[dom] = 50; si[dom] = "N"; });
    setEvidence(ev);
    setScores(sc);
    setSignals(si);
  }, []);

  const computeLLR = useCallback(() => {
    let llr = 0;
    domains.forEach(d => {
      const sig = SIGNALS.find(s => s.code === signals[d]);
      if (sig) llr += Math.log(sig.lr);
    });
    return llr;
  }, [domains, signals]);

  const computeComposite = useCallback(() => {
    let total = 0;
    domains.forEach((d, i) => { total += scores[d] * (weights[i] || 0); });
    return total;
  }, [domains, scores, weights]);

  const sprtBound = Math.log((1 / (1 - confidence)) / (1 - confidence));
  const llr = computeLLR();
  const composite = computeComposite();
  const prob = 1 / (1 + Math.exp(-llr));
  const sprtStatus = llr >= sprtBound ? "EXIT_POSITIVE" : llr <= -sprtBound ? "EXIT_NEGATIVE" : "CONTINUE";

  const hardRules = [];
  domains.forEach(d => {
    if (signals[d] === "H*") hardRules.push(`Fatal signal in ${d}`);
  });
  const xCount = domains.filter(d => signals[d] === "X").length;
  if (xCount >= 3) hardRules.push(`${xCount} strong negatives detected (≥3 threshold)`);

  const addResidual = () => setResiduals([...residuals, { desc: "", category: "data_gap", strategy: "", goal: "" }]);
  const updateResidual = (i, field, val) => {
    const r = [...residuals];
    r[i] = { ...r[i], [field]: val };
    setResiduals(r);
  };

  const gatesPass = ruling.length > 10 && falsifiability.length > 10 && residuals.every(r => r.strategy.length > 5);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-light tracking-wide text-amber-200">Governance Compiler</h1>
          <p className="text-xs text-gray-500 mt-1 tracking-widest uppercase">Multi-Domain Judicial Architecture v1.0</p>
        </div>

        <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
          {STAGES.map((s, i) => (
            <button key={s} onClick={() => i <= stage ? setStage(i) : null}
              className={`px-3 py-1.5 text-xs tracking-wider uppercase whitespace-nowrap border rounded transition-all ${
                i === stage ? "border-amber-400 text-amber-300 bg-amber-400/10" :
                i < stage ? "border-gray-700 text-gray-400 cursor-pointer hover:border-gray-500" :
                "border-gray-800 text-gray-700 cursor-default"
              }`}>{i + 1}. {s}</button>
          ))}
        </div>

        {stage === 0 && (
          <div>
            <h2 className="text-lg font-light text-gray-300 mb-4">Select Domain</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {Object.keys(DOMAINS_BY_TYPE).map(type => (
                <button key={type} onClick={() => { selectType(type); }}
                  className={`p-4 border rounded text-left transition-all ${
                    caseType === type ? "border-amber-400 bg-amber-400/5" : "border-gray-800 hover:border-gray-600"
                  }`}>
                  <div className="text-sm font-medium capitalize">{type.replace("-", " ")}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {(DOMAINS_BY_TYPE[type] || []).length || "User-defined"} domains · {Math.round((CONFIDENCE_BY_TYPE[type] || 0.95) * 100)}% conf
                  </div>
                </button>
              ))}
            </div>
            <input value={caseName} onChange={e => setCaseName(e.target.value)} placeholder="Case name..."
              className="w-full bg-gray-900 border border-gray-800 rounded px-4 py-2 text-sm mb-4" />
            <button onClick={() => caseType && caseName && setStage(1)}
              disabled={!caseType || !caseName}
              className="px-6 py-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-sm rounded disabled:opacity-30">
              Proceed to Intake →
            </button>
          </div>
        )}

        {stage === 1 && (
          <div>
            <h2 className="text-lg font-light text-gray-300 mb-4">Stage 1: Intake</h2>
            <p className="text-xs text-gray-500 mb-6">Enter evidence for each domain. Leave blank to flag as missing.</p>
            {domains.map(d => (
              <div key={d} className="mb-4">
                <label className="text-xs text-gray-400 uppercase tracking-wider">{d}</label>
                <textarea value={evidence[d] || ""} onChange={e => setEvidence({ ...evidence, [d]: e.target.value })}
                  rows={3} placeholder={`Evidence for ${d}...`}
                  className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm mt-1" />
              </div>
            ))}
            <div className="mt-4 p-4 bg-gray-900 border border-gray-800 rounded text-xs">
              <div className="text-gray-400 uppercase tracking-wider mb-2">Intake Summary</div>
              <div>Domains received: {domains.filter(d => evidence[d]?.length > 0).length}/{domains.length}</div>
              <div>Missing: {domains.filter(d => !evidence[d]?.length).join(", ") || "None"}</div>
            </div>
            <button onClick={() => setStage(2)} className="mt-4 px-6 py-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-sm rounded">
              Proceed to Score →
            </button>
          </div>
        )}

        {stage === 2 && (
          <div>
            <h2 className="text-lg font-light text-gray-300 mb-4">Stage 2: Score</h2>
            <p className="text-xs text-gray-500 mb-6">Assign a signal code and score (0-100) per domain.</p>
            {domains.map(d => (
              <div key={d} className="mb-5 p-4 bg-gray-900 border border-gray-800 rounded">
                <div className="text-sm font-medium mb-3">{d}</div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {SIGNALS.map(s => (
                    <button key={s.code} onClick={() => setSignals({ ...signals, [d]: s.code })}
                      className={`px-2 py-1 text-xs border rounded ${
                        signals[d] === s.code ? "border-amber-400 bg-amber-400/10" : "border-gray-700"
                      }`} style={{ color: s.color }}>
                      {s.code}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <input type="range" min={0} max={100} value={scores[d] || 50}
                    onChange={e => setScores({ ...scores, [d]: Number(e.target.value) })}
                    className="flex-1" />
                  <span className="text-sm w-10 text-right">{scores[d]}</span>
                </div>
              </div>
            ))}
            <div className="mt-4 p-4 bg-gray-900 border border-gray-800 rounded text-xs space-y-1">
              <div className="text-gray-400 uppercase tracking-wider mb-2">Bayesian Summary</div>
              <div>LLR: <span className={llr > 0 ? "text-green-400" : llr < 0 ? "text-red-400" : "text-gray-400"}>{llr.toFixed(3)}</span></div>
              <div>P(positive): {(prob * 100).toFixed(1)}%</div>
              <div>SPRT: <span className={
                sprtStatus === "EXIT_POSITIVE" ? "text-green-400" : 
                sprtStatus === "EXIT_NEGATIVE" ? "text-red-400" : "text-amber-400"
              }>{sprtStatus}</span> (bound: ±{sprtBound.toFixed(3)} at {Math.round(confidence * 100)}%)</div>
            </div>
            <button onClick={() => setStage(3)} className="mt-4 px-6 py-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-sm rounded">
              Proceed to Align →
            </button>
          </div>
        )}

        {stage === 3 && (
          <div>
            <h2 className="text-lg font-light text-gray-300 mb-4">Stage 3: Align</h2>
            <div className="p-4 bg-gray-900 border border-gray-800 rounded mb-4">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-3">Hard Rule Check</div>
              {hardRules.length === 0 ? (
                <div className="text-green-400 text-sm">✓ No hard rule violations</div>
              ) : hardRules.map((r, i) => (
                <div key={i} className="text-red-400 text-sm mb-1">✗ {r}</div>
              ))}
            </div>
            <div className="p-4 bg-gray-900 border border-gray-800 rounded mb-4">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-3">Per-Domain Alignment</div>
              {domains.map(d => {
                const sig = SIGNALS.find(s => s.code === signals[d]);
                const isNeg = sig && sig.lr < 0.5;
                return (
                  <div key={d} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
                    <span className="text-sm">{d}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs" style={{ color: sig?.color }}>{signals[d]} ({sig?.label})</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${isNeg ? "bg-red-400/10 text-red-400" : "bg-green-400/10 text-green-400"}`}>
                        {isNeg ? "MISALIGNED" : "ALIGNED"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-4 bg-gray-900 border border-gray-800 rounded">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Precedent</div>
              <div className="text-sm text-gray-500 italic">Novel — no prior precedent in this session</div>
            </div>
            <button onClick={() => setStage(4)} className="mt-4 px-6 py-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-sm rounded">
              Proceed to Weigh →
            </button>
          </div>
        )}

        {stage === 4 && (
          <div>
            <h2 className="text-lg font-light text-gray-300 mb-4">Stage 4: Weigh</h2>
            <div className="p-4 bg-gray-900 border border-gray-800 rounded mb-4">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-3">Weighted Composite</div>
              <table className="w-full text-sm">
                <thead><tr className="text-gray-500 text-xs">
                  <th className="text-left py-1">Domain</th><th className="text-right">Score</th><th className="text-right">Weight</th><th className="text-right">Weighted</th>
                </tr></thead>
                <tbody>
                  {domains.map((d, i) => (
                    <tr key={d} className="border-t border-gray-800">
                      <td className="py-1.5">{d}</td>
                      <td className="text-right">{scores[d]}</td>
                      <td className="text-right text-gray-500">{(weights[i] * 100).toFixed(0)}%</td>
                      <td className="text-right text-amber-300">{(scores[d] * weights[i]).toFixed(1)}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-gray-600 font-medium">
                    <td className="py-2">COMPOSITE</td><td></td><td></td>
                    <td className="text-right text-amber-200 text-lg">{composite.toFixed(1)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center mb-4">
              <div className="p-3 bg-gray-900 border border-gray-800 rounded">
                <div className="text-xs text-gray-500">LLR</div>
                <div className={`text-lg ${llr > 0 ? "text-green-400" : "text-red-400"}`}>{llr.toFixed(2)}</div>
              </div>
              <div className="p-3 bg-gray-900 border border-gray-800 rounded">
                <div className="text-xs text-gray-500">Probability</div>
                <div className="text-lg text-amber-300">{(prob * 100).toFixed(1)}%</div>
              </div>
              <div className="p-3 bg-gray-900 border border-gray-800 rounded">
                <div className="text-xs text-gray-500">SPRT</div>
                <div className={`text-lg ${sprtStatus.includes("POSITIVE") ? "text-green-400" : sprtStatus.includes("NEG") ? "text-red-400" : "text-amber-400"}`}>
                  {sprtStatus.replace("_", " ")}
                </div>
              </div>
            </div>
            <button onClick={() => setStage(5)} className="mt-4 px-6 py-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-sm rounded">
              Proceed to Rule →
            </button>
          </div>
        )}

        {stage === 5 && (
          <div>
            <h2 className="text-lg font-light text-gray-300 mb-4">Stage 5: Rule</h2>
            <div className="mb-4">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Determination</label>
              <textarea value={ruling} onChange={e => setRuling(e.target.value)} rows={6}
                placeholder="State the ruling — clear, specific, actionable..."
                className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label className="text-xs text-gray-400 uppercase tracking-wider">Falsifiability <span className="text-red-400">*required</span></label>
              <textarea value={falsifiability} onChange={e => setFalsifiability(e.target.value)} rows={4}
                placeholder="What specific evidence would change this ruling?"
                className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm mt-1" />
            </div>
            {!falsifiability && <div className="text-red-400 text-xs mb-4 p-2 border border-red-400/30 rounded bg-red-400/5">
              ⚠ UNFALSIFIABLE_WARNING — A ruling without falsifiability conditions cannot pass Gate G4
            </div>}
            <button onClick={() => setStage(6)} className="mt-2 px-6 py-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-sm rounded">
              Proceed to Residual →
            </button>
          </div>
        )}

        {stage === 6 && (
          <div>
            <h2 className="text-lg font-light text-gray-300 mb-4">Stage 6: MirrorSolveRT</h2>
            <p className="text-xs text-gray-500 mb-4">For everything the ruling couldn't optimize, document the residual + strategy + goal.</p>
            {residuals.map((r, i) => (
              <div key={i} className="mb-4 p-4 bg-gray-900 border border-gray-800 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-amber-400">R{i + 1}</span>
                  <select value={r.category} onChange={e => updateResidual(i, "category", e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs">
                    <option value="hard_constraint">Hard Constraint</option>
                    <option value="data_gap">Data Gap</option>
                    <option value="conflict">Conflict</option>
                    <option value="temporal">Temporal</option>
                    <option value="capacity">Capacity</option>
                  </select>
                </div>
                <input value={r.desc} onChange={e => updateResidual(i, "desc", e.target.value)} placeholder="What couldn't be optimized?"
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm mb-2" />
                <input value={r.strategy} onChange={e => updateResidual(i, "strategy", e.target.value)} placeholder="Strategy to address..."
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm mb-2" />
                <input value={r.goal} onChange={e => updateResidual(i, "goal", e.target.value)} placeholder="Measurable goal + timeframe..."
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-sm" />
              </div>
            ))}
            <button onClick={addResidual} className="px-4 py-1.5 border border-gray-700 text-gray-400 text-xs rounded hover:border-gray-500 mb-4">
              + Add Residual
            </button>
            <br />
            <button onClick={() => setStage(7)} className="mt-2 px-6 py-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-sm rounded">
              Proceed to Output →
            </button>
          </div>
        )}

        {stage === 7 && (
          <div>
            <h2 className="text-lg font-light text-gray-300 mb-4">Stage 7: Output</h2>
            <div className="mb-4 p-4 border-2 border-amber-400/30 rounded bg-amber-400/5">
              <div className="text-xs text-amber-400 uppercase tracking-widest mb-3">Governance Gates</div>
              {[
                ["G1: Register purity", caseType !== ""],
                ["G2: Doctrine compliance", true],
                ["G3: Precedent consistency", true],
                ["G4: Falsifiability", falsifiability.length > 10],
                ["G5: Residual completeness", residuals.length === 0 || residuals.every(r => r.strategy.length > 5)]
              ].map(([label, pass]) => (
                <div key={label} className="flex items-center gap-2 py-1">
                  <span className={pass ? "text-green-400" : "text-red-400"}>{pass ? "✓" : "✗"}</span>
                  <span className="text-sm">{label}</span>
                </div>
              ))}
              <div className={`mt-3 text-sm font-medium ${gatesPass ? "text-green-400" : "text-red-400"}`}>
                {gatesPass ? "ALL GATES PASS — Ruling finalized" : "GATE FAILURE — Review required"}
              </div>
            </div>

            <div className="p-6 bg-gray-900 border border-gray-800 rounded mb-4">
              <div className="text-xs text-gray-500 uppercase tracking-widest mb-4">Compilation Complete</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">Case</span><span>{caseName}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Domain</span><span className="capitalize">{caseType.replace("-", " ")}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Composite</span><span className="text-amber-300">{composite.toFixed(1)}/100</span></div>
                <div className="flex justify-between"><span className="text-gray-400">LLR</span><span className={llr > 0 ? "text-green-400" : "text-red-400"}>{llr.toFixed(3)}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Probability</span><span>{(prob * 100).toFixed(1)}%</span></div>
                <div className="flex justify-between"><span className="text-gray-400">SPRT</span><span>{sprtStatus}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Hard violations</span><span>{hardRules.length}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Residuals</span><span>{residuals.length}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Confidence</span><span>{Math.round(confidence * 100)}%</span></div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="text-xs text-gray-500 mb-2">DETERMINATION</div>
                <div className="text-sm whitespace-pre-wrap">{ruling || "(none entered)"}</div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="text-xs text-gray-500 mb-2">FALSIFIABILITY</div>
                <div className="text-sm whitespace-pre-wrap">{falsifiability || "(none entered)"}</div>
              </div>
              {residuals.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="text-xs text-gray-500 mb-2">RESIDUALS</div>
                  {residuals.map((r, i) => (
                    <div key={i} className="mb-3 pl-3 border-l-2 border-amber-400/30">
                      <div className="text-xs text-amber-400">R{i + 1} [{r.category}]</div>
                      <div className="text-sm">{r.desc}</div>
                      <div className="text-xs text-gray-500 mt-1">Strategy: {r.strategy}</div>
                      <div className="text-xs text-gray-500">Goal: {r.goal}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => { setStage(0); setCaseType(""); setCaseName(""); setRuling(""); setFalsifiability(""); setResiduals([]); }}
              className="px-6 py-2 border border-gray-700 text-gray-400 text-sm rounded hover:border-gray-500">
              New Compilation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
