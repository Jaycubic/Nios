const fs = require('fs');

const w = 260;
const h = 60;
const spacingX = 400;
const spacingY = 100;

// Helper
const cta = (id, text, x, y) => ({ id, text, type: 'cta', x, y });
const state = (id, text, x, y) => ({ id, text, type: 'state', x, y });
const screen = (id, text, x, y) => ({ id, text, type: 'screen', x, y });
const decision = (id, text, x, y) => ({ id, text, type: 'decision', x, y });
const endpt = (id, text, x, y) => ({ id, text, type: 'end', x, y });

let nodes = [];
let links = [];

const addLink = (from, to, lbl) => links.push({from, to, label: lbl});

// Column 1: E0 Flow (X = 200)
let x1 = 200;
let y = 150;
nodes.push(screen('e0_scr', 'Screen: E0_MyStudents', x1, y));
y += spacingY;
nodes.push(cta('e0_cta', 'CTA: Click Deep Dive Analysis', x1, y)); addLink('e0_scr', 'e0_cta');
y += spacingY;
nodes.push(state('e0_st', 'State: Navigates to E1', x1, y)); addLink('e0_cta', 'e0_st');

// Column 2: E1 Flow - Explorer Path (X = 650)
let x2 = 650;
y = 150;
nodes.push(screen('e1_scr', 'Screen: E1_StudentOverview', x2, y)); addLink('e0_st', 'e1_scr');
y += spacingY;
nodes.push(cta('e1_sub', 'CTA: Click Subject', x2, y)); addLink('e1_scr', 'e1_sub');
y += spacingY;
nodes.push(state('e1_st1', 'State: Updates Table', x2, y)); addLink('e1_sub', 'e1_st1');
y += spacingY;
nodes.push(cta('e1_all', 'CTA: Click View All Chapters', x2, y)); addLink('e1_st1', 'e1_all');
y += spacingY;
nodes.push(screen('e1_mod', 'Dialog: All Chapters', x2, y)); addLink('e1_all', 'e1_mod');
y += spacingY;
nodes.push(cta('e1_chp', 'CTA: Click Chapter Row', x2, y)); addLink('e1_mod', 'e1_chp');
y += spacingY;
nodes.push(decision('e1_dec', 'Is Trigonometry?', x2, y)); addLink('e1_chp', 'e1_dec');

y += spacingY;
nodes.push(state('e1_non', 'State: No Action', x2, y)); addLink('e1_dec', 'e1_non', 'No');

// Column 3: E1 Flow - Interventions Path (X = 1100)
let x3 = 1100;
y = 250;
nodes.push(cta('e1_asg', 'CTA: Click + Assign', x3, y)); addLink('e1_scr', 'e1_asg');
y += spacingY;
nodes.push(screen('e1_men', 'Menu: Assignment Types', x3, y)); addLink('e1_asg', 'e1_men');
y += spacingY;
nodes.push(cta('e1_typ', 'CTA: Click Type', x3, y)); addLink('e1_men', 'e1_typ');
y += spacingY;
nodes.push(screen('e1_dmd', 'Dialog: Distribute Content', x3, y)); addLink('e1_typ', 'e1_dmd');
y += spacingY;
nodes.push(cta('e1_cnm', 'CTA: Click Confirm & Assign', x3, y)); addLink('e1_dmd', 'e1_cnm');
y += spacingY;
nodes.push(state('e1_as2', 'State: Marked Assigned', x3, y)); addLink('e1_cnm', 'e1_as2');


// Column 4: E3 Flow (X = 1550)
let x4 = 1550;
y = 850; // Align with Decision Yes path
nodes.push(state('e3_st1', 'State: Navigates to Diagnosis', x4, y)); addLink('e1_dec', 'e3_st1', 'Yes');
y += spacingY;
nodes.push(screen('e3_scr', 'Screen: E3_ErrorAnalysis', x4, y)); addLink('e3_st1', 'e3_scr');
y += spacingY;
nodes.push(cta('e3_qus', 'CTA: Click Question Row', x4, y)); addLink('e3_scr', 'e3_qus');
y += spacingY;
nodes.push(state('e3_exp', 'State: Expands Steps', x4, y)); addLink('e3_qus', 'e3_exp');

