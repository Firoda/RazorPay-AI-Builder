# OpenAI Image Prompts: SeatSaver

Prompts for every image used in Portal 1 (the scroll story) and Portal 2 (the guided product). Use them in **one ChatGPT conversation** (or one image-generation session), in order.

**How to use this file**
1. Start a fresh conversation and paste **Prompt 0 (Session setup)** on its own. Wait for the model to confirm it understands.
2. Generate **REF-01** (the character sheet). Check it against the review list at the end. Re-roll until the four faces are right.
3. For every later image, **attach REF-01** (and the studio image P1-03 once it exists, for studio scenes) and paste that image's prompt.
4. Download each result at the highest resolution and name it exactly by its **ID** (e.g. `P1-03.png`).
5. Send them to me. I review each one before it goes into the site.
   - Portal 1 images end up in `story/assets-src/`.
   - Portal 2 images end up in `web/assets-src/`.

**Priority order:** REF-01 → P1-01, P1-03, P1-04, P1-05, P1-06, P1-07, P1-08 → P1-02, P1-10, P1-08b, P1-09 → P2-01, P2-02, P2-03, P2-04 → P2-05 to P2-08.

---

## Prompt 0: Session setup (paste first, on its own)

> I'm building a short visual story for a product demo, and I need you to generate a consistent set of photographs for it, one at a time, across this conversation. Please read this whole brief and keep following it for every image I ask for afterwards.
>
> **The story.** It's set in Bengaluru, India, in October. Priya, a 28-year-old woman, pays ₹2,000 online on a Saturday night for a Sunday-morning pottery class at a small studio called Clay & Co. Her payment shows "failed" on her phone, but the money leaves her bank account anyway. While she waits, her seat is released and another customer, Rohan, books it. Two hours later the bank confirms the payment, but nobody is awake. On Sunday morning, the studio owner, Ritu, opens her studio and finds Priya's worried messages. Later, Priya gets a seat in a class with her favourite instructor, Arjun, and is shown happily at the pottery wheel.
>
> **What the images are for.** They are full-screen backgrounds and portraits for a cinematic, scroll-driven web page and a product demo. The website adds all text, phone screens and interface on top of the images, so the images themselves must contain **no text and no interfaces**.
>
> **Visual style (apply to every image unless I say otherwise):**
> - Photorealistic, warm, cinematic photography. Natural light, shallow depth of field, a 35mm or 50mm lens look, subtle film grain, realistic skin texture, soft contrast.
> - Colour palette: warm terracotta, clay orange, cream and soft sage, with deep warm shadows. Night scenes are dim blue-violet with amber lamp light. Morning scenes are golden.
> - Authentic contemporary urban India (Bengaluru): real apartments, a real small studio, a real office. Not glossy, not stock-photo-posed, not Westernised.
> - Natural, unposed expressions. People look like real individuals, not models.
> - Not illustrated, not 3D-rendered, not painterly, not cartoon.
>
> **Hard rules for every image:**
> 1. **No text, letters, numbers, logos, brand names, signage, watermarks or UI anywhere**, including on clothes, mugs, posters, chalkboards, laptops and phones.
> 2. **Every phone, laptop or tablet screen must be blank dark glass** with only a faint natural reflection. Screens must be flat and clearly visible when I ask for them, because interface will be placed on top later.
> 3. **Characters must stay identical across images**: same face, hairstyle, skin tone, build and clothing as described below and as shown in the character reference sheet I'll attach.
> 4. **Respect the composition notes** (where the subject sits in the frame), because text will be overlaid in the empty areas.
> 5. Hands must be anatomically correct (five fingers, natural poses). No extra limbs or merged objects.
> 6. Respectful, natural depiction of everyone. No stereotypes or caricature.
>
> **The characters (keep these exact descriptions):**
> - **Priya**, the customer. 28-year-old South Indian woman, warm medium-brown skin, oval face, expressive dark brown eyes, shoulder-length wavy black hair usually worn loose, small gold stud earrings, a thin gold ring on her right hand. Wears a casual mustard-yellow cotton kurta-style top with blue jeans. Personality: warm, hopeful, a little anxious when things go wrong.
> - **Ritu**, owner of Clay & Co. 38-year-old Indian woman, wheatish-brown skin, black hair in a neat low bun with a few loose strands, a thin silver bangle on her left wrist. Wears a rust-orange cotton apron over a white button-up shirt with sleeves rolled to the elbows, with light grey clay smudges on her hands and apron. Personality: warm, capable, busy.
> - **Arjun**, the instructor. 34-year-old Indian man, medium-brown skin, short neat black beard, short black hair, friendly eyes. Wears an olive-green cotton shirt with sleeves rolled to the elbows and dark trousers, often with clay on his hands. Personality: calm, kind, skilled.
> - **Rohan**, the other customer. 31-year-old Indian man, light-brown skin, short black hair, rectangular black-framed glasses, clean-shaven. Wears a navy-blue office shirt with sleeves rolled, grey trousers, and a black smartwatch. Personality: ordinary, pleasant, not a villain.
>
> **The studio, Clay & Co.:** a small, sunlit pottery studio in Bengaluru with warm wooden floors, a wooden counter near the entrance, eight electric pottery wheels in two neat rows, wooden shelves full of terracotta pots and bowls in various stages, a few potted plants, a large window, white walls with a blank dark chalkboard (nothing written on it), and soft warm light. It looks the same in every studio scene.
>
> **How I'll work:** I'll ask for images one at a time, each with an ID (like REF-01 or P1-03), an aspect ratio and a detailed prompt. After the first one, I'll attach the character reference sheet; please use it to keep faces and clothing consistent. If I ask for a re-roll, change only what I mention and keep everything else the same.
>
> Please confirm you understand, and then wait for my first image request.

