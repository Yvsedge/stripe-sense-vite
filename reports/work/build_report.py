from pathlib import Path
from copy import deepcopy
from zipfile import ZipFile, ZIP_DEFLATED
from hashlib import sha256
import json
from PIL import Image, ImageDraw, ImageFont
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_TAB_ALIGNMENT, WD_TAB_LEADER
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

ROOT = Path(__file__).resolve().parents[2]
WORK = Path(__file__).parent
SOURCE = Path(r'D:\Download\MiniProject_Report_FSD.docx')
FINAL = ROOT / 'reports' / 'StripeSense_MiniProject_Report_FSD.docx'

def diagram(filename, boxes, arrows, size):
    im = Image.new('RGB', size, 'white')
    draw = ImageDraw.Draw(im)
    font = ImageFont.truetype(r'C:\Windows\Fonts\arial.ttf', 25)
    bold = ImageFont.truetype(r'C:\Windows\Fonts\arialbd.ttf', 28)
    for (x1,y1,x2,y2), title, lines in boxes:
        draw.rounded_rectangle((x1,y1,x2,y2), radius=14, fill='#F4F6F8', outline='#17324D', width=3)
        draw.text((x1+20,y1+18), title, font=bold, fill='#17324D')
        for i,line in enumerate(lines): draw.text((x1+20,y1+62+i*35), line, font=font, fill='#263544')
    for start,end in arrows:
        draw.line((start,end), fill='#17324D', width=4)
        x,y=end
        if end[0] != start[0]:
            direction=1 if end[0]>start[0] else -1
            draw.polygon([(x,y),(x-direction*13,y-8),(x-direction*13,y+8)],fill='#17324D')
        else:
            draw.polygon([(x,y),(x-8,y-13),(x+8,y-13)],fill='#17324D')
    im.save(WORK/filename)

diagram('architecture.png', [
    ((20,30,390,250),'React frontend',['localhost:5173','Forms, routes and reports','Axios /api requests']),
    ((500,30,970,250),'Express API',['localhost:3000','Sessions and owner checks','Upload and request validation']),
    ((1080,30,1450,250),'MongoDB',['stripesense database','users, sessions','patients, tests']),
    ((500,340,970,540),'Sharp colour analyser',['Crop ten pad regions','RGB to CIELAB','Nearest reference / Delta E']),
], [((390,130),(500,130)),((970,130),(1080,130)),((735,250),(735,340))], (1470,565))
diagram('workflow.png', [
    ((20,20,460,165),'1  Account and patient',['Sign in and select a patient']),
    ((560,20,1000,165),'2  Photo and profile',['Upload image and chart JSON']),
    ((560,230,1000,375),'3  Crop and analyse',['Sample pad colours; match']),
    ((20,230,460,375),'4  Save and review',['MongoDB record; report / print']),
], [((460,90),(560,90)),((780,165),(780,230)),((560,300),(460,300))], (1020,400))
diagram('database.png', [
    ((20,20,620,235),'users',['_id, name, email, role','salt, passwordHash, createdAt']),
    ((780,20,1380,235),'sessions',['userId -> users._id','tokenHash, expiresAt (TTL)']),
    ((20,335,620,585),'patients',['ownerId -> users._id','name, patientCode, createdAt','unique (ownerId, patientCode)']),
    ((780,335,1380,585),'tests',['ownerId -> users._id','patientId -> patients._id','parameters, image, profile, crop']),
], [((620,120),(780,120)),((320,235),(320,335)),((620,455),(780,455))], (1400,610))

doc = Document(SOURCE)
original_paragraphs = list(doc.paragraphs)
tables = list(doc.tables)
def put(index, text):
    p=original_paragraphs[index]
    props=deepcopy(p.runs[0]._r.rPr) if not p.text.startswith('GUIDELINE') and p.runs and p.runs[0]._r.rPr is not None else None
    p.clear()
    r=p.add_run(text)
    if props is not None: r._r.insert(0,props)
    return p

