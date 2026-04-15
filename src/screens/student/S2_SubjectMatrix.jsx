// src/screens/student/S2_SubjectMatrix.jsx
import React, { useState } from 'react';
import {
    Box, Typography, Card, CardContent, Grid, Chip, LinearProgress,
    Divider, Button, Modal, IconButton,
} from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

// ─── Static Data ─────────────────────────────────────────────────────────────

const subjectMap = {
    math: {
        id: 'math', name: 'Mathematics', shortName: 'Math',
        color: COLORS.blue, icon: '📐', score: 68, practice: 75,
        tag: 'underutilized',
        weakTopics: ['Trigonometry', 'Quadratic Equations'],
        strongTopics: ['Algebra Basics', 'Number Systems'],
        completedChapters: 2, totalChapters: 6,
    },
    science: {
        id: 'science', name: 'Science', shortName: 'Science',
        color: COLORS.green, icon: '🔬', score: 55, practice: 38,
        tag: 'neglected',
        weakTopics: ['Chemical Reactions', 'Electricity'],
        strongTopics: ['Physics Numericals'],
        completedChapters: 0, totalChapters: 5,
    },
    english: {
        id: 'english', name: 'English', shortName: 'English',
        color: COLORS.purple, icon: '📖', score: 82, practice: 80,
        tag: 'strong',
        weakTopics: [],
        strongTopics: ['Reading Skills', 'Essay Writing', 'Grammar'],
        completedChapters: 3, totalChapters: 5,
    },
    hindi: {
        id: 'hindi', name: 'Hindi', shortName: 'Hindi',
        color: COLORS.yellow, icon: '✍️', score: 74, practice: 71,
        tag: 'strong',
        weakTopics: ['Poetry Analysis'],
        strongTopics: ['Essay Writing', 'Grammar'],
        completedChapters: 2, totalChapters: 4,
    },
    social: {
        id: 'social', name: 'Social Science', shortName: 'Soc. Sci.',
        color: COLORS.amber, icon: '🌍', score: 61, practice: 72,
        tag: 'inefficient',
        weakTopics: ['History — Nationalism', 'Geography — Resources'],
        strongTopics: ['Civics — Democracy'],
        completedChapters: 1, totalChapters: 5,
    },
};

const matrixDef = [
    {
        key: 'strong',
        label: 'Strong Subjects',
        desc: 'High Score · High Practice',
        icon: '✅',
        accentColor: COLORS.green,
        bgColor: `${COLORS.green}08`,
        borderColor: `${COLORS.green}35`,
        tagBg: `${COLORS.green}18`,
        tagText: COLORS.greenDark,
        subjectIds: ['english', 'hindi'],
        advice: 'Keep the momentum. Maintain regular practice to stay ahead.',
        axisPos: 'top-left',
    },
    {
        key: 'underutilized',
        label: 'Underutilized',
        desc: 'High Score · Low Practice',
        icon: '⚠️',
        accentColor: COLORS.yellow,
        bgColor: `${COLORS.yellow}08`,
        borderColor: `${COLORS.yellow}35`,
        tagBg: `${COLORS.yellow}18`,
        tagText: COLORS.yellowDark,
        subjectIds: ['math'],
        advice: 'You know this well — practice more to solidify your edge.',
        axisPos: 'top-right',
    },
    {
        key: 'inefficient',
        label: 'Inefficient Effort',
        desc: 'Low Score · High Practice',
        icon: '🔁',
        accentColor: COLORS.amber,
        bgColor: `${COLORS.amber}07`,
        borderColor: `${COLORS.amber}35`,
        tagBg: `${COLORS.amber}18`,
        tagText: COLORS.amberDark,
        subjectIds: ['social'],
        advice: 'Hard work without strategy. Revisit how you are studying.',
        axisPos: 'bottom-left',
    },
    {
        key: 'neglected',
        label: 'Neglected',
        desc: 'Low Score · Low Practice',
        icon: '❗',
        accentColor: '#E05050',
        bgColor: '#ff00000A',
        borderColor: '#E0505040',
        tagBg: '#E0505018',
        tagText: '#B03030',
        subjectIds: ['science'],
        advice: 'Urgent. Start with 20 minutes daily to reverse this.',
        axisPos: 'bottom-right',
    },
];

