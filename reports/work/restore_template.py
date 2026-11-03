from pathlib import Path
from copy import deepcopy
from zipfile import ZipFile, ZIP_DEFLATED
import ast
from docx import Document
from docx.shared import Inches
from docx.oxml.ns import qn

W = Path(__file__).parent
SOURCE = Path('D:/Download/MiniProject_Report_FSD.docx')
OUT = W.parent / 'StripeSense_MiniProject_Report_FSD_Template.docx'
tree = ast.parse((W/'build_report.py').read_text(encoding='utf-8'))
data = {}
for node in tree.body:
    if isinstance(node, ast.Assign):
        for target in node.targets:
            if isinstance(target, ast.Name) and target.id in ('content','table_data'):
                data[target.id] = ast.literal_eval(node.value)
d = Document(SOURCE)
ps = list(d.paragraphs)

def fill(p, text):
    # Retain the paragraph and its original first run formatting.
    props = deepcopy(p.runs[0]._r.rPr) if p.runs and p.runs[0]._r.rPr is not None else None
    p.clear()
    r = p.add_run(text)
    if props is not None:
        r._r.insert(0, props)

def body(index, text):
    if ps[index].text.startswith('GUIDELINE'):
        # Instructions have a small italic face; answers use the template's
        # own body placeholder run, without changing any style definitions.
        exemplar = deepcopy(ps[26].runs[0]._r.rPr)
        fill(ps[index], text)
        for r in ps[index].runs:
            if r._r.rPr is not None: r._r.remove(r._r.rPr)
            if exemplar is not None: r._r.insert(0, deepcopy(exemplar))
    else:
        fill(ps[index], text)

fill(ps[1], 'StripeSense')
for r in ps[5].runs:
    r.text=r.text.replace('[Student 1 Name – Roll No.]','Yashvardhan Samadhiya – 16010124058').replace('[Student 2 Name – Roll No.]','Amey Salunkhe – 16010124057').replace('[Student 3 Name – Roll No.]','Shrived Deshmukh – 16010124071')
for r in ps[6].runs:
    r.text=r.text.replace('[Faculty Name]','Shruti Javakar')
fill(ps[8], ps[8].text.replace('[Paste Repository URL]','N.A. (publication pending)'))

texts = {
26:'Urine reagent strips contain pads that change colour. Organising strip photographs with patient details and reference comparisons makes records easier to retrieve and review.\n\nStripeSense is a MERN laboratory project that combines a React interface, Express APIs and MongoDB storage. It compares photographed pad colours with a supplied reference profile without a trained machine-learning model. Results are unvalidated colour estimates; users must always consult a doctor.',
29:'Doctors and individuals need to keep strip photographs and results linked to the correct patient. Separate images and notes make retrieval difficult. StripeSense provides private patient records and saved reports in one web application.',
32:'Users sign in, add a patient, upload a ten-pad strip photograph and reference profile, select the pad row and submit it. Axios sends the request to Express. The backend compares colours and saves the image and result in MongoDB for later viewing and printing.',
40:'Included: authentication, patient creation, colour matching, history, reports, deletion and dark mode. Hardware, trained ML, clinical validation, record editing and public deployment are outside the current scope.',
45:'Doctor and individual accounts have private workspaces. Account type changes wording; it does not grant access to another account’s records.',
47:'',50:'MongoDB uses the official Node.js driver; Mongoose is not used.',
57:'Sign in → select patient → upload image/profile → select crop → analyse → save → review report.',
70:'Ownership links each patient and test to a user. Unique email and patient-code indexes prevent duplicates. Sessions have expiry indexes; reports store image and reference snapshots.',
73:'All patient and test routes require a session and enforce account ownership. Patient/test PUT or PATCH routes are not implemented.',
80:'React components manage forms and loading states using hooks. React Router separates public and protected pages. AuthProvider loads the session; RequireAuth redirects signed-out users. Axios sends JSON and multipart requests through /api. ThemeProvider remembers light/dark mode.',
83:'Express validates requests and handles uploads through Multer. Sharp decodes images, samples ten crop regions and compares CIELAB colours using Delta E. Salted scrypt hashes protect passwords. HttpOnly session cookies and ownerId checks restrict access to private records.',
86:'The native MongoDB driver stores users, sessions, patients and tests. insertOne creates records; find/findOne retrieves owned data; deleteOne removes an owned test. Images are embedded in test documents. Patient/test updates are not implemented.',
89:'Missing patient names and invalid crops/profiles are rejected. Duplicate patient codes return 409. Unsupported uploads produce validation errors. Signed-out API requests return 401; other-account reports return 404. The interface displays connection failures and flags near-tied colour matches for review.',
94:'Node.js unit tests cover colour matching and interpretation. Integration tests exercise a real Express server and a temporary MongoDB database. On 30 October 2026, all eight tests passed without skips; npm run build also passed. Browser checks covered navigation, protected routes and themes.',
97:'Recorded automated checks use generated images and temporary data; they do not validate diagnostic accuracy.',
99:'The integration test verifies patient creation, upload, history, saved reports, image retrieval, deletion and account isolation. Database assertions confirm password hashing. MongoDB Compass connects to mongodb://127.0.0.1:27017; the local application database is stripesense. Postman was not used.',
102:'The account, patient and upload-to-report workflows are implemented and tested. Reports display colour categories and Delta E, with a doctor-consultation disclaimer. Public deployment, record editing and clinical validation remain pending.',
107:'N.A. — GitHub repository publication is pending.',
116:'The application runs locally using npm run dev. No public deployment is available.',
121:'',
124:'Amey and Shrived developed the frontend with supporting backend work. Yashvardhan handled the backend, MongoDB integration and supporting Python scripting. Runtime image analysis uses Node.js and Sharp.',
129:'StripeSense integrates React, Axios, Express and MongoDB to manage private patient records and photograph-based colour comparisons. Users can save, retrieve, print and delete reports. Automated tests verify the implemented workflow and account isolation.\n\nThe project meets its MERN integration objective. Colour estimates are not validated medical measurements and cannot determine whether a result is clinically critical. Users must always consult a doctor.',
131:'Add patient/test editing, password reset, email verification, pagination and secure public deployment. Future analysis work could support manufacturer-specific reference charts and varied strip layouts, followed by independent validation before medical use.',
133:'[1] React, “React documentation,” https://react.dev/.\n[2] Express, “Express documentation,” https://expressjs.com/.\n[3] MongoDB, “Node.js driver documentation,” https://www.mongodb.com/docs/drivers/node/current/.',
134:'[4] Axios, “Axios documentation,” https://axios-http.com/docs/intro.\n[5] Sharp, “Sharp documentation,” https://sharp.pixelplumbing.com/.\n[6] Node.js, “Node.js documentation,” https://nodejs.org/api/.',
}
for i in range(35,40): texts[i]=data['content'][i]
for i,text in texts.items(): body(i,text)