def after(p, text='', style='Normal'):
    element=OxmlElement('w:p'); p._p.addnext(element)
    from docx.text.paragraph import Paragraph
    new=Paragraph(element,p._parent); new.style=style
    new.add_run(text)
    return new

def picture(index, filename, caption, width=6.05):
    p=put(index,''); p.alignment=WD_ALIGN_PARAGRAPH.CENTER
    p.add_run().add_picture(str(WORK/filename),width=Inches(width))
    p.paragraph_format.keep_with_next=True
    c=after(p,caption); c.alignment=WD_ALIGN_PARAGRAPH.CENTER
    for r in c.runs: r.font.size=Pt(10); r.italic=True
    return c

content={
  1:'StripeSense\nUrine Strip Colour Analysis',
  3:'Detailed Project Report',
  4:'',
  5:'Submitted by\nYashvardhan Samadhiya  16010124058\nAmey Salunkhe  16010124057\nShrived Deshmukh  16010124071',
  6:'B.Tech Computer Engineering\nThird Year / Semester V\n\nFaculty: Shruti Javakar\nAcademic Year: 2026-2027',
  7:'Mini Project: FSD-MERN Stack',
  8:'GitHub Repository: N.A.\nLocal implementation completed; repository publication pending.',
  20:'Figure 1  System architecture\nFigure 2  Application workflow\nFigure 3  Database relationships\nFigure 4  Public landing page\nFigure 5  Sign in screen',
  22:'Table 1  Functional requirements\nTable 2  Non functional requirements\nTable 3  Technology stack\nTable 4  Modules and workflow\nTable 5  Database collections\nTable 6  Implemented API endpoints\nTable 7  CRUD coverage\nTable 8  Executed test cases\nTable 9  Deployment details\nTable 10  Challenges and solutions\nTable 11  Individual contributions',
  26:'Urine reagent strips use colour changes on multiple pads to support screening. A photographed strip can be compared with a reference chart, but the image and its patient details must also be recorded consistently. A web application provides a convenient way to collect an image, review colour matches and revisit earlier results.\n\nStripeSense was developed as a Full Stack Development mini project. The main academic objective is to integrate React, Express, Node.js and MongoDB through a usable application. Its implemented image pipeline uses reference-colour comparison rather than a trained machine-learning model. The current outputs are unvalidated estimates and do not diagnose a medical condition.',
  29:'Individuals and doctors need an organised way to associate strip images and colour-matching results with the correct person. Keeping photos and notes separately makes retrieval difficult and creates the risk of mixing records. The project addresses this software workflow through account-based patient records, authenticated uploads and searchable saved reports. It does not address clinical validation or replace a laboratory analyser.',
  32:'The application provides a public landing page and a private workspace. A user registers as a doctor or individual, signs in, adds a patient, uploads a horizontal ten-pad photo and a reference JSON profile, selects the pad row and submits the analysis. Express validates the request, runs the colour comparison and stores the result with its source image in MongoDB. React retrieves the report through Axios for review, history filtering and printing.',
  35:'Provide registration, sign in, persistent sessions and sign out.',
  36:'Create patient records and associate each test with its patient and account owner.',
  37:'Process a ten-pad image using a supplied colour-reference profile.',
  38:'Save and retrieve reports, source images and analysis metadata in MongoDB.',
  39:'Demonstrate API integration, input validation, account isolation and automated testing.',
  40:'Scope includes a desktop-first interface, light and dark themes, patient creation, reference matching, history, report printing and test deletion. Hardware capture, trained ML, verified concentration estimation, medical diagnosis, shared clinical teams and public cloud deployment are outside the implemented scope. Patient/test editing is a future enhancement.',
  45:'Doctor and individual accounts use the same private data model. Account type changes the workspace wording; it does not verify professional credentials or expose another account\'s data. The functional requirements below describe implemented behavior.',
  47:'The application favours clear desktop forms, consistent navigation and explicit feedback. File and pixel limits bound image-processing work. Medical interpretation is separated from colour distance, and a doctor-consultation disclaimer remains visible.',
  50:'The application is organised as npm workspaces named frontend and backend. A shared root lockfile coordinates installation, while each workspace declares its own dependencies. MongoDB is accessed through the official Node.js driver; Mongoose is not used.',
  55:'The browser sends Axios requests to the /api path. During development, Vite proxies these requests to Express on port 3000. Express checks the session and account owner before reading or modifying protected records. The analyser runs in the Node.js backend and returns a structured result that is saved in MongoDB.',
  57:'A test is processed only after a valid account session and owned patient have been selected. The image and reference profile travel together in a multipart request. After saving, the report can be retrieved independently of the upload page, so refreshing the browser does not discard the result.',
  63:'The database contains users, sessions, patients and tests. ObjectId references connect ownership and patient history; selected patient identifiers are also copied into each test as a report snapshot. The source PNG is stored as BSON binary in the same test document.',
  70:'Email is unique across users. Patient codes are unique within an account. Session token hashes are indexed, and expiresAt has a TTL index. Session expiry is also checked at request time. Test queries include ownerId to enforce isolation. Records created before ownership was introduced are preserved but not assigned automatically.',
  73:'Authentication and data APIs use JSON except POST /api/tests, which accepts multipart form data. Successful creation returns HTTP 201; unauthenticated access returns 401; unknown or inaccessible resources return 404. The API exposes no patient/test PUT or PATCH endpoint in the current version.',
  77:'The public landing page explains the implemented workflow and links to sign in. The authenticated workspace provides Dashboard, Analyse photo, Test history and Patients navigation. Sign in includes registration and account-type selection. Light/dark mode is available on public and private screens and is remembered in localStorage.\n\nThe dashboard displays saved record counts and recent tests rather than illustrative graphs. Analysis includes patient selection, profile/image upload and a crop overlay. Reports show colour categories, measured/reference RGB, Delta E and review flags. The layout prioritises desktop use; the private workspace has a minimum width and is not presented as fully mobile-optimised.',
  80:'React functional components use useState, useEffect and useRef for forms, asynchronous records and image selection. React Router separates public pages from private routes. AuthProvider retrieves the current session; RequireAuth redirects signed-out users and displays connection errors without exposing protected pages.\n\nA shared Axios client uses /api with a request timeout. FormData carries the photo, patientId, profile and crop. The image preview uses object URLs and releases them when replaced. ThemeProvider persists the selected appearance. Components for reports and interpretation keep detailed colour measurements separate from the user-facing explanation.',
  83:'Express applies a JSON size limit, route-scoped Multer upload handling and central error responses. Multer accepts JPEG, PNG or WebP metadata with an 8 MB file limit; Sharp performs actual decoding and limits the decoded pixel count. A normalized image above 10 MB is rejected before persistence.\n\nPasswords are salted and hashed with scrypt. Login issues a random session token in an HttpOnly, SameSite=Strict cookie; only its SHA-256 hash is stored in MongoDB. Logout deletes the session. Origin checks and in-process attempt limits provide additional protection. Production cookies require HTTPS; deployment hardening remains necessary before real-world use.',
  86:'The MongoDB driver performs insertOne, find, findOne and deleteOne operations. Patient creation stores the account owner and generates a patient code when omitted. Uploading a test verifies that the selected patient belongs to the signed-in account, then inserts a complete analysis record. List queries omit binary images; a separate authenticated endpoint serves the saved PNG.\n\nRead operations support patient-filtered test history, individual reports and source-image retrieval. Deleting a test removes its embedded source image with the record. Patient and test editing are not implemented. Session creation/deletion belongs to authentication and is not a substitute for a record-editing feature.',
  89:'Missing patient names and unsupported uploads are rejected with actionable errors. Duplicate patient codes within an account return 409. Malformed profiles, invalid crop rectangles and image decode failures return an analysis validation error rather than storing a partial test.\n\nUnknown or other-account report IDs return 404, including image and deletion endpoints. Network failures produce a connection message in the frontend. Near-tied colour matches are flagged for review and are not forced into a known estimate category.',
  94:'Automated tests use the Node.js built-in test runner. Unit tests cover known pad colours, invalid analyser inputs, CIELAB conversion and result-presentation rules. The integration test starts a real Express server on an ephemeral port and uses a uniquely named temporary MongoDB database. It checks authentication, record persistence and cross-account isolation, then drops only that temporary database.\n\nOn 30 October 2026, npm test was run with TEST_MONGODB_URI set to the local MongoDB server. All eight top-level tests passed with no skips. npm run build also passed. Browser checks during development covered public navigation, protected-route redirects and theme persistence. Postman was not used for the recorded automated verification.',
  97:'The following table records executed checks from the current automated suite. Tests use generated inputs and temporary records; passing them validates software behavior, not diagnostic accuracy.',
  99:'The integration test creates a doctor account, stores a patient, uploads a PNG with a JSON profile/crop, reads history and the report, downloads the saved image and deletes the test. It verifies HTTP statuses and returned fields after actual requests. A second account is unable to read or delete the first account\'s report or source image.\n\nDatabase state is queried during the test to check that passwords are not stored as plaintext. The local development database can be inspected in MongoDB Compass at mongodb://127.0.0.1:27017 under stripesense. No Compass screenshot or cloud-hosting evidence is claimed as part of this test record.',
  102:'The core MERN workflow is implemented and tested: account registration, sign in/out, patient creation, image/reference submission, saved analysis, history retrieval and report deletion. The frontend build succeeds and the protected API uses account ownership checks.\n\nFour generated strip samples with a fictional three-category reference profile provide reproducible colour-matching inputs. Small controlled colour offsets produce nonzero Delta E values. The current estimate categories do not establish below-normal, above-normal, critical or clinically safe results. The report advises consultation with a qualified doctor. Public deployment, record editing and clinical validation remain pending.',
  106:'A GitHub repository has not yet been created for the project. Repository URL and hosted source-control history are therefore N.A. The local directory structure separates frontend and backend code as shown below. Publishing the source and establishing team branches/reviews are planned next steps.',
  107:'stripe-sense-vite/\n  frontend/\n    src/  pages, auth, theme, components, api, utils\n    index.html, vite.config.js, package.json\n  backend/\n    app.js, auth.js, db.js, index.js, analyzer.js\n    *.test.js, scripts/, .env.example\n  samples/  generated images and reference JSON\n  package.json, package-lock.json, README.md',
  113:'Local project structure',
  116:'The application currently runs locally. npm run dev starts Vite and Express together. The frontend is available at http://localhost:5173 and the backend at http://localhost:3000. Vite forwards /api requests to Express. MongoDB runs locally; no public frontend/backend URL or cloud platform is assigned.',
  121:'The principal implementation challenges were establishing a complete upload-to-history flow, correctly sampling each pad, protecting patient-linked records and avoiding misleading medical claims. The project resolved these through a shared API contract, verified crop sampling, authenticated ownership filters and a clear distinction between colour estimates and diagnosis.',
  124:'The distribution below records the contributions supplied by the team. Amey Salunkhe and Shrived Deshmukh focused on the frontend with supporting backend work. Yashvardhan Samadhiya focused on backend services, MongoDB integration and supporting Python scripting. The application\'s deployed analysis path itself is JavaScript-based; no Python inference service is required.',
  129:'StripeSense brings account-based patient records, reference-colour matching and saved reporting into one MERN application. React provides the interface, Axios connects it to Express, and MongoDB persists users, sessions, patients and tests. Automated checks confirm the implemented software behavior, including ownership isolation and retrieval of saved results.\n\nThe project demonstrates full-stack integration without claiming clinical measurement accuracy. Its colour outputs are estimates from a supplied reference profile. Further work is required for complete record editing, public deployment, manufacturer calibration and any validated medical interpretation.',
  131:'Future work includes patient/test editing with audit history; password reset and email verification; pagination beyond the current 500-record lists; broader mobile workspace support; private object storage for larger images; and secure public deployment. Manufacturer-specific reference profiles, varied-layout pad detection and evaluation against labelled real-strip images would be required before extending analysis beyond the current controlled scope. Shared-care access would need explicit consent and fine-grained permissions.',
  133:'[1] React, React documentation. https://react.dev/learn\n[2] Express, Express documentation. https://expressjs.com/\n[3] MongoDB, Node.js driver documentation. https://www.mongodb.com/docs/drivers/node/current/',
  134:'[4] Axios, Axios documentation. https://axios-http.com/docs/intro\n[5] Sharp, Image processing documentation. https://sharp.pixelplumbing.com/\n[6] Node.js, Test runner documentation. https://nodejs.org/api/test.html\n[7] DiaSys, UDStrip-12 product information and instructions. https://www.diasys-diagnostics.com/products/dedicated-instruments/respons-uds100/udstrip-12/\n[8] MedlinePlus, Urinalysis. https://medlineplus.gov/ency/article/003579.htm',
}
for index,text in content.items(): put(index,text)

