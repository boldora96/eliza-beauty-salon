from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
import json, os, shutil

root = Path(__file__).resolve().parent.parent
out = root / 'Eliza-anyagok' / 'Eliza képek'
out.mkdir(parents=True, exist_ok=True)
source = Path(os.environ['TEMP']) / 'eliza-stock-jeloltek'
rows = [
 ('ragyogas',11179580,'Arcápolás – eredeti főoldali nyitókép','Misolo Cosmetic'),
 ('arcapolas',8100778,'Természetes arcápoló készítmények','Polina'),
 ('kezeles',3738349,'Eliza munka közben – arcmasszázs illusztráció','Polina Tankilevitch'),
 ('arcmasszazs',5240806,'Tápláló arcpakolás felvitele','Anete Lusina'),
 ('torodes',33867520,'Eliza portréja – stock illusztráció','Daniel & Hannah Snipes'),
 ('eliza-tortenet',33867544,'Eliza bemutatkozása – portréillusztráció','Daniel & Hannah Snipes'),
 ('rolunk-hero',5659049,'Eliza munka közben – szalonhangulat illusztráció','Ivan S'),
 ('kapcsolat-hero',6925909,'Érkezés a szalon recepciójára','Tom Tillhub'),
 ('kezelesek-hero',7446662,'Személyes figyelem a kozmetikában','Gustavo Fring'),
 ('kezelesek-belico',4672599,'Mindennapi arcápolás természetesen','KATRIN BOLOVTSOVA'),
 ('kezelesek-mesotica',16378446,'Letisztult bőrápoló készítmények','mearlywan'),
 ('kezelesek-tovabbi',7795662,'Tápláló krém és természetes textúrák','Alesia Kozik'),
 ('kezelesek-vendeg-fruzsi',29810872,'Pihenés a kezelés után – vendégillusztráció','victor dubugras'),
 ('kezelesek-vendeg-magdi',5308627,'Arcápolási pillanat – vendégillusztráció','Anna Tarazevich'),
 ('vendeg-fruzsi',29405854,'Vendégportré – Fruzsi illusztráció','Alimi Sandrine'),
 ('vendeg-magdi',5473066,'Vendégportré – Magdi illusztráció','Polina Tankilevitch'),
 ('szalon-1',6925914,'Szalon recepció','Tom Tillhub'),
 ('szalon-2',7195804,'Napfényes kozmetikai kezelő','Max Vakhtbovych'),
 ('szalon-3',36837604,'Olívazöld szalonbelső','aiseleer'),
 ('szalon-4',17150052,'Kozmetikumok a szalonban','Avernak Skincare'),
 ('szalon-5',7795820,'Puha törölközők és ápolóolaj','Alesia Kozik'),
 ('szalon-6',3736279,'Kozmetikai kezelő és eszközök','Polina Tankilevitch'),
]
manifest = {}
unique = {}
for key, pid, name, author in rows:
 filename = name + '.webp'
 original = root / 'images/ragyogas.webp' if key == 'ragyogas' else source / f'{pid}.jpg'
 im = ImageOps.exif_transpose(Image.open(original)).convert('RGB')
 im.thumbnail((1600,1600))
 if key == 'ragyogas':
  shutil.copyfile(original, out / filename)
 else:
  im.save(out / filename, 'WEBP', quality=84, method=6)
 manifest[key] = dict(file='Eliza-anyagok/Eliza képek/'+filename,alt=name+'; stockfotó, illusztráció.',width=im.width,height=im.height,source=f'https://www.pexels.com/photo/{pid}/',author=author)
 unique[filename] = manifest[key]
(root / '.webprojekt/stock-kepek.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
text = '# Eliza Beauty Salon – stockfotók\n\nA képek illusztrációk: nem a tényleges szalont, Elizát vagy a vélemények szerzőit ábrázolják. A látható termékmárkák nem jelentenek partneri kapcsolatot.\n\nForrás és licenc: [Pexels](https://www.pexels.com/license/). Letöltés: 2026. október 26. Az eredeti képarányok megmaradtak, a weboldal képkivágását a komponensek szabályozzák.\n\n| Fájl | Fotós | Eredeti forrás |\n|---|---|---|\n'
for filename, item in unique.items():
 text += f'| {filename} | {item["author"]} | [Pexels]({item["source"]}) |\n'
(out / 'Képforrások.md').write_text(text,encoding='utf-8')
sheet = Image.new('RGB',(1200,((len(unique)+3)//4)*250),'#f8f5f0'); draw=ImageDraw.Draw(sheet)
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',12)
for i,(filename,item) in enumerate(unique.items()):
 im=ImageOps.fit(Image.open(root/item['file']),(280,210));x=i%4*300+10;y=i//4*250+10;sheet.paste(im,(x,y));draw.text((x,y+215),str(i+1)+'. '+filename[:34],fill='#40302b',font=font)
sheet.save(out.parent/'Eliza képek – áttekintés.webp','WEBP',quality=85)
print(f'{len(unique)} stockfotó elkészült.')
