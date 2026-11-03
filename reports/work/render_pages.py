from pathlib import Path
from pdf2image import convert_from_path
from PIL import Image, ImageDraw
from pypdf import PdfReader

work=Path(__file__).parent
pages=convert_from_path(work/'final.pdf',dpi=120,poppler_path=r'C:\Users\yyyas\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin')
tiles=[]
for i,page in enumerate(pages):
    page.save(work/f'page-{i+1}.png')
    page.thumbnail((250,360))
    tile=Image.new('RGB',(270,390),'white');tile.paste(page,(10,10));ImageDraw.Draw(tile).text((10,370),f'Page {i+1}',fill='black');tiles.append(tile)
sheet=Image.new('RGB',(1080,390*((len(tiles)+3)//4)),'#dddddd')
for i,tile in enumerate(tiles):sheet.paste(tile,((i%4)*270,(i//4)*390))
sheet.save(work/'final-contact.png')
reader=PdfReader(work/'final.pdf')
for i,page in enumerate(reader.pages):
    text=page.extract_text() or ''
    print(f'PAGE {i+1}: {len(text)} chars | '+text.replace('\n',' ')[:145])
(work/'final-text.txt').write_text('\n\n'.join(p.extract_text() or '' for p in reader.pages),encoding='utf-8')
print('PAGES',len(pages))