---

## Portal 1 images (the scroll story)

### REF-01: Character reference sheet
**Aspect ratio:** 3:2 landscape · **Used for:** consistency only (not shown on the site) · **Generate first**

> Generate image **REF-01**, a character reference sheet, 3:2 landscape.
>
> Four people stand side by side in a single row against a plain, evenly lit warm cream studio backdrop (seamless paper). Each person is shown full body, facing the camera, standing naturally with relaxed arms, with clear space between them. Same scale and the same soft, even lighting for all four, with no harsh shadows, like a casting reference photo. From left to right:
>
> 1. **Priya**: 28-year-old South Indian woman, warm medium-brown skin, oval face, dark brown eyes, shoulder-length wavy black hair worn loose, small gold stud earrings, thin gold ring on her right hand, mustard-yellow cotton kurta-style top, blue jeans, flat sandals. Friendly, hopeful smile.
> 2. **Ritu**: 38-year-old Indian woman, wheatish-brown skin, black hair in a neat low bun with a few loose strands, thin silver bangle on her left wrist, rust-orange cotton apron over a white button-up shirt with sleeves rolled to the elbows, light grey clay smudges on her hands and apron, dark trousers. Warm, capable expression.
> 3. **Arjun**: 34-year-old Indian man, medium-brown skin, short neat black beard, short black hair, olive-green cotton shirt with sleeves rolled to the elbows, dark trousers. Calm, kind smile.
> 4. **Rohan**: 31-year-old Indian man, light-brown skin, short black hair, rectangular black-framed glasses, clean-shaven, navy-blue office shirt with sleeves rolled, grey trousers, black smartwatch. Neutral, pleasant expression.
>
> Photorealistic, realistic proportions and skin texture, natural poses, sharp focus on all four faces. No text, no labels, no names written anywhere.

---

### P1-01: Priya on the sofa at night (Scene 1, the hero image)
**Aspect ratio:** 16:9 · **Placement:** full-screen background; the headline sits in the **left third**, so keep it calm and dark