# Page numbers verified against the completed Word PDF export.
for index,page in zip(range(10,19),[5,6,7,10,13,14,15,16,17]):
    put(index, original_paragraphs[index].text + '\t' + str(page))
for index,pages in [(20,[7,8,8,10,11]),(22,[6,6,6,7,8,9,12,13,14,15,15])]:
    lines=original_paragraphs[index].text.split('\n')
    put(index,'\n'.join(line+'\t'+str(page) for line,page in zip(lines,pages)))
for index in list(range(10,19))+[20,22]:
    original_paragraphs[index].paragraph_format.tab_stops.add_tab_stop(Inches(6.1),WD_TAB_ALIGNMENT.RIGHT,WD_TAB_LEADER.DOTS)

# Keep the requirements and verification chapters compact enough to avoid short spill pages.
put(45, 'Doctor and individual accounts use the same private data model; account type changes wording, not access to other users\' records.')
put(47, 'The desktop interface provides clear forms and errors. Upload limits bound processing work; estimates remain separate from medical interpretation.')
put(50, 'Separate npm workspaces organise the frontend and backend. MongoDB uses the official Node.js driver, not Mongoose.')
put(63, 'The users, sessions, patients and tests collections use ObjectId references for ownership and history. Each saved test includes a patient snapshot and its source image as BSON binary.')
put(94, 'The Node.js test runner executes analyser and interpretation unit tests plus a real Express/MongoDB integration test. The integration test uses an ephemeral HTTP port and a uniquely named temporary database, which it removes after execution.\n\nOn 30 October 2026, all eight tests passed with TEST_MONGODB_URI set to local MongoDB. The frontend production build passed. Browser checks covered navigation, protected-route redirects and theme persistence. Postman was not used for these recorded tests.')
put(97, 'These checks were executed with generated inputs and temporary records. They verify software behavior, not diagnostic accuracy.')
put(99, 'The integration test verifies authenticated patient creation, image upload, report/image retrieval, deletion and account isolation. Database assertions confirm hashed password storage.\n\nLocal verification uses mongodb://127.0.0.1:27017 and the stripesense database. Compass can inspect development records; tests use a separate temporary database.')
put(102, 'Account, patient, upload, reporting and deletion workflows pass automated checks. Outputs remain unvalidated colour estimates. Record editing, public deployment and clinical validation are pending.')

