# Retained report template contract

Reference: D:\Download\MiniProject_Report_FSD.docx
SHA256: 3199cc2c6c93350d0b02678aed20c4bc2e46636538a1ff5603e1e831fb093b56
Reference render: work/template.pdf and template-page-1.png through template-page-13.png.
One section; 13 source pages. A4 portrait. Page size EMU 7560310 x 10692130; margins T 685800, B 914400, L 914400, R 914400.

## Page and typography system
Keep original header logos, red side ornament and footer page fields in their original package parts. Body defaults Times New Roman 12 pt; Heading 1 16 pt; Heading 2 13 pt. Source chapter starts are separate pages. Cover title is 20 pt bold centred; subtitle 14 pt; author/program metadata centred. Cover paragraph spacing is retained. Title will use the Word Title role with its existing direct formatting.

## Slots and flow
Stable locators: word/document.xml direct body paragraph indexes recorded in source extraction and build_report.py; word/document.xml direct table indexes 0 through 10.
Cover paragraphs 1, 3 through 8: project, supplied students, program, faculty, year and repository status. Paragraphs 9 through 22: contents and lists. Preserve chapter order and all subsection titles.
Chapters 1 through 8 and References occupy paragraph indexes 23 through 134. Replace bracketed content; remove GUIDELINE instructions and obsolete blank image spacers. Tables 0 through 10 are repeated-record matrices for requirements, technology, modules, database, APIs, CRUD, tests, deployment, challenges and contributions. Expand table rows as required; use light borders and repeating header rows. Table typography 10 pt Times New Roman with wrap, automatic row heights and generous cell margins. Never claim Mongoose, GitHub, public deployment or record editing when absent.
Insert numbered architecture/workflow/database figures at paragraphs 55, 58 and 69; representative UI screenshots at 77 and 79. Replace the GitHub screenshot placeholder with a local directory listing because no repository exists. Fill lists using only actual inserted figures/tables.

## Fidelity and package boundaries
Preserve all original ZIP members byte-for-byte except word/document.xml, word/styles.xml, word/settings.xml, word/_rels/document.xml.rels and [Content_Types].xml. New media may be added. Inventory is template-inventory.json. All original header/footer/drawing/numbering and opaque parts are preserve-only.
Content additions may change pagination. No changes to page geometry or section count. All chapter starts remain separate pages. Set updateFields for Word. QA with Word PDF export because the canonical renderer cannot locate a bundled LibreOffice on this host. Inspect all final pages and compare section geometry and preserve-only parts. Source remains unchanged.
