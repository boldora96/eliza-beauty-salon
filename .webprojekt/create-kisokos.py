from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from reportlab.lib.pagesizes import A4
from pypdf import PdfReader

ROOT=Path.cwd()
for name in ['Body','BodyBold','Heading','Button','Subtitle']:
 pdfmetrics.registerFont(TTFont(name,str(ROOT/'.webprojekt/qa/pdf-fonts'/f'{name}.ttf')))
W,H=A4; GREEN=HexColor('#4F6045'); BROWN=HexColor('#40302B'); CREAM=HexColor('#F8F5F0'); SURFACE=HexColor('#FBF9F6')
output=ROOT/'output/pdf/Eliza Beauty Salon - Arcapolasi Kisokos.pdf'
c=canvas.Canvas(str(output),pagesize=A4,pageCompression=1)
c.setTitle('Arcápolási Kisokos | Eliza Beauty Salon');c.setAuthor('Eliza Beauty Salon');c.setSubject('Egyszerű arcápolási rutin három oldalon')
styles={
 'body':ParagraphStyle('body',fontName='Body',fontSize=10.2,leading=16,textColor=BROWN),
 'small':ParagraphStyle('small',fontName='Body',fontSize=8,leading=12,textColor=BROWN),
 'title':ParagraphStyle('title',fontName='Heading',fontSize=34,leading=42,textColor=GREEN),
 'h2':ParagraphStyle('h2',fontName='Heading',fontSize=20,leading=26,textColor=GREEN),
 'label':ParagraphStyle('label',fontName='BodyBold',fontSize=9,leading=14,textColor=GREEN),
}
def para(text,x,top,width,style='body'):
 p=Paragraph(text,styles[style]);_,height=p.wrap(width,H);p.drawOn(c,x,top-height);return top-height

def page(number,kicker,title):
 c.setFillColor(CREAM);c.rect(0,0,W,H,fill=1,stroke=0)
 c.drawImage('logo/logo.png',48,H-99,width=104,height=57,mask='auto',preserveAspectRatio=True)
 c.setStrokeColor(HexColor('#4F604533'));c.setLineWidth(.5);c.line(48,52,W-48,52)
 c.setFillColor(BROWN);c.setFont('Body',8);c.drawString(48,34,'ELIZA BEAUTY SALON  |  Arcápolási Kisokos');c.drawRightString(W-48,34,f'{number} / 3')
 para(kicker,48,H-124,W-96,'label');return para(title,48,H-150,W-96,'title')-20

def box(y,title,text,number=None):
 x=48;width=W-96;pad=20
 p=Paragraph(text,styles['body']);_,ph=p.wrap(width-2*pad-(38 if number else 0),H)
 height=max(94,ph+58)
 c.setFillColor(SURFACE);c.setStrokeColor(HexColor('#4F604533'));c.setLineWidth(.5);c.roundRect(x,y-height,width,height,12,fill=1,stroke=1)
 if number:
  c.setFillColor(GREEN);c.setFont('Heading',24);c.drawString(x+pad,y-38,number)
 left=x+pad+(38 if number else 0)
 para(title,left,y-16,width-(left-x)-pad,'h2');para(text,left,y-48,width-(left-x)-pad)
 return y-height-14

