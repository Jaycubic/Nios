const fs = require('fs');

const w = 260;
const h = 60;
const spacingX = 400;
const spacingY = 100;

// Helper
const cta = (id, text, x, y) => ({ id, text, type: 'cta', x, y });
const state = (id, text, x, y) => ({ id, text, type: 'state', x, y });
const screen = (id, text, x, y) => ({ id, text, type: 'screen', x, y });
const endpt = (id, text, x, y) => ({ id, text, type: 'end', x, y });

let nodes = [];
let links = [];

const addLink = (from, to, lbl) => links.push({from, to, label: lbl});

// Column 1: S1 Dashboard Flow (X = 200)
let x1 = 200;
let y = 150;
nodes.push(screen('s1_dash', 'S1_Dashboard Screen', x1, y));
y += spacingY;
nodes.push(cta('s1_area', 'CTA: Click Improvement Area', x1, y)); addLink('s1_dash', 's1_area');
y += spacingY;
nodes.push(screen('s1_lp', 'Dialog: Active Learning Path', x1, y)); addLink('s1_area', 's1_lp');
y += spacingY;
nodes.push(cta('s1_rev1', 'CTA: Click Review & Prepare', x1, y)); addLink('s1_lp', 's1_rev1');
y += spacingY;
nodes.push(screen('s1_st1', 'Dialog: Review & Prepare', x1, y)); addLink('s1_rev1', 's1_st1');
y += spacingY;
nodes.push(cta('s1_mark1', 'CTA: Mark as Reviewed & Continue', x1, y)); addLink('s1_st1', 's1_mark1');
y += spacingY;
nodes.push(cta('s1_start', 'CTA: Click Start Practice →', x1, y)); addLink('s1_mark1', 's1_start');
y += spacingY;
nodes.push(screen('s1_draw', 'Drawer: Practice Challenge ✏️', x1, y)); addLink('s1_start', 's1_draw');
y += spacingY;
nodes.push(cta('s1_opt', 'CTA: Select 2 Answer Options', x1, y)); addLink('s1_draw', 's1_opt');
y += spacingY;
nodes.push(cta('s1_sub', 'CTA: Submit Answer & Complete →', x1, y)); addLink('s1_opt', 's1_sub');
y += spacingY;
nodes.push(state('s1_close', 'State: Drawer/Dialog Closes', x1, y)); addLink('s1_sub', 's1_close');
y += spacingY;
nodes.push(endpt('s1_end', 'Task Complete: Back to Dash', x1, y)); addLink('s1_close', 's1_end');

// Column 2: S2 Subject Matrix - Chapter Flow (X = 650)
let x2 = 650;
y = 150;
nodes.push(screen('s2_mat', 'S2_SubjectMatrix Screen', x2, y));
y += spacingY;
nodes.push(screen('s2_c_mod', 'Modal: Chapter Details', x2, y)); addLink('s2_mat', 's2_c_mod', 'Click Chapter');
y += spacingY;
nodes.push(cta('s2_ph1_chk', 'CTA: Check Phase 1 Topics', x2, y)); addLink('s2_c_mod', 's2_ph1_chk');
y += spacingY;
nodes.push(cta('s2_ph1_prac', 'CTA: Click ✏️ 1st Time Practice', x2, y)); addLink('s2_ph1_chk', 's2_ph1_prac');
y += spacingY;
nodes.push(screen('s2_draw', 'Drawer: Practice Challenge ✏️', x2, y)); addLink('s2_ph1_prac', 's2_draw');
y += spacingY;
nodes.push(cta('s2_sub_prac', 'CTA: Click Submit Practice', x2, y)); addLink('s2_draw', 's2_sub_prac');
y += spacingY;
nodes.push(state('s2_ph2_exp', 'State: Review & Refresh Expands', x2, y)); addLink('s2_sub_prac', 's2_ph2_exp');
y += spacingY;
nodes.push(cta('s2_ph2_chk', 'CTA: Check Phase 2 Topics', x2, y)); addLink('s2_ph2_exp', 's2_ph2_chk');
y += spacingY;
nodes.push(state('s2_ph3_exp', 'State: Pre-Mock Prep Expands', x2, y)); addLink('s2_ph2_chk', 's2_ph3_exp');
y += spacingY;
nodes.push(cta('s2_ph3_chk', 'CTA: Check Phase 3 Topics', x2, y)); addLink('s2_ph3_exp', 's2_ph3_chk');
y += spacingY;
nodes.push(cta('s2_fin', 'CTA: Click 🎉 Finish Chapter', x2, y)); addLink('s2_ph3_chk', 's2_fin');
y += spacingY;
nodes.push(endpt('s2_end', 'Task Complete: Back to Roadmap', x2, y)); addLink('s2_fin', 's2_end');

