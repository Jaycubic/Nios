// src/screens/student/S2_SubjectMatrix.jsx
// Road direction: BOTTOM (START / completed) → TOP (GOAL / not-started near flag)
import React, { useState, useEffect, useRef } from 'react';
import {
    Box, Typography, Chip, LinearProgress,
    Divider, Button, Modal, IconButton, Drawer,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';
import {
    ROAD_PATH_D,
    ROAD_PATH_ID,
    ROAD_VIEWBOX,
    ROAD_VIEWBOX_W,
    ROAD_VIEWBOX_H,
    getNodeAnchors,
} from '../../components/RoadPath';
import subjectQuestions from '../../data/subjectQuestions.json';

// ─── Static Data ──────────────────────────────────────────────────────────────

const subjectMap = {
    math: {
        id: 'math', name: 'Mathematics', shortName: 'Math',
        icon: '📐', score: 68, practice: 75,
        weakTopics: ['Trigonometry', 'Quadratic Equations'],
        strongTopics: ['Algebra Basics', 'Number Systems'],
        completedChapters: 2, totalChapters: 8,
    },
    science: {
        id: 'science', name: 'Science', shortName: 'Science',
        icon: '🔬', score: 55, practice: 38,
        weakTopics: ['Chemical Reactions', 'Electricity'],
        strongTopics: ['Physics Numericals'],
        completedChapters: 0, totalChapters: 8,
    },
    english: {
        id: 'english', name: 'English', shortName: 'English',
        icon: '📖', score: 82, practice: 80,
        weakTopics: [],
        strongTopics: ['Reading Skills', 'Essay Writing', 'Grammar'],
        completedChapters: 3, totalChapters: 8,
    },
    hindi: {
        id: 'hindi', name: 'Hindi', shortName: 'Hindi',
        icon: '✍️', score: 74, practice: 71,
        weakTopics: ['Poetry Analysis'],
        strongTopics: ['Essay Writing', 'Grammar'],
        completedChapters: 2, totalChapters: 8,
    },
    social: {
        id: 'social', name: 'Social Science', shortName: 'Soc. Sci.',
        icon: '🌍', score: 61, practice: 72,
        weakTopics: ['History — Nationalism', 'Geography — Resources'],
        strongTopics: ['Civics — Democracy'],
        completedChapters: 1, totalChapters: 8,
    },
};

const matrixDef = [
    {
        key: 'strong', label: 'Strong Subjects', desc: 'High Score · High Practice', icon: '✅',
        accentColor: COLORS.green, bgColor: `${COLORS.green}08`, borderColor: `${COLORS.green}35`,
        tagText: COLORS.greenDark, subjectIds: ['english', 'hindi'],
        advice: 'Keep the momentum. Maintain regular practice to stay ahead.',
    },
    {
        key: 'underutilized', label: 'Underutilized', desc: 'High Score · Low Practice', icon: '⚠️',
        accentColor: COLORS.yellow, bgColor: `${COLORS.yellow}08`, borderColor: `${COLORS.yellow}35`,
        tagText: COLORS.yellowDark, subjectIds: ['math'],
        advice: 'You know this well — practice more to solidify your edge.',
    },
    {
        key: 'inefficient', label: 'Inefficient Effort', desc: 'Low Score · High Practice', icon: '🔁',
        accentColor: COLORS.amber, bgColor: `${COLORS.amber}07`, borderColor: `${COLORS.amber}35`,
        tagText: COLORS.amberDark, subjectIds: ['social'],
        advice: 'Hard work without strategy. Revisit how you are studying.',
    },
    {
        key: 'neglected', label: 'Neglected', desc: 'Low Score · Low Practice', icon: '❗',
        accentColor: '#E05050', bgColor: '#ff00000A', borderColor: '#E0505040',
        tagText: '#B03030', subjectIds: ['science'],
        advice: 'Urgent. Start with 20 minutes daily to reverse this.',
    },
];

// ─── Chapter Data ─────────────────────────────────────────────────────────────

const initialChaptersData = {
    math: [
        {
            id: 1, title: 'Real Numbers', status: 'completed', firstTime: true,
            practiceCompleted: 15, practiceTotal: 15, mockScore: 85, mockAttempts: 2,
            topics: [
                { name: "Euclid's Division Lemma", learning: 'Completed', practice: '5/5', progress: 90 },
                { name: 'Fundamental Theorem of Arithmetic', learning: 'Completed', practice: '5/5', progress: 88 },
                { name: 'Irrational Numbers', learning: 'Completed', practice: '5/5', progress: 82 },
            ],
        },
        {
            id: 2, title: 'Polynomials', status: 'completed', firstTime: true,
            practiceCompleted: 12, practiceTotal: 15, mockScore: 72, mockAttempts: 1,
            topics: [
                { name: 'Zeros of a Polynomial', learning: 'Completed', practice: '4/5', progress: 75 },
                { name: 'Division Algorithm', learning: 'Completed', practice: '4/5', progress: 70 },
                { name: 'Zeros & Coefficients', learning: 'Completed', practice: '4/5', progress: 68 },
            ],
        },
        {
            id: 3, title: 'Quadratic Equations', status: 'in-progress', firstTime: false,
            practiceCompleted: 8, practiceTotal: 20, mockScore: 68, mockAttempts: 1,
            topics: [
                { name: 'Solving by Factorisation', learning: 'Completed', practice: '3/5', progress: 60 },
                { name: 'Quadratic Formula', learning: 'In Progress', practice: '2/5', progress: 40 },
                { name: 'Nature of Roots', learning: 'Not Started', practice: '0/5', progress: 0 },
                { name: 'Word Problems', learning: 'Not Started', practice: '0/5', progress: 0 },
            ],
        },
        {
            id: 4, title: 'Arithmetic Progressions', status: 'not-started', firstTime: false,
            practiceCompleted: 0, practiceTotal: 15, mockScore: null, mockAttempts: 0,
            topics: [
                { name: 'nth Term of AP', learning: 'Not Started', practice: '0/5', progress: 0 },
                { name: 'Sum of n Terms', learning: 'Not Started', practice: '0/5', progress: 0 },
                { name: 'Applications of AP', learning: 'Not Started', practice: '0/5', progress: 0 },
            ],
        },
        {
            id: 5, title: 'Triangles', status: 'not-started', firstTime: false,
            practiceCompleted: 0, practiceTotal: 15, mockScore: null, mockAttempts: 0,
            topics: [
                { name: 'Basic Proportionality Theorem', learning: 'Not Started', practice: '0/5', progress: 0 },
                { name: 'Pythagoras Theorem', learning: 'Not Started', practice: '0/5', progress: 0 },
            ],
        },
        {
            id: 6, title: 'Trigonometry', status: 'not-started', firstTime: false,
            practiceCompleted: 0, practiceTotal: 12, mockScore: null, mockAttempts: 0,
            topics: [
                { name: 'Standard Angle Values', learning: 'Not Started', practice: '0/4', progress: 0 },
                { name: 'Trigonometric Identities', learning: 'Not Started', practice: '0/4', progress: 0 },
            ],
        },
    ],
    science: [
        {
            id: 1, title: 'Chemical Reactions', status: 'in-progress', firstTime: false,
            practiceCompleted: 4, practiceTotal: 15, mockScore: null, mockAttempts: 0,
            topics: [
                { name: 'Types of Chemical Reactions', learning: 'In Progress', practice: '2/5', progress: 35 },
                { name: 'Balancing Equations', learning: 'Not Started', practice: '0/5', progress: 0 },
                { name: 'Effects of Oxidation', learning: 'Not Started', practice: '0/5', progress: 0 },
            ],
        },
        { id: 2, title: 'Acids, Bases & Salts', status: 'not-started', firstTime: false, practiceCompleted: 0, practiceTotal: 15, mockScore: null, mockAttempts: 0, topics: [{ name: 'Properties of Acids & Bases', learning: 'Not Started', practice: '0/5', progress: 0 }, { name: 'pH Scale', learning: 'Not Started', practice: '0/5', progress: 0 }] },
        { id: 3, title: 'Metals and Non-Metals', status: 'not-started', firstTime: false, practiceCompleted: 0, practiceTotal: 12, mockScore: null, mockAttempts: 0, topics: [
            { name: 'Physical Properties', learning: 'Not Started', practice: '0/5', progress: 0 },
            { name: 'Chemical Properties', learning: 'Not Started', practice: '0/5', progress: 0 }
        ] },
        { id: 4, title: 'Life Processes', status: 'not-started', firstTime: false, practiceCompleted: 0, practiceTotal: 14, mockScore: null, mockAttempts: 0, topics: [
            { name: 'Nutrition & Digestion', learning: 'Not Started', practice: '0/5', progress: 0 },
            { name: 'Respiration & Circulation', learning: 'Not Started', practice: '0/5', progress: 0 }
        ] },
        { id: 5, title: 'Control & Coordination', status: 'not-started', firstTime: false, practiceCompleted: 0, practiceTotal: 12, mockScore: null, mockAttempts: 0, topics: [
            { name: 'Nervous System', learning: 'Not Started', practice: '0/5', progress: 0 },
            { name: 'Hormones in Animals', learning: 'Not Started', practice: '0/5', progress: 0 }
        ] },
    ],
    english: [
        {
            id: 1, title: 'Reading Comprehension', status: 'completed', firstTime: true,
            practiceCompleted: 15, practiceTotal: 15, mockScore: 88, mockAttempts: 2,
            topics: [
                { name: 'Unseen Passages', learning: 'Completed', practice: '5/5', progress: 92 },
                { name: 'Vocabulary in Context', learning: 'Completed', practice: '5/5', progress: 85 },
                { name: 'Inference & Tone', learning: 'Completed', practice: '5/5', progress: 88 },
            ],
        },
        {
            id: 2, title: 'Grammar-Parts of Speech', status: 'completed', firstTime: true,
            practiceCompleted: 14, practiceTotal: 15, mockScore: 82, mockAttempts: 1,
            topics: [
                { name: 'Nouns & Pronouns', learning: 'Completed', practice: '5/5', progress: 90 },
                { name: 'Verbs & Tenses', learning: 'Completed', practice: '5/5', progress: 80 },
                { name: 'Adjectives & Adverbs', learning: 'Completed', practice: '4/5', progress: 75 },
            ],
        },
        {
            id: 3, title: 'Writing Skills', status: 'completed', firstTime: true,
            practiceCompleted: 12, practiceTotal: 12, mockScore: 79, mockAttempts: 1,
            topics: [
                { name: 'Formal Letters', learning: 'Completed', practice: '4/4', progress: 80 },
                { name: 'Essay Writing', learning: 'Completed', practice: '4/4', progress: 82 },
                { name: 'Notice & Poster', learning: 'Completed', practice: '4/4', progress: 76 },
            ],
        },
        {
            id: 4, title: 'Literature-Prose', status: 'in-progress', firstTime: false,
            practiceCompleted: 5, practiceTotal: 12, mockScore: null, mockAttempts: 0,
            topics: [
                { name: 'The Last Lesson', learning: 'Completed', practice: '3/4', progress: 65 },
                { name: 'Lost Spring', learning: 'In Progress', practice: '2/4', progress: 40 },
                { name: 'Deep Water', learning: 'Not Started', practice: '0/4', progress: 0 },
            ],
        },
        { id: 5, title: 'Literature-Poetry', status: 'not-started', firstTime: false, practiceCompleted: 0, practiceTotal: 10, mockScore: null, mockAttempts: 0, topics: [
            { name: 'My Mother at Sixty-six', learning: 'Not Started', practice: '0/3', progress: 0 },
            { name: 'Keeping Quiet', learning: 'Not Started', practice: '0/3', progress: 0 },
            { name: 'A Thing of Beauty', learning: 'Not Started', practice: '0/4', progress: 0 }
        ] },
    ],
    hindi: [
        {
            id: 1, title: 'गद्य — Prose', status: 'completed', firstTime: true,
            practiceCompleted: 12, practiceTotal: 12, mockScore: 80, mockAttempts: 2,
            topics: [
                { name: 'Surdas ke Pad', learning: 'Completed', practice: '4/4', progress: 85 },
                { name: 'Ram Lakshman Parshuram', learning: 'Completed', practice: '4/4', progress: 78 },
                { name: 'Utsah / At Nahi Rahi Hai', learning: 'Completed', practice: '4/4', progress: 82 },
            ],
        },
        {
            id: 2, title: 'पद्य — Poetry', status: 'completed', firstTime: false,
            practiceCompleted: 10, practiceTotal: 12, mockScore: 74, mockAttempts: 1,
            topics: [
                { name: 'Yeh Danturit Muskaan', learning: 'Completed', practice: '4/4', progress: 72 },
                { name: 'Chhaya Mat Chhuna', learning: 'Completed', practice: '3/4', progress: 68 },
                { name: 'Kanyadan', learning: 'Completed', practice: '3/4', progress: 70 },
            ],
        },
        {
            id: 3, title: 'व्याकरण — Grammar', status: 'in-progress', firstTime: false,
            practiceCompleted: 7, practiceTotal: 15, mockScore: null, mockAttempts: 0,
            topics: [
                { name: 'Vachya (Voice)', learning: 'Completed', practice: '3/5', progress: 55 },
                { name: 'Ras (Sentiment)', learning: 'In Progress', practice: '2/5', progress: 35 },
                { name: 'Shabdalankar', learning: 'Not Started', practice: '0/5', progress: 0 },
            ],
        },
        { id: 4, title: 'निबंध — Essay Writing', status: 'not-started', firstTime: false, practiceCompleted: 0, practiceTotal: 10, mockScore: null, mockAttempts: 0, topics: [
            { name: 'Introduction and Format', learning: 'Not Started', practice: '0/3', progress: 0 },
            { name: 'Current Affairs Topics', learning: 'Not Started', practice: '0/4', progress: 0 },
            { name: 'Proverb Based Essays', learning: 'Not Started', practice: '0/3', progress: 0 }
        ] },
    ],
    social: [
        {
            id: 1, title: 'Power Sharing — Civics', status: 'completed', firstTime: true,
            practiceCompleted: 15, practiceTotal: 15, mockScore: 78, mockAttempts: 2,
            topics: [
                { name: 'Belgium & Sri Lanka Case Study', learning: 'Completed', practice: '5/5', progress: 80 },
                { name: 'Forms of Power Sharing', learning: 'Completed', practice: '5/5', progress: 75 },
                { name: 'Why Power Sharing is Desirable', learning: 'Completed', practice: '5/5', progress: 77 },
            ],
        },
        {
            id: 2, title: 'Nationalism in India', status: 'in-progress', firstTime: false,
            practiceCompleted: 5, practiceTotal: 15, mockScore: 60, mockAttempts: 1,
            topics: [
                { name: 'Non-Cooperation Movement', learning: 'In Progress', practice: '3/5', progress: 50 },
                { name: 'Civil Disobedience Movement', learning: 'Not Started', practice: '0/5', progress: 0 },
                { name: 'Sense of Collective Belonging', learning: 'Not Started', practice: '2/5', progress: 20 },
            ],
        },
        { id: 3, title: 'Resources & Development', status: 'not-started', firstTime: false, practiceCompleted: 0, practiceTotal: 12, mockScore: null, mockAttempts: 0, topics: [
            { name: 'Types of Resources', learning: 'Not Started', practice: '0/4', progress: 0 },
            { name: 'Land & Soil Resources', learning: 'Not Started', practice: '0/4', progress: 0 },
            { name: 'Resource Planning', learning: 'Not Started', practice: '0/4', progress: 0 }
        ] },
        { id: 4, title: 'Development — Economics', status: 'not-started', firstTime: false, practiceCompleted: 0, practiceTotal: 12, mockScore: null, mockAttempts: 0, topics: [
            { name: 'Income and Other Goals', learning: 'Not Started', practice: '0/4', progress: 0 },
            { name: 'National Development', learning: 'Not Started', practice: '0/4', progress: 0 },
            { name: 'Sustainability', learning: 'Not Started', practice: '0/4', progress: 0 }
        ] },
        { id: 5, title: 'Money & Credit', status: 'not-started', firstTime: false, practiceCompleted: 0, practiceTotal: 10, mockScore: null, mockAttempts: 0, topics: [] },
    ],
};

// ─── Shared helpers ───────────────────────────────────────────────────────────

const statusConfig = {
    'completed': { label: 'Completed', color: COLORS.green, bg: `${COLORS.green}15` },
    'in-progress': { label: 'In Progress', color: COLORS.blue, bg: `${COLORS.blue}15` },
    'not-started': { label: 'Not Started', color: COLORS.textMuted, bg: COLORS.divider },
};

/**
 * Word-wraps a title string into at most 2 lines, each ≤ maxChars characters.
 * Prefers to break on word boundaries. Returns an array of 1 or 2 strings.
 */
function wrapTitle(text, maxChars = 14) {
    if (text.length <= maxChars) return [text];
    const words = text.split(' ');
    let line1 = '';
    let line2 = '';
    for (let i = 0; i < words.length; i++) {
        const candidate = line1 ? `${line1} ${words[i]}` : words[i];
        if (candidate.length <= maxChars) {
            line1 = candidate;
        } else {
            line2 = words.slice(i).join(' ');
            break;
        }
    }
    // Truncate line2 if still too long
    if (line2.length > maxChars) {
        line2 = `${line2.slice(0, maxChars - 1)}…`;
    }
    return line2 ? [line1, line2] : [line1];
}


// ─── Subject Card ─────────────────────────────────────────────────────────────

function SubjectCard({ subject, accentColor, onSelect }) {
    const s = subjectMap[subject];
    return (
        <Box onClick={() => onSelect(subject)} sx={{
            p: 1.5, borderRadius: '12px', cursor: 'pointer',
            background: '#fff', border: `1.5px solid ${COLORS.border}`,
            transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5,
            '&:hover': { border: `1.5px solid ${COLORS.primaryPurple}`, boxShadow: `0 4px 16px ${COLORS.primaryPurple}20`, transform: 'translateY(-2px)' },
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                <Box sx={{ width: 32, height: 32, borderRadius: '8px', background: `${COLORS.primaryPurple}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{s.icon}</Box>
                <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: COLORS.textPrimary, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</Typography>
            </Box>
            <Button size="small" variant="outlined" onClick={(e) => { e.stopPropagation(); onSelect(subject); }} sx={{ fontSize: '0.65rem', textTransform: 'none', fontWeight: 700, color: COLORS.primaryPurple, borderColor: `${COLORS.primaryPurple}50`, py: 0.4, px: 1, flexShrink: 0, '&:hover': { borderColor: COLORS.primaryPurple, background: `${COLORS.primaryPurple}08` } }}>
                View Roadmap
            </Button>
        </Box>
    );
}

function MatrixQuadrant({ def, onSelect }) {
    return (
        <Box sx={{ p: 2, borderRadius: '16px', background: def.bgColor, border: `1.5px solid ${def.borderColor}`, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1.5 }}>
                <Box sx={{ width: 32, height: 32, borderRadius: '10px', background: `${def.accentColor}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0, mt: 0.1 }}>{def.icon}</Box>
                <Box>
                    <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: COLORS.textPrimary }}>{def.label}</Typography>
                    <Typography sx={{ fontSize: '0.67rem', color: def.tagText, fontWeight: 600 }}>{def.desc}</Typography>
                </Box>
            </Box>
            <Divider sx={{ mb: 1.5, borderColor: `${def.accentColor}20` }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1 }}>
                {def.subjectIds.map(sid => <SubjectCard key={sid} subject={sid} accentColor={def.accentColor} onSelect={onSelect} />)}
            </Box>
            <Box sx={{ mt: 1.5, px: 1.2, py: 0.8, borderRadius: '8px', background: `${def.accentColor}0D`, border: `1px solid ${def.accentColor}20` }}>
                <Typography sx={{ fontSize: '0.67rem', color: def.tagText, lineHeight: 1.45 }}>💡 {def.advice}</Typography>
            </Box>
        </Box>
    );
}