table_data=[
(['ID','User or function','Implemented behavior'],[
 ['FR1','Account access','Register, sign in/out and persist a private session.'],
 ['FR2','Patient directory','Add named patients with optional auto-generated IDs.'],
 ['FR3','Photo analysis','Upload a ten-pad photo/profile, crop and compare colours.'],
 ['FR4','History and reports','Retrieve account-owned tests, source images and printable reports.'],
 ['FR5','Privacy and deletion','Block other-account access and delete an owned test.']]),
(['Category','Requirement'],[
 ['Usability','Clear forms, desktop navigation, readable errors and persistent light/dark mode.'],
 ['Performance','Bounded uploads/pixels and at most 500 rows per list request. No latency claim.'],
 ['Reliability','Save complete results and reject invalid images/profiles before insertion.'],
 ['Security','Password hashing, expiring sessions and owner-filtered queries.'],
 ['Maintainability','Separate npm workspaces, reusable components and consistent Prettier formatting.']]),
(['Layer','Technology','Purpose'],[
 ['Frontend','React 19, React Router, Vite','Components, routes and development/build tooling.'],
 ['HTTP client','Axios','JSON and multipart requests to /api.'],
 ['Backend','Node.js, Express 5, Multer','API, authentication and uploads.'],
 ['Database','MongoDB, official Node.js driver','Persistent documents, references and indexes; no Mongoose.'],
 ['Images','Sharp, CIELAB','Decode and compare sampled pad colours.'],
 ['Verification','node:test, Vite build','Unit/integration tests; browser UI checks.'],
 ['Deployment','Local workspaces','Local frontend/API; no cloud hosting.']]),
(['Module','Main functions'],[
 ['Authentication','Register/login/logout, current user, session cookies and expiry.'],
 ['Patient records','Create/list owned patients and auto-generate IDs.'],
 ['Colour analysis','Image/profile validation, crop sampling and nearest-reference matching.'],
 ['Reporting and history','Save, filter, view, print and delete owned tests.']]),
(['Collection','Important fields','Purpose'],[
 ['users','_id, name, email, role, salt, passwordHash, createdAt','Account identity and password verification.'],
 ['sessions','tokenHash, userId, expiresAt','Expiring account sessions.'],
 ['patients','_id, ownerId, name, patientCode, createdAt','Private patient directory.'],
 ['tests','ownerId, patientId, createdAt, parameters, image, crop, referenceProfile','Saved report, image and reproducibility metadata.']]),
(['Method','Endpoint','Purpose'],[
 ['POST','/api/auth/register','Create account and session.'],['POST','/api/auth/login','Authenticate and issue session cookie.'],
 ['GET','/api/auth/me','Retrieve current account.'],['POST','/api/auth/logout','Revoke current session.'],
 ['GET','/api/health','Check database availability.'],['GET','/api/reference-example','Retrieve sample profile; sign in required.'],
 ['GET, POST','/api/patients','List or create owned patients.'],['GET','/api/tests?patientId=...','List/filter owned tests.'],
 ['POST','/api/tests','Upload, analyse and save a test.'],['GET','/api/tests/:id','Retrieve an owned report.'],
 ['GET','/api/tests/:id/image','Serve the saved PNG.'],['DELETE','/api/tests/:id','Delete owned test and embedded image.']]),
(['CRUD','Frontend action','Backend and database action'],[
 ['Create','Add patient; submit analysis','POST endpoints; insertOne into patients/tests.'],
 ['Read','Directory, dashboard, history, report','GET endpoints; find/findOne with ownerId.'],
 ['Update','Not implemented for patient/test records','No PUT/PATCH route; planned enhancement.'],
 ['Delete','Confirm deletion on saved report','DELETE owned test; deleteOne removes embedded image too.']]),
(['ID','Executed check','Expected result','Observed result','Status'],[
 ['TC01','Known pad colours','Correct match','All ten match','PASS'],
 ['TC02','Invalid crop/image/profile','Reject invalid input','Rejected','PASS'],
 ['TC03','Lab conversion','Expected lightness','Assertions pass','PASS'],
 ['TC04','Auth and storage','Persist / isolate','Checks pass','PASS'],
 ['TC05','Presentation labels','Map display text only','Stored labels preserved','PASS'],
 ['TC06','Estimate flags','Correct priority','Checks pass','PASS'],
 ['TC07','Unknown labels','No classification','Unknown returned','PASS'],
 ['TC08','Near-tied colours','Review only','Review group used','PASS']]),
(['Item','Details'],[
 ['GitHub repository','N.A. - publication pending.'],['Frontend URL','http://localhost:5173 (local only)'],
 ['Backend URL','http://localhost:3000 (local only)'],['Database','Local MongoDB; database stripesense'],['Deployment platform','N.A. - not publicly deployed.']]),
(['Challenge','Solution','Outcome'],[
 ['Pad sampling initially read the wrong region','Materialise each Sharp crop before computing image statistics.','Known-colour tests pass for all ten pads.'],
 ['Disconnected frontend/API processes','Use coordinated npm workspace scripts and a Vite /api proxy.','Both services start from npm run dev.'],
 ['Private records needed account isolation','Session authentication plus ownerId in all protected queries.','Other-account report/image/delete requests are blocked.'],
 ['Colour distance mistaken for medical severity','Separate category estimates, Delta E and consultation disclaimer.','Reports avoid unsupported diagnosis or urgency claims.']]),
(['Student','Frontend','Backend and API','Database','Supporting work'],[
 ['Yashvardhan Samadhiya\n16010124058','Not primary focus','Primary focus','MongoDB integration','Supporting Python scripting'],
 ['Amey Salunkhe\n16010124057','Primary focus','Supporting work','Not separately assigned','UI development'],
 ['Shrived Deshmukh\n16010124071','Primary focus','Supporting work','Not separately assigned','UI development']]),
]