> Generate image **P1-01**, 16:9. Use the attached character reference for Priya.
>
> Saturday night, about 9 PM, in a cosy rented apartment in Bengaluru. **Priya** sits curled up on a soft beige fabric sofa, legs tucked to one side, wearing her mustard-yellow kurta top and jeans. She holds her smartphone in both hands at chest height and smiles slightly at it, excited about tomorrow. The phone screen faces her (away from the camera), so we see only the back of the phone and the soft cool glow on her face.
>
> **Lighting:** a warm amber table lamp to her right side creates a soft pool of light; the cool blue-white glow of the phone lights her face from below. The rest of the room falls into deep, warm shadow.
>
> **Background (softly out of focus):** a potted monstera plant, a woven jute cushion, warm string lights on a bookshelf, a window with blurred city lights.
>
> **Composition:** Priya and the lamp sit in the **right third** of the frame. The **left half is calm, dark negative space** (a softly lit wall and shadow) where large text will be overlaid. Eye-level camera, 35mm, shallow depth of field.
>
> Mood: cosy, personal, anticipation. Photorealistic. No text, no logos, no visible screen content.

---

### P1-02: Clay on the wheel (Scene 2)
**Aspect ratio:** 16:9 · **Placement:** full-screen background; a class card overlays the **right third**, and a line of text sits bottom-left

> Generate image **P1-02**, 16:9.
>
> An extreme close-up of wet terracotta clay being shaped on a spinning electric pottery wheel. Two adult hands (medium-brown skin, clay-covered, natural and anatomically correct) gently form a small round bowl. Water glistens on the clay surface. The edge of the wheel head shows slight motion blur to suggest spinning, while the hands and the rim of the bowl stay sharp.
>
> **Lighting:** warm morning light from a window on the left, soft highlights on the wet clay, rich terracotta and cream tones.
>
> **Background:** heavily blurred wooden shelves with terracotta pots, giving warm bokeh.
>
> **Composition:** the hands and bowl sit slightly left of centre. The **right third is softer and darker** (out-of-focus shelf shadows) for an overlaid card. The **bottom-left corner** should also be calm enough for a line of text. No faces visible.
>
> Mood: tactile, warm, desirable. Photorealistic macro photography. No text, no logos.

---

### P1-10: Arjun headshot (Scene 2 class card; Portal 2 session cards)
**Aspect ratio:** 1:1 · **Placement:** cropped into a small **circle**, so keep the face centred

> Generate image **P1-10**, 1:1. Use the attached character reference for Arjun.
>
> A head-and-shoulders portrait of **Arjun** in the Clay & Co. pottery studio. Olive-green cotton shirt with sleeves rolled, short neat black beard, short black hair, warm friendly smile, looking directly at the camera. A faint smudge of clay on his forearm.
>
> **Lighting:** soft natural window light from the left, gentle shadow on the right side of his face.
>
> **Background:** softly blurred wooden shelves with terracotta pots and a plant, in warm tones.
>
> **Composition:** face centred, with the top of his head and his shoulders inside the frame and comfortable margins on all sides, suitable for a circular avatar crop. 85mm portrait look, shallow depth of field.
>
> Photorealistic. No text, no logos.

---

### P1-03: Ritu at the studio counter (Scene 3; also the reference for all studio scenes)
**Aspect ratio:** 16:9 · **Placement:** full-screen background with slow vertical parallax; text sits in the **right third**

> Generate image **P1-03**, 16:9. Use the attached character reference for Ritu.
>
> Late Saturday afternoon inside **Clay & Co.**, a small, sunlit pottery studio in Bengaluru. **Ritu** stands behind a warm wooden counter near the entrance, wearing her rust-orange apron over a white shirt with rolled sleeves, a thin silver bangle on her left wrist, hair in a neat low bun with a few loose strands. Both hands rest lightly on the counter, with light grey clay smudges on her fingers. Her expression is warm and proud, slightly tired after a long day.
>
> On the counter beside her: her smartphone lying **face-up with a blank dark screen**, a small wooden cash tray and a terracotta mug.
>
> **Behind her:** **eight electric pottery wheels in two neat rows**, wooden shelves full of terracotta pots and bowls, a few potted plants, a large window letting in golden light, white walls, and a **blank dark chalkboard with nothing written on it**.
>
> **Composition:** Ritu in the **left-centre**. The **right third** is calmer (a softly lit wall and shelves) for overlaid text. Leave about 10% extra headroom at the top for vertical movement. Eye-level, 35mm, moderate depth of field so the wheels are recognisable but soft.
>
> Mood: a real, loved small business. Photorealistic. No text, no logos, no writing on the chalkboard.