y=page(1,'EGY KIS FIGYELEM, MINDEN NAP','Arcápolási Kisokos')
y=para('Egy egyszerű rutin, ami belefér a napodba. A tudatos bőrápolás alapja nem a termékek száma, hanem a kíméletes tisztítás, a hidratálás és a fényvédelem.',48,y,W-96)-24
y=box(y,'Tisztíts kíméletesen','Válassz gyengéd arctisztítót. Langyos vízzel, finom mozdulatokkal dolgozz, majd puha törölközővel itasd fel a vizet. A dörzsölés helyett legyen ez egy nyugodt, rövid lépés.','01')
y=box(y,'Hidratálj rendszeresen','A hidratálás a zsírosabb bőr rutinjában is helyet kaphat. Válassz a bőrödnek kellemes állagú készítményt, és tisztítás után vidd fel. Nem kell egyszerre sok terméket használnod.','02')
y=box(y,'Gondolj a fényvédelemre','Napközben válassz széles spektrumú, legalább SPF 30-as fényvédőt. Kövesd a használati útmutatóját; szabadban általában kétóránként, valamint úszás vagy izzadás után újra kell kenni. Árnyék és védőruházat is segít.','03')
assert y>75,y
c.showPage()
y=page(2,'REGGEL ÉS ESTE','A napi rutinod')
y=para('A következő minta könnyen átlátható kiindulás. A bőröd reakcióit figyeld, és az egyszerű, rendszeresen követhető lépésekre építs.',48,y,W-96)-24
y=box(y,'Reggel: készítsd fel a bőröd','1. Kíméletesen tisztítsd meg az arcodat.<br/>2. Vigyél fel hidratálót, ha a bőröd igényli.<br/>3. Kültéri program előtt használj fényvédőt.<br/>4. A smink a bőrápolás után következhet.')
y=box(y,'Este: tisztítás és hidratálás','1. Távolítsd el a sminket és a nap során lerakódott szennyeződéseket gyengéd lemosóval.<br/>2. Ha orvos által javasolt készítményt használsz, az előírt sorrendet kövesd.<br/>3. Zárd a rutint a bőrödnek megfelelő hidratálóval.')
y=para('Kevesebb lépés, több következetesség',48,y-8,W-96,'h2')-12
y=para('Több erős hatóanyag egyidejű használata irritálhat. Ne vezess be egyszerre több új készítményt: így könnyebben észreveszed, hogyan reagál rájuk a bőröd. Ha valami tartósan csíp, ég vagy kipirosít, hagyd abba a használatát, és kérj szakmai segítséget.',48,y,W-96)-20
assert y>75,y
c.showPage()
y=page(3,'SZEMÉLYRE SZABOTT FIGYELEM','Figyeld, mire van szükséged')
y=para('A jó rutin nem verseny és nem termékgyűjtemény. A cél az, hogy megtaláld azt a néhány lépést, amelyet szívesen és kényelmesen követsz.',48,y,W-96)-24
y=box(y,'Három kérdés a polcod előtt','Mi az, amit a bőröm jól tolerál?<br/>Melyik terméknél érzek kellemetlenséget?<br/>Mi az a rutin, amit tényleg tudok tartani?')
y=box(y,'Ezt érdemes feljegyezned','Írd össze a használt termékek nevét és a használatuk gyakoriságát. Jegyezd fel, mikor jelentkezik szárazság, feszülés vagy kipirosodás. Ezek az észrevételek segítik a személyes konzultációt.')
y=para('Kérdésed van a rutinodról?',48,y-6,W-96,'h2')-12
y=para('Ismerd meg az Eliza Beauty Salon kezeléseit, és kérj személyes egyeztetést a weboldalon. Tartós vagy súlyos bőrpanasz esetén fordulj bőrgyógyászhoz.',48,y,W-96)-18
c.setFillColor(GREEN);c.roundRect(48,y-40,220,40,4,fill=1,stroke=0);c.setFillColor(SURFACE);c.setFont('Button',11);c.drawCentredString(158,y-25,'MEGNÉZEM A WEBOLDALT');c.linkURL('https://elizabeautysalon.netlify.app/kapcsolat#idopont',(48,y-40,268,y),relative=0)
y-=64
para('Általános tájékoztató, nem személyre szabott diagnózis vagy kezelési terv. Készült: 2026. október.',48,y,W-96,'small');y-=38
para('Szakmai háttér: American Academy of Dermatology<br/><link href="https://www.aad.org/public/everyday-care/skin-care-basics/care/skin-care-budget" color="#4F6045">Skin care on a budget</link> · <link href="https://www.aad.org/public/everyday-care/skin-care-basics/care/apply-skin-care-certain-order" color="#4F6045">A bőrápolás sorrendje</link> · <link href="https://www.aad.org/public/everyday-care/skin-care-secrets/routine/healthier-looking-skin" color="#4F6045">Egészségesebb bőr: alapok</link>',48,y,W-96,'small')
assert y>80,y
c.save()
r=PdfReader(str(output));assert len(r.pages)==3
text='\n'.join(p.extract_text() for p in r.pages);assert 'Arcápolási Kisokos' in text and 'fényvédelem' in text
print(output);print('Pages:',len(r.pages),'Bytes:',output.stat().st_size)
