// src/screens/student/S2_SubjectMatrix.jsx
// Road direction: BOTTOM (START / completed) → TOP (GOAL / not-started near flag)
import React, { useState, useEffect, useRef } from 'react';
import {
    Box, Typography, Chip, LinearProgress,
    Divider, Button, Modal, IconButton,
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

// ─── Static Data ──────────────────────────────────────────────────────────────

const subjectMap = {
    math: {
        id: 'math', name: 'Mathematics', shortName: 'Math',
        color: COLORS.blue, icon: '📐', score: 68, practice: 75,
        weakTopics: ['Trigonometry', 'Quadratic Equations'],
        strongTopics: ['Algebra Basics', 'Number Systems'],
        completedChapters: 2, totalChapters: 6,
    },
    science: {
        id: 'science', name: 'Science', shortName: 'Science',
        color: COLORS.green, icon: '🔬', score: 55, practice: 38,
        weakTopics: ['Chemical Reactions', 'Electricity'],
        strongTopics: ['Physics Numericals'],
        completedChapters: 0, totalChapters: 5,
    },
    english: {
        id: 'english', name: 'English', shortName: 'English',
        color: COLORS.purple, icon: '📖', score: 82, practice: 80,
        weakTopics: [],
        strongTopics: ['Reading Skills', 'Essay Writing', 'Grammar'],
        completedChapters: 3, totalChapters: 5,
    },
    hindi: {
        id: 'hindi', name: 'Hindi', shortName: 'Hindi',
        color: COLORS.yellow, icon: '✍️', score: 74, practice: 71,
        weakTopics: ['Poetry Analysis'],
        strongTopics: ['Essay Writing', 'Grammar'],
        completedChapters: 2, totalChapters: 4,
    },
    social: {
        id: 'social', name: 'Social Science', shortName: 'Soc. Sci.',
        color: COLORS.amber, icon: '🌍', score: 61, practice: 72,
        weakTopics: ['History — Nationalism', 'Geography — Resources'],
        strongTopics: ['Civics — Democracy'],
        completedChapters: 1, totalChapters: 5,
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
// IMPORTANT: Chapters are ordered completed → in-progress → not-started.
// On the roadmap, index 0 (completed) maps to the BOTTOM anchor (start).
// The last index (not-started) maps to the TOP anchor (goal / flag).

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
        { id: 3, title: 'Metals and Non-Metals', status: 'not-started', firstTime: false, practiceCompleted: 0, practiceTotal: 12, mockScore: null, mockAttempts: 0, topics: [] },
        { id: 4, title: 'Life Processes', status: 'not-started', firstTime: false, practiceCompleted: 0, practiceTotal: 14, mockScore: null, mockAttempts: 0, topics: [] },
        { id: 5, title: 'Control & Coordination', status: 'not-started', firstTime: false, practiceCompleted: 0, practiceTotal: 12, mockScore: null, mockAttempts: 0, topics: [] },
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
            id: 2, title: 'Grammar — Parts of Speech', status: 'completed', firstTime: true,
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
            id: 4, title: 'Literature — Prose', status: 'in-progress', firstTime: false,
            practiceCompleted: 5, practiceTotal: 12, mockScore: null, mockAttempts: 0,
            topics: [
                { name: 'The Last Lesson', learning: 'Completed', practice: '3/4', progress: 65 },
                { name: 'Lost Spring', learning: 'In Progress', practice: '2/4', progress: 40 },
                { name: 'Deep Water', learning: 'Not Started', practice: '0/4', progress: 0 },
            ],
        },
        { id: 5, title: 'Literature — Poetry', status: 'not-started', firstTime: false, practiceCompleted: 0, practiceTotal: 10, mockScore: null, mockAttempts: 0, topics: [] },
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
        { id: 4, title: 'निबंध — Essay Writing', status: 'not-started', firstTime: false, practiceCompleted: 0, practiceTotal: 10, mockScore: null, mockAttempts: 0, topics: [] },
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
        { id: 3, title: 'Resources & Development', status: 'not-started', firstTime: false, practiceCompleted: 0, practiceTotal: 12, mockScore: null, mockAttempts: 0, topics: [] },
        { id: 4, title: 'Development — Economics', status: 'not-started', firstTime: false, practiceCompleted: 0, practiceTotal: 12, mockScore: null, mockAttempts: 0, topics: [] },
        { id: 5, title: 'Money & Credit', status: 'not-started', firstTime: false, practiceCompleted: 0, practiceTotal: 10, mockScore: null, mockAttempts: 0, topics: [] },
    ],
};

// ─── Shared helpers ───────────────────────────────────────────────────────────

const statusConfig = {
    'completed': { label: 'Completed', color: COLORS.green, bg: `${COLORS.green}15` },
    'in-progress': { label: 'In Progress', color: COLORS.blue, bg: `${COLORS.blue}15` },
    'not-started': { label: 'Not Started', color: COLORS.textMuted, bg: COLORS.divider },
};