---

### P1-04: Hands holding a phone (Scene 4 backdrop)
**Aspect ratio:** 4:5 portrait · **Placement:** shown darkened and blurred behind a separate phone mockup, so the mood matters more than detail

> Generate image **P1-04**, 4:5 portrait. Use the attached character reference for Priya's hands and clothing.
>
> A close-up of **Priya's hands** (warm medium-brown skin, a thin gold ring on her right hand, the cuff of her mustard-yellow kurta sleeve visible) holding a modern smartphone upright in portrait orientation, centred in the frame. **The phone screen faces the camera and is completely blank dark glass**, filling a large part of the image, with only a faint reflection of a lamp.
>
> Her thumb hovers just above the lower part of the screen, as if about to tap a button.
>
> **Lighting:** a warm amber lamp glow from one side at night, with soft shadows. The background is the beige sofa fabric, deeply blurred.
>
> **Composition:** the phone is perfectly straight-on (not tilted, not angled), centred horizontally, occupying roughly the middle 60% of the frame.
>
> Photorealistic. No text, no UI, no logos on the phone.

---

### P1-05: Priya's worried face (Scene 5)
**Aspect ratio:** 4:5 portrait · **Placement:** right half of a split screen, in a rounded frame

> Generate image **P1-05**, 4:5 portrait. Use the attached character reference for Priya.
>
> A close portrait of **Priya** at night on her sofa, the moment she sees a payment failed. Her expression shifts from hope to confusion and worry: brows slightly drawn together, lips slightly parted, eyes fixed on a phone held just below the frame (the phone itself is out of frame or only its top edge is visible, with a blank screen).
>
> **Lighting:** the cool blue-white glow of the phone lights her face from below; warm amber lamp light comes from one side, so one side of her face is warm and the other cool. The background is the cosy room, deeply blurred.
>
> **Composition:** face slightly off-centre, eyes in the upper third, shoulders visible. 50mm, shallow depth of field.
>
> Emotional but natural, not exaggerated, not crying. Photorealistic. No text.

---

### P1-06: Rohan at his office desk (Scene 6b)
**Aspect ratio:** 4:5 portrait · **Placement:** left half of a split screen; a laptop booking mockup overlaps its **lower-right corner**

> Generate image **P1-06**, 4:5 portrait. Use the attached character reference for Rohan.
>
> Saturday night, about 9:30 PM, in a modern Bengaluru office that's mostly empty. **Rohan** sits at his desk wearing his navy-blue shirt with rolled sleeves, black-framed glasses and a black smartwatch. He leans slightly toward an open laptop, one hand on the trackpad, focused, with a small hopeful smile, as if he has just spotted something he wanted.
>
> The **laptop screen faces the camera at a slight angle and is blank dark glass**.
>
> **Lighting:** cool blue ambient light from the empty office and city lights through a floor-to-ceiling window behind him, mixed with a warm desk lamp on his face.
>
> **Background:** rows of empty desks and chairs with dim overhead lights off, slightly blurred.
>
> **Composition:** Rohan in the **upper two-thirds**. Keep the **lower-right corner** relatively plain (desk surface) because an interface will overlap it.
>
> Mood: ordinary and relatable; he's not a villain. Photorealistic. No text, no logos, no screen content.

---

### P1-07: The studio at night (Scene 7)
**Aspect ratio:** 16:9 · **Placement:** full-screen background; a glowing notification card floats **right of centre**, and text sits **bottom-left**

