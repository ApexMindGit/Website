"""Render the approved healthcare workflow as a silent MP4 and static poster."""
from pathlib import Path
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import imageio.v2 as imageio

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public'
W, H, FPS, SECONDS = 1920, 1080, 24, 12
BG, INK, MUTED, BLUE = '#f4f6f8', '#111c2b', '#596b7e', '#087eb5'
def font(size, bold=False):
    return ImageFont.truetype('C:/Windows/Fonts/' + ('segoeuib.ttf' if bold else 'segoeui.ttf'), size)

nodes = [
    (100, 260, '01', 'EHR', 'eClinicalWorks', ['Appointment schedules', 'Patient records'], 'SOURCE'),
    (710, 260, '02', 'Daily patient extraction', 'Date-wise appointment batches', ['Patient and insurance details', 'Scheduled visit context'], 'EXTRACT'),
    (1320, 260, '03', 'Payer portal extraction', 'APIs · HTML · Selenium', ['Insurance eligibility data', 'Portal-specific extraction'], 'RETRIEVE'),
    (1320, 680, '04', 'AI parsing', 'LLMs → structured JSON', ['Parse irregular portal data', 'Normalize benefit fields'], 'PARSE'),
    (710, 680, '05', 'Verification results', 'Structured insurance data', ['Active status · copay', 'Deductible · coinsurance'], 'STRUCTURE'),
    (100, 680, '06', 'EHR write-back', 'eClinicalWorks · UiPath / APIs', ['Update patient records', 'Save verification results'], 'UPDATE'),
]
CW, CH = 500, 264
paths = [[(600,392),(710,392)], [(1210,392),(1320,392)],
         [(1570,524),(1570,680)], [(1320,812),(1210,812)], [(710,812),(600,812)]]
def point(path, p):
    a,b=path
    return (a[0]+(b[0]-a[0])*p, a[1]+(b[1]-a[1])*p)

def frame(t=None):
    im=Image.new('RGB',(W,H),BG)
    d=ImageDraw.Draw(im)
    d.text((100,56),'APEX MIND  /  SYSTEM ARCHITECTURE',font=font(22,True),fill=BLUE)
    d.text((100,102),'Insurance verification, end to end.',font=font(57,True),fill=INK)
    d.text((100,186),'Daily patient data → payer portals → AI parsing → updated EHR records',font=font(27),fill=MUTED)
    phase = None if t is None else min(int(t/2.5),5)
    for j,path in enumerate(paths):
        a,b=path
        d.line(path,fill='#bccbd6',width=4)
        angle=math.atan2(b[1]-a[1],b[0]-a[0])
        tip=b
        points=[tip,(tip[0]-14*math.cos(angle-.48),tip[1]-14*math.sin(angle-.48)),(tip[0]-14*math.cos(angle+.48),tip[1]-14*math.sin(angle+.48))]
        d.polygon(points,fill=BLUE)
        if t is not None and j*2.5+1.1<=t<(j+1)*2.5+1.1:
            p=(t-(j*2.5+1.1))/2.5
            x,y=point(path,p)
            d.ellipse((x-12,y-12,x+12,y+12),fill='#39c8ff',outline=BLUE,width=2)
    # Central annotation follows the flow without inventing another system.
    d.rounded_rectangle((100,568,1355,631),radius=14,fill='#e6edf3')
    d.text((122,582),'DATA FLOW',font=font(20,True),fill=BLUE)
    d.text((275,580),'Extract → retrieve → parse → structure → write back',font=font(26),fill=INK)
    for i,(x,y,num,title,tech,lines,tag) in enumerate(nodes):
        active=phase==i
        done=t is None or t>=i*2.5+1.5
        d.rounded_rectangle((x,y+5,x+CW,y+CH+5),radius=22,fill='#e4e9ee')
        d.rounded_rectangle((x,y,x+CW,y+CH),radius=22,fill='white',outline=BLUE if active else '#d4dee6',width=4 if active else 2)
        d.rounded_rectangle((x+24,y+22,x+77,y+65),radius=11,fill=BLUE if active or done else '#e9eff4')
        d.text((x+35,y+26),num,font=font(24,True),fill='white' if active or done else MUTED)
        d.text((x+96,y+33),tag,font=font(19,True),fill=BLUE)
        d.text((x+24,y+83),title,font=font(32,True),fill=INK)
        d.text((x+24,y+133),tech,font=font(24),fill=BLUE)
        d.line((x+24,y+177,x+CW-24,y+177),fill='#e5ebf0',width=2)
        for k,line in enumerate(lines):
            d.text((x+24,y+188+k*31),line,font=font(23),fill=MUTED)
    d.text((100,1002),'HEALTHCARE / REVENUE CYCLE MANAGEMENT',font=font(20,True),fill=MUTED)
    d.text((1320,1002),'AUTOMATED VERIFICATION PIPELINE',font=font(20,True),fill=BLUE)
    return im

if __name__=='__main__':
    frame().save(OUT/'healthcare-rcm-architecture-poster.png')
    writer=imageio.get_writer(str(OUT/'healthcare-rcm-architecture.mp4'),fps=FPS,codec='libx264',quality=8,macro_block_size=8,ffmpeg_params=['-movflags','+faststart','-pix_fmt','yuv420p'])
    try:
        for n in range(FPS*SECONDS):
            writer.append_data(np.asarray(frame(n/FPS * 18/SECONDS)))
    finally:
        writer.close()
    print(f'Rendered {SECONDS}-second 1920×1080 MP4 and static poster.')
