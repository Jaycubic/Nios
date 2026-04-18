import json
subject_chapters = {
  'math': ['Arithmetic', 'Number Systems', 'Linear Equations', 'Algebra', 'Quadratic Equations', 'Coordinate Geometry', 'Polynomials', 'Trigonometry'],
  'science': ['Our Environment', 'Resource Mgmt', 'Life Processes', 'Magnetic Effects', 'Sources of Energy', 'Acids & Bases', 'Electricity', 'Chemical Reactions'],
  'english': ['Vocabulary', 'Writing Skills', 'Reading Comp.', 'Grammar Rules', 'Lit - Prose', 'Connectors', 'Lit - Poetry', 'Indirect Speech'],
  'hindi': ['Muhavare', 'Reading - Gadya', 'Grammar', 'Lit - Kritika', 'Lit - Padya', 'Unseen Passages', 'Writing - Nibandh', 'Vocabulary'],
  'social': ['Eco - Development', 'Civics - Laws', 'Federalism', 'Nationalism', 'Eco - Sectors', 'History - WW2', 'Geo - Resources', 'Geography - Maps']
}

completed_counts = {'math': 2, 'science': 0, 'english': 3, 'hindi': 2, 'social': 1}

def get_topics(status):
    if status == 'completed':
        return [
            { 'name': 'Topic 1', 'learning': 'Completed', 'practice': '5/5', 'progress': 90 },
            { 'name': 'Topic 2', 'learning': 'Completed', 'practice': '5/5', 'progress': 85 }
        ]
    elif status == 'in-progress':
        return [
            { 'name': 'Topic 1', 'learning': 'Completed', 'practice': '3/5', 'progress': 60 },
            { 'name': 'Topic 2', 'learning': 'In Progress', 'practice': '1/5', 'progress': 20 },
            { 'name': 'Topic 3', 'learning': 'Not Started', 'practice': '0/5', 'progress': 0 }
        ]
    else:
        return [
             { 'name': 'Introductory Concepts', 'learning': 'Not Started', 'practice': '0/5', 'progress': 0 }
        ]

out = 'const initialChaptersData = {\n'
for sub, chapters in subject_chapters.items():
    out += f'    {sub}: [\n'
    comp_c = completed_counts[sub]
    for i, title in enumerate(chapters):
        if i < comp_c:
            status = 'completed'
            prac_comp = 15
            mock_sc = 80
            mock_att = 1
        elif i == comp_c:
            status = 'in-progress'
            prac_comp = 5
            mock_sc = 'null'
            mock_att = 0
        else:
            status = 'not-started'
            prac_comp = 0
            mock_sc = 'null'
            mock_att = 0
        
        topics_str = json.dumps(get_topics(status))
        # Correctly format keys without quotes for JS readability
        topics_str = topics_str.replace('"name"', "name").replace('"learning"', "learning").replace('"practice"', "practice").replace('"progress"', "progress")
        
        out += f'        {{ id: {i+1}, title: "{title}", status: "{status}", firstTime: {"true" if i==0 else "false"}, practiceCompleted: {prac_comp}, practiceTotal: 15, mockScore: {mock_sc}, mockAttempts: {mock_att}, topics: {topics_str} }},\n'
    out += '    ],\n'
out += '};\n'
with open('temp_chaps.js', 'w', encoding='utf-8') as f:
    f.write(out)