// Chapter data keyed by subject
const initialChaptersData = {
    math: [
        {
            id: 1, title: 'Real Numbers', status: 'completed', firstTime: true,
            practiceCompleted: 15, practiceTotal: 15, mockScore: 85, mockAttempts: 2,
            topics: [
                { name: "Euclid's Division Lemma", learning: 'Completed', practice: '5/5', mockTest: '—', progress: 90 },
                { name: 'Fundamental Theorem of Arithmetic', learning: 'Completed', practice: '5/5', mockTest: '—', progress: 88 },
                { name: 'Irrational Numbers', learning: 'Completed', practice: '5/5', mockTest: '—', progress: 82 },
            ],
        },
        {
            id: 2, title: 'Polynomials', status: 'completed', firstTime: true,
            practiceCompleted: 12, practiceTotal: 15, mockScore: 72, mockAttempts: 1,
            topics: [
                { name: 'Zeros of a Polynomial', learning: 'Completed', practice: '4/5', mockTest: '72%', progress: 75 },
                { name: 'Division Algorithm', learning: 'Completed', practice: '4/5', mockTest: '—', progress: 70 },
                { name: 'Relationship between Zeros and Coefficients', learning: 'Completed', practice: '4/5', mockTest: '—', progress: 68 },
            ],
        },
        {
            id: 3, title: 'Quadratic Equations', status: 'in-progress', firstTime: false,
            practiceCompleted: 8, practiceTotal: 20, mockScore: 68, mockAttempts: 1,
            topics: [
                { name: 'Solving by Factorisation', learning: 'Completed', practice: '3/5', mockTest: '—', progress: 60 },
                { name: 'Quadratic Formula', learning: 'In Progress', practice: '2/5', mockTest: '—', progress: 40 },
                { name: 'Nature of Roots', learning: 'Not Started', practice: '0/5', mockTest: '—', progress: 0 },
                { name: 'Word Problems', learning: 'Not Started', practice: '0/5', mockTest: '—', progress: 0 },
            ],
        },
        {
            id: 4, title: 'Arithmetic Progressions', status: 'not-started', firstTime: false,
            practiceCompleted: 0, practiceTotal: 15, mockScore: null, mockAttempts: 0,
            topics: [
                { name: 'nth Term of AP', learning: 'Not Started', practice: '0/5', mockTest: '—', progress: 0 },
                { name: 'Sum of n Terms', learning: 'Not Started', practice: '0/5', mockTest: '—', progress: 0 },
                { name: 'Applications of AP', learning: 'Not Started', practice: '0/5', mockTest: '—', progress: 0 },
            ],
        },
        {
            id: 5, title: 'Triangles', status: 'not-started', firstTime: false,
            practiceCompleted: 0, practiceTotal: 15, mockScore: null, mockAttempts: 0,
            topics: [
                { name: 'Basic Proportionality Theorem', learning: 'Not Started', practice: '0/5', mockTest: '—', progress: 0 },
                { name: 'Pythagoras Theorem', learning: 'Not Started', practice: '0/5', mockTest: '—', progress: 0 },
            ],
        },
        {
            id: 6, title: 'Trigonometry', status: 'not-started', firstTime: false,
            practiceCompleted: 0, practiceTotal: 12, mockScore: null, mockAttempts: 0,
            topics: [
                { name: 'Standard Angle Values', learning: 'Not Started', practice: '0/4', mockTest: '—', progress: 0 },
                { name: 'Trigonometric Identities', learning: 'Not Started', practice: '0/4', mockTest: '—', progress: 0 },
            ],
        },
    ],
    science: [
        {
            id: 1, title: 'Chemical Reactions & Equations', status: 'in-progress', firstTime: false,
            practiceCompleted: 4, practiceTotal: 15, mockScore: null, mockAttempts: 0,
            topics: [
                { name: 'Types of Chemical Reactions', learning: 'In Progress', practice: '2/5', mockTest: '—', progress: 35 },
                { name: 'Balancing Chemical Equations', learning: 'Not Started', practice: '0/5', mockTest: '—', progress: 0 },
                { name: 'Effects of Oxidation', learning: 'Not Started', practice: '0/5', mockTest: '—', progress: 0 },
            ],
        },
        {
            id: 2, title: 'Acids, Bases & Salts', status: 'not-started', firstTime: false,
            practiceCompleted: 0, practiceTotal: 15, mockScore: null, mockAttempts: 0,
            topics: [
                { name: 'Properties of Acids and Bases', learning: 'Not Started', practice: '0/5', mockTest: '—', progress: 0 },
                { name: 'pH Scale', learning: 'Not Started', practice: '0/5', mockTest: '—', progress: 0 },
            ],
        },
        {
            id: 3, title: 'Metals and Non-Metals', status: 'not-started', firstTime: false,
            practiceCompleted: 0, practiceTotal: 12, mockScore: null, mockAttempts: 0,
            topics: [],
        },
        {
            id: 4, title: 'Life Processes', status: 'not-started', firstTime: false,
            practiceCompleted: 0, practiceTotal: 14, mockScore: null, mockAttempts: 0,
            topics: [],
        },
        {
            id: 5, title: 'Control & Coordination', status: 'not-started', firstTime: false,
            practiceCompleted: 0, practiceTotal: 12, mockScore: null, mockAttempts: 0,
            topics: [],
        },
    ],
    english: [
        {
            id: 1, title: 'Reading Comprehension', status: 'completed', firstTime: true,
            practiceCompleted: 15, practiceTotal: 15, mockScore: 88, mockAttempts: 2,
            topics: [
                { name: 'Unseen Passages', learning: 'Completed', practice: '5/5', mockTest: '88%', progress: 92 },
                { name: 'Vocabulary in Context', learning: 'Completed', practice: '5/5', mockTest: '—', progress: 85 },
                { name: 'Inference & Tone', learning: 'Completed', practice: '5/5', mockTest: '—', progress: 88 },
            ],
        },
        {
            id: 2, title: 'Grammar — Parts of Speech', status: 'completed', firstTime: true,
            practiceCompleted: 14, practiceTotal: 15, mockScore: 82, mockAttempts: 1,
            topics: [
                { name: 'Nouns & Pronouns', learning: 'Completed', practice: '5/5', mockTest: '—', progress: 90 },
                { name: 'Verbs & Tenses', learning: 'Completed', practice: '5/5', mockTest: '82%', progress: 80 },
                { name: 'Adjectives & Adverbs', learning: 'Completed', practice: '4/5', mockTest: '—', progress: 75 },
            ],
        },
        {
            id: 3, title: 'Writing Skills', status: 'completed', firstTime: true,
            practiceCompleted: 12, practiceTotal: 12, mockScore: 79, mockAttempts: 1,
            topics: [
                { name: 'Formal Letters', learning: 'Completed', practice: '4/4', mockTest: '79%', progress: 80 },
                { name: 'Essay Writing', learning: 'Completed', practice: '4/4', mockTest: '—', progress: 82 },
                { name: 'Notice & Poster', learning: 'Completed', practice: '4/4', mockTest: '—', progress: 76 },
            ],
        },
        {
            id: 4, title: 'Literature — Prose', status: 'in-progress', firstTime: false,
            practiceCompleted: 5, practiceTotal: 12, mockScore: null, mockAttempts: 0,
            topics: [
                { name: 'The Last Lesson', learning: 'Completed', practice: '3/4', mockTest: '—', progress: 65 },
                { name: 'Lost Spring', learning: 'In Progress', practice: '2/4', mockTest: '—', progress: 40 },
                { name: 'Deep Water', learning: 'Not Started', practice: '0/4', mockTest: '—', progress: 0 },
            ],
        },
        {
            id: 5, title: 'Literature — Poetry', status: 'not-started', firstTime: false,
            practiceCompleted: 0, practiceTotal: 10, mockScore: null, mockAttempts: 0,
            topics: [],
        },
    ],
    hindi: [
        {
            id: 1, title: 'गद्य — Prose', status: 'completed', firstTime: true,
            practiceCompleted: 12, practiceTotal: 12, mockScore: 80, mockAttempts: 2,
            topics: [
                { name: 'Surdas ke Pad', learning: 'Completed', practice: '4/4', mockTest: '80%', progress: 85 },
                { name: 'Ram Lakshman Parshuram', learning: 'Completed', practice: '4/4', mockTest: '—', progress: 78 },
                { name: 'Utsah / At Nahi Rahi Hai', learning: 'Completed', practice: '4/4', mockTest: '—', progress: 82 },
            ],
        },
        {
            id: 2, title: 'पद्य — Poetry', status: 'completed', firstTime: false,
            practiceCompleted: 10, practiceTotal: 12, mockScore: 74, mockAttempts: 1,
            topics: [
                { name: 'Yeh Danturit Muskaan', learning: 'Completed', practice: '4/4', mockTest: '74%', progress: 72 },
                { name: 'Chhaya Mat Chhuna', learning: 'Completed', practice: '3/4', mockTest: '—', progress: 68 },
                { name: 'Kanyadan', learning: 'Completed', practice: '3/4', mockTest: '—', progress: 70 },
            ],
        },
        {
            id: 3, title: 'व्याकरण — Grammar', status: 'in-progress', firstTime: false,
            practiceCompleted: 7, practiceTotal: 15, mockScore: null, mockAttempts: 0,
            topics: [
                { name: 'Vachya (Voice)', learning: 'Completed', practice: '3/5', mockTest: '—', progress: 55 },
                { name: 'Ras (Sentiment)', learning: 'In Progress', practice: '2/5', mockTest: '—', progress: 35 },
                { name: 'Shabdalankar', learning: 'Not Started', practice: '0/5', mockTest: '—', progress: 0 },
            ],
        },
        {
            id: 4, title: 'निबंध — Essay Writing', status: 'not-started', firstTime: false,
            practiceCompleted: 0, practiceTotal: 10, mockScore: null, mockAttempts: 0,
            topics: [],
        },
    ],
    social: [
        {
            id: 1, title: 'Power Sharing — Civics', status: 'completed', firstTime: true,
            practiceCompleted: 15, practiceTotal: 15, mockScore: 78, mockAttempts: 2,
            topics: [
                { name: 'Belgium & Sri Lanka Case Study', learning: 'Completed', practice: '5/5', mockTest: '78%', progress: 80 },
                { name: 'Forms of Power Sharing', learning: 'Completed', practice: '5/5', mockTest: '—', progress: 75 },
                { name: 'Why is Power Sharing Desirable', learning: 'Completed', practice: '5/5', mockTest: '—', progress: 77 },
            ],
        },
        {
            id: 2, title: 'Nationalism in India', status: 'in-progress', firstTime: false,
            practiceCompleted: 5, practiceTotal: 15, mockScore: 60, mockAttempts: 1,
            topics: [
                { name: 'Non-Cooperation Movement', learning: 'In Progress', practice: '3/5', mockTest: '60%', progress: 50 },
                { name: 'Civil Disobedience Movement', learning: 'Not Started', practice: '0/5', mockTest: '—', progress: 0 },
                { name: 'Sense of Collective Belonging', learning: 'Not Started', practice: '2/5', mockTest: '—', progress: 20 },
            ],
        },
        {
            id: 3, title: 'Resources & Development', status: 'not-started', firstTime: false,
            practiceCompleted: 0, practiceTotal: 12, mockScore: null, mockAttempts: 0,
            topics: [],
        },
        {
            id: 4, title: 'Development — Economics', status: 'not-started', firstTime: false,
            practiceCompleted: 0, practiceTotal: 12, mockScore: null, mockAttempts: 0,
            topics: [],
        },
        {
            id: 5, title: 'Money & Credit', status: 'not-started', firstTime: false,
            practiceCompleted: 0, practiceTotal: 10, mockScore: null, mockAttempts: 0,
            topics: [],
        },
    ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const statusConfig = {
    'completed': { label: 'Completed', color: COLORS.green, bg: `${COLORS.green}15`, dot: COLORS.green },
    'in-progress': { label: 'In Progress', color: COLORS.blue, bg: `${COLORS.blue}15`, dot: COLORS.blue },
    'not-started': { label: 'Not Started', color: COLORS.textMuted, bg: COLORS.divider, dot: COLORS.border },
};

// ─── Mini Score Bar ───────────────────────────────────────────────────────────
function MiniBar({ label, value, color }) {
    return (
        <Box sx={{ mb: 0.6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.3 }}>
                <Typography sx={{ fontSize: '0.68rem', color: COLORS.textSecondary, fontWeight: 500 }}>{label}</Typography>
                <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color }}>{value}%</Typography>
            </Box>
            <LinearProgress
                variant="determinate" value={value}
                sx={{
                    height: 5, borderRadius: 4, background: COLORS.divider,
                    '& .MuiLinearProgress-bar': { background: color, borderRadius: 4 },
                }}
            />
        </Box>
    );
}