// ─── Subject Health Matrix View ───────────────────────────────────────────────

function SubjectMatrixView({ onSelectSubject }) {
    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: '10px', background: `${COLORS.blue}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>🧩</Box>
                    <Box>
                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: COLORS.textPrimary }}>Subject Health Matrix</Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: COLORS.textSecondary }}>Assess where you stand — and where to focus next</Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ position: 'relative' }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 1, pl: '36px' }}>
                    {[{ label: 'High Practice', color: COLORS.green }, { label: 'Low Practice', color: COLORS.textMuted }].map(a => (
                        <Box key={a.label} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.8 }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: a.color }} />
                            <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: COLORS.textSecondary, letterSpacing: 1, textTransform: 'uppercase' }}>{a.label}</Typography>
                        </Box>
                    ))}
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', pr: 1.5, width: 28 }}>
                        {['High Score', 'Low Score'].map(label => (
                            <Typography key={label} sx={{ fontSize: '0.64rem', fontWeight: 700, color: COLORS.textSecondary, letterSpacing: 1, textTransform: 'uppercase', writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)', py: 2 }}>{label}</Typography>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                        {matrixDef.map(def => <MatrixQuadrant key={def.key} def={def} onSelect={onSelectSubject} />)}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

// ─── Practice Modal (3 questions + review mode) ───────────────────────────────

const PRACTICE_QUESTIONS = [
    {
        q: 'Q1. Which of the following correctly represents Euclid\'s Division Lemma?',
        options: ['a = bq + r, 0 ≤ r < b', 'a = bq + r, r > b', 'b = aq + r, 0 ≤ r < a', 'a = bq, q > 0'],
        correct: 0,
    },
    {
        q: 'Q2. What is the HCF of 26 and 91 using Euclid\'s algorithm?',
        options: ['7', '13', '26', '91'],
        correct: 1,
    },
    {
        q: 'Q3. Which number is irrational?',
        options: ['√4', '√9', '√2', '3/4'],
        correct: 2,
    },
];

function PracticeDrawer({ chapter, subjectId, open, onClose, onComplete }) {
    if (!chapter) return null;
    const [selected, setSelected] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const questions = subjectQuestions[subjectId] || subjectQuestions['math'];

    const handleClose = () => { setSelected({}); setSubmitted(false); onClose(); };

    return (
        <Drawer anchor="right" open={open} onClose={handleClose} sx={{ zIndex: 1400 }} slotProps={{ backdrop: { invisible: true } }}>
            <Box sx={{ width: { xs: '100vw', sm: 480 }, height: '100%', overflowY: 'auto', background: '#fff', p: 0, outline: 'none', borderLeft: `1px solid ${COLORS.border}` }}>
                {/* Header */}
                <Box sx={{ p: '20px 24px 16px', borderBottom: `1px solid ${COLORS.divider}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                        <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', color: COLORS.textPrimary }}>Practice Questions ✏️</Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: COLORS.textSecondary, mt: 0.2 }}>{chapter.title} · 3 questions</Typography>
                    </Box>
                    <IconButton size="small" onClick={handleClose} sx={{ color: '#000' }}>✕</IconButton>
                </Box>

                <Box sx={{ p: 3 }}>
                    {!submitted ? (
                        <>
                            {questions.map((q, qi) => (
                                <Box key={qi} sx={{ mb: 3 }}>
                                    <Typography sx={{ fontSize: '0.88rem', fontWeight: 600, color: COLORS.textPrimary, mb: 1.5, lineHeight: 1.5 }}>{q.q}</Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        {q.options.map((opt, oi) => (
                                            <Box key={oi} onClick={() => setSelected(s => ({ ...s, [qi]: oi }))}
                                                sx={{ p: '10px 14px', borderRadius: '10px', cursor: 'pointer', border: `1.5px solid ${selected[qi] === oi ? COLORS.primaryPurple : COLORS.border}`, background: selected[qi] === oi ? COLORS.purpleLight : '#fff', transition: 'all 0.15s' }}>
                                                <Typography sx={{ fontSize: '0.82rem', color: selected[qi] === oi ? COLORS.primaryPurple : COLORS.textPrimary, fontWeight: selected[qi] === oi ? 600 : 400 }}>{opt}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            ))}
                            <Button fullWidth variant="contained" disabled={Object.keys(selected).length < questions.length}
                                onClick={() => setSubmitted(true)}
                                sx={{ mt: 1, background: COLORS.primaryPurple, color: '#fff', textTransform: 'none', fontWeight: 700, borderRadius: '10px', py: 1.2, '&:hover': { background: COLORS.purpleHover }, '&.Mui-disabled': { background: COLORS.divider } }}>
                                Submit All Answers →
                            </Button>
                        </>
                    ) : (
                        <>
                            <Box sx={{ mb: 3, p: 2, borderRadius: '12px', background: COLORS.purpleLight, border: `1px solid ${COLORS.purpleBorder}`, textAlign: 'center' }}>
                                <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', color: COLORS.primaryPurple }}>
                                    {questions.filter((q, i) => selected[i] === q.answer).length}/{questions.length} Correct 🎯
                                </Typography>
                                <Typography sx={{ fontSize: '0.78rem', color: COLORS.textSecondary, mt: 0.5 }}>Review your answers below</Typography>
                            </Box>
                            {questions.map((q, qi) => {
                                const isCorrect = selected[qi] === q.answer;
                                return (
                                    <Box key={qi} sx={{ mb: 2.5 }}>
                                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: COLORS.textPrimary, mb: 1 }}>{q.q}</Typography>
                                        {q.options.map((opt, oi) => {
                                            const isSelected = selected[qi] === oi;
                                            const isRight = oi === q.answer;
                                            let bg = '#fff', border = COLORS.border, color = COLORS.textSecondary;
                                            if (isRight) { bg = `${COLORS.green}12`; border = `${COLORS.green}50`; color = COLORS.greenDark; }
                                            else if (isSelected && !isRight) { bg = '#FFF0F0'; border = '#F0505050'; color = '#C00'; }
                                            return (
                                                <Box key={oi} sx={{ p: '8px 12px', borderRadius: '8px', border: `1.5px solid ${border}`, background: bg, mb: 0.7, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Typography sx={{ fontSize: '0.85rem' }}>{isRight ? '✅' : (isSelected ? '❌' : '')}</Typography>
                                                    <Typography sx={{ fontSize: '0.8rem', color, fontWeight: isRight ? 600 : 400 }}>{opt}</Typography>
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                );
                            })}
                            <Button fullWidth variant="outlined" onClick={() => { setSelected({}); setSubmitted(false); if (onComplete) onComplete(chapter.id); else onClose(); }}
                                sx={{ mt: 1, color: COLORS.primaryPurple, borderColor: COLORS.purpleBorder, textTransform: 'none', fontWeight: 700, borderRadius: '10px', py: 1.1, '&:hover': { background: COLORS.purpleLight } }}>
                                Finish Practice & Close
                            </Button>
                        </>
                    )}
                </Box>
            </Box>
        </Drawer>
    );
}

// ─── Mock Test Modal ──────────────────────────────────────────────────────────

function MockTestModal({ chapter, subjectColor, subjectId, open, onClose, onComplete }) {
    const [selected, setSelected] = useState({});

    if (!chapter) return null;

    const questions = (subjectQuestions[subjectId] || subjectQuestions['math']).slice(0, 2);

    if (chapter.status !== 'completed') {
        return (
            <Modal open={open} onClose={onClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: { xs: '92vw', sm: 480 }, maxHeight: '90vh', display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.18)', p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2.5 }}>
                        <Box>
                            <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', color: COLORS.textPrimary }}>Mock Test Challenge</Typography>
                            <Typography sx={{ fontSize: '0.75rem', color: COLORS.textSecondary, mt: 0.2 }}>{chapter.title} - Final Assessment</Typography>
                        </Box>
                        <IconButton size="small" onClick={onClose}><svg width="18" height="18" viewBox="0 0 24 24" fill={COLORS.textSecondary}><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg></IconButton>
                    </Box>

                    <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1, mb: 3 }}>
                        {questions.map((q, qi) => (
                            <Box key={qi} sx={{ mb: 4 }}>
                                <Typography sx={{ mb: 1.5, fontWeight: 600, fontSize: '0.95rem' }}>Q{qi + 1}. {q.q}</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    {q.options.map((opt, oi) => (
                                        <Box key={oi} onClick={() => setSelected(s => ({ ...s, [qi]: oi }))}
                                            sx={{ p: '10px 14px', borderRadius: '10px', cursor: 'pointer', border: `1.5px solid ${selected[qi] === oi ? COLORS.primaryPurple : COLORS.border}`, background: selected[qi] === oi ? COLORS.purpleLight : '#fff', transition: 'all 0.15s' }}>
                                            <Typography sx={{ fontSize: '0.82rem', color: selected[qi] === oi ? COLORS.primaryPurple : COLORS.textPrimary, fontWeight: selected[qi] === oi ? 600 : 400 }}>{opt}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <Button 
                        disabled={Object.keys(selected).length < questions.length}
                        onClick={() => { onComplete(chapter.id); setSelected({}); }} 
                        variant="contained" fullWidth 
                        sx={{ background: COLORS.primaryPurple, color: '#fff', '&:hover': { background: COLORS.purpleHover }, textTransform: 'none', fontWeight: 700, borderRadius: '8px', py: 1.2, '&.Mui-disabled': { background: COLORS.divider } }}>
                        Submit Mock Test & Complete Chapter
                    </Button>
                </Box>
            </Modal>
        );
    }

    const mockAttempts = [{ label: 'Test 1', pct: 62 }, { label: 'Test 2', pct: 68 }, { label: 'Test 3', pct: chapter.mockScore || 72 }].slice(0, Math.max(chapter.mockAttempts, 1));
    const avgTime = 2.5; const retentionScore = 70;
    const weakAreas = ['Quadratic Formula', 'Word Problems'];

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: { xs: '92vw', sm: 540 }, maxHeight: '88vh', overflowY: 'auto', background: '#fff', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.18)', p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2.5 }}>
                    <Box>
                        <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: COLORS.textPrimary }}>Mock Test Analysis</Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: COLORS.textSecondary, mt: 0.2 }}>{chapter.title} · {chapter.mockAttempts} attempt{chapter.mockAttempts !== 1 ? 's' : ''} · Best: {chapter.mockScore}%</Typography>
                    </Box>
                    <IconButton size="small" onClick={onClose}><svg width="18" height="18" viewBox="0 0 24 24" fill={COLORS.textSecondary}><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg></IconButton>
                </Box>

                <Box sx={{ mb: 2.5, p: 2, borderRadius: '12px', background: `${subjectColor}07`, border: `1px solid ${subjectColor}25` }}>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: COLORS.textSecondary, letterSpacing: 0.8, textTransform: 'uppercase', mb: 1.5 }}>📊 Mock Test Performance Trend</Typography>
                    {mockAttempts.map((a, i) => (
                        <Box key={a.label} sx={{ mb: i < mockAttempts.length - 1 ? 1.2 : 0 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: COLORS.textPrimary }}>{a.label}</Typography>
                                    {i > 0 && a.pct > mockAttempts[i - 1].pct && <Typography sx={{ fontSize: '0.65rem', color: COLORS.green, fontWeight: 700 }}>↑ +{a.pct - mockAttempts[i - 1].pct}%</Typography>}
                                </Box>
                                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: subjectColor }}>{a.pct}%</Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={a.pct}
                                sx={{ height: 8, borderRadius: 4, background: COLORS.divider, '& .MuiLinearProgress-bar': { background: i === mockAttempts.length - 1 ? COLORS.primaryPurple : `${COLORS.primaryPurple}70`, borderRadius: 4 } }} />
                        </Box>
                    ))}
                </Box>

                <Box sx={{ mb: 2.5, p: 2, borderRadius: '12px', background: `${COLORS.amber}08`, border: `1px solid ${COLORS.amber}30` }}>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: COLORS.textSecondary, letterSpacing: 0.8, textTransform: 'uppercase', mb: 1.2 }}>⏱️ Time Efficiency</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ width: 64, height: 64, borderRadius: '14px', flexShrink: 0, background: `${COLORS.amber}15`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', color: COLORS.amber, lineHeight: 1 }}>{avgTime}</Typography>
                            <Typography sx={{ fontSize: '0.6rem', color: COLORS.amberDark, fontWeight: 600 }}>min/Q</Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: COLORS.amber, mb: 0.4 }}>⚠️ Slower than recommended</Typography>
                            <Typography sx={{ fontSize: '0.72rem', color: COLORS.textSecondary, lineHeight: 1.5 }}>Avg {avgTime} min/question vs target 1.5 min. Practice timed sets to build speed.</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ mb: 2.5, p: 2, borderRadius: '12px', background: COLORS.bgWarm, border: `1px solid ${COLORS.border}` }}>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: COLORS.textSecondary, letterSpacing: 0.8, textTransform: 'uppercase', mb: 1.2 }}>🧠 Retention Score</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ width: 64, height: 64, borderRadius: '14px', flexShrink: 0, background: `${COLORS.green}15`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', color: COLORS.green, lineHeight: 1 }}>{retentionScore}%</Typography>
                            <Typography sx={{ fontSize: '0.58rem', color: COLORS.greenDark, fontWeight: 600 }}>retained</Typography>
                        </Box>
                        <Typography sx={{ fontSize: '0.72rem', color: COLORS.textSecondary, lineHeight: 1.55 }}>You forgot 3/10 previously correct questions when retested after a 3-day gap.</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={retentionScore} sx={{ mt: 1.5, height: 6, borderRadius: 4, background: COLORS.divider, '& .MuiLinearProgress-bar': { background: COLORS.green, borderRadius: 4 } }} />
                </Box>

                <Box sx={{ mb: 2.5, p: 2, borderRadius: '12px', background: `${COLORS.amber}07`, border: `1px solid ${COLORS.amber}25` }}>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: COLORS.textSecondary, letterSpacing: 0.8, textTransform: 'uppercase', mb: 1.2 }}>🎯 Weak Areas (Auto-detected)</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                        {weakAreas.map(area => (
                            <Box key={area} sx={{ display: 'flex', alignItems: 'center', gap: 1, p: '6px 10px', borderRadius: '8px', background: `${COLORS.amber}10`, border: `1px solid ${COLORS.amber}25` }}>
                                <Typography sx={{ fontSize: '0.78rem' }}>❌</Typography>
                                <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: COLORS.textPrimary }}>{area}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Box sx={{ p: 2, borderRadius: '12px', background: `${subjectColor}07`, border: `1px solid ${subjectColor}25` }}>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: COLORS.textSecondary, letterSpacing: 0.8, textTransform: 'uppercase', mb: 1 }}>📌 Retake Readiness</Typography>
                    <Typography sx={{ fontSize: '0.78rem', color: COLORS.textPrimary, fontWeight: 600, mb: 0.6 }}>Suggested: Improve weak topics before retaking</Typography>
                    <Typography sx={{ fontSize: '0.72rem', color: COLORS.textSecondary, lineHeight: 1.5, mb: 1.5 }}>Address Quadratic Formula and Word Problems first. Your trend is positive — one focused attempt should push you above 75%.</Typography>
                    <Button variant="contained" color="primary" size="small" fullWidth
                        onClick={chapter.status !== 'completed' ? () => onComplete(chapter.id) : onClose}
                        sx={{ textTransform: 'none', fontWeight: 700, borderRadius: '10px' }}>
                        {chapter.status !== 'completed' ? 'Pass Mock Test & Complete Chapter' : 'Retake Mock Test'}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