widths=[[.45,1.35,4.35],[1.05,5.1],[1.0,1.7,3.45],[1.4,4.75],[.9,2.9,2.35],[.65,2.6,2.9],[.7,1.7,3.75],[.5,1.65,1.55,1.8,.65],[1.5,4.65],[1.75,2.4,2],[1.6,1.0,1.15,1.15,1.25]]
captions=['Functional requirements','Non functional requirements','Technology stack','Modules and workflow','Database collections','Implemented API endpoints','CRUD coverage','Executed test cases','Deployment details','Challenges and solutions','Individual contributions']
for number,(table,(headers,rows)) in enumerate(zip(tables,table_data)):
    while len(table.rows)>1: table._tbl.remove(table.rows[-1]._tr)
    for col,h in enumerate(headers): table.rows[0].cells[col].text=h
    for row in rows:
        cells=table.add_row().cells
        for col,value in enumerate(row): cells[col].text=value
    table.autofit=False; table.alignment=WD_TABLE_ALIGNMENT.CENTER
    for i,width in enumerate(widths[number]): table.columns[i].width=Inches(width)
    for ri,row in enumerate(table.rows):
        row.height=None
        props=row._tr.get_or_add_trPr()
        keep=OxmlElement('w:cantSplit'); props.append(keep)
        if ri==0:
            repeat=OxmlElement('w:tblHeader'); props.append(repeat)
        for ci,cell in enumerate(row.cells):
            cell.width=Inches(widths[number][ci]); cell.vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.CENTER
            tcpr=cell._tc.get_or_add_tcPr()
            for old in list(tcpr.findall(qn('w:shd'))): tcpr.remove(old)
            shade=OxmlElement('w:shd'); shade.set(qn('w:fill'),'E8ECF0' if ri==0 else ('F7F8FA' if ri%2==0 else 'FFFFFF'));tcpr.append(shade)
            borders=OxmlElement('w:tcBorders')
            for edge in ['top','left','bottom','right']:
                b=OxmlElement('w:'+edge); b.set(qn('w:val'),'single'); b.set(qn('w:sz'),'4'); b.set(qn('w:color'),'D9D9D9'); borders.append(b)
            tcpr.append(borders)
            margins=OxmlElement('w:tcMar')
            for edge in ['top','bottom','left','right']:
                m=OxmlElement('w:'+edge);m.set(qn('w:w'),'55' if edge in ['top','bottom'] else '75');m.set(qn('w:type'),'dxa');margins.append(m)
            tcpr.append(margins)
            for p in cell.paragraphs:
                p.paragraph_format.space_before=Pt(0);p.paragraph_format.space_after=Pt(1);p.paragraph_format.line_spacing=1.05
                for r in p.runs:r.font.name='Times New Roman';r.font.size=Pt(10);r.bold=(ri==0);r.font.color.rgb=RGBColor(0,0,0)
    from docx.text.paragraph import Paragraph
    element=OxmlElement('w:p');table._tbl.addprevious(element);cap=Paragraph(element,table._parent)
    caprun=cap.add_run(f'Table {number+1}  {captions[number]}');caprun.italic=True;caprun.font.size=Pt(10)
    cap.paragraph_format.keep_with_next=True
    cap.paragraph_format.space_before=Pt(6);cap.paragraph_format.space_after=Pt(4)

