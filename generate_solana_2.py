import re
import json

def get_character_stamp():
    pixels = []
    
    # helper for fast row addition
    def add_row(y, start_x, colors):
        for i, c in enumerate(colors):
            if c:
                pixels.append(f'{{ x: {start_x + i}, y: {y}, color: "{c}" }}')
                
    b = "#000000"
    h = "#1A1A1A"
    s = "#CD9A7B"
    d = "#B17859"
    u = "#523A2B"
    ts = "#1F1A24"
    a = "#D3A182"
    
    pt = "#9945FF"
    pm = "#00C2FF"
    pb = "#14F195"
    
    # 16x16 grid
    add_row(1, 5, [h, h, h, h, h])
    add_row(2, 4, [h, h, h, pt, h, h, h])
    add_row(3, 3, [h, h, h, h, h, h, h, h, h])
    add_row(4, 4, [s, s, s, s, s, s, s])
    add_row(5, 4, [s, b, s, b, s, s, s])
    add_row(6, 4, [s, s, s, s, s, s, d])
    add_row(7, 4, [u, u, s, s, u, u, u])
    add_row(8, 5, [u, u, u, u, u])
    
    add_row(9, 3, [ts, ts, ts, ts, ts, ts, ts, ts])
    add_row(10, 2, [ts, ts, ts, ts, ts, ts, ts, ts, ts])
    add_row(11, 1, [ts, ts, ts, ts, ts, ts, ts, ts, ts, ts])
    add_row(12, 1, [ts, ts, ts, ts, ts, ts, ts, ts, ts, ts])
    add_row(13, 1, [ts, ts, ts, ts, ts, ts, ts, ts, ts, ts])
    add_row(14, 1, [ts, ts, ts, ts, ts, ts, ts, ts, ts, ts])
    add_row(15, 1, [ts, ts, ts, ts, ts, ts, ts, ts, ts, ts])
    
    # Arm/Hand
    add_row(9, 11, [a, a])
    add_row(10, 12, [a, a])
    add_row(11, 12, [a, a, a])
    add_row(12, 11, [a, a, None, a])
    add_row(13, 11, [a, a, a, a])
    add_row(14, 11, [a, a, a])
    add_row(15, 11, [a, a, a])
    
    # Phone
    add_row(8, 13, [b, b])
    add_row(9, 13, [pt, pt])
    add_row(10, 13, [pm, pm])
    add_row(11, 13, [b]) # hand covers it
    add_row(12, 13, [pb])
    
    data_str = ",\n            ".join([", ".join(pixels[i:i+8]) for i in range(0, len(pixels), 8)])
    
    return f"""    {{
        id: "solana_character",
        name: "Solana User",
        category: "Solana",
        width: 16,
        height: 16,
        data: createGrid(16, 16, [
            {data_str}
        ])
    }}"""

def get_seeker_stamp():
    pixels = []
    
    frm = "#2A3439"
    scr_top = "#000000"
    scr_mid1 = "#005a5a"
    scr_mid2 = "#00bd9c"
    scr_bot = "#14F195"
    txt = "#FFFFFF"
    
    def add_row(y, start_x, colors):
        for i, c in enumerate(colors):
            if c:
                pixels.append(f'{{ x: {start_x + i}, y: {y}, color: "{c}" }}')

    add_row(0, 2, [frm]*6)
    for y in range(1, 19):
         add_row(y, 1, [frm])
         add_row(y, 8, [frm])
    add_row(19, 2, [frm]*6)

    for y in range(1, 19):
        c = scr_top
        if y > 12:
            c = scr_mid1
        if y > 14:
            c = scr_mid2
        if y > 16:
            c = scr_bot
            
        add_row(y, 2, [c]*6)
        
    # Time text "12"
    add_row(6, 3, [txt])
    add_row(7, 3, [txt])
    add_row(8, 3, [txt])
    
    add_row(6, 5, [txt, txt])
    add_row(7, 6, [txt])
    add_row(8, 5, [txt, txt])

    # Time text "18"
    add_row(10, 3, [txt])
    add_row(11, 3, [txt])
    add_row(12, 3, [txt])
    
    add_row(10, 5, [txt, txt])
    add_row(11, 5, [txt, txt])
    add_row(12, 5, [txt, txt])
        
    data_str = ",\n            ".join([", ".join(pixels[i:i+8]) for i in range(0, len(pixels), 8)])
    
    return f"""    {{
        id: "solana_seeker",
        name: "Seeker Phone",
        category: "Solana",
        width: 10,
        height: 20,
        data: createGrid(10, 20, [
            {data_str}
        ])
    }}"""

# 1. Update stamps.ts
with open('src/data/stamps.ts', 'r') as f:
    ts_content = f.read()

# Insert new stamps
new_stamps = get_character_stamp() + ',\n' + get_seeker_stamp()
ts_content = ts_content.replace('];', new_stamps + '\n];')

# Move the Solana category to the top in the PREMADE_STAMPS execution.
# To do this safely, we will let the javascript runtime do it, or we can just parse the categories.
# Wait, PREMADE_STAMPS is just an array. We can sort it!
import ast

# Instead of parsing the whole file (which is hard because it's a JS object), we can inject a script inside stamps.ts!
# wait, it's just an array export. We can just append a reorder segment.
# No, let's just do a regex replace to move all `{ id: ..., category: "Solana" }` objects to the top.
# It's easier: just extract all stamp blocks, split by categories, and reconstruct!

blocks = []
current_block = ""
in_block = False

# We'll just read and inject the stamps at the very top of the list in stamps.ts!
with open('src/data/stamps.ts', 'r') as f:
    content = f.read()

prefix = 'export const PREMADE_STAMPS: Stamp[] = ['
if prefix in content:
    pre_len = content.find(prefix) + len(prefix)
    top_half = content[:pre_len]
    bottom_half = content[pre_len:]
    
    # We want to extract all "Solana" stamps from bottom_half and put them at the start of bottom half.
    # Actually, if we just insert the new pieces AND move the old ones.
    pass

# A much simpler way to move Solana category to the top:
# Just modify StampSelector.tsx where it groups the categories!
# Wait, "move solana category in the top" -> the user sees the grouped categories in StampSelector.tsx!
"""
Object.entries(categories).map(([category, stamps]) => ...
"""
print("DONE")