// ─── Chapter Detail Panel (4-Phase Learning Carousel) ──────────────────────────

const LEARNING_PHASES = [
    { id: 'phase1', label: '1st Time Learning', desc: 'Initial understanding & basic practice', icon: '🌱' },
    { id: 'phase2', label: 'Before Mock Test', desc: 'Revision & intermediate problem solving', icon: '📝' },
    { id: 'phase3', label: 'Before Pre-Board', desc: 'Advanced practice & time management', icon: '🎓' },
    { id: 'phase4', label: 'Before Board Exams', desc: 'Final polish & previous year papers', icon: '🏆' },
];

function ChapterDetailModal({ chapter, open, onClose, subjectColor, onPracticeOpen, onMockOpen, isPracticeOpen, onFinishChapter }) {
    const [expandedPhase, setExpandedPhase] = useState('phase1');
    const [checkedTopics, setCheckedTopics] = useState({});
    const prevPracticeDone = useRef(chapter?.practiceCompleted || 0);

    // Reset local state when chapter changes
    useEffect(() => {
        if (open && chapter) {
            if (chapter.status === 'completed') {
                setExpandedPhase(null);
                const allChecked = {};
                LEARNING_PHASES.forEach(phase => {
                    chapter.topics?.forEach(t => {
                        allChecked[`${phase.id}-${t.name}`] = true;
                    });
                });
                setCheckedTopics(allChecked);
                prevPracticeDone.current = chapter.practiceTotal || 0;
            } else {
                setExpandedPhase('phase1');
                setCheckedTopics({});
                prevPracticeDone.current = chapter.practiceCompleted || 0;
            }
        }
    }, [chapter?.id, chapter?.status, open]);

    useEffect(() => {
        if (!chapter) return;
        if (chapter.practiceCompleted >= chapter.practiceTotal && prevPracticeDone.current < chapter.practiceTotal) {
            const phase1TopicsDone = chapter.topics?.every(t => checkedTopics[`phase1-${t.name}`]);
            if (phase1TopicsDone) {
                setExpandedPhase('phase2');
            }
        }
        prevPracticeDone.current = chapter.practiceCompleted;
    }, [chapter?.practiceCompleted, chapter?.practiceTotal, chapter?.topics, checkedTopics]);

    if (!chapter) return null;

    if (chapter.type === 'mock-test' || chapter.type === 'preboard') {
        const isCompleted = chapter.status === 'completed';
        return (
            <Modal open={open} onClose={(e, reason) => {
                if (isPracticeOpen) return;
                if (onClose) onClose(e, reason);
            }} slotProps={{ backdrop: { invisible: isPracticeOpen } }}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: { xs: '92vw', sm: 400 }, background: '#fff', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.18)', p: 4, textAlign: 'center', outline: 'none' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                        <IconButton size="small" onClick={onClose}><svg width="18" height="18" viewBox="0 0 24 24" fill={COLORS.textSecondary}><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg></IconButton>
                    </Box>
                    <Typography sx={{ fontSize: '3rem', mb: 2 }}>{chapter.type === 'preboard' ? '🎓' : '📝'}</Typography>
                    <Typography sx={{ fontSize: '1.4rem', fontWeight: 800, color: COLORS.textPrimary, mb: 1 }}>{chapter.title}</Typography>
                    <Typography sx={{ fontSize: '0.9rem', color: COLORS.textSecondary, mb: 4, maxWidth: 400, mx: 'auto' }}>
                        {isCompleted 
                            ? `You have already completed this ${chapter.type === 'preboard' ? 'pre-board' : 'mock test'}. You can review your detailed performance analysis.`
                            : "This is a major evaluation milestone. Make sure you have completed the learning phases for previous chapters before attempting this test."}
                    </Typography>
                    <Button variant="contained" size="large" onClick={() => { onClose(); onMockOpen(); }}
                        sx={{ background: COLORS.primaryPurple, color: '#fff', fontWeight: 700, borderRadius: '12px', px: 4, py: 1.5, textTransform: 'none', fontSize: '1rem', '&:hover': { background: COLORS.purpleHover } }}>
                        {isCompleted ? 'Review Score' : `Attempt ${chapter.type === 'preboard' ? 'Pre-Board' : 'Mock Test'}`}
                    </Button>
                </Box>
            </Modal>
        );
    }

    const toggleTopic = (phaseId, topicName) => {
        setCheckedTopics(prev => {
            const key = `${phaseId}-${topicName}`;
            const newState = { ...prev, [key]: !prev[key] };

            // Check if phase is complete now
            const phaseTopics = chapter.topics || [];
            const isPhaseNowComplete = phaseTopics.every(t => newState[`${phaseId}-${t.name}`]);

            // Auto unlock next phase
            if (isPhaseNowComplete) {
                const phaseIdx = LEARNING_PHASES.findIndex(p => p.id === phaseId);
                if (phaseIdx !== -1 && phaseIdx < LEARNING_PHASES.length - 1) {
                    const nextPhaseId = LEARNING_PHASES[phaseIdx + 1].id;
                    let canUnlock = true;
                    if (nextPhaseId === 'phase2' && chapter.practiceCompleted < chapter.practiceTotal) {
                        canUnlock = false;
                    }
                    if (canUnlock) {
                        setTimeout(() => setExpandedPhase(nextPhaseId), 300);
                    }
                } else if (phaseIdx === LEARNING_PHASES.length - 1) {
                    setTimeout(() => {
                        setExpandedPhase(null); // All done
                        if (onFinishChapter) onFinishChapter(chapter.id);
                    }, 300);
                }
            }

            return newState;
        });
    };

    const isPhaseComplete = (phaseId) => {
        if (!chapter.topics || chapter.topics.length === 0) return false;
        return chapter.topics.every(t => checkedTopics[`${phaseId}-${t.name}`]);
    };

    return (
        <Modal open={open} onClose={(e, reason) => {
            if (isPracticeOpen) return;
            if (onClose) onClose(e, reason);
        }} slotProps={{ backdrop: { invisible: isPracticeOpen } }}>
            <Box sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: isPracticeOpen ? { xs: '50%', lg: 'calc(50% - 240px)' } : '50%', 
                transform: 'translate(-50%,-50%)', 
                width: { xs: '94vw', md: 840 }, 
                maxHeight: '90vh', 
                overflowY: 'auto', 
                background: '#fff', 
                borderRadius: '20px', 
                boxShadow: '0 20px 60px rgba(0,0,0,0.18)', 
                p: 4, 
                outline: 'none',
                transition: 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1)' 
            }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.8 }}>
                            <Chip label="Chapter Focus" size="small" sx={{ height: 22, fontSize: '0.65rem', fontWeight: 700, background: COLORS.purpleLight, color: COLORS.primaryPurple }} />
                            <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: COLORS.textSecondary }}>{chapter.topics?.length || 0} Topics</Typography>
                        </Box>
                        <Typography sx={{ fontSize: '1.4rem', fontWeight: 800, color: COLORS.textPrimary, lineHeight: 1.3 }}>{chapter.title}</Typography>
                    </Box>
                    <IconButton size="small" onClick={onClose}><svg width="18" height="18" viewBox="0 0 24 24" fill={COLORS.textSecondary}><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg></IconButton>
                </Box>

                {/* 4-Phase Learning Carousel (Accordion) */}
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 800, color: COLORS.textSecondary, textTransform: 'uppercase', letterSpacing: 0.8, mb: 2 }}>Learning Journey</Typography>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'stretch', gap: 1.5, minHeight: 280 }}>
                    {LEARNING_PHASES.map((phase, idx) => {
                        const isExpanded = expandedPhase === phase.id;
                        const isComplete = isPhaseComplete(phase.id);
                        let prevPhaseComplete = idx === 0 || isPhaseComplete(LEARNING_PHASES[idx - 1].id);
                        
                        if (phase.id === 'phase2' && prevPhaseComplete) {
                            if (chapter.practiceCompleted < chapter.practiceTotal) {
                                prevPhaseComplete = false;
                            }
                        }

                        const isLocked = !prevPhaseComplete;

                        return (
                            <Box key={phase.id} 
                                onClick={() => !isLocked && !isExpanded && setExpandedPhase(phase.id)}
                                sx={{
                                flex: { xs: 'none', md: isExpanded ? 2.2 : 1 },
                                borderRadius: '16px',
                                border: `1.5px solid ${isExpanded ? COLORS.primaryPurple : isComplete ? COLORS.green : isLocked ? `${COLORS.border}50` : COLORS.border}`,
                                background: isExpanded ? '#fff' : isComplete ? `${COLORS.green}08` : COLORS.bgWarm,
                                overflow: 'hidden',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                opacity: isLocked ? 0.6 : 1,
                                cursor: isLocked ? 'not-allowed' : (isExpanded ? 'default' : 'pointer'),
                                display: 'flex', flexDirection: 'column',
                                p: 2
                            }}>
                                {/* Accordion Header */}
                                <Box 
                                    onClick={(e) => { e.stopPropagation(); if (!isLocked) setExpandedPhase(isExpanded ? null : phase.id); }} 
                                    sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: isExpanded ? 1.5 : 0, cursor: isLocked ? 'not-allowed' : 'pointer' }}>
                                    <Box sx={{ width: 34, height: 34, flexShrink: 0, borderRadius: '10px', background: isComplete ? COLORS.green : isExpanded ? COLORS.primaryPurple : '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: '#fff' }}>
                                        {isComplete ? '✓' : phase.icon}
                                    </Box>
                                    
                                    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0 }}>
                                        <Typography noWrap sx={{ fontSize: '0.9rem', fontWeight: 800, color: isComplete ? COLORS.greenDark : COLORS.textPrimary }}>
                                            {phase.label}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Accordion Body */}
                                {!isExpanded && !isLocked && (
                                    <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', gap: 0.5, mt: 1.5, opacity: 0.6 }}>
                                        {chapter.topics?.map((topic, tIdx) => (
                                            <Box key={tIdx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.8 }}>
                                                <Box sx={{ width: 4, height: 4, borderRadius: '50%', background: COLORS.textMuted, mt: 0.6, flexShrink: 0 }} />
                                                <Typography noWrap sx={{ fontSize: '0.65rem', color: COLORS.textSecondary, lineHeight: 1.3 }}>
                                                    {topic.name}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                                {isLocked && (
                                    <Typography sx={{ fontSize: '0.7rem', color: COLORS.textSecondary, mt: 1, opacity: 0.8, display: { xs: 'none', md: 'block' } }}>
                                        🔒 Locked
                                    </Typography>
                                )}
                                {isExpanded && !isLocked && (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, animation: 'fadeIn 0.5s ease' }}>
                                        <Typography sx={{ fontSize: '0.75rem', color: COLORS.textSecondary, mb: 1.5, lineHeight: 1.4 }}>
                                            {phase.desc}
                                        </Typography>
                                        
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1 }}>
                                            {chapter.topics?.map((topic, tIdx) => {
                                                const checked = !!checkedTopics[`${phase.id}-${topic.name}`];
                                                return (
                                                    <Box key={tIdx} onClick={(e) => { e.stopPropagation(); toggleTopic(phase.id, topic.name); }}
                                                        sx={{
                                                            display: 'flex', alignItems: 'flex-start', gap: 1.2, p: 1.2, borderRadius: '10px',
                                                            cursor: 'pointer', transition: 'all 0.2s',
                                                            background: checked ? `${COLORS.green}10` : '#fff',
                                                            border: `1px solid ${checked ? `${COLORS.green}40` : COLORS.border}`,
                                                            '&:hover': { borderColor: checked ? COLORS.green : COLORS.primaryPurple }
                                                        }}>
                                                        <Box sx={{
                                                            width: 20, height: 20, mt: 0.1, borderRadius: '5px', flexShrink: 0,
                                                            border: `2px solid ${checked ? COLORS.green : COLORS.textMuted}`,
                                                            background: checked ? COLORS.green : '#fff',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            color: '#fff', fontSize: '0.75rem'
                                                        }}>
                                                            {checked && '✓'}
                                                        </Box>
                                                        <Typography sx={{ fontSize: '0.8rem', fontWeight: checked ? 600 : 500, color: checked ? COLORS.textPrimary : COLORS.textSecondary, lineHeight: 1.3 }}>
                                                            {topic.name}
                                                        </Typography>
                                                    </Box>
                                                );
                                            })}
                                        </Box>

                                        {phase.id === 'phase1' && (
                                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', pt: 1 }}>
                                                <Button
                                                    variant="contained"
                                                    onClick={(e) => { e.stopPropagation(); onPracticeOpen(); }}
                                                    sx={{
                                                        background: COLORS.primaryPurple, color: '#fff', fontWeight: 700, borderRadius: '10px', textTransform: 'none', py: 0.8,
                                                        boxShadow: `0 4px 12px ${COLORS.primaryPurple}30`,
                                                        '&:hover': { background: COLORS.purpleHover }
                                                    }}>
                                                    {chapter.practiceCompleted >= chapter.practiceTotal ? 'Review Score' : '✏️ 1st Time Practice'}
                                                </Button>
                                            </Box>
                                        )}
                                    </Box>
                                )}
                            </Box>
                        );
                    })}
                </Box>
            </Box>
        </Modal>
    );
}

