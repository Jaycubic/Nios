const fs = require('fs');

const w = 280;
const h = 60;
const spacingY = 100;

// Helper
const cta = (id, text, x, y) => ({ id, text, type: 'cta', x, y });
const state = (id, text, x, y) => ({ id, text, type: 'state', x, y });
const screen = (id, text, x, y) => ({ id, text, type: 'screen', x, y });
const endpt = (id, text, x, y) => ({ id, text, type: 'end', x, y });

let nodes = [];
let links = [];

const addLink = (from, to, lbl) => links.push({from, to, label: lbl});

// Column 1: P1 Flow (X = 300)
let x1 = 300;
let y = 150;
nodes.push(screen('p1_scr', 'Screen: P1_ProgressOverview', x1, y));
y += spacingY;
nodes.push(state('p1_st1', 'State: Review Overall Status', x1, y)); addLink('p1_scr', 'p1_st1');
y += spacingY;
nodes.push(state('p1_st2', 'State: Check Subject Summary', x1, y)); addLink('p1_st1', 'p1_st2');
y += spacingY;
nodes.push(state('p1_st3', 'State: Read Actionable Steps', x1, y)); addLink('p1_st2', 'p1_st3');
y += spacingY;
nodes.push(endpt('p1_end', 'Task Complete: Progress Reviewed', x1, y)); addLink('p1_st3', 'p1_end');

let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="100%" height="100%">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
    </marker>
  </defs>
  <rect width="600" height="700" fill="#f8fafc" />
  <text x="300" y="40" font-family="sans-serif" font-size="28" font-weight="bold" text-anchor="middle" fill="#0f172a">Parent Dashboard UX Flow</text>
  <text x="300" y="90" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="#4c1d95">Informational Reading Flow</text>
`;

links.forEach(l => {
  const from = nodes.find(n => n.id === l.from);
  const to = nodes.find(n => n.id === l.to);
  let fx = from.x, fy = from.y + h/2;
  let tx = to.x, ty = to.y - h/2 - 5;
  
  svg += `<line x1="${fx}" y1="${fy}" x2="${tx}" y2="${ty}" stroke="#94a3b8" stroke-width="2" marker-end="url(#arrow)" />`;
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
fs.writeFileSync('C:/Users/hp/.gemini/antigravity/brain/6b4db814-9bb6-48c9-8d40-43975fe39039/parent_ux_task_flow_raw.svg', svg);