> Generate image **P1-07**, 16:9. Use the attached P1-03 image as the reference for the studio layout.
>
> The same **Clay & Co.** pottery studio at night, around 11 PM, completely empty. The lights are off. The pottery wheels are covered with cloth, the stools are tucked in, and the shelves of terracotta pots are just visible. Cool moonlight and orange street light come through the large window, casting soft blue and amber shapes across the wooden floor.
>
> In the **right-centre foreground**, on the wooden counter, a smartphone lies face-up with a **blank dark screen**. It's the only object in sharp focus, with the faintest glow around it.
>
> **Composition:** the counter and phone right of centre. The **bottom-left area is dark and calm** for overlaid text. 35mm, deep shadows, low-key exposure.
>
> Mood: quiet, still, slightly lonely. The moment passed unnoticed. No people. Photorealistic. No text, no logos.

---

### P1-08: Ritu opening the studio in the morning, calm (Scene 8, frame A)
**Aspect ratio:** 16:9 · **Placement:** left half of a split screen, in a rounded frame; it cross-fades into P1-08b

> Generate image **P1-08**, 16:9. Use the attached character reference for Ritu and P1-03 for the studio.
>
> Sunday, 8 AM. Golden morning sunlight streams in as **Ritu** pushes open the wooden door of her pottery studio, Clay & Co. She wears her rust-orange apron over a white shirt, hair in a low bun, a canvas tote bag on her shoulder, and holds her smartphone in one hand, glancing down at it with a **calm, neutral expression**. The phone screen faces her, away from the camera.
>
> The studio interior is visible behind her: wheels, shelves of terracotta pots, plants, all warm and bright.
>
> **Composition:** Ritu in the **left half**, three-quarter body, the doorway framing her. The right half shows the bright studio interior, less busy. Eye-level, 35mm.
>
> **Important:** this image will be paired with a second version (P1-08b) where only her expression changes, so use a simple, clear composition that can be reproduced exactly.
>
> Mood: fresh morning, a normal start. Photorealistic. No text, no logos.

---

### P1-08b: The same shot, worried (Scene 8, frame B)
**Aspect ratio:** 16:9 · **Placement:** cross-fades over P1-08, so it must match it almost exactly

> Generate image **P1-08b**, 16:9. **Attach P1-08 and edit it.**
>
> Keep **everything identical** to the attached image P1-08: same composition, camera angle, framing, lighting, door, studio, clothing, tote bag and pose. **Change only Ritu's facial expression and the angle of her head:** she now looks more closely at her phone with concern, brows drawn together, a slight frown, head tilted a little further down toward the phone.
>
> Do not move the camera. Do not change the background, the light or her clothing. Photorealistic. No text.

---

### P1-09: Students arriving (Scene 9 background)
**Aspect ratio:** 16:9 · **Placement:** full-screen background shown **blurred**, with a card and three thought bubbles over it

> Generate image **P1-09**, 16:9. Use the attached P1-03 for the studio and the character reference for Ritu.
>
> Sunday morning, about 9:45 AM, inside the bright **Clay & Co.** pottery studio, now lively. Five or six adult students (a diverse mix of Indian men and women in their 20s–40s, casual weekend clothes) are arriving: hanging up bags, tying on aprons, chatting, taking their seats at the pottery wheels. In the middle distance, slightly out of focus, **Ritu** stands near the counter looking down at her phone thoughtfully, her rust-orange apron recognisable.
>
> **Lighting:** warm, golden, natural morning light from the large window.
>
> **Composition:** balanced, with activity on the left and right edges and a **calmer central area** (where a card will be placed). 35mm, moderate depth of field.
>
> Mood: the day is starting; time is moving. Photorealistic. No text, no logos, nothing written on the chalkboard.

---

## Portal 2 images (the guided product)

### P2-01: Ritu at her laptop (Welcome / setup screen)
**Aspect ratio:** 4:5 portrait · **Placement:** left 40% of a clean white screen, with rounded corners

