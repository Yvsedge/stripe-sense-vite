from pathlib import Path
from docx import Document
from pdf2image import convert_from_path
from PIL import Image, ImageOps, ImageDraw

root = Path(__file__).parent
doc = Document(r'D:\Download\MiniProject_Report_FSD.docx')
for name in ['Normal', 'Heading 1', 'Heading 2']:
    s = doc.styles[name]
    print(name, s.font.name, s.font.size.pt if s.font.size else None, s.paragraph_format.page_break_before)
for i in [1, 3, 5, 6]:
    p = doc.paragraphs[i]
    print(i, p.alignment, [(r.text, r.font.name, r.font.size.pt if r.font.size else None, r.bold) for r in p.runs])
print('Pictures', len(doc.inline_shapes))
pdf = convert_from_path(root / 'template.pdf', dpi=110, poppler_path=r'C:\Users\yyyas\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin')
print('PAGES', len(pdf))
tiles = []
for i, page in enumerate(pdf):
    page.save(root / f'template-page-{i+1}.png')
    image = Image.open(root / f'template-page-{i+1}.png').convert('RGB')
    image.thumbnail((250, 360))
    tile = Image.new('RGB', (270, 390), 'white')
    tile.paste(image, (10, 20))
    ImageDraw.Draw(tile).text((10, 370), f'Page {i+1}', fill='black')
    tiles.append(tile)
sheet = Image.new('RGB', (270*4, 390*((len(tiles)+3)//4)), '#dddddd')
for i, tile in enumerate(tiles): sheet.paste(tile, ((i%4)*270,(i//4)*390))
sheet.save(root / 'template-contact.png')