function MiniBar({ label, value, color }) {
    return (
        <Box sx={{ mb: 0.6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.3 }}>
                <Typography sx={{ fontSize: '0.68rem', color: COLORS.textSecondary, fontWeight: 500 }}>{label}</Typography>
                <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color }}>{value}%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={value}
                sx={{ height: 5, borderRadius: 4, background: COLORS.divider, '& .MuiLinearProgress-bar': { background: color, borderRadius: 4 } }}
            />
        </Box>
    );
}

// ─── Subject Card ─────────────────────────────────────────────────────────────

function SubjectCard({ subject, accentColor, onSelect }) {
    const s = subjectMap[subject];
    const chPct = Math.round((s.completedChapters / s.totalChapters) * 100);
    return (
        <Box onClick={() => onSelect(subject)} sx={{
            p: 1.5, borderRadius: '12px', cursor: 'pointer',
            background: '#fff', border: `1.5px solid ${COLORS.border}`,
            transition: 'all 0.2s',
            '&:hover': { border: `1.5px solid ${s.color}`, boxShadow: `0 4px 16px ${s.color}20`, transform: 'translateY(-2px)' },
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.2 }}>
                <Box sx={{ width: 28, height: 28, borderRadius: '8px', background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0 }}>{s.icon}</Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: COLORS.textPrimary, lineHeight: 1.2 }}>{s.name}</Typography>
                    <Typography sx={{ fontSize: '0.62rem', color: COLORS.textMuted }}>{s.completedChapters}/{s.totalChapters} chapters done</Typography>
                </Box>
                <Box sx={{ width: 7, height: 7, borderRadius: '50%', background: accentColor, flexShrink: 0 }} />
            </Box>
            <MiniBar label="Score" value={s.score} color={s.color} />
            <MiniBar label="Practice" value={s.practice} color={s.color} />
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <LinearProgress variant="determinate" value={chPct}
                    sx={{ flexGrow: 1, height: 4, borderRadius: 4, background: COLORS.divider, '& .MuiLinearProgress-bar': { background: accentColor, borderRadius: 4 } }} />
                <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, color: accentColor, flexShrink: 0 }}>{chPct}%</Typography>
            </Box>
            <Box sx={{ mt: 1.2, textAlign: 'right' }}>
                <Typography sx={{ fontSize: '0.62rem', color: s.color, fontWeight: 600 }}>View Roadmap →</Typography>
            </Box>
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

            <Box sx={{ mt: 2.5, p: 2, borderRadius: '12px', background: COLORS.bgWarm, border: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: COLORS.textSecondary, mr: 1 }}>LEGEND</Typography>
                {[{ icon: '📊', label: 'Score = Assessment accuracy across all attempts' }, { icon: '📝', label: 'Practice = Volume of questions attempted' }].map(item => (
                    <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                        <Typography sx={{ fontSize: '0.75rem' }}>{item.icon}</Typography>
                        <Typography sx={{ fontSize: '0.68rem', color: COLORS.textSecondary }}>{item.label}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

// ─── Practice Modal ───────────────────────────────────────────────────────────

function PracticeModal({ chapter, subjectColor, open, onClose }) {
    if (!chapter) return null;
    const pct = Math.round((chapter.practiceCompleted / chapter.practiceTotal) * 100);
    const attempts = [{ label: 'Attempt 1', pct: 45 }, { label: 'Attempt 2', pct: 55 }, { label: 'Attempt 3', pct: pct }];
    const retentionScore = 70;
    const errorTypes = [
        { label: 'Concept Errors', count: 6, icon: '❌', color: COLORS.amber },
        { label: 'Calculation Errors', count: 3, icon: '⚠️', color: COLORS.yellow },
        { label: 'Careless Mistakes', count: 1, icon: '⚠️', color: COLORS.blue },
    ];
    const totalErrors = errorTypes.reduce((s, e) => s + e.count, 0);

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: { xs: '92vw', sm: 520 }, maxHeight: '85vh', overflowY: 'auto', background: '#fff', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.18)', p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2.5 }}>
                    <Box>
                        <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: COLORS.textPrimary }}>Practice Progress</Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: COLORS.textSecondary, mt: 0.2 }}>{chapter.title} · {chapter.practiceCompleted}/{chapter.practiceTotal} questions</Typography>
                    </Box>
                    <IconButton size="small" onClick={onClose}><svg width="18" height="18" viewBox="0 0 24 24" fill={COLORS.textSecondary}><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg></IconButton>
                </Box>

                <Box sx={{ mb: 2.5, p: 2, borderRadius: '12px', background: `${subjectColor}07`, border: `1px solid ${subjectColor}25` }}>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: COLORS.textSecondary, letterSpacing: 0.8, textTransform: 'uppercase', mb: 1.5 }}>📈 Progression Across Attempts</Typography>
                    {attempts.map((a, i) => (
                        <Box key={a.label} sx={{ mb: i < attempts.length - 1 ? 1.2 : 0 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: COLORS.textPrimary }}>{a.label}</Typography>
                                    {i === attempts.length - 1 && <Chip label="Latest" size="small" sx={{ height: 16, fontSize: '0.58rem', fontWeight: 700, background: `${subjectColor}18`, color: subjectColor, '& .MuiChip-label': { px: 0.8 } }} />}
                                    {i > 0 && a.pct > attempts[i - 1].pct && <Typography sx={{ fontSize: '0.65rem', color: COLORS.green, fontWeight: 700 }}>↑ +{a.pct - attempts[i - 1].pct}%</Typography>}
                                </Box>
                                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: subjectColor }}>{a.pct}%</Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={a.pct}
                                sx={{ height: 8, borderRadius: 4, background: COLORS.divider, '& .MuiLinearProgress-bar': { background: i === attempts.length - 1 ? `linear-gradient(90deg,${subjectColor},${subjectColor}CC)` : `${subjectColor}80`, borderRadius: 4 } }} />
                        </Box>
                    ))}
                </Box>

                <Box sx={{ mb: 2.5, p: 2, borderRadius: '12px', background: COLORS.bgWarm, border: `1px solid ${COLORS.border}` }}>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: COLORS.textSecondary, letterSpacing: 0.8, textTransform: 'uppercase', mb: 1.2 }}>🧠 Retention Score</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}>
                            <svg width={64} height={64} style={{ transform: 'rotate(-90deg)' }}>
                                <circle cx={32} cy={32} r={26} fill="none" stroke={COLORS.divider} strokeWidth={8} />
                                <circle cx={32} cy={32} r={26} fill="none" stroke={COLORS.green} strokeWidth={8} strokeDasharray={`${(retentionScore / 100) * 163} 163`} strokeLinecap="round" />
                            </svg>
                            <Typography sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.8rem', fontWeight: 800, color: COLORS.green }}>{retentionScore}%</Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: COLORS.textPrimary, mb: 0.4 }}>Re-attempt after a gap</Typography>
                            <Typography sx={{ fontSize: '0.72rem', color: COLORS.textSecondary, lineHeight: 1.5 }}>You forgot 3/10 previously correct questions when revisited after 2–5 days.</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ p: 2, borderRadius: '12px', background: COLORS.bgWarm, border: `1px solid ${COLORS.border}` }}>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: COLORS.textSecondary, letterSpacing: 0.8, textTransform: 'uppercase', mb: 1.5 }}>🔍 Error Type Breakdown</Typography>
                    {errorTypes.map(e => (
                        <Box key={e.label} sx={{ mb: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}><Typography sx={{ fontSize: '0.8rem' }}>{e.icon}</Typography><Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: COLORS.textPrimary }}>{e.label}</Typography></Box>
                                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: e.color }}>{e.count} errors</Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={(e.count / totalErrors) * 100}
                                sx={{ height: 7, borderRadius: 4, background: COLORS.divider, '& .MuiLinearProgress-bar': { background: e.color, borderRadius: 4 } }} />
                        </Box>
                    ))}
                    <Box sx={{ mt: 1.5, p: 1, borderRadius: '8px', background: `${COLORS.amber}0D`, border: `1px solid ${COLORS.amber}25` }}>
                        <Typography sx={{ fontSize: '0.68rem', color: COLORS.amberDark, fontWeight: 600 }}>💡 Concept errors are highest — revisit theory before more practice.</Typography>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}