// ─── Subject Card (inside a quadrant) ────────────────────────────────────────
function SubjectCard({ subject, accentColor, onSelect }) {
    const s = subjectMap[subject];
    const chPct = Math.round((s.completedChapters / s.totalChapters) * 100);
    return (
        <Box
            onClick={() => onSelect(subject)}
            sx={{
                p: 1.5, borderRadius: '12px', cursor: 'pointer',
                background: '#fff',
                border: `1.5px solid ${COLORS.border}`,
                transition: 'all 0.2s',
                '&:hover': {
                    border: `1.5px solid ${s.color}`,
                    boxShadow: `0 4px 16px ${s.color}20`,
                    transform: 'translateY(-2px)',
                },
            }}
        >
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.2 }}>
                <Box sx={{
                    width: 28, height: 28, borderRadius: '8px',
                    background: `${s.color}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.9rem', flexShrink: 0,
                }}>{s.icon}</Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: COLORS.textPrimary, lineHeight: 1.2 }}>
                        {s.name}
                    </Typography>
                    <Typography sx={{ fontSize: '0.62rem', color: COLORS.textMuted }}>
                        {s.completedChapters}/{s.totalChapters} chapters done
                    </Typography>
                </Box>
                <Box sx={{
                    width: 7, height: 7, borderRadius: '50%', background: accentColor, flexShrink: 0,
                }} />
            </Box>

            {/* Bars */}
            <MiniBar label="Score" value={s.score} color={s.color} />
            <MiniBar label="Practice" value={s.practice} color={s.color} />

            {/* Chapter progress */}
            <Box sx={{
                mt: 1, display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', gap: 1,
            }}>
                <LinearProgress
                    variant="determinate" value={chPct}
                    sx={{
                        flexGrow: 1, height: 4, borderRadius: 4, background: COLORS.divider,
                        '& .MuiLinearProgress-bar': { background: accentColor, borderRadius: 4 },
                    }}
                />
                <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, color: accentColor, flexShrink: 0 }}>
                    {chPct}%
                </Typography>
            </Box>

            <Box sx={{ mt: 1.2, textAlign: 'right' }}>
                <Typography sx={{
                    fontSize: '0.62rem', color: s.color, fontWeight: 600,
                    letterSpacing: 0.3,
                }}>
                    View Roadmap →
                </Typography>
            </Box>
        </Box>
    );
}

// ─── Matrix Quadrant ─────────────────────────────────────────────────────────
function MatrixQuadrant({ def, onSelect }) {
    return (
        <Box sx={{
            p: 2, borderRadius: '16px',
            background: def.bgColor,
            border: `1.5px solid ${def.borderColor}`,
            height: '100%',
            display: 'flex', flexDirection: 'column',
        }}>
            {/* Quadrant Header */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1.5 }}>
                <Box sx={{
                    width: 32, height: 32, borderRadius: '10px',
                    background: `${def.accentColor}20`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem', flexShrink: 0, mt: 0.1,
                }}>
                    {def.icon}
                </Box>
                <Box>
                    <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: COLORS.textPrimary }}>
                        {def.label}
                    </Typography>
                    <Typography sx={{ fontSize: '0.67rem', color: def.tagText, fontWeight: 600 }}>
                        {def.desc}
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ mb: 1.5, borderColor: `${def.accentColor}20` }} />

            {/* Subject cards */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1 }}>
                {def.subjectIds.map(sid => (
                    <SubjectCard key={sid} subject={sid} accentColor={def.accentColor} onSelect={onSelect} />
                ))}
            </Box>

            {/* Advice tag */}
            <Box sx={{
                mt: 1.5, px: 1.2, py: 0.8, borderRadius: '8px',
                background: `${def.accentColor}0D`,
                border: `1px solid ${def.accentColor}20`,
            }}>
                <Typography sx={{ fontSize: '0.67rem', color: def.tagText, lineHeight: 1.45 }}>
                    💡 {def.advice}
                </Typography>
            </Box>
        </Box>
    );
}

// ─── Subject Health Matrix View ───────────────────────────────────────────────
function SubjectMatrixView({ onSelectSubject }) {
    return (
        <Box>
            {/* Page Header */}
            <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                    <Box sx={{
                        width: 36, height: 36, borderRadius: '10px',
                        background: `${COLORS.blue}15`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.1rem',
                    }}>
                        🧩
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: COLORS.textPrimary }}>
                            Subject Health Matrix
                        </Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: COLORS.textSecondary }}>
                            Assess where you stand — and where to focus next
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Axis labels + 2×2 Grid */}
            <Box sx={{ position: 'relative' }}>

                {/* Column axis headers */}
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 1, ml: '2px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.8 }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.green }} />
                        <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: COLORS.textSecondary, letterSpacing: 1, textTransform: 'uppercase' }}>
                            High Practice
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.8 }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.textMuted }} />
                        <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: COLORS.textSecondary, letterSpacing: 1, textTransform: 'uppercase' }}>
                            Low Practice
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 0 }}>
                    {/* Row axis labels — vertical */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', pr: 1.5, width: 28 }}>
                        {['High Score', 'Low Score'].map(label => (
                            <Typography key={label} sx={{
                                fontSize: '0.64rem', fontWeight: 700, color: COLORS.textSecondary,
                                letterSpacing: 1, textTransform: 'uppercase',
                                writingMode: 'vertical-rl', textOrientation: 'mixed',
                                transform: 'rotate(180deg)',
                                py: 2,
                            }}>
                                {label}
                            </Typography>
                        ))}
                    </Box>

                    {/* 2×2 quadrants */}
                    <Box sx={{ flexGrow: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                        {matrixDef.map(def => (
                            <MatrixQuadrant key={def.key} def={def} onSelect={onSelectSubject} />
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* Legend */}
            <Box sx={{
                mt: 2.5, p: 2, borderRadius: '12px',
                background: COLORS.bgWarm, border: `1px solid ${COLORS.border}`,
                display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2,
            }}>
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: COLORS.textSecondary, mr: 1 }}>
                    LEGEND
                </Typography>
                {[
                    { icon: '📊', label: 'Score = Assessment accuracy across all attempts' },
                    { icon: '📝', label: 'Practice = Volume of questions attempted' },
                ].map(item => (
                    <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                        <Typography sx={{ fontSize: '0.75rem' }}>{item.icon}</Typography>
                        <Typography sx={{ fontSize: '0.68rem', color: COLORS.textSecondary }}>{item.label}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

// ─── Practice Questions Modal ─────────────────────────────────────────────────
function PracticeModal({ chapter, subjectColor, open, onClose }) {
    if (!chapter) return null;
    const pct = Math.round((chapter.practiceCompleted / chapter.practiceTotal) * 100);

    // Mock attempt data
    const attempts = [
        { label: 'Attempt 1', pct: 45 },
        { label: 'Attempt 2', pct: 55 },
        { label: 'Attempt 3', pct: pct },
    ];
    const retentionScore = 70;
    const errorTypes = [
        { label: 'Concept Errors', count: 6, icon: '❌', color: COLORS.amber },
        { label: 'Calculation Errors', count: 3, icon: '⚠️', color: COLORS.yellow },
        { label: 'Careless Mistakes', count: 1, icon: '⚠️', color: COLORS.blue },
    ];
    const totalErrors = errorTypes.reduce((s, e) => s + e.count, 0);

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '92vw', sm: 520 }, maxHeight: '85vh', overflowY: 'auto',
                background: '#fff', borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
                p: 3,
            }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2.5 }}>
                    <Box>
                        <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: COLORS.textPrimary }}>
                            Practice Progress
                        </Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: COLORS.textSecondary, mt: 0.2 }}>
                            {chapter.title} · {chapter.practiceCompleted}/{chapter.practiceTotal} questions attempted
                        </Typography>
                    </Box>
                    <IconButton size="small" onClick={onClose} sx={{ color: COLORS.textSecondary }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                    </IconButton>
                </Box>

                {/* Section 1: Attempt Progression */}
                <Box sx={{ mb: 2.5, p: 2, borderRadius: '12px', background: `${subjectColor}07`, border: `1px solid ${subjectColor}25` }}>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: COLORS.textSecondary, letterSpacing: 0.8, textTransform: 'uppercase', mb: 1.5 }}>
                        📈 Progression Across Attempts
                    </Typography>
                    {attempts.map((a, i) => (
                        <Box key={a.label} sx={{ mb: i < attempts.length - 1 ? 1.2 : 0 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: COLORS.textPrimary }}>{a.label}</Typography>
                                    {i === attempts.length - 1 && (
                                        <Chip label="Latest" size="small" sx={{ height: 16, fontSize: '0.58rem', fontWeight: 700, background: `${subjectColor}18`, color: subjectColor, '& .MuiChip-label': { px: 0.8 } }} />
                                    )}
                                    {i > 0 && a.pct > attempts[i - 1].pct && (
                                        <Typography sx={{ fontSize: '0.65rem', color: COLORS.green, fontWeight: 700 }}>↑ +{a.pct - attempts[i - 1].pct}%</Typography>
                                    )}
                                </Box>
                                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: subjectColor }}>{a.pct}%</Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate" value={a.pct}
                                sx={{
                                    height: 8, borderRadius: 4, background: COLORS.divider,
                                    '& .MuiLinearProgress-bar': {
                                        background: i === attempts.length - 1
                                            ? `linear-gradient(90deg, ${subjectColor}, ${subjectColor}CC)`
                                            : `${subjectColor}80`,
                                        borderRadius: 4,
                                    },
                                }}
                            />
                        </Box>
                    ))}
                </Box>

                {/* Section 2: Retention Score */}
                <Box sx={{ mb: 2.5, p: 2, borderRadius: '12px', background: COLORS.bgWarm, border: `1px solid ${COLORS.border}` }}>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: COLORS.textSecondary, letterSpacing: 0.8, textTransform: 'uppercase', mb: 1.2 }}>
                        🧠 Retention Score
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}>
                            <svg width={64} height={64} style={{ transform: 'rotate(-90deg)' }}>
                                <circle cx={32} cy={32} r={26} fill="none" stroke={COLORS.divider} strokeWidth={8} />
                                <circle cx={32} cy={32} r={26} fill="none" stroke={COLORS.green}
                                    strokeWidth={8}
                                    strokeDasharray={`${(retentionScore / 100) * 163} 163`}
                                    strokeLinecap="round" />
                            </svg>
                            <Typography sx={{
                                position: 'absolute', top: '50%', left: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontSize: '0.8rem', fontWeight: 800, color: COLORS.green,
                            }}>
                                {retentionScore}%
                            </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: COLORS.textPrimary, mb: 0.4 }}>
                                Re-attempt after a gap
                            </Typography>
                            <Typography sx={{ fontSize: '0.72rem', color: COLORS.textSecondary, lineHeight: 1.5 }}>
                                You forgot 3/10 previously correct questions when revisited after 2–5 days.
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Section 3: Error Type Breakdown */}
                <Box sx={{ p: 2, borderRadius: '12px', background: COLORS.bgWarm, border: `1px solid ${COLORS.border}` }}>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: COLORS.textSecondary, letterSpacing: 0.8, textTransform: 'uppercase', mb: 1.5 }}>
                        🔍 Error Type Breakdown
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {errorTypes.map(e => (
                            <Box key={e.label}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.4 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                                        <Typography sx={{ fontSize: '0.8rem' }}>{e.icon}</Typography>
                                        <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: COLORS.textPrimary }}>{e.label}</Typography>
                                    </Box>
                                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: e.color }}>{e.count} errors</Typography>
                                </Box>
                                <LinearProgress
                                    variant="determinate" value={(e.count / totalErrors) * 100}
                                    sx={{
                                        height: 7, borderRadius: 4, background: COLORS.divider,
                                        '& .MuiLinearProgress-bar': { background: e.color, borderRadius: 4 },
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{ mt: 1.5, p: 1, borderRadius: '8px', background: `${COLORS.amber}0D`, border: `1px solid ${COLORS.amber}25` }}>
                        <Typography sx={{ fontSize: '0.68rem', color: COLORS.amberDark, fontWeight: 600 }}>
                            💡 Concept errors are highest — revisit the theory before practicing more.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}

// ─── Mock Test Modal ──────────────────────────────────────────────────────────
function MockTestModal({ chapter, subjectColor, open, onClose }) {
    if (!chapter) return null;

    const mockAttempts = [
        { label: 'Test 1', pct: 62 },
        { label: 'Test 2', pct: 68 },
        { label: 'Test 3', pct: chapter.mockScore || 72 },
    ].slice(0, chapter.mockAttempts > 0 ? chapter.mockAttempts : 1);

    const avgTime = 2.5;
    const retentionScore = 70;
    const weakAreas = ['Quadratic Formula', 'Word Problems'];

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '92vw', sm: 540 }, maxHeight: '88vh', overflowY: 'auto',
                background: '#fff', borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
                p: 3,
            }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2.5 }}>
                    <Box>
                        <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: COLORS.textPrimary }}>
                            Mock Test Analysis
                        </Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: COLORS.textSecondary, mt: 0.2 }}>
                            {chapter.title} · {chapter.mockAttempts} attempt{chapter.mockAttempts !== 1 ? 's' : ''} · Best: {chapter.mockScore}%
                        </Typography>
                    </Box>
                    <IconButton size="small" onClick={onClose} sx={{ color: COLORS.textSecondary }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                    </IconButton>
                </Box>

                {/* Section 1: Multi-Attempt Trend */}
                <Box sx={{ mb: 2.5, p: 2, borderRadius: '12px', background: `${subjectColor}07`, border: `1px solid ${subjectColor}25` }}>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: COLORS.textSecondary, letterSpacing: 0.8, textTransform: 'uppercase', mb: 1.5 }}>
                        📊 Mock Test Performance Trend
                    </Typography>
                    {mockAttempts.map((a, i) => (
                        <Box key={a.label} sx={{ mb: i < mockAttempts.length - 1 ? 1.2 : 0 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: COLORS.textPrimary }}>{a.label}</Typography>
                                    {i > 0 && a.pct > mockAttempts[i - 1].pct && (
                                        <Typography sx={{ fontSize: '0.65rem', color: COLORS.green, fontWeight: 700 }}>↑ +{a.pct - mockAttempts[i - 1].pct}%</Typography>
                                    )}
                                </Box>
                                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: subjectColor }}>{a.pct}%</Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={a.pct}
                                sx={{
                                    height: 8, borderRadius: 4, background: COLORS.divider,
                                    '& .MuiLinearProgress-bar': {
                                        background: i === mockAttempts.length - 1
                                            ? `linear-gradient(90deg, ${subjectColor}, ${subjectColor}CC)`
                                            : `${subjectColor}70`,
                                        borderRadius: 4,
                                    },
                                }}
                            />
                        </Box>
                    ))}
                </Box>

                {/* Section 2: Time Efficiency */}
                <Box sx={{ mb: 2.5, p: 2, borderRadius: '12px', background: `${COLORS.amber}08`, border: `1px solid ${COLORS.amber}30` }}>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: COLORS.textSecondary, letterSpacing: 0.8, textTransform: 'uppercase', mb: 1.2 }}>
                        ⏱️ Time Efficiency
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                            width: 64, height: 64, borderRadius: '14px', flexShrink: 0,
                            background: `${COLORS.amber}15`,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', color: COLORS.amber, lineHeight: 1 }}>
                                {avgTime}
                            </Typography>
                            <Typography sx={{ fontSize: '0.6rem', color: COLORS.amberDark, fontWeight: 600 }}>min/Q</Typography>
                        </Box>
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.4 }}>
                                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: COLORS.amber }}>
                                    ⚠️ Slower than recommended
                                </Typography>
                            </Box>
                            <Typography sx={{ fontSize: '0.72rem', color: COLORS.textSecondary, lineHeight: 1.5 }}>
                                Avg {avgTime} min/question vs target 1.5 min/question. Practice timed sets to build speed.
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Section 3: Retention */}
                <Box sx={{ mb: 2.5, p: 2, borderRadius: '12px', background: COLORS.bgWarm, border: `1px solid ${COLORS.border}` }}>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: COLORS.textSecondary, letterSpacing: 0.8, textTransform: 'uppercase', mb: 1.2 }}>
                        🧠 Retention Score
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                            width: 64, height: 64, borderRadius: '14px', flexShrink: 0,
                            background: `${COLORS.green}15`,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', color: COLORS.green, lineHeight: 1 }}>
                                {retentionScore}%
                            </Typography>
                            <Typography sx={{ fontSize: '0.58rem', color: COLORS.greenDark, fontWeight: 600 }}>retained</Typography>
                        </Box>
                        <Typography sx={{ fontSize: '0.72rem', color: COLORS.textSecondary, lineHeight: 1.55 }}>
                            You forgot 3/10 previously correct questions when retested after a 3-day gap.
                        </Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={retentionScore}
                        sx={{
                            mt: 1.5, height: 6, borderRadius: 4, background: COLORS.divider,
                            '& .MuiLinearProgress-bar': { background: COLORS.green, borderRadius: 4 },
                        }}
                    />
                </Box>

                {/* Section 4: Weak Areas */}
                <Box sx={{ mb: 2.5, p: 2, borderRadius: '12px', background: `${COLORS.amber}07`, border: `1px solid ${COLORS.amber}25` }}>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: COLORS.textSecondary, letterSpacing: 0.8, textTransform: 'uppercase', mb: 1.2 }}>
                        🎯 Weak Areas (Auto-detected)
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                        {weakAreas.map(area => (
                            <Box key={area} sx={{
                                display: 'flex', alignItems: 'center', gap: 1,
                                p: '6px 10px', borderRadius: '8px',
                                background: `${COLORS.amber}10`, border: `1px solid ${COLORS.amber}25`,
                            }}>
                                <Typography sx={{ fontSize: '0.78rem' }}>❌</Typography>
                                <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: COLORS.textPrimary }}>{area}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Section 5: Retake Readiness */}
                <Box sx={{ p: 2, borderRadius: '12px', background: `${subjectColor}07`, border: `1px solid ${subjectColor}25` }}>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: COLORS.textSecondary, letterSpacing: 0.8, textTransform: 'uppercase', mb: 1 }}>
                        📌 Retake Readiness
                    </Typography>
                    <Typography sx={{ fontSize: '0.78rem', color: COLORS.textPrimary, fontWeight: 600, mb: 0.6 }}>
                        Suggested: Improve weak topics before retaking
                    </Typography>
                    <Typography sx={{ fontSize: '0.72rem', color: COLORS.textSecondary, lineHeight: 1.5, mb: 1.5 }}>
                        Address Quadratic Formula and Word Problems first. Your performance trend is positive — one more focused attempt should push you above 75%.
                    </Typography>
                    <Button
                        variant="contained" size="small" fullWidth
                        sx={{
                            background: `linear-gradient(135deg, ${subjectColor}, ${subjectColor}CC)`,
                            color: '#fff', textTransform: 'none', fontWeight: 700,
                            borderRadius: '10px', boxShadow: `0 4px 12px ${subjectColor}35`,
                        }}
                    >
                        Retake Mock Test
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

// ─── Chapter Detail Panel ─────────────────────────────────────────────────────
function ChapterDetailPanel({ chapter, subjectColor, onPracticeOpen, onMockOpen }) {
    if (!chapter) {
        return (
            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', height: '100%', p: 4, textAlign: 'center',
            }}>
                <Typography sx={{ fontSize: '2.5rem', mb: 1.5 }}>👆</Typography>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: COLORS.textSecondary }}>
                    Select a chapter
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: COLORS.textMuted, mt: 0.5 }}>
                    Click any chapter on the left to see its details here
                </Typography>
            </Box>
        );
    }

    const sc = statusConfig[chapter.status];
    const pct = Math.round((chapter.practiceCompleted / chapter.practiceTotal) * 100);

    return (
        <Box sx={{ p: { xs: 2, md: 2.5 }, height: '100%', overflowY: 'auto' }}>
            {/* Chapter title */}
            <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Chip
                        label={sc.label}
                        size="small"
                        sx={{ height: 22, fontSize: '0.65rem', fontWeight: 700, background: sc.bg, color: sc.color }}
                    />
                </Box>
                <Typography sx={{ fontSize: '1.05rem', fontWeight: 800, color: COLORS.textPrimary, lineHeight: 1.3 }}>
                    {chapter.title}
                </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* 3 info blocks: Learning / Practice / Mock */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>

                {/* Learning */}
                <Box sx={{
                    p: 1.5, borderRadius: '12px',
                    background: COLORS.bgWarm, border: `1px solid ${COLORS.border}`,
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.8 }}>
                        <Typography sx={{ fontSize: '1rem' }}>📚</Typography>
                        <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: COLORS.textPrimary }}>Learning</Typography>
                        <Box sx={{ ml: 'auto' }}>
                            <Chip
                                label={chapter.firstTime ? 'First Time' : 'Revisiting'}
                                size="small"
                                sx={{
                                    height: 18, fontSize: '0.58rem', fontWeight: 700,
                                    background: chapter.firstTime ? `${COLORS.blue}12` : `${COLORS.purple}12`,
                                    color: chapter.firstTime ? COLORS.blue : COLORS.purple,
                                }}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{
                            width: 26, height: 26, borderRadius: '7px',
                            background: chapter.status === 'completed' ? `${COLORS.green}18` : chapter.status === 'in-progress' ? `${COLORS.blue}18` : COLORS.divider,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.85rem',
                        }}>
                            {chapter.status === 'completed' ? '✅' : chapter.status === 'in-progress' ? '📖' : '🔒'}
                        </Box>
                        <Typography sx={{ fontSize: '0.75rem', color: COLORS.textSecondary }}>
                            {chapter.status === 'completed'
                                ? 'Chapter reading complete'
                                : chapter.status === 'in-progress'
                                    ? 'Currently studying this chapter'
                                    : 'Not started yet'}
                        </Typography>
                    </Box>
                </Box>

                {/* Practice */}
                <Box sx={{
                    p: 1.5, borderRadius: '12px',
                    background: COLORS.bgWarm, border: `1px solid ${COLORS.border}`,
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography sx={{ fontSize: '1rem' }}>✏️</Typography>
                        <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: COLORS.textPrimary }}>Practice Questions</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        {/* Donut mini */}
                        <Box sx={{ position: 'relative', width: 52, height: 52, flexShrink: 0 }}>
                            <svg width={52} height={52} style={{ transform: 'rotate(-90deg)' }}>
                                <circle cx={26} cy={26} r={20} fill="none" stroke={COLORS.divider} strokeWidth={6} />
                                <circle cx={26} cy={26} r={20} fill="none" stroke={subjectColor}
                                    strokeWidth={6}
                                    strokeDasharray={`${(pct / 100) * 125.6} 125.6`}
                                    strokeLinecap="round" />
                            </svg>
                            <Typography sx={{
                                position: 'absolute', top: '50%', left: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontSize: '0.72rem', fontWeight: 800, color: subjectColor,
                            }}>
                                {pct}%
                            </Typography>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: COLORS.textPrimary, lineHeight: 1 }}>
                                {chapter.practiceCompleted}/{chapter.practiceTotal}
                            </Typography>
                            <Typography sx={{ fontSize: '0.68rem', color: COLORS.textSecondary }}>Completed</Typography>
                            <Typography sx={{ fontSize: '0.65rem', color: COLORS.textMuted, mt: 0.3 }}>Adaptive difficulty</Typography>
                        </Box>
                    </Box>
                    <Button
                        variant="outlined" size="small" fullWidth
                        onClick={onPracticeOpen}
                        disabled={chapter.practiceCompleted === 0}
                        sx={{
                            color: subjectColor, borderColor: `${subjectColor}50`,
                            textTransform: 'none', fontWeight: 700, fontSize: '0.72rem',
                            borderRadius: '8px',
                            '&:hover': { borderColor: subjectColor, background: `${subjectColor}08` },
                        }}
                    >
                        {chapter.practiceCompleted > 0 ? 'View Practice Report →' : 'No attempts yet'}
                    </Button>
                </Box>

                {/* Mock Test */}
                <Box sx={{
                    p: 1.5, borderRadius: '12px',
                    background: COLORS.bgWarm, border: `1px solid ${COLORS.border}`,
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography sx={{ fontSize: '1rem' }}>📋</Typography>
                        <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: COLORS.textPrimary }}>Mock Test</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mb: 1, flexWrap: 'wrap' }}>
                        <Box sx={{ textAlign: 'center', minWidth: 60 }}>
                            <Typography sx={{ fontSize: '1.3rem', fontWeight: 800, color: COLORS.textPrimary, lineHeight: 1 }}>
                                {chapter.mockAttempts}
                            </Typography>
                            <Typography sx={{ fontSize: '0.62rem', color: COLORS.textSecondary }}>Attempts</Typography>
                        </Box>
                        {chapter.mockScore !== null && (
                            <Box sx={{ textAlign: 'center', minWidth: 60 }}>
                                <Typography sx={{ fontSize: '1.3rem', fontWeight: 800, color: subjectColor, lineHeight: 1 }}>
                                    {chapter.mockScore}%
                                </Typography>
                                <Typography sx={{ fontSize: '0.62rem', color: COLORS.textSecondary }}>Best Score</Typography>
                            </Box>
                        )}
                    </Box>
                    <Button
                        variant="outlined" size="small" fullWidth
                        onClick={onMockOpen}
                        disabled={chapter.mockAttempts === 0}
                        sx={{
                            color: subjectColor, borderColor: `${subjectColor}50`,
                            textTransform: 'none', fontWeight: 700, fontSize: '0.72rem',
                            borderRadius: '8px',
                            '&:hover': { borderColor: subjectColor, background: `${subjectColor}08` },
                        }}
                    >
                        {chapter.mockAttempts > 0 ? 'View Mock Analysis →' : 'No mock taken yet'}
                    </Button>
                </Box>
            </Box>

            {/* Topics Table */}
            {chapter.topics.length > 0 && (
                <Box>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: COLORS.textSecondary, letterSpacing: 0.8, textTransform: 'uppercase', mb: 1.2 }}>
                        Topics in this Chapter
                    </Typography>
                    <Box sx={{
                        borderRadius: '10px', border: `1px solid ${COLORS.border}`,
                        overflow: 'hidden',
                    }}>
                        {/* Table header */}
                        <Box sx={{
                            display: 'grid', gridTemplateColumns: '1fr 80px 50px 55px',
                            px: 1.5, py: 0.8,
                            background: COLORS.divider,
                        }}>
                            {['Topic', 'Learning', 'Practice', 'Progress'].map(h => (
                                <Typography key={h} sx={{ fontSize: '0.62rem', fontWeight: 700, color: COLORS.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                    {h}
                                </Typography>
                            ))}
                        </Box>
                        {chapter.topics.map((t, i) => (
                            <Box key={t.name} sx={{
                                display: 'grid', gridTemplateColumns: '1fr 80px 50px 55px',
                                px: 1.5, py: 1,
                                borderTop: i > 0 ? `1px solid ${COLORS.divider}` : 'none',
                                alignItems: 'center',
                            }}>
                                <Typography sx={{ fontSize: '0.73rem', color: COLORS.textPrimary, fontWeight: 500, lineHeight: 1.3, pr: 1 }}>
                                    {t.name}
                                </Typography>
                                <Chip label={t.learning} size="small" sx={{
                                    height: 18, fontSize: '0.58rem', fontWeight: 600, maxWidth: 76,
                                    background: t.learning === 'Completed' ? `${COLORS.green}15` : t.learning === 'In Progress' ? `${COLORS.blue}15` : COLORS.divider,
                                    color: t.learning === 'Completed' ? COLORS.greenDark : t.learning === 'In Progress' ? COLORS.blue : COLORS.textMuted,
                                    '& .MuiChip-label': { px: 0.8 },
                                }} />
                                <Typography sx={{ fontSize: '0.72rem', color: COLORS.textSecondary, fontWeight: 600 }}>
                                    {t.practice}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <LinearProgress variant="determinate" value={t.progress}
                                        sx={{
                                            flexGrow: 1, height: 4, borderRadius: 4, background: COLORS.divider,
                                            '& .MuiLinearProgress-bar': { background: subjectColor, borderRadius: 4 },
                                        }}
                                    />
                                    <Typography sx={{ fontSize: '0.58rem', color: subjectColor, fontWeight: 700, flexShrink: 0, minWidth: 24 }}>
                                        {t.progress}%
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
}

// ─── Chapter Node (on the roadmap path) ──────────────────────────────────────
function ChapterNode({ chapter, index, total, isSelected, subjectColor, onSelect, onMoveUp, onMoveDown }) {
    const sc = statusConfig[chapter.status];
    const isFirst = index === 0;
    const isLast = index === total - 1;

    return (
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'stretch', position: 'relative' }}>
            {/* Spine & Node */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 32 }}>
                {/* Connector line above */}
                <Box sx={{ width: 2, flex: isFirst ? '0 0 0px' : '0 0 8px', background: COLORS.border }} />

                {/* Circle node */}
                <Box sx={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                    border: `2.5px solid ${isSelected ? subjectColor : chapter.status === 'completed' ? subjectColor : chapter.status === 'in-progress' ? COLORS.blue : COLORS.border}`,
                    background: isSelected
                        ? `${subjectColor}15`
                        : chapter.status === 'completed'
                            ? `${subjectColor}12`
                            : chapter.status === 'in-progress'
                                ? `${COLORS.blue}10`
                                : COLORS.bgWarm,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                    boxShadow: isSelected ? `0 0 0 3px ${subjectColor}25` : 'none',
                    zIndex: 1,
                }}>
                    {chapter.status === 'completed' ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill={subjectColor}>
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                    ) : chapter.status === 'in-progress' ? (
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.blue }} />
                    ) : (
                        <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: COLORS.textMuted }}>{index + 1}</Typography>
                    )}
                </Box>

                {/* Connector line below */}
                {!isLast && (
                    <Box sx={{
                        width: 2, flexGrow: 1, minHeight: 12,
                        background: chapter.status === 'completed'
                            ? `linear-gradient(180deg, ${subjectColor}60, ${COLORS.border})`
                            : COLORS.border,
                    }} />
                )}
            </Box>

            {/* Chapter card */}
            <Box
                onClick={() => onSelect(chapter)}
                sx={{
                    flexGrow: 1, mb: 1.5, p: 1.5, borderRadius: '12px', cursor: 'pointer',
                    border: `1.5px solid ${isSelected ? subjectColor : COLORS.border}`,
                    background: isSelected ? `${subjectColor}07` : '#fff',
                    transition: 'all 0.2s',
                    '&:hover': {
                        border: `1.5px solid ${subjectColor}`,
                        background: `${subjectColor}05`,
                    },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.4, flexWrap: 'wrap' }}>
                            <Chip label={sc.label} size="small" sx={{
                                height: 18, fontSize: '0.58rem', fontWeight: 700,
                                background: sc.bg, color: sc.color,
                                '& .MuiChip-label': { px: 0.7 },
                            }} />
                            {chapter.status === 'completed' && chapter.mockScore && (
                                <Chip label={`Mock: ${chapter.mockScore}%`} size="small" sx={{
                                    height: 18, fontSize: '0.58rem', fontWeight: 700,
                                    background: `${subjectColor}12`, color: subjectColor,
                                    '& .MuiChip-label': { px: 0.7 },
                                }} />
                            )}
                        </Box>
                        <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: COLORS.textPrimary, lineHeight: 1.3 }}>
                            {chapter.title}
                        </Typography>
                        {chapter.status !== 'not-started' && (
                            <Box sx={{ mt: 0.8, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LinearProgress
                                    variant="determinate"
                                    value={Math.round((chapter.practiceCompleted / chapter.practiceTotal) * 100)}
                                    sx={{
                                        flexGrow: 1, height: 4, borderRadius: 4, background: COLORS.divider,
                                        '& .MuiLinearProgress-bar': { background: subjectColor, borderRadius: 4 },
                                    }}
                                />
                                <Typography sx={{ fontSize: '0.62rem', color: subjectColor, fontWeight: 700, flexShrink: 0 }}>
                                    {chapter.practiceCompleted}/{chapter.practiceTotal}
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    {/* Reorder buttons */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3, flexShrink: 0 }}>
                        <IconButton
                            size="small" onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
                            disabled={isFirst}
                            sx={{ width: 22, height: 22, color: COLORS.textMuted, '&:not(:disabled):hover': { color: subjectColor } }}
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                            </svg>
                        </IconButton>
                        <IconButton
                            size="small" onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
                            disabled={isLast}
                            sx={{ width: 22, height: 22, color: COLORS.textMuted, '&:not(:disabled):hover': { color: subjectColor } }}
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                            </svg>
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

// ─── Roadmap View ─────────────────────────────────────────────────────────────
function RoadmapView({ subjectId, onBack }) {
    const subject = subjectMap[subjectId];
    const initialChapters = initialChaptersData[subjectId] || [];

    const [chapters, setChapters] = useState(initialChapters);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [practiceModalOpen, setPracticeModalOpen] = useState(false);
    const [mockModalOpen, setMockModalOpen] = useState(false);

    const moveChapter = (index, direction) => {
        const next = [...chapters];
        const swapIndex = index + direction;
        if (swapIndex < 0 || swapIndex >= next.length) return;
        [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
        setChapters(next);
        if (selectedChapter?.id === chapters[index].id) setSelectedChapter(next[index]);
    };

    const completedCount = chapters.filter(c => c.status === 'completed').length;
    const overallPct = Math.round((completedCount / chapters.length) * 100);

    return (
        <Box>
            {/* Back + Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                <IconButton
                    onClick={onBack}
                    size="small"
                    sx={{
                        border: `1.5px solid ${COLORS.border}`,
                        borderRadius: '10px', width: 34, height: 34,
                        color: COLORS.textSecondary,
                        '&:hover': { borderColor: subject.color, color: subject.color },
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                    </svg>
                </IconButton>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                    <Box sx={{
                        width: 36, height: 36, borderRadius: '10px',
                        background: `${subject.color}15`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.1rem',
                    }}>
                        {subject.icon}
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: COLORS.textPrimary }}>
                            {subject.name} Roadmap
                        </Typography>
                        <Typography sx={{ fontSize: '0.72rem', color: COLORS.textSecondary }}>
                            {completedCount}/{chapters.length} chapters · {overallPct}% complete
                        </Typography>
                    </Box>
                </Box>

                {/* Overall progress bar */}
                <Box sx={{ flexGrow: 1, maxWidth: 200, display: { xs: 'none', md: 'block' }, ml: 'auto' }}>
                    <LinearProgress variant="determinate" value={overallPct}
                        sx={{
                            height: 8, borderRadius: 4, background: COLORS.divider,
                            '& .MuiLinearProgress-bar': {
                                background: `linear-gradient(90deg, ${subject.color}, ${subject.color}CC)`,
                                borderRadius: 4,
                            },
                        }}
                    />
                    <Typography sx={{ fontSize: '0.62rem', color: COLORS.textSecondary, mt: 0.3, textAlign: 'right' }}>
                        {overallPct}% complete
                    </Typography>
                </Box>
            </Box>

            {/* Reorder hint */}
            <Box sx={{
                display: 'flex', alignItems: 'center', gap: 1,
                p: '8px 14px', borderRadius: '10px', mb: 2,
                background: `${subject.color}08`, border: `1px solid ${subject.color}25`,
            }}>
                <Typography sx={{ fontSize: '0.85rem' }}>↕️</Typography>
                <Typography sx={{ fontSize: '0.7rem', color: subject.color, fontWeight: 600 }}>
                    Reorder chapters using the arrows to set your own study sequence.
                </Typography>
            </Box>

            {/* Two-column layout: Roadmap | Detail */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>

                {/* Left: Chapter path */}
                <Box sx={{
                    width: { xs: '100%', md: '42%' }, flexShrink: 0,
                    overflowY: 'auto', maxHeight: { md: '72vh' },
                    pr: { md: 1 },
                }}>
                    {/* Legend */}
                    <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
                        {[
                            { label: 'Completed', color: subject.color },
                            { label: 'In Progress', color: COLORS.blue },
                            { label: 'Not Started', color: COLORS.textMuted },
                        ].map(l => (
                            <Box key={l.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: l.color }} />
                                <Typography sx={{ fontSize: '0.65rem', color: COLORS.textSecondary }}>{l.label}</Typography>
                            </Box>
                        ))}
                    </Box>

                    {chapters.map((ch, i) => (
                        <ChapterNode
                            key={ch.id}
                            chapter={ch}
                            index={i}
                            total={chapters.length}
                            isSelected={selectedChapter?.id === ch.id}
                            subjectColor={subject.color}
                            onSelect={setSelectedChapter}
                            onMoveUp={() => moveChapter(i, -1)}
                            onMoveDown={() => moveChapter(i, 1)}
                        />
                    ))}
                </Box>

                {/* Right: Chapter detail */}
                <Box sx={{
                    flexGrow: 1,
                    borderRadius: '16px',
                    border: `1.5px solid ${COLORS.border}`,
                    background: '#fff',
                    minHeight: { md: 500 },
                    overflow: 'hidden',
                    position: { md: 'sticky' },
                    top: { md: 16 },
                }}>
                    <ChapterDetailPanel
                        chapter={selectedChapter}
                        subjectColor={subject.color}
                        onPracticeOpen={() => setPracticeModalOpen(true)}
                        onMockOpen={() => setMockModalOpen(true)}
                    />
                </Box>
            </Box>

            {/* Modals */}
            <PracticeModal
                chapter={selectedChapter}
                subjectColor={subject.color}
                open={practiceModalOpen}
                onClose={() => setPracticeModalOpen(false)}
            />
            <MockTestModal
                chapter={selectedChapter}
                subjectColor={subject.color}
                open={mockModalOpen}
                onClose={() => setMockModalOpen(false)}
            />
        </Box>
    );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function S2_SubjectMatrix() {
    const [view, setView] = useState('matrix');       // 'matrix' | 'roadmap'
    const [selectedSubject, setSelectedSubject] = useState(null);

    const handleSelectSubject = (subjectId) => {
        setSelectedSubject(subjectId);
        setView('roadmap');
    };

    const handleBack = () => {
        setView('matrix');
        setSelectedSubject(null);
    };

    // Dynamic subtitle for layout
    const subtitle = view === 'roadmap' && selectedSubject
        ? `Learning Roadmap · ${subjectMap[selectedSubject].name}`
        : 'Grade 10 · NIOS Board · Aarav Singh';

    return (
        <Layout
            role="student"
            title={view === 'matrix' ? 'Subject Health Matrix' : `${subjectMap[selectedSubject]?.name} Roadmap`}
            subtitle={subtitle}
        >
            {view === 'matrix' && (
                <SubjectMatrixView onSelectSubject={handleSelectSubject} />
            )}
            {view === 'roadmap' && selectedSubject && (
                <RoadmapView subjectId={selectedSubject} onBack={handleBack} />
            )}
        </Layout>
    );
}