# Keep every original heading, table heading, grid, cell style and page break.
rows = [r for h,r in data['table_data']]
rows[2] = [
 ['Frontend','React.js, Axios, Vite','UI, routing and API requests'],
 ['Backend','Node.js + Express.js, Sharp','APIs and colour matching'],
 ['Database','MongoDB + native driver','Storage and indexed queries'],
 ['API/Testing','Node.js test runner','Unit and integration tests'],
 ['Version Control','N.A.','GitHub publication pending'],
 ['Deployment','N.A. (local only)','No public hosting'],
]
rows[9]=rows[9][:3]
rows[10]=[
 ['Yashvardhan Samadhiya\n16010124058','—','Backend; supporting Python script','MongoDB integration','Not separately specified'],
 ['Amey Salunkhe\n16010124057','Frontend','Supporting work','—','Not separately specified'],
 ['Shrived Deshmukh\n16010124071','Frontend','Supporting work','—','Not separately specified'],
]
for table, values in zip(d.tables,rows):
    pattern = deepcopy(table.rows[1]._tr)
    while len(table.rows)<len(values)+1: table._tbl.append(deepcopy(pattern))
    for row, vals in zip(table.rows[1:],values):
        for cell,text in zip(row.cells,vals): fill(cell.paragraphs[0],text)

def pic(index, file, width, caption=None):
    body(index,'')
    ps[index].add_run().add_picture(str(W/file),width=Inches(width))
    if caption: ps[index].add_run('\n'+caption)

pic(55,'architecture.png',6.1,'Figure 1: System architecture')
pic(58,'workflow.png',4.8,'Figure 2: Application workflow')
pic(63,'database.png',5.3)
fill(ps[69],'Figure 3: Database design/schema')
pic(77,'landing.png',5.5,'Figure 4: Landing page')
# Both screenshots belong to 4.1, before the unchanged 4.2 heading.
extra=deepcopy(ps[77]._p)
ps[77]._p.addnext(extra)
from docx.text.paragraph import Paragraph
ep=Paragraph(extra,ps[77]._parent)
fill(ep,'')
ep.add_run().add_picture(str(W/'signin.png'),width=Inches(4.6))
ep.add_run('\nFigure 5: Sign in screen')
fill(ps[113],'Figure 6: GitHub repository (N.A.)')
fill(ps[20],'Figure 1: System architecture\nFigure 2: Application workflow\nFigure 3: Database design/schema\nFigure 4: Landing page\nFigure 5: Sign in screen\nFigure 6: GitHub repository (N.A.)')
fill(ps[22],'Table 1: Functional Requirements\nTable 2: Non-Functional Requirements\nTable 3: MERN Technology Stack\nTable 4: Modules and Workflow\nTable 5: Database Design\nTable 6: API Design\nTable 7: Database and CRUD Implementation\nTable 8: Test Cases\nTable 9: Deployment Details\nTable 10: Challenges and Solutions\nTable 11: Individual Contributions')
for p in list(d.paragraphs):
    if p.text.startswith('GUIDELINE'): p._p.getparent().remove(p._p)

temp=W/'template-filled-working.docx'
d.save(temp)
editable={'word/document.xml','word/_rels/document.xml.rels','[Content_Types].xml'}
with ZipFile(SOURCE) as source, ZipFile(temp) as made, ZipFile(OUT,'w',ZIP_DEFLATED) as out:
    names=set(source.namelist())
    for item in source.infolist(): out.writestr(item,made.read(item.filename) if item.filename in editable else source.read(item.filename))
    for item in made.infolist():
        if item.filename not in names: out.writestr(item,made.read(item.filename))
with ZipFile(SOURCE) as s,ZipFile(OUT) as o:
    assert all(s.read(n)==o.read(n) for n in s.namelist() if n not in editable)
original=Document(SOURCE)
final=Document(OUT)
assert [p.text for p in original.paragraphs if p.style.name.startswith('Heading')]==[p.text for p in final.paragraphs if p.style.name.startswith('Heading')]
for a,b in zip(original.tables,final.tables):
    assert a._tbl.tblPr.xml==b._tbl.tblPr.xml
    assert a._tbl.tblGrid.xml==b._tbl.tblGrid.xml
    assert [c.text for c in a.rows[0].cells]==[c.text for c in b.rows[0].cells]
assert 'Yashvardhan Samadhiya' in '\n'.join(p.text for p in final.paragraphs)
print(OUT)
print('Original styles, theme, numbering, section geometry, table grids, headers and footers preserved.')