// ─── Mock Test Modal ──────────────────────────────────────────────────────────

function MockTestModal({ chapter, subjectColor, open, onClose }) {
    if (!chapter) return null;
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
                                sx={{ height: 8, borderRadius: 4, background: COLORS.divider, '& .MuiLinearProgress-bar': { background: i === mockAttempts.length - 1 ? `linear-gradient(90deg,${subjectColor},${subjectColor}CC)` : `${subjectColor}70`, borderRadius: 4 } }} />
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
                    <Button variant="contained" size="small" fullWidth
                        sx={{ background: `linear-gradient(135deg,${subjectColor},${subjectColor}CC)`, color: '#fff', textTransform: 'none', fontWeight: 700, borderRadius: '10px', boxShadow: `0 4px 12px ${subjectColor}35` }}>
                        Retake Mock Test
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

// ─── Chapter Detail Panel ─────────────────────────────────────────────────────

function ChapterDetailPanel({ chapter, subjectColor, onPracticeOpen, onMockOpen, onMoveUp, onMoveDown, isFirst, isLast, currentIndex, totalChapters }) {
    if (!chapter) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', p: 4, textAlign: 'center', minHeight: 320 }}>
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260 }}>
                    <Typography sx={{ fontSize: '2.8rem', mb: 1.5 }}>🗺️</Typography>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: COLORS.textSecondary }}>Select a milestone</Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: COLORS.textMuted, mt: 0.5, lineHeight: 1.6 }}>
                        Tap any chapter node on the roadmap<br />to see its full details here.
                    </Typography>
                </motion.div>
            </Box>
        );
    }

    const sc = statusConfig[chapter.status];
    const pct = Math.round((chapter.practiceCompleted / chapter.practiceTotal) * 100);

    return (
        <Box sx={{ p: { xs: 2, md: 2.5 }, overflowY: 'auto', maxHeight: { md: '70vh' } }}>

            {/* Study order controls */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, p: 1.2, borderRadius: '10px', background: `${subjectColor}06`, border: `1px solid ${subjectColor}20` }}>
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: COLORS.textSecondary }}>Study order:</Typography>
                <Button size="small" variant="outlined" disabled={isFirst} onClick={onMoveUp}
                    sx={{ minWidth: 0, px: 1.2, py: 0.4, fontSize: '0.68rem', fontWeight: 600, color: subjectColor, borderColor: `${subjectColor}40`, borderRadius: '7px', textTransform: 'none', '&:hover': { borderColor: subjectColor, background: `${subjectColor}08` } }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 3 }}><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" /></svg>
                    Earlier
                </Button>
                <Button size="small" variant="outlined" disabled={isLast} onClick={onMoveDown}
                    sx={{ minWidth: 0, px: 1.2, py: 0.4, fontSize: '0.68rem', fontWeight: 600, color: subjectColor, borderColor: `${subjectColor}40`, borderRadius: '7px', textTransform: 'none', '&:hover': { borderColor: subjectColor, background: `${subjectColor}08` } }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 3 }}><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" /></svg>
                    Later
                </Button>
                <Typography sx={{ ml: 'auto', fontSize: '0.65rem', color: COLORS.textMuted, fontWeight: 600 }}>{currentIndex + 1} of {totalChapters}</Typography>
            </Box>

            {/* Chapter header */}
            <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.6 }}>
                    <Chip label={sc.label} size="small" sx={{ height: 22, fontSize: '0.65rem', fontWeight: 700, background: sc.bg, color: sc.color }} />
                    {chapter.firstTime && <Chip label="First Time" size="small" sx={{ height: 22, fontSize: '0.65rem', fontWeight: 700, background: `${COLORS.blue}12`, color: COLORS.blue }} />}
                </Box>
                <Typography sx={{ fontSize: '1.05rem', fontWeight: 800, color: COLORS.textPrimary, lineHeight: 1.3 }}>{chapter.title}</Typography>
                {chapter.status !== 'not-started' && (
                    <Box sx={{ mt: 1 }}>
                        <Typography sx={{ fontSize: '0.65rem', color: COLORS.textMuted, mb: 0.4 }}>
                            {chapter.status === 'completed' ? "You're doing great here!" : "You're making steady progress!"}
                        </Typography>
                        <LinearProgress variant="determinate" value={pct}
                            sx={{ height: 6, borderRadius: 4, background: COLORS.divider, '& .MuiLinearProgress-bar': { background: `linear-gradient(90deg,${subjectColor},${subjectColor}CC)`, borderRadius: 4 } }} />
                    </Box>
                )}
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Info blocks */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, 1fr)' }, gap: 1.5, mb: 2 }}>

                {/* Learning */}
                <Box sx={{ p: 1.5, borderRadius: '12px', background: COLORS.bgWarm, border: `1px solid ${COLORS.border}`, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.8 }}>
                        <Typography sx={{ fontSize: '1rem' }}>📚</Typography>
                        <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: COLORS.textPrimary }}>Learning</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
                        <Box sx={{ width: 28, height: 28, borderRadius: '8px', background: chapter.status === 'completed' ? `${COLORS.green}18` : chapter.status === 'in-progress' ? `${COLORS.blue}18` : COLORS.divider, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0 }}>
                            {chapter.status === 'completed' ? '✅' : chapter.status === 'in-progress' ? '📖' : '🔒'}
                        </Box>
                        <Typography sx={{ fontSize: '0.75rem', color: COLORS.textSecondary }}>
                            {chapter.status === 'completed' ? 'Chapter reading complete' : chapter.status === 'in-progress' ? 'Currently studying this chapter' : 'Not started yet'}
                        </Typography>
                    </Box>
                </Box>

                {/* Practice */}
                <Box sx={{ p: 1.5, borderRadius: '12px', background: COLORS.bgWarm, border: `1px solid ${COLORS.border}`, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography sx={{ fontSize: '1rem' }}>✏️</Typography>
                        <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: COLORS.textPrimary }}>Practice Questions</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1, flexGrow: 1 }}>
                        <Box sx={{ position: 'relative', width: 44, height: 44, flexShrink: 0 }}>
                            <svg width={44} height={44} style={{ transform: 'rotate(-90deg)' }}>
                                <circle cx={22} cy={22} r={18} fill="none" stroke={COLORS.divider} strokeWidth={5} />
                                <circle cx={22} cy={22} r={18} fill="none" stroke={subjectColor} strokeWidth={5} strokeDasharray={`${(pct / 100) * 113.1} 113.1`} strokeLinecap="round" />
                            </svg>
                            <Typography sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '0.65rem', fontWeight: 800, color: subjectColor }}>{pct}%</Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '0.95rem', fontWeight: 800, color: COLORS.textPrimary, lineHeight: 1 }}>{chapter.practiceCompleted}/{chapter.practiceTotal}</Typography>
                            <Typography sx={{ fontSize: '0.65rem', color: COLORS.textSecondary }}>Completed</Typography>
                            <Typography sx={{ fontSize: '0.6rem', color: COLORS.textMuted, mt: 0.3 }}>Adaptive difficulty</Typography>
                        </Box>
                    </Box>
                    <Button variant="outlined" size="small" fullWidth onClick={onPracticeOpen} disabled={chapter.practiceCompleted === 0}
                        sx={{ mt: 1, color: subjectColor, borderColor: `${subjectColor}50`, textTransform: 'none', fontWeight: 700, fontSize: '0.72rem', borderRadius: '8px', '&:hover': { borderColor: subjectColor, background: `${subjectColor}08` } }}>
                        {chapter.practiceCompleted > 0 ? 'Report →' : 'No attempts'}
                    </Button>
                </Box>

                {/* Mock Test */}
                <Box sx={{ p: 1.5, borderRadius: '12px', background: COLORS.bgWarm, border: `1px solid ${COLORS.border}`, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography sx={{ fontSize: '1rem' }}>📋</Typography>
                        <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: COLORS.textPrimary }}>Mock Test</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1.5, mb: 1, flexGrow: 1 }}>
                        <Box sx={{ textAlign: 'center', minWidth: 40 }}>
                            <Typography sx={{ fontSize: '1.2rem', fontWeight: 800, color: COLORS.textPrimary, lineHeight: 1 }}>{chapter.mockAttempts}</Typography>
                            <Typography sx={{ fontSize: '0.6rem', color: COLORS.textSecondary }}>Attempts</Typography>
                        </Box>
                        {chapter.mockScore !== null && (
                            <Box sx={{ textAlign: 'center', minWidth: 40 }}>
                                <Typography sx={{ fontSize: '1.2rem', fontWeight: 800, color: subjectColor, lineHeight: 1 }}>{chapter.mockScore}%</Typography>
                                <Typography sx={{ fontSize: '0.6rem', color: COLORS.textSecondary }}>Best Score</Typography>
                            </Box>
                        )}
                    </Box>
                    <Button variant="outlined" size="small" fullWidth onClick={onMockOpen} disabled={chapter.mockAttempts === 0}
                        sx={{ mt: 1, color: subjectColor, borderColor: `${subjectColor}50`, textTransform: 'none', fontWeight: 700, fontSize: '0.72rem', borderRadius: '8px', '&:hover': { borderColor: subjectColor, background: `${subjectColor}08` } }}>
                        {chapter.mockAttempts > 0 ? 'Analysis →' : 'No attempts'}
                    </Button>
                </Box>
            </Box>

            {/* Topics table */}
            {chapter.topics.length > 0 && (
                <Box>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: COLORS.textSecondary, letterSpacing: 0.8, textTransform: 'uppercase', mb: 1.2 }}>Topics in this Chapter</Typography>
                    <Box sx={{ borderRadius: '10px', border: `1px solid ${COLORS.border}`, overflow: 'hidden' }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 80px 46px 60px', px: 1.5, py: 0.8, background: COLORS.divider }}>
                            {['Topic', 'Learning', 'Prac.', 'Progress'].map(h => (
                                <Typography key={h} sx={{ fontSize: '0.6rem', fontWeight: 700, color: COLORS.textSecondary, textTransform: 'uppercase', letterSpacing: 0.4 }}>{h}</Typography>
                            ))}
                        </Box>
                        {chapter.topics.map((t, i) => (
                            <Box key={t.name} sx={{ display: 'grid', gridTemplateColumns: '1fr 80px 46px 60px', px: 1.5, py: 1, borderTop: i > 0 ? `1px solid ${COLORS.divider}` : 'none', alignItems: 'center' }}>
                                <Typography sx={{ fontSize: '0.72rem', color: COLORS.textPrimary, fontWeight: 500, lineHeight: 1.3, pr: 1 }}>{t.name}</Typography>
                                <Chip label={t.learning} size="small" sx={{ height: 18, fontSize: '0.57rem', fontWeight: 600, maxWidth: 76, background: t.learning === 'Completed' ? `${COLORS.green}15` : t.learning === 'In Progress' ? `${COLORS.blue}15` : COLORS.divider, color: t.learning === 'Completed' ? COLORS.greenDark : t.learning === 'In Progress' ? COLORS.blue : COLORS.textMuted, '& .MuiChip-label': { px: 0.7 } }} />
                                <Typography sx={{ fontSize: '0.7rem', color: COLORS.textSecondary, fontWeight: 600 }}>{t.practice}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <LinearProgress variant="determinate" value={t.progress} sx={{ flexGrow: 1, height: 4, borderRadius: 4, background: COLORS.divider, '& .MuiLinearProgress-bar': { background: subjectColor, borderRadius: 4 } }} />
                                    <Typography sx={{ fontSize: '0.56rem', color: subjectColor, fontWeight: 700, flexShrink: 0, minWidth: 24 }}>{t.progress}%</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
}

// ─── SVG Chapter Node ─────────────────────────────────────────────────────────

function SVGChapterNode({ chapter, index, pos, isSelected, subjectColor, onSelect }) {
    const isCompleted = chapter.status === 'completed';
    const isInProgress = chapter.status === 'in-progress';

    // Labels: alternate sides based on x position
    const isOnRight = pos.x > ROAD_VIEWBOX_W / 2;
    const labelX = isOnRight ? pos.x - 30 : pos.x + 30;
    const labelAnchor = isOnRight ? 'end' : 'start';

    return (
        <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.07, type: 'spring', stiffness: 300, damping: 26 }}
        >
            {/* Wide invisible click zone */}
            <circle cx={pos.x} cy={pos.y} r={30} fill="transparent" onClick={onSelect} style={{ cursor: 'pointer' }} />

            {/* Pulsing selection ring */}
            {isSelected && (
                <motion.circle
                    cx={pos.x} cy={pos.y} r={24} fill="none"
                    stroke={subjectColor} strokeWidth={2.5}
                    animate={{ r: [22, 27, 22], opacity: [0.7, 0.12, 0.7] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                />
            )}

            {/* Shadow */}
            <circle cx={pos.x} cy={pos.y + 2.5} r={19} fill="rgba(0,0,0,0.09)" />

            {/* Main circle */}
            <motion.circle
                cx={pos.x} cy={pos.y} r={19}
                fill={isCompleted ? subjectColor : '#ffffff'}
                stroke={isCompleted ? 'none' : isInProgress ? subjectColor : '#D1D5DB'}
                strokeWidth={isInProgress ? 3 : 2}
                whileTap={{ scale: 0.88 }}
                onClick={onSelect}
                style={{ cursor: 'pointer' }}
            />

            {/* Status icon inside circle */}
            {isCompleted ? (
                <path
                    d={`M ${pos.x - 7} ${pos.y} L ${pos.x - 2} ${pos.y + 6} L ${pos.x + 8} ${pos.y - 6}`}
                    fill="none" stroke="white" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"
                    style={{ pointerEvents: 'none' }}
                />
            ) : isInProgress ? (
                <motion.circle
                    cx={pos.x} cy={pos.y} r={7} fill={subjectColor}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    style={{ pointerEvents: 'none' }}
                />
            ) : (
                <text x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="middle"
                    fill="#9CA3AF" fontSize="10" fontWeight="700"
                    fontFamily="'DM Sans','Inter',sans-serif"
                    style={{ pointerEvents: 'none' }}
                >{index + 1}</text>
            )}

            {/* Chapter title */}
            <text x={labelX} y={pos.y - 8} textAnchor={labelAnchor}
                fill={isSelected ? '#111827' : '#374151'} fontSize="9.5"
                fontWeight={isSelected ? '700' : '500'}
                fontFamily="'Inter',sans-serif"
                style={{ pointerEvents: 'none' }}
            >
                {chapter.title.length > 18 ? chapter.title.slice(0, 18) + '…' : chapter.title}
            </text>

            {/* Status sub-label */}
            <text x={labelX} y={pos.y + 7} textAnchor={labelAnchor}
                fill={isCompleted ? subjectColor : isInProgress ? COLORS.blue : '#9CA3AF'}
                fontSize="7.5" fontWeight="600"
                fontFamily="'Inter',sans-serif"
                style={{ pointerEvents: 'none' }}
            >
                {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Not started'}
            </text>

            {/* Mock score badge */}
            {chapter.mockScore !== null && chapter.mockScore !== undefined && (() => {
                const bx = isOnRight ? labelX - 36 : labelX;
                return (
                    <g style={{ pointerEvents: 'none' }}>
                        <rect x={bx} y={pos.y + 16} width={36} height={14} rx={4}
                            fill={`${subjectColor}15`} stroke={`${subjectColor}30`} strokeWidth={0.8} />
                        <text x={bx + 18} y={pos.y + 24} textAnchor="middle" dominantBaseline="middle"
                            fill={subjectColor} fontSize="7.5" fontWeight="700" fontFamily="'Inter',sans-serif">
                            {chapter.mockScore}%
                        </text>
                    </g>
                );
            })()}
        </motion.g>
    );
}

// ─── SVG Roadmap Panel ────────────────────────────────────────────────────────
// Uses the REVERSED ROAD_PATH_D: path starts at BOTTOM (622) → winds up → TOP (40/flag).
// chapters[0] (completed) → anchor 0.04 → BOTTOM (start area)
// chapters[last] (not-started) → anchor 0.95 → TOP (goal / flag)

function SVGRoadmapPanel({ chapters, subjectColor, selectedChapter, onSelectChapter }) {
    const pathRef = useRef(null);
    const [nodePts, setNodePts] = useState([]);

    useEffect(() => {
        const el = pathRef.current;
        if (!el) return;
        try {
            const total = el.getTotalLength();
            const anchors = getNodeAnchors(chapters.length);
            const pts = anchors.slice(0, chapters.length).map(a => {
                const p = el.getPointAtLength(a * total);
                return { x: p.x, y: p.y };
            });
            setNodePts(pts);
        } catch (e) {
            console.warn('Road path measurement failed:', e);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chapters.length]);

    const completedCount = chapters.filter(c => c.status === 'completed').length;
    const hasInProgress = chapters.some(c => c.status === 'in-progress');
    // Progress fills from BOTTOM upward: pathLength 0→fraction
    const progressFrac = chapters.length
        ? (completedCount + (hasInProgress ? 0.5 : 0)) / chapters.length
        : 0;

    const sw = 26;
    // Light blue-tinted base road surface
    const baseRoadColor = '#E8F0FE';

    return (
        <svg
            viewBox={ROAD_VIEWBOX}
            width="100%"
            preserveAspectRatio="xMidYMid meet"
            style={{ display: 'block', overflow: 'visible' }}
        >
            {/* ── Scenic Decorations ── */}
            <g aria-hidden="true">
                {/* GOAL flag at TOP (160, 40) */}
                <line x1="160" y1="40" x2="160" y2="4" stroke="#CBD5E1" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M 160 4 L 182 12 L 160 20 Z" fill={subjectColor} opacity={0.92} />
                <text x="168" y="14" textAnchor="middle" fill="#ffffff" fontSize="5.5" fontWeight="700"
                    fontFamily="'Inter',sans-serif" letterSpacing="0.5" style={{ pointerEvents: 'none' }}>
                    GOAL
                </text>
                <circle cx="160" cy="40" r="3.5" fill={baseRoadColor} opacity={0.85} />

                {/* START marker at BOTTOM (160, 622) */}
                <circle cx="160" cy="622" r="14" fill={subjectColor} opacity={0.08} />
                <circle cx="160" cy="622" r="9" fill={subjectColor} opacity={0.15} />
                <circle cx="160" cy="622" r="5" fill={subjectColor} opacity={0.60} />
                <circle cx="160" cy="622" r="2.5" fill="#ffffff" opacity={0.9} />
                <text x="160" y="640" textAnchor="middle" fill={subjectColor} fontSize="7" fontWeight="700"
                    fontFamily="'Inter',sans-serif" letterSpacing="0.8" opacity={0.75} style={{ pointerEvents: 'none' }}>
                    START
                </text>

                {/* Foliage — left */}
                <g opacity={0.16} fill="#5AAF68">
                    <circle cx="28" cy="126" r="15" /><circle cx="42" cy="116" r="10" />
                    <rect x="26" y="139" width="5" height="14" rx="2.5" fill="#A0AEC0" />
                    <circle cx="24" cy="390" r="13" /><circle cx="36" cy="382" r="9" />
                    <rect x="22" y="401" width="5" height="12" rx="2.5" fill="#A0AEC0" />
                </g>
                {/* Foliage — right */}
                <g opacity={0.16} fill="#5AAF68">
                    <circle cx="294" cy="254" r="14" /><circle cx="282" cy="244" r="9" />
                    <rect x="292" y="267" width="5" height="13" rx="2.5" fill="#A0AEC0" />
                    <circle cx="298" cy="514" r="12" /><circle cx="286" cy="506" r="8" />
                    <rect x="296" y="525" width="5" height="11" rx="2.5" fill="#A0AEC0" />
                </g>
                {/* Upward travel chevrons */}
                <g opacity={0.22} stroke={subjectColor} strokeWidth="1.5" strokeLinecap="round" fill="none">
                    <polyline points="155,580 160,574 165,580" />
                    <polyline points="155,440 160,434 165,440" />
                    <polyline points="155,310 160,304 165,310" />
                    <polyline points="155,180 160,174 165,180" />
                </g>
                {/* Pebbles */}
                <g opacity={0.09} fill="#6B7280">
                    <circle cx="52" cy="208" r="3" />
                    <circle cx="268" cy="338" r="3" />
                    <circle cx="52" cy="462" r="3" />
                </g>
            </g>

            {/* ── Road layers (use REVERSED ROAD_PATH_D from RoadPath.tsx) ── */}
            <path d={ROAD_PATH_D} fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth={sw + 7} strokeLinecap="round" />
            <path d={ROAD_PATH_D} fill="none" stroke={baseRoadColor} strokeWidth={sw} strokeLinecap="round" />
            <path d={ROAD_PATH_D} fill="none" stroke="rgba(255,255,255,0.50)" strokeWidth={sw * 0.36} strokeLinecap="round" />

            {/* Progress fill — grows from BOTTOM upward as pathLength 0→fraction */}
            <motion.path
                d={ROAD_PATH_D} fill="none"
                stroke={subjectColor} strokeWidth={sw} strokeLinecap="round" opacity={0.84}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progressFrac }}
                transition={{ duration: 1.8, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.3 }}
            />
            <motion.path
                d={ROAD_PATH_D} fill="none"
                stroke="rgba(255,255,255,0.30)" strokeWidth={sw * 0.34} strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progressFrac }}
                transition={{ duration: 1.8, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.3 }}
            />

            {/* Centre lane dashes */}
            <path d={ROAD_PATH_D} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth={1.6} strokeDasharray="14 12" />

            {/* Hidden measurement reference path */}
            <path ref={pathRef} id={ROAD_PATH_ID} d={ROAD_PATH_D} fill="none" stroke="transparent" strokeWidth={1} />

            {/* ── Chapter milestone nodes ── */}
            <AnimatePresence>
                {nodePts.length === chapters.length && chapters.map((chapter, i) => (
                    <SVGChapterNode
                        key={chapter.id}
                        chapter={chapter}
                        index={i}
                        pos={nodePts[i]}
                        isSelected={selectedChapter?.id === chapter.id}
                        subjectColor={subjectColor}
                        onSelect={() => onSelectChapter(chapter)}
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
    const [practiceModalOpen, setPracticeModalOpen] = useState(false);
    const [mockModalOpen, setMockModalOpen] = useState(false);

    const moveChapter = (index, direction) => {
        const swap = index + direction;
        if (swap < 0 || swap >= chapters.length) return;
        const next = [...chapters];
        [next[index], next[swap]] = [next[swap], next[index]];
        setChapters(next);
    };

    const completedCount = chapters.filter(c => c.status === 'completed').length;
    const overallPct = Math.round((completedCount / chapters.length) * 100);
    const selectedIndex = chapters.findIndex(c => c.id === selectedChapter?.id);

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
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
                <Box sx={{ flexGrow: 1, maxWidth: 180, display: { xs: 'none', md: 'block' }, ml: 'auto' }}>
                    <LinearProgress variant="determinate" value={overallPct}
                        sx={{ height: 8, borderRadius: 4, background: COLORS.divider, '& .MuiLinearProgress-bar': { background: `linear-gradient(90deg,${subject.color},${subject.color}CC)`, borderRadius: 4 } }} />
                    <Typography sx={{ fontSize: '0.62rem', color: COLORS.textSecondary, mt: 0.3, textAlign: 'right' }}>{overallPct}% complete</Typography>
                </Box>
            </Box>

            {/* Direction hint banner */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, p: '10px 14px', borderRadius: '10px', mb: 2.5, background: `${subject.color}08`, border: `1px solid ${subject.color}22` }}>
                <Typography sx={{ fontSize: '0.92rem', mt: '1px', flexShrink: 0 }}>💡</Typography>
                <Typography sx={{ fontSize: '0.7rem', color: subject.color, fontWeight: 600, lineHeight: 1.5 }}>
                    Your journey moves <strong>upward</strong> — completed chapters sit at the bottom, and the chapters you haven't tackled yet are near the flag at the top. Tap a milestone to see details. Use "Earlier / Later" to reorder.
                </Typography>
            </Box>

            {/* Legend */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2.5, flexWrap: 'wrap', alignItems: 'center' }}>
                {[
                    { label: 'Completed', color: subject.color },
                    { label: 'In Progress', color: COLORS.blue },
                    { label: 'Not Started', color: COLORS.textMuted },
                ].map(l => (
                    <Box key={l.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                        <Box sx={{ width: 9, height: 9, borderRadius: '50%', background: l.color }} />
                        <Typography sx={{ fontSize: '0.67rem', color: COLORS.textSecondary }}>{l.label}</Typography>
                    </Box>
                ))}
                <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.6, opacity: 0.7 }}>
                    <Typography sx={{ fontSize: '0.67rem', color: COLORS.textMuted }}>Bottom = Start · Top = Goal 🚩</Typography>
                </Box>
            </Box>

            {/* Two-column layout */}
            <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>

                {/* Left: SVG Roadmap (sticky) */}
                <Box sx={{ width: { xs: '100%', md: 280 }, flexShrink: 0, position: { md: 'sticky' }, top: { md: 16 } }}>
                    <SVGRoadmapPanel
                        chapters={chapters}
                        subjectColor={subject.color}
                        selectedChapter={selectedChapter}
                        onSelectChapter={setSelectedChapter}
                    />
                </Box>

                {/* Right: Chapter detail */}
                <Box sx={{ flexGrow: 1, minWidth: 0, borderRadius: '16px', border: `1.5px solid ${COLORS.border}`, background: '#fff', minHeight: { md: 480 }, overflow: 'hidden' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedChapter?.id ?? 'empty'}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChapterDetailPanel
                                chapter={selectedChapter}
                                subjectColor={subject.color}
                                onPracticeOpen={() => setPracticeModalOpen(true)}
                                onMockOpen={() => setMockModalOpen(true)}
                                onMoveUp={() => {
                                    if (selectedIndex > 0) {
                                        moveChapter(selectedIndex, -1);
                                        setSelectedChapter(prev => prev);
                                    }
                                }}
                                onMoveDown={() => {
                                    if (selectedIndex < chapters.length - 1) {
                                        moveChapter(selectedIndex, 1);
                                        setSelectedChapter(prev => prev);
                                    }
                                }}
                                isFirst={selectedIndex === 0}
                                isLast={selectedIndex === chapters.length - 1}
                                currentIndex={selectedIndex}
                                totalChapters={chapters.length}
                            />
                        </motion.div>
                    </AnimatePresence>
                </Box>
            </Box>

            <PracticeModal chapter={selectedChapter} subjectColor={subject.color} open={practiceModalOpen} onClose={() => setPracticeModalOpen(false)} />
            <MockTestModal chapter={selectedChapter} subjectColor={subject.color} open={mockModalOpen} onClose={() => setMockModalOpen(false)} />
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
            subtitle={view === 'roadmap' && selectedSubject ? `Learning Roadmap · ${subjectMap[selectedSubject].name}` : 'Grade 10 · NIOS Board · Aarav Singh'}
        >
            <AnimatePresence mode="wait">
                {view === 'matrix' && (
                    <motion.div key="matrix" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                        <SubjectMatrixView onSelectSubject={handleSelectSubject} />
                    </motion.div>
                )}
                {view === 'roadmap' && selectedSubject && (
                    <motion.div key="roadmap" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                        <RoadmapView subjectId={selectedSubject} onBack={handleBack} />
                    </motion.div>
                )}
            </AnimatePresence>
        </Layout>
    );
}