y = 1050;
nodes.push(cta('e3_hvr', 'CTA: Hover Map Node', x4 + 300, y)); addLink('e3_scr', 'e3_hvr');
y += spacingY;
nodes.push(state('e3_tip', 'State: Shows Tooltip', x4 + 300, y)); addLink('e3_hvr', 'e3_tip');

y = 1250;
nodes.push(cta('e3_bck', 'CTA: Click Back to Student', x4, y)); addLink('e3_scr', 'e3_bck');
addLink('e3_bck', 'e1_scr'); // Loops back


let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 1500" width="100%" height="100%">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
    </marker>
  </defs>
  <rect width="2000" height="1500" fill="#f8fafc" />
  <text x="1000" y="40" font-family="sans-serif" font-size="28" font-weight="bold" text-anchor="middle" fill="#0f172a">Detailed Educator UX Interaction Flow</text>
  <text x="200" y="90" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="#4c1d95">E0 Flow</text>
  <text x="875" y="90" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="#4c1d95">E1 Flow</text>
  <text x="1550" y="90" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="#4c1d95">E3 Flow</text>
  
  <line x1="425" y1="70" x2="425" y2="1400" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="8 8" />
  <line x1="1350" y1="70" x2="1350" y2="1400" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="8 8" />
`;

links.forEach(l => {
  const from = nodes.find(n => n.id === l.from);
  const to = nodes.find(n => n.id === l.to);
  let fx = from.x, fy = from.y + h/2;
  let tx = to.x, ty = to.y - h/2 - 5;
  
  if (from.x !== to.x) {
    if(l.from === 'e3_bck' && l.to === 'e1_scr') {
       svg += `<path d="M ${fx-w/2} ${from.y} C 400 ${from.y}, 400 ${to.y}, ${tx+w/2+5} ${to.y}" fill="none" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />`;
    } else {
       svg += `<path d="M ${fx} ${fy} C ${fx} ${fy+40}, ${tx} ${ty-40}, ${tx} ${ty}" fill="none" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />`;
       if (l.label) {
         svg += `<text x="${(fx+tx)/2}" y="${(fy+ty)/2 - 10}" font-family="sans-serif" font-size="12" fill="#475569" text-anchor="middle" font-weight="bold">${l.label}</text>`;
       }
    }
  } else {
    svg += `<line x1="${fx}" y1="${fy}" x2="${tx}" y2="${ty}" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />`;
    if (l.label) {
      svg += `<text x="${fx + 15}" y="${(fy+ty)/2}" font-family="sans-serif" font-size="12" fill="#ea580c" font-weight="bold">${l.label}</text>`;
    }
  }
});

nodes.forEach(n => {
  let fill, stroke, rx, dash = '';
  if (n.type === 'screen') { fill = '#f3e8ff'; stroke = '#9333ea'; rx = 8; }
  else if (n.type === 'cta') { fill = '#e0f2fe'; stroke = '#0284c7'; rx = 4; }
  else if (n.type === 'state') { fill = '#f1f5f9'; stroke = '#64748b'; rx = 4; dash = 'stroke-dasharray="5 5"'; }
  else if (n.type === 'decision') { fill = '#ffedd5'; stroke = '#ea580c'; rx = 0; } // Will draw diamond over it
  else { fill = '#dcfce7'; stroke = '#16a34a'; rx = 30; } 
  
  const x = n.x - w/2;
  const y = n.y - h/2;
  
  if(n.type === 'decision') {
      svg += `<polygon points="${n.x},${n.y - h/2 - 10} ${n.x + w/2 + 10},${n.y} ${n.x},${n.y + h/2 + 10} ${n.x - w/2 - 10},${n.y}" fill="${fill}" stroke="${stroke}" stroke-width="2" />`;
      svg += `<text x="${n.x}" y="${n.y + 5}" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">${n.text}</text>`;
  } else {
      svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2" ${dash} />`;
      svg += `<text x="${n.x}" y="${n.y + 5}" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1e293b" text-anchor="middle">${n.text}</text>`;
  }
});

svg += '</svg>';
fs.writeFileSync('C:/Users/hp/.gemini/antigravity/brain/6b4db814-9bb6-48c9-8d40-43975fe39039/educator_ux_task_flow_raw.svg', svg);