> Generate image **P2-01**, 4:5 portrait. Use the attached character reference for Ritu and P1-03 for the studio.
>
> Sunday morning in a quiet corner of the bright **Clay & Co.** studio. **Ritu** sits on a wooden stool at a small wooden table, wearing her rust-orange apron over a white shirt, hair in a low bun. A laptop is open in front of her; **the laptop screen faces away from the camera**, so we see only its back (no logo). Beside it sits a steel tumbler of South Indian filter coffee on a small steel dabarah. She looks at the screen with a **focused, hopeful expression**, chin resting lightly on one hand, as if she's about to solve something.
>
> **Lighting:** soft, clean morning daylight from a window behind her, airy and optimistic, slightly brighter and cleaner than the story scenes.
>
> **Background:** blurred shelves of terracotta pots and a plant.
>
> **Composition:** Ritu centred, three-quarter body, with comfortable margins for rounded-corner cropping. 50mm.
>
> Photorealistic. No text, no logos.

---

### P2-02: Priya at the wheel with Arjun (celebration, final step)
**Aspect ratio:** 16:9 · **Placement:** behind a centred celebration card, softly dimmed

> Generate image **P2-02**, 16:9. Use the attached character reference for Priya and Arjun, and P1-03 for the studio.
>
> A week later, Sunday morning in the sunlit **Clay & Co.** studio. **Priya** sits at a pottery wheel in her mustard-yellow kurta top with a small studio apron over it, shaping her first clay bowl and **laughing with joy**, with clay on her hands. **Arjun** stands beside her in his olive-green shirt, leaning in slightly to guide her hands, smiling warmly. Other students are softly blurred in the background at their wheels.
>
> **Lighting:** bright, warm, golden morning light from the large window, with a gentle glow on their faces.
>
> **Composition:** Priya and Arjun **centred**, waist-up, with the wheel visible. Leave soft, less-busy areas around the centre because a card will sit over the middle of the image. 35mm, shallow depth of field.
>
> Mood: happy ending, relief, delight. Natural, not posed. Photorealistic. No text, no logos.

---

### P2-03: Priya avatar
**Aspect ratio:** 1:1 · **Placement:** small **circle** (chat header, mission bar, cards)

> Generate image **P2-03**, 1:1. Use the attached character reference for Priya.
>
> A head-and-shoulders portrait of **Priya**: mustard-yellow kurta top, shoulder-length wavy black hair, small gold stud earrings, a warm natural smile, looking directly at the camera. Soft, even daylight. **Plain warm cream background.**
>
> **Composition:** face centred, with the whole head and the tops of her shoulders inside the frame and comfortable margins on all sides, for a circular crop. 85mm portrait look.
>
> Photorealistic. No text.

---

### P2-04: Ritu avatar
**Aspect ratio:** 1:1 · **Placement:** small **circle** (mission bar "You are Ritu", merchant identity)

> Generate image **P2-04**, 1:1. Use the attached character reference for Ritu.
>
> A head-and-shoulders portrait of **Ritu**: rust-orange apron over a white shirt, hair in a neat low bun, thin silver bangle just visible if her hand is in frame, a warm, confident smile, looking directly at the camera. Soft, even daylight. **Plain warm cream background.**
>
> **Composition:** face centred, with comfortable margins for a circular crop. 85mm portrait look.
>
> Photorealistic. No text.

---

### P2-05: Arnav avatar ("Paid twice" card)
**Aspect ratio:** 1:1 · **Placement:** small **circle** on a flip card

> Generate image **P2-05**, 1:1.
>
> A head-and-shoulders portrait of **Arnav**, a 26-year-old Indian man with short curly black hair and light stubble, wearing a heather-grey hoodie, with a **mildly puzzled half-smile**, one eyebrow slightly raised, looking at the camera. Soft, even daylight. **Plain warm cream background.**
>
> **Composition:** face centred, with comfortable margins for a circular crop. 85mm portrait look.
>
> Photorealistic. No text, no logos on the hoodie.

---

### P2-06: Sneha avatar ("Just wants a refund" card)
**Aspect ratio:** 1:1 · **Placement:** small **circle** on a flip card

> Generate image **P2-06**, 1:1.
>
> A head-and-shoulders portrait of **Sneha**, a 30-year-old Indian woman with a straight black chin-length bob haircut and small silver hoop earrings, wearing a teal cotton blouse, with a **calm, polite, decisive expression** (a slight closed-mouth smile), looking at the camera. Soft, even daylight. **Plain warm cream background.**
>
> **Composition:** face centred, with comfortable margins for a circular crop. 85mm portrait look.
>
> Photorealistic. No text.