// ─── SVG Milestone Node (horizontal, cards alternate above/below) ─────────────

function SVGChapterNode({ chapter, index, pos, isSelected, subjectColor, onSelect }) {
    const isCompleted = chapter.status === 'completed';
    const isInProgress = chapter.status === 'in-progress';
    const isMockTest = chapter.type === 'mock-test';
    const isPreboard = chapter.type === 'preboard';
    const isSpecial = isMockTest || isPreboard;

    const nodeR = isSpecial ? 18 : 20;
    const cardW = 130;
    const cardH = 70;
    const connGap = nodeR + 6;

    // Alternate cards above (even index) and below (odd index)
    const isAbove = index % 2 === 0;
    const cardX = pos.x - cardW / 2;
    const cardY = isAbove ? pos.y - connGap - cardH : pos.y + connGap;
    const connY1 = isAbove ? cardY + cardH : pos.y - nodeR;
    const connY2 = isAbove ? pos.y - nodeR : cardY;

    const accentColor = isSpecial ? COLORS.primaryPurple : isCompleted ? subjectColor : isInProgress ? COLORS.blue : '#D1D5DB';
    const cardStroke = isSelected ? COLORS.primaryPurple : isSpecial ? `${COLORS.primaryPurple}50` : isInProgress ? `${COLORS.blue}50` : '#E8EAED';

    const statusLabel = isCompleted ? 'Done' : isInProgress ? 'In Progress' : 'Locked';
    const statusColor = isCompleted ? '#15803d' : isInProgress ? '#1d4ed8' : '#9CA3AF';
    const statusBg = isCompleted ? '#dcfce7' : isInProgress ? '#dbeafe' : '#F3F4F6';

    const subText = isSpecial ? (isCompleted ? 'Completed ✓' : 'Upcoming') :
        isCompleted && chapter.mockScore != null ? `Score: ${chapter.mockScore}%` :
            isInProgress ? `${chapter.practiceCompleted}/${chapter.practiceTotal} done` :
                `${chapter.topics?.length || 0} topics`;

    return (
        <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.07, type: 'spring', stiffness: 280, damping: 24 }}
            style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
        >
            {/* Card shadow */}
            <rect x={cardX + 2} y={cardY + 3} width={cardW} height={cardH} rx={10} fill="rgba(0,0,0,0.06)" />

            {/* Card body */}
            <rect x={cardX} y={cardY} width={cardW} height={cardH} rx={10}
                fill={isSpecial ? `${COLORS.primaryPurple}06` : '#fff'}
                stroke={cardStroke} strokeWidth={isSelected ? 2 : 1}
                onClick={onSelect} style={{ cursor: 'pointer' }} />

            {/* Top accent bar */}
            <rect x={cardX + 10} y={cardY + 1} width={cardW - 20} height={3} rx={1.5}
                fill={accentColor} style={{ pointerEvents: 'none' }} />

            {/* Vertical dashed connector */}
            <line x1={pos.x} y1={connY1} x2={pos.x} y2={connY2}
                stroke={isSelected ? COLORS.primaryPurple : '#CBD5E1'}
                strokeWidth={1.5} strokeDasharray="3.5 2.5" />

            {/* Milestone type label */}
            <text x={cardX + cardW / 2} y={cardY + 13}
                textAnchor="middle" fontSize={5.5} fill={isSpecial ? COLORS.primaryPurple : '#9CA3AF'}
                fontWeight="700" fontFamily="'Inter',sans-serif" letterSpacing="0.6"
                style={{ pointerEvents: 'none' }}>
                {isPreboard ? 'PRE-BOARD' : isMockTest ? 'MOCK TEST' : `CHAPTER ${index + 1}`}
            </text>

            {/* Title (Single line) */}
            <text x={cardX + cardW / 2} y={cardY + 30}
                textAnchor="middle" fontSize={9} fill="#111827" fontWeight="800"
                fontFamily="'Inter',sans-serif" style={{ pointerEvents: 'none' }}>
                {chapter.title}
            </text>

            {/* Sub info */}
            <text x={cardX + cardW / 2} y={cardY + 49}
                textAnchor="middle" fontSize={6.5} fill="#6B7280"
                fontFamily="'Inter',sans-serif" style={{ pointerEvents: 'none' }}>
                {subText}
            </text>

            {/* Status badge */}
            <rect x={cardX + (cardW / 2) - 20} y={cardY + 55} width={40} height={11} rx={5.5}
                fill={statusBg} style={{ pointerEvents: 'none' }} />
            <text x={cardX + cardW / 2} y={cardY + 62}
                textAnchor="middle" dominantBaseline="middle"
                fontSize={6} fill={statusColor} fontWeight="700"
                fontFamily="'Inter',sans-serif" style={{ pointerEvents: 'none' }}>
                {statusLabel}
            </text>

            {/* Click zone */}
            <circle cx={pos.x} cy={pos.y} r={30} fill="transparent" onClick={onSelect} style={{ cursor: 'pointer' }} />

            {/* Selection ring */}
            {isSelected && (
                <motion.circle cx={pos.x} cy={pos.y} r={nodeR + 5} fill="none"
                    stroke={COLORS.primaryPurple} strokeWidth={2.5}
                    animate={{ r: [nodeR + 4, nodeR + 9, nodeR + 4], opacity: [0.75, 0.08, 0.75] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }} />
            )}

            {/* In-progress pulse */}
            {isInProgress && !isSpecial && (
                <motion.circle cx={pos.x} cy={pos.y} r={nodeR + 4} fill="none"
                    stroke={COLORS.blue} strokeWidth={2}
                    animate={{ r: [nodeR + 2, nodeR + 8, nodeR + 2], opacity: [0.35, 0.03, 0.35] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }} />
            )}

            {/* Node shadow */}
            <circle cx={pos.x} cy={pos.y + 2} r={nodeR} fill="rgba(0,0,0,0.10)" />

            {/* Node body */}
            <motion.circle cx={pos.x} cy={pos.y} r={nodeR}
                fill={isSpecial ? COLORS.primaryPurple : isCompleted ? subjectColor : '#fff'}
                stroke={isSpecial ? 'none' : isCompleted ? 'none' : isInProgress ? COLORS.blue : '#D1D5DB'}
                strokeWidth={isInProgress ? 3 : 2}
                whileTap={{ scale: 0.88 }} onClick={onSelect} style={{ cursor: 'pointer' }} />

            {/* Node icon */}
            {isPreboard ? (
                <text x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="middle"
                    fontSize={11} style={{ pointerEvents: 'none', userSelect: 'none' }}>🎓</text>
            ) : isMockTest ? (
                <text x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="middle"
                    fontSize={11} style={{ pointerEvents: 'none', userSelect: 'none' }}>📝</text>
            ) : isCompleted ? (
                <path d={`M ${pos.x - 7} ${pos.y + 0.5} L ${pos.x - 2} ${pos.y + 6} L ${pos.x + 8} ${pos.y - 6}`}
                    fill="none" stroke="white" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round" style={{ pointerEvents: 'none' }} />
            ) : isInProgress ? (
                <motion.circle cx={pos.x} cy={pos.y} r={7} fill={COLORS.blue}
                    animate={{ scale: [1, 1.18, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    style={{ pointerEvents: 'none' }} />
            ) : (
                <text x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="middle"
                    fill="#9CA3AF" fontSize="10" fontWeight="700"
                    fontFamily="'DM Sans','Inter',sans-serif" style={{ pointerEvents: 'none' }}>
                    {index + 1}
                </text>
            )}
        </motion.g>
    );
}

// ─── SVG Roadmap Panel (horizontal) ──────────────────────────────────────────

function SVGRoadmapPanel({ chapters, subjectColor, selectedChapter, onSelectChapter }) {
    const pathRef = useRef(null);
    const [nodePts, setNodePts] = useState([]);

    // Build full node list: chapters interleaved with mock-test milestones + pre-board at end
    const allNodes = React.useMemo(() => {
        const nodes = [];
        chapters.forEach((ch, i) => {
            nodes.push({ ...ch, type: 'chapter' });
            if ((i + 1) % 2 === 0 && i < chapters.length - 1) {
                const isUnlocked = chapters.slice(0, i + 1).every(c => c.status === 'completed');
                const isCompleted = isUnlocked && ch.mockAttempts > 0;
                nodes.push({
                    id: `mock-${i}`, type: 'mock-test',
                    title: `Mock Test ${Math.floor((i + 1) / 2)}`,
                    status: isCompleted ? 'completed' : isUnlocked ? 'in-progress' : 'not-started',
                    topics: [], practiceCompleted: 0, practiceTotal: 0, 
                    mockScore: ch.mockScore, mockAttempts: ch.mockAttempts,
                    linkedChapterId: ch.id
                });
            }
        });
        const lastCh = chapters[chapters.length - 1];
        const isPreboardUnlocked = chapters.every(c => c.status === 'completed');
        const isPreboardCompleted = isPreboardUnlocked && lastCh?.mockAttempts > 0;
        nodes.push({
            id: 'preboard', type: 'preboard', title: 'Pre-Board Exam',
            status: isPreboardCompleted ? 'completed' : isPreboardUnlocked ? 'in-progress' : 'not-started',
            topics: [], practiceCompleted: 0, practiceTotal: 0, 
            mockScore: lastCh?.mockScore, mockAttempts: lastCh?.mockAttempts,
            linkedChapterId: lastCh?.id
        });
        return nodes;
    }, [chapters]);

    useEffect(() => {
        const el = pathRef.current;
        if (!el) return;
        try {
            const total = el.getTotalLength();
            const anchors = getNodeAnchors(allNodes.length);
            const pts = anchors.slice(0, allNodes.length).map(a => {
                const p = el.getPointAtLength(a * total);
                return { x: p.x, y: p.y };
            });
            setNodePts(pts);
        } catch (e) {
            console.warn('Road path measurement failed:', e);
        }
    }, [allNodes.length]);

    const completedCount = chapters.filter(c => c.status === 'completed').length;
    const hasInProgress = chapters.some(c => c.status === 'in-progress');
    const progressFrac = chapters.length
        ? (completedCount + (hasInProgress ? 0.5 : 0)) / chapters.length
        : 0;

    const sw = 20;
    const baseRoadColor = '#E8F0FE';

    return (
        <svg
            viewBox={ROAD_VIEWBOX}
            width="100%"
            preserveAspectRatio="xMidYMid meet"
            style={{ display: 'block', overflow: 'visible' }}
        >
            {/* ── Decorations ── */}
            <g aria-hidden="true">
                <line x1="870" y1="100" x2="870" y2="55" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
                <path d="M 870 55 L 898 65 L 870 75 Z" fill={COLORS.primaryPurple} opacity={0.92} />
                <text x="882" y="67" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="700"
                    fontFamily="'Inter',sans-serif" style={{ pointerEvents: 'none' }}>GOAL</text>
                <circle cx="870" cy="100" r="4" fill={baseRoadColor} opacity={0.85} />
                <circle cx="30" cy="100" r="16" fill={COLORS.primaryPurple} opacity={0.08} />
                <circle cx="30" cy="100" r="10" fill={COLORS.primaryPurple} opacity={0.14} />
                <circle cx="30" cy="100" r="6" fill={COLORS.primaryPurple} opacity={0.55} />
                <circle cx="30" cy="100" r="3" fill="#fff" opacity={0.9} />
                <text x="30" y="124" textAnchor="middle" fill={COLORS.primaryPurple} fontSize="8" fontWeight="700"
                    fontFamily="'Inter',sans-serif" opacity={0.7} style={{ pointerEvents: 'none' }}>START</text>
                <g opacity={0.20} stroke={COLORS.primaryPurple} strokeWidth="1.5" strokeLinecap="round" fill="none">
                    <polyline points="150,96 156,100 150,104" />
                    <polyline points="360,96 366,100 360,104" />
                    <polyline points="560,96 566,100 560,104" />
                    <polyline points="740,96 746,100 740,104" />
                </g>
            </g>

            {/* ── Road layers ── */}
            <path d={ROAD_PATH_D} fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth={sw + 7} strokeLinecap="round" />
            <path d={ROAD_PATH_D} fill="none" stroke={baseRoadColor} strokeWidth={sw} strokeLinecap="round" />
            <path d={ROAD_PATH_D} fill="none" stroke="rgba(255,255,255,0.50)" strokeWidth={sw * 0.36} strokeLinecap="round" />

            <motion.path d={ROAD_PATH_D} fill="none"
                stroke={COLORS.primaryPurple} strokeWidth={sw} strokeLinecap="round" opacity={0.84}
                initial={{ pathLength: 0 }} animate={{ pathLength: progressFrac }}
                transition={{ duration: 1.8, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.3 }} />
            <motion.path d={ROAD_PATH_D} fill="none"
                stroke="rgba(255,255,255,0.30)" strokeWidth={sw * 0.34} strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: progressFrac }}
                transition={{ duration: 1.8, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.3 }} />
            <path d={ROAD_PATH_D} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth={1.6} strokeDasharray="14 12" />

            {/* Hidden reference path */}
            <path ref={pathRef} id={ROAD_PATH_ID} d={ROAD_PATH_D} fill="none" stroke="transparent" strokeWidth={1} />

            {/* ── All milestone nodes ── */}
            <AnimatePresence>
                {nodePts.length === allNodes.length && allNodes.map((node, i) => (
                    <SVGChapterNode
                        key={node.id}
                        chapter={node}
                        index={i}
                        pos={nodePts[i]}
                        isSelected={selectedChapter?.id === node.id}
                        subjectColor={COLORS.primaryPurple}
                        onSelect={() => onSelectChapter(node)}
                    />
                ))}
            </AnimatePresence>
        </svg>
    );
}