// Column 3: S2 Subject Matrix - Mock Test Flow (X = 1100)
let x3 = 1100;
y = 250;
nodes.push(screen('m_mod', 'Modal: Mock Test', x3, y)); addLink('s2_mat', 'm_mod', 'Click Mock Test');
y += spacingY;
nodes.push(cta('m_opt', 'CTA: Select 10 Answer Options', x3, y)); addLink('m_mod', 'm_opt');
y += spacingY;
nodes.push(cta('m_sub', 'CTA: Click Submit Mock Test', x3, y)); addLink('m_opt', 'm_sub');
y += spacingY;
nodes.push(state('m_clo', 'State: Modal Closes, Node Green', x3, y)); addLink('m_sub', 'm_clo');
y += spacingY;
nodes.push(endpt('m_end', 'Task Complete: Next Ch Unlocks', x3, y)); addLink('m_clo', 'm_end');

let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 1350" width="100%" height="100%">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
    </marker>
  </defs>
  <rect width="1400" height="1350" fill="#f8fafc" />
  <text x="700" y="40" font-family="sans-serif" font-size="28" font-weight="bold" text-anchor="middle" fill="#0f172a">Detailed Student UX Interaction Flow</text>
  <text x="200" y="90" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="#4c1d95">S1_Dashboard Flow</text>
  <text x="875" y="90" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="#4c1d95">S2_SubjectMatrix Flow</text>
  <line x1="425" y1="70" x2="425" y2="1300" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="8 8" />
`;

links.forEach(l => {
  const from = nodes.find(n => n.id === l.from);
  const to = nodes.find(n => n.id === l.to);
  let fx = from.x, fy = from.y + h/2;
  let tx = to.x, ty = to.y - h/2 - 5;
  
  if (from.x !== to.x) {
    svg += `<path d="M ${fx} ${fy} C ${fx} ${fy+40}, ${tx} ${ty-40}, ${tx} ${ty}" fill="none" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />`;
    if (l.label) {
      svg += `<text x="${(fx+tx)/2}" y="${(fy+ty)/2 - 10}" font-family="sans-serif" font-size="12" fill="#475569" text-anchor="middle" font-weight="bold">${l.label}</text>`;
    }
  } else {
    svg += `<line x1="${fx}" y1="${fy}" x2="${tx}" y2="${ty}" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />`;
    if (l.label) {
      svg += `<text x="${fx + 10}" y="${(fy+ty)/2}" font-family="sans-serif" font-size="12" fill="#475569" font-weight="bold">${l.label}</text>`;
    }
  }
});

nodes.forEach(n => {
  let fill, stroke, rx, dash = '';
  if (n.type === 'screen') { fill = '#f3e8ff'; stroke = '#9333ea'; rx = 8; }
  else if (n.type === 'cta') { fill = '#e0f2fe'; stroke = '#0284c7'; rx = 4; }
  else if (n.type === 'state') { fill = '#f1f5f9'; stroke = '#64748b'; rx = 4; dash = 'stroke-dasharray="5 5"'; }
  else { fill = '#dcfce7'; stroke = '#16a34a'; rx = 30; } 
  
  const x = n.x - w/2;
  const y = n.y - h/2;
  
  svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2" ${dash} />`;
  svg += `<text x="${n.x}" y="${n.y + 5}" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">${n.text}</text>`;
});

svg += '</svg>';
fs.writeFileSync('C:/Users/hp/.gemini/antigravity/brain/6b4db814-9bb6-48c9-8d40-43975fe39039/ux_task_flow_raw.svg', svg);