# Replace visual placeholders without changing chapter order or header artwork.
picture(55,'architecture.png','Figure 1  System architecture',6.1)
after(original_paragraphs[55],'Axios requests reach Express through the Vite proxy. The backend validates ownership, calls the analyser and persists the result. Responses follow the same API path back to React.')
picture(58,'workflow.png','Figure 2  Application workflow',6.1)
picture(69,'database.png','Figure 3  Database relationships',6.1)
landing=picture(77,'landing.png','Figure 4  Public landing page',6.1)
after(landing,content[77])
signin=picture(79,'signin.png','Figure 5  Sign in screen',5.5)

# Remove template instructions, obsolete visual spacer paragraphs and manual page breaks.
for p in list(doc.paragraphs):
    if p.text.startswith('GUIDELINE'):
        p._element.getparent().remove(p._element); continue
    for br in list(p._element.xpath('.//w:br')):
        if br.get(qn('w:type'))=='page': br.getparent().remove(br)
    if not p.text.strip() and not p._element.xpath('.//w:drawing'):
        p._element.getparent().remove(p._element)

for p in doc.paragraphs:
    if p.style.name=='Heading 1':
        p.paragraph_format.page_break_before=True
        p.paragraph_format.keep_with_next=True
        p.paragraph_format.space_after=Pt(12)
    elif p.style.name=='Heading 2':
        p.paragraph_format.keep_with_next=True
        p.paragraph_format.space_before=Pt(12);p.paragraph_format.space_after=Pt(6)
    elif p._p not in [original_paragraphs[i]._p for i in range(9)]:
        p.paragraph_format.space_after=Pt(7)
        p.paragraph_format.line_spacing=1.1
    for r in p.runs:
        r.font.color.rgb=RGBColor(0,0,0)