// ─── Roadmap View ─────────────────────────────────────────────────────────────

function RoadmapView({ subjectId, onBack }) {
    const subject = subjectMap[subjectId];
    const initChs = initialChaptersData[subjectId] || [];

    const [chapters, setChapters] = useState(initChs);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [practiceModalOpen, setPracticeModalOpen] = useState(false);
    const [mockModalOpen, setMockModalOpen] = useState(false);

    const handleSelectChapter = (node) => {
        setSelectedChapter(node);
        setDetailModalOpen(true);
    };

    const handleUpdateChapter = (chapterId, updates) => {
        setChapters(prev => prev.map(c => c.id === chapterId ? { ...c, ...updates } : c));
        if (selectedChapter?.id === chapterId) {
            setSelectedChapter(prev => ({ ...prev, ...updates }));
        }
    };

    const handleCompletePractice = (chapterId) => {
        const c = chapters.find(x => x.id === chapterId);
        if (c) {
            handleUpdateChapter(chapterId, { practiceCompleted: c.practiceTotal });
        }
        setPracticeModalOpen(false);
    };

    const handleFinishChapter = (chapterId) => {
        const newChapters = chapters.map(c => c.id === chapterId ? { ...c, status: 'completed' } : c);
        const idx = chapters.findIndex(c => c.id === chapterId);
        
        const isNextMock = ((idx + 1) % 2 === 0 && idx < chapters.length - 1) || (idx === chapters.length - 1);
        
        if (!isNextMock && idx !== -1 && idx + 1 < chapters.length) {
            if (newChapters[idx + 1].status === 'not-started') {
                newChapters[idx + 1] = { ...newChapters[idx + 1], status: 'in-progress' };
            }
        }
        
        setChapters(newChapters);
        if (selectedChapter?.id === chapterId) {
            setSelectedChapter(newChapters[idx]);
        }
    };

    const handleCompleteChapter = (mockId) => {
        let linkedChapterId = mockId;
        if (typeof mockId === 'string' && mockId.startsWith('mock-')) {
            const mockIdx = parseInt(mockId.split('-')[1]);
            linkedChapterId = chapters[mockIdx]?.id;
        } else if (mockId === 'preboard') {
            linkedChapterId = chapters[chapters.length - 1]?.id;
        }

        const newChapters = chapters.map(c => {
            if (c.id === linkedChapterId) {
                return { ...c, mockScore: c.mockScore || 85, mockAttempts: Math.max(c.mockAttempts || 0, 1) };
            }
            return c;
        });
        
        const idx = chapters.findIndex(c => c.id === linkedChapterId);
        if (idx !== -1 && idx + 1 < chapters.length) {
            if (newChapters[idx + 1].status === 'not-started') {
                newChapters[idx + 1] = { ...newChapters[idx + 1], status: 'in-progress' };
            }
        }
        
        setChapters(newChapters);
        setMockModalOpen(false);
    };

    const moveChapter = (index, direction) => {
        const swap = index + direction;
        if (swap < 0 || swap >= chapters.length) return;
        const next = [...chapters];
        [next[index], next[swap]] = [next[swap], next[index]];
        setChapters(next);
    };

    const handleReorderChapter = (fromIndex, toIndex) => {
        if (toIndex < 0) toIndex = 0;
        if (toIndex >= chapters.length) toIndex = chapters.length - 1;
        if (fromIndex === toIndex) return;

        const next = [...chapters];
        const [moved] = next.splice(fromIndex, 1);
        next.splice(toIndex, 0, moved);
        setChapters(next);
    };

    const completedCount = chapters.filter(c => c.status === 'completed').length;
    const overallPct = Math.round((completedCount / chapters.length) * 100);
    const selectedIndex = chapters.findIndex(c => c.id === selectedChapter?.id);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 140px)' }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4, flexWrap: 'wrap' }}>
                <IconButton onClick={onBack} size="small"
                    sx={{ border: `1.5px solid ${COLORS.border}`, borderRadius: '10px', width: 34, height: 34, color: COLORS.textSecondary, '&:hover': { borderColor: subject.color, color: subject.color } }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg>
                </IconButton>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: '10px', background: `${subject.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>{subject.icon}</Box>
                    <Box>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: COLORS.textPrimary }}>{subject.name} — Learning Roadmap</Typography>
                        <Typography sx={{ fontSize: '0.72rem', color: COLORS.textSecondary }}>{completedCount}/{chapters.length} chapters · {overallPct}% complete</Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1.5, ml: 'auto' }}>
                    {[
                        { label: 'Subject Score', value: `${subject.score}%`, icon: '🎯' },
                        { label: 'Practice', value: `${subject.practice}%`, icon: '✏️' },
                        { label: 'Syllabus Completion', value: `${overallPct}%`, icon: '📚' },
                    ].map((stat, i) => (
                        <Box key={i} sx={{ px: 1.5, py: 0.8, borderRadius: '10px', background: '#fff', border: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', gap: 1.2 }}>
                            <Box sx={{ width: 26, height: 26, borderRadius: '6px', background: `${COLORS.primaryPurple}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>{stat.icon}</Box>
                            <Box>
                                <Typography sx={{ fontSize: '0.55rem', color: COLORS.textSecondary, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, lineHeight: 1 }}>{stat.label}</Typography>
                                <Typography sx={{ fontSize: '0.95rem', fontWeight: 800, color: COLORS.textPrimary, lineHeight: 1.1 }}>{stat.value}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Horizontal Roadmap Full Width */}
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', width: '100%', mb: 4, overflowX: 'auto', overflowY: 'hidden', '&::-webkit-scrollbar': { display: 'none' } }}>
                <Box sx={{ minWidth: 900, width: '100%' }}>
                    <SVGRoadmapPanel
                        chapters={chapters}
                        subjectColor={COLORS.primaryPurple}
                        selectedChapter={selectedChapter}
                        onSelectChapter={handleSelectChapter}
                    />
                </Box>
            </Box>

            <ChapterDetailModal
                chapter={selectedChapter}
                open={detailModalOpen}
                onClose={() => setDetailModalOpen(false)}
                subjectColor={COLORS.primaryPurple}
                onPracticeOpen={() => setPracticeModalOpen(true)}
                onMockOpen={() => setMockModalOpen(true)}
                isPracticeOpen={practiceModalOpen}
                onFinishChapter={handleFinishChapter}
            />

            <PracticeDrawer
                chapter={selectedChapter} subjectColor={subject.color} subjectId={subjectId}
                open={practiceModalOpen} onClose={() => setPracticeModalOpen(false)}
                onComplete={handleCompletePractice}
            />
            <MockTestModal
                chapter={selectedChapter} subjectColor={subject.color} subjectId={subjectId}
                open={mockModalOpen} onClose={() => setMockModalOpen(false)}
                onComplete={handleCompleteChapter}
            />
        </Box>
    );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function S2_SubjectMatrix() {
    const [view, setView] = useState('matrix');
    const [selectedSubject, setSelectedSubject] = useState(null);

    const handleSelectSubject = (subjectId) => { setSelectedSubject(subjectId); setView('roadmap'); };
    const handleBack = () => { setView('matrix'); setSelectedSubject(null); };

    return (
        <Layout
            role="student"
            title={view === 'matrix' ? 'Subject Health Matrix' : `${subjectMap[selectedSubject]?.name} Roadmap`}
            subtitle={
                view === 'roadmap' && selectedSubject
                    ? `Learning Roadmap · ${subjectMap[selectedSubject].name}`
                    : 'Grade 10 · NIOS Board · Aarav Singh'
            }
        >
            <AnimatePresence mode="wait">
                {view === 'matrix' && (
                    <motion.div key="matrix"
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                        <SubjectMatrixView onSelectSubject={handleSelectSubject} />
                    </motion.div>
                )}
                {view === 'roadmap' && selectedSubject && (
                    <motion.div key="roadmap"
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                        <RoadmapView subjectId={selectedSubject} onBack={handleBack} />
                    </motion.div>
                )}
            </AnimatePresence>
        </Layout>
    );
}