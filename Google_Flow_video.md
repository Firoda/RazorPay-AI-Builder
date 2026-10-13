# Google Flow: 3 prompts for the intro film

Three 8-second clips, played in order: Priya (Shot 1) → Rohan (Shot 2) → Ritu (Shot 3).

**How to use this file:** for each prompt, upload the listed photos in Flow, then copy the whole grey box and paste it as the prompt. Everything Flow needs (the character, the place, the action second by second, the camera, the style and the sound) is inside each box.

**Settings for all three:** 16:9 landscape · 8 seconds · the highest-quality Veo model you have · generate 2–4 variations and keep the best.

**All photos are in:** `RazorPay-AI-Builder/OpenAI_images/Flow_refs/`

**What the website adds on top of the video:** the same animations already on the site (the checkout saying **"Payment failed"**, the bank SMS saying **"₹2,000 debited"**, the clock, and the "last seat taken" badge) play over the clips at the right moments. Flow shouldn't draw these: video models still garble on-screen words and numbers. So every prompt keeps screens turned away and leaves an empty area of the frame for the animations.

**Sound:** every clip has the same soft background music (described identically in all three prompts so they blend), one short spoken line, and natural sound effects. The music stays low so the line is always easy to hear. If the music changes noticeably between clips, that's fine: I can lower Flow's music in the edit and run one continuous track under all three.

**When done:** download each clip as a 1080p MP4, name them `FLOW-01.mp4`, `FLOW-02.mp4` and `FLOW-03.mp4`, and put them in a folder called `Flow_videos` inside `RazorPay-AI-Builder`.

---

## Prompt 1: Priya pays, and it fails

**Upload with this prompt:**
- `SHOT1-start-frame-P1-01.png`: use it as the **first frame / start image** of the video.
- *(Only if Flow won't take a start image:)* upload `CHAR-priya-full-body.png` as a reference image instead.

```
Photorealistic cinematic live-action video, 8 seconds, 16:9 landscape. Begin exactly from the provided start image and keep the same woman, the same outfit, the same sofa and the same room for the whole shot.

CHARACTER (keep identical in every frame): Priya, a 28-year-old South Indian woman, a UX designer in Bengaluru who has saved up for her first pottery class. She has warm brown skin, an oval face, expressive dark brown eyes and natural eyebrows, a slim build, and shoulder-length, voluminous, naturally wavy-curly black hair worn loose with a soft side parting that frames her face. She wears a knee-length mustard-yellow cotton kurta top with a short buttoned neckline and sleeves rolled to three-quarter length, light-wash blue jeans, and small gold stud earrings. No glasses, no watch, no other jewellery. Her personality: warm, expressive, a little impatient; everything shows on her face, but her reactions are small and real, never theatrical.

SETTING: a cosy apartment living room in Bengaluru at night. A soft grey fabric sofa with a knitted throw and woven cushions. Wooden wall shelves with warm fairy lights and potted plants such as monstera and pothos. A table lamp with a warm linen shade. A low wooden coffee table with a ceramic mug and a small plant. A large window behind her showing blurred city lights. Warm amber lamplight, soft dark corners.

ACTION, second by second:
0 to 2 seconds: Priya sits curled up on the sofa holding her phone in both hands, with the phone screen facing away from the camera. She smiles, excited, and taps the screen once with her thumb, as if paying for something she has been looking forward to.
2 to 4 seconds: she settles back into the cushions, waiting, still half-smiling. The phone gives one short, dull vibration buzz. Her smile freezes.
4 to 6 seconds: she sits up, brings the phone closer to her face, frowns, and taps the screen twice more.
6 to 8 seconds: her expression turns from confusion into quiet worry: brows pulled together, lips slightly parted, eyes searching the screen. She holds still. Subtle and natural; no crying, no gasping.

CAMERA: start as a steady medium-wide shot matching the start image, then a slow, smooth push-in that ends on a medium close-up of her face and shoulders, and hold. Shallow depth of field; the fairy lights blur into soft bokeh.

LOOK AND STYLE: photorealistic live-action cinematic footage, as if shot on a full-frame cinema camera with a 35mm lens. Natural motivated lighting from the lamp, plus the soft glow of the phone on her face. Gentle film grain, realistic skin texture, soft contrast, a warm terracotta-and-cream colour grade. Authentic contemporary Bengaluru, India. Natural, unposed, subtle acting. Slow, smooth camera movement, normal speed, no slow motion, no cuts.

DIALOGUE: at about 6 seconds Priya murmurs quietly to herself, in natural Indian-English, confused and worried: "Payment failed? But the money's gone…" Clear lip sync. This is the only line.

SOUND EFFECTS: quiet room tone and faint distant city traffic, a soft tap on glass, one short dull phone vibration at about 3 seconds, and a small worried exhale after her line.

MUSIC: light, gentle background music throughout the whole clip: a soft, warm acoustic piece with a slow fingerpicked guitar and a light piano, calm and hopeful, around 80 beats per minute. Keep it quiet and low in the mix so the spoken line and the sound effects are always clearly audible. No vocals or singing in the music.

FRAMING FOR ON-SCREEN GRAPHICS: keep Priya on the right half of the frame; the left third of the frame stays dark, simple and uncluttered (soft-focus wall and shelves) so animated phone graphics can be placed there later.

STRICT RULES: the phone screen always faces away from the camera; we never see what is on it, only its glow on her face. No readable text, numbers, letters, logos, brand names, app interfaces, subtitles or watermarks anywhere in the frame. No speech other than the one line above. Priya's face, hair and mustard-yellow top must not change. She is the only person in the shot. She never looks into the camera. Not a cartoon, not a 3D render.
```

---

## Prompt 2: Minutes later, the last seat goes to Rohan

**Upload with this prompt (as reference images / ingredients, not as a start frame):**
- `CHAR-rohan-full-body.png`: who Rohan is.
- `SHOT2-scene-reference-P1-06.png`: Rohan at his office desk at night (the office look).

```
Photorealistic cinematic live-action video, 8 seconds, 16:9 landscape. Use the provided reference images for the man's exact face and clothing and for the office; keep him identical for the whole shot.

CHARACTER (keep identical in every frame): Rohan, a 31-year-old Indian software engineer working late in Bengaluru. He has medium-brown skin, short, neat, side-combed black hair, light trimmed stubble and a slim-to-average build. He wears thin black rectangular glasses, a navy-blue button-down shirt with the sleeves rolled to the forearms, mid-grey trousers, a black leather belt, and a black smartwatch on his left wrist. His personality: pleasant, focused, efficient and decent. He is booking the last seat in a pottery class on a whim between work tasks, with no idea anyone else wanted it. He is NOT a villain: no smirk, no gloating.

SETTING: a modern open-plan tech office in Bengaluru late at night, almost empty. Rows of white desks and black mesh office chairs. Floor-to-ceiling windows with a blurred city skyline at night. On his desk: a matte black desk lamp casting a warm pool of light, a small potted plant, a pen holder and a silver laptop. Cool blue ambient light in the room, warm light on his face from the desk lamp. He is the only person in the office.

ACTION, second by second:
0 to 3 seconds: Rohan sits at his desk typing on the laptop, focused, with the laptop screen facing away from the camera.
3 to 4 seconds: he pauses, reads for a moment, then clicks the trackpad once, decisively, as if confirming a booking. A soft confirmation chime.
4 to 6 seconds: a brief, polite, satisfied smile; he gives a tiny nod to himself.
6 to 8 seconds: he leans back in his chair, rolls his shoulders, and glances out of the window at the city lights, relaxed and pleased.

CAMERA: a slow, smooth sideways dolly from left to right past the edge of the desk, ending on a medium shot of Rohan in three-quarter profile, and hold. Shallow depth of field; the city skyline blurs softly behind him.

LOOK AND STYLE: photorealistic live-action cinematic footage, as if shot on a full-frame cinema camera with a 35mm lens. Natural motivated lighting: warm tungsten desk-lamp light on his face, the soft glow of the laptop, and the cool blue night office behind him. Gentle film grain, realistic skin texture, soft contrast, a warm terracotta-and-cream colour grade balanced against the cool night. Authentic contemporary Bengaluru, India. Natural, unposed, subtle acting. Slow, smooth camera movement, normal speed, no slow motion, no cuts.

DIALOGUE: at about 5 seconds, right after the chime, Rohan says quietly to himself with a small pleased smile, in natural Indian-English: "Nice, got the last seat." Relaxed and friendly, not smug. Clear lip sync. This is the only line.

SOUND EFFECTS: quiet office hum and air conditioning, soft keyboard typing, one trackpad click, then a single soft, pleasant confirmation chime at about 4 seconds, and a relaxed exhale as he leans back.

MUSIC: light, gentle background music throughout the whole clip: a soft, warm acoustic piece with a slow fingerpicked guitar and a light piano, calm and hopeful, around 80 beats per minute. Keep it quiet and low in the mix so the spoken line and the sound effects are always clearly audible. No vocals or singing in the music.

FRAMING FOR ON-SCREEN GRAPHICS: keep Rohan and his desk in the left two-thirds of the frame; the right third shows only the softly blurred window and city lights, uncluttered, so an animated "last seat taken" badge can be placed there later.

STRICT RULES: the laptop screen always faces away from the camera; we only ever see the back of the laptop lid and its glow on his face. No readable text, numbers, letters, logos, brand names, app interfaces, subtitles or watermarks anywhere in the frame. No speech other than the one line above. Rohan's glasses, stubble, navy shirt and smartwatch must stay the same throughout. He is the only person in the shot. He never looks into the camera. Not a cartoon, not a 3D render.
```

---

## Prompt 3: Sunday, 8 AM, and Ritu finds out

**Upload with this prompt:**
- `SHOT3-start-frame-P1-08.png`: use it as the **first frame / start image** (Ritu calm).
- `SHOT3-end-frame-P1-08b.png`: use it as the **last frame / end image** (Ritu worried).
- *(Only if Flow won't take start and end images:)* upload `CHAR-ritu-full-body.png` and `SHOT3-start-frame-P1-08.png` as reference images instead.

```
Photorealistic cinematic live-action video, 8 seconds, 16:9 landscape. Begin exactly on the provided start image and end exactly on the provided end image; keep the same woman, the same outfit, the same framing and the same studio for the whole shot.

CHARACTER (keep identical in every frame): Ritu, a 38-year-old Indian woman, a former art teacher who runs Clay & Co., a small pottery studio in Bengaluru, on her own and takes bookings on WhatsApp. She has medium-brown skin, a round soft face, kind eyes and a medium build. Her black hair is pulled back into a low, loose bun with a few strands falling at her temples. She wears a white cotton collared shirt with the sleeves rolled to the elbows, under a rust-orange terracotta canvas apron with dried clay smudges, and black trousers. She has a thin silver bangle on her wrist and a cream canvas tote bag over her right shoulder. Her personality: warm, practical, calm and protective of her students. Her concern is controlled and quiet, never panicked.

SETTING: Clay & Co. pottery studio in Bengaluru, early on a Sunday morning, empty except for Ritu. A heavy wooden entrance door on the left. Tall windows with hanging green vines. Rows of white pottery wheels with small wooden stools. Tall wooden shelves filled with terracotta pots and vases. A large, plain, blank dark chalkboard on the back wall with nothing written on it. Black pendant lamps. A warm wooden floor striped with long golden sunbeams.

ACTION, second by second:
0 to 2 seconds: Ritu steps in through the wooden door with her tote bag on her shoulder, holding her phone in her right hand with the screen facing away from the camera, glancing at it with a soft, content morning smile.
2 to 4 seconds: a gentle message-notification ping. She slows down and reads, still half-smiling.
4 to 6 seconds: she stops walking. Her smile fades as she reads the message again.
6 to 8 seconds: her brow tightens with quiet concern. She lowers the phone slightly and looks toward the rows of empty pottery wheels, thinking about what to do. She ends matching the end image exactly.

CAMERA: a nearly static medium-wide shot that matches both images, with only a very slight, slow push-in, then a hold on her concerned expression. Shallow depth of field; the studio stays softly detailed behind her.

LOOK AND STYLE: photorealistic live-action cinematic footage, as if shot on a full-frame cinema camera with a 35mm lens. Natural golden morning sunlight streaming through the windows. Gentle film grain, realistic skin texture, soft contrast, a warm terracotta-and-cream colour grade. Authentic contemporary Bengaluru, India. Natural, unposed, subtle acting. Slow, smooth camera movement, normal speed, no slow motion, no cuts.

DIALOGUE: at about 6 seconds Ritu says softly to herself, in natural Indian-English, worried but calm: "Priya's payment came in… but her class is full." Clear lip sync. This is the only line.

SOUND EFFECTS: the creak of the wooden door, birds chirping outside, faint distant morning traffic, her soft footsteps on the wooden floor, one short, gentle message-notification ping at about 2 seconds, and a small, thoughtful sigh after her line.

MUSIC: light, gentle background music throughout the whole clip: a soft, warm acoustic piece with a slow fingerpicked guitar and a light piano, calm and hopeful, around 80 beats per minute. Keep it quiet and low in the mix so the spoken line and the sound effects are always clearly audible. No vocals or singing in the music.

FRAMING FOR ON-SCREEN GRAPHICS: keep Ritu on the left side of the frame as in the provided images; the right half (the rows of wheels and the shelves) stays visible and uncluttered so animated graphics such as the message and the class-full badge can be placed there later.

STRICT RULES: the phone screen always faces away from the camera; we never see what is on it. The chalkboard stays completely blank. No readable text, numbers, letters, logos, brand names, app interfaces, subtitles or watermarks anywhere in the frame. No speech other than the one line above. Ritu's face, bun, white shirt, rust-orange apron and tote bag must not change. She is the only person in the studio. She never looks into the camera. Not a cartoon, not a 3D render.
```

---

## Quick check before you send the clips

- [ ] No garbled text, numbers, logos or phone/laptop screens appear in the video itself. The "Payment failed" and "₹2,000 debited" animations are added by the website.
- [ ] The empty area of the frame (left in Prompt 1, right in Prompts 2 and 3) is clear enough for those animations.
- [ ] Each person looks like their photo and keeps the same clothes for the whole clip.
- [ ] Soft background music runs throughout, and the spoken line is easy to hear over it.
- [ ] Each person says only their one line, with lips in sync.
- [ ] Rohan looks pleasant, not smug.

**If a clip goes wrong, re-roll it.** For a common problem, add one line to the end of that prompt:
- *A screen turns toward the camera:* "The camera only ever sees the back of the phone/laptop."
- *The face changes:* "Keep the face exactly as in the provided image; very slight camera movement only."
- *Writing appears on the chalkboard (Prompt 3):* "The chalkboard is plain and blank, with nothing written on it."
- *Too dramatic:* "Her expression changes only slightly: a small frown and a still, uncertain look."
- *The music is too loud or drowns the line:* "Background music very quiet, about one-third the volume of the voice."
- *The music has singing:* "Instrumental music only, no vocals."
- *The line is garbled or extra words appear:* re-roll, or shorten the line (e.g. Priya: "Payment failed?").

The website adds the captions and the existing animations (times, ₹2,000, "Payment failed", "₹2,000 debited", "last seat taken") on top of the video, so none of that is needed in Flow.