original_paragraphs[1].style='Title'
original_paragraphs[1].paragraph_format.space_after=Pt(20)
for r in original_paragraphs[1].runs:r.font.name='Times New Roman';r.font.size=Pt(20);r.bold=True
original_paragraphs[107].paragraph_format.line_spacing=1
original_paragraphs[107].alignment=WD_ALIGN_PARAGRAPH.LEFT
original_paragraphs[84].paragraph_format.page_break_before=True
for r in original_paragraphs[107].runs:r.font.name='Consolas';r.font.size=Pt(10)
for name in ['Title','Heading 1','Heading 2','Heading 3']:
    style=doc.styles[name];style.font.color.rgb=RGBColor(0,0,0)
    if name=='Title':style.font.name='Times New Roman'
update=OxmlElement('w:updateFields');update.set(qn('w:val'),'true');doc.settings.element.append(update)

# Serialize only editable package parts; original header/footer/logo parts stay byte-identical.
temp=WORK/'filled-working.docx';doc.save(temp)
editable={'word/document.xml','word/styles.xml','word/settings.xml','word/_rels/document.xml.rels','[Content_Types].xml'}
with ZipFile(SOURCE) as source, ZipFile(temp) as edited, ZipFile(FINAL,'w',ZIP_DEFLATED) as output:
    original_names=set(source.namelist())
    for item in source.infolist():
        output.writestr(item,edited.read(item.filename) if item.filename in editable else source.read(item.filename))
    for item in edited.infolist():
        if item.filename not in original_names: output.writestr(item,edited.read(item.filename))
with ZipFile(SOURCE) as source, ZipFile(FINAL) as final:
    preserved=[name for name in source.namelist() if name not in editable]
    assert all(source.read(name)==final.read(name) for name in preserved)
assert Document(FINAL).sections[0].page_width==Document(SOURCE).sections[0].page_width
assert not any('GUIDELINE' in p.text or '[INSERT' in p.text or '[Student' in p.text for p in Document(FINAL).paragraphs)
print('Saved',FINAL)
print('Preserved package parts:',len(preserved))