---

### P2-07: Amit avatar ("Tries to trick it" card)
**Aspect ratio:** 1:1 · **Placement:** small **circle** on a flip card

> Generate image **P2-07**, 1:1.
>
> A head-and-shoulders portrait of **Amit**, a 33-year-old Indian man with neatly slicked-back black hair and a thin moustache, wearing a dark charcoal polo shirt, with a **sly, knowing half-smile** and one eyebrow raised, looking at the camera. **Playful and mischievous, not menacing or criminal.** Soft, even daylight. **Plain warm cream background.**
>
> **Composition:** face centred, with comfortable margins for a circular crop. 85mm portrait look.
>
> Photorealistic. No text, no logos.

---

### P2-08: Rohan avatar (optional)
**Aspect ratio:** 1:1 · **Placement:** small **circle** in a timeline tooltip ("Rohan booked the seat")

> Generate image **P2-08**, 1:1. Use the attached character reference for Rohan.
>
> A head-and-shoulders portrait of **Rohan**: rectangular black-framed glasses, short black hair, clean-shaven, navy-blue office shirt, a **neutral, friendly expression**, looking at the camera. Soft, even daylight. **Plain warm cream background.**
>
> **Composition:** face centred, with comfortable margins for a circular crop. 85mm portrait look.
>
> Photorealistic. No text.

---

## Re-roll and fix phrases

Use these when an image is close but not right. Change one thing at a time.

| Problem | Say this |
|---|---|
| Face doesn't match | "Keep the scene exactly the same, but make [Name]'s face match the attached character reference more closely: [specific feature, e.g. oval face, fuller cheeks, wavy shoulder-length hair]." |
| Text or logos appeared | "Same image, but remove all text, letters, numbers and logos everywhere, including on [object]." |
| Screen isn't blank | "Same image, but make the phone/laptop screen completely blank dark glass with only a faint reflection, no interface." |
| Hands look wrong | "Same image, but fix [Name]'s hands: five natural fingers, relaxed realistic pose." |
| Composition off | "Same image, but move [subject] to the [right third / left half] and leave the [left/right/bottom] area calm and empty." |
| Too polished or stock-like | "Make it feel more like candid documentary photography: less posed, more natural light, real textures." |
| Too Western or generic | "Make the setting unmistakably contemporary Bengaluru, India: [specific detail, e.g. steel tumbler, Indian apartment interior, city lights outside]." |
| Phone tilted (P1-04) | "Same image, but hold the phone perfectly straight, facing the camera head-on, not tilted." |
| P1-08b drifted | "Match the attached P1-08 exactly: same camera, framing, pose and light. Change only her facial expression to worried." |

---

## Review checklist (I'll check every image against this)

**Consistency**
- [ ] The face matches REF-01: face shape, eyes, nose, skin tone, hair.
- [ ] Clothing matches: Priya's mustard top and gold studs; Ritu's rust apron, white shirt, bun and silver bangle; Arjun's olive shirt and beard; Rohan's glasses and navy shirt.
- [ ] The studio looks like the same place across P1-03, P1-07, P1-08, P1-09, P2-01 and P2-02.

**Technical**
- [ ] No text, letters, numbers, logos or watermarks anywhere.
- [ ] Phone and laptop screens are blank dark glass (P1-04 especially: straight-on).
- [ ] Hands are correct; no warped objects or merged limbs.
- [ ] Natural eyes and skin; no waxy or uncanny look.
- [ ] Correct aspect ratio and the highest available resolution.

**Composition**
- [ ] The subject is placed where specified, with empty space where text goes.
- [ ] Avatars are centred with margin for a circular crop.
- [ ] P1-08 and P1-08b align closely enough to cross-fade.

**Tone**
- [ ] Lighting matches the time of day (night: blue-violet and amber; morning: golden).
- [ ] It feels authentically Bengaluru, not generic or Westernised.
- [ ] Rohan looks innocent; Amit looks playful, not menacing.
- [ ] Respectful, natural depictions throughout.
