# guide-images — Measurement Guide Images

This folder holds the optional images shown in the **?** guide popups on each trait card.

---

## How to add an image

1. **Drop your image file into this folder.**
   Any common format works: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`

2. **Open `traits.js` and find the trait you want.**
   Each trait has a `guideImage` field that currently reads:
   ```js
   guideImage: null,
   ```

3. **Replace `null` with your filename (in quotes):**
   ```js
   guideImage: 'eye-color.jpg',
   ```
   That's all — the image will now appear at the top of that trait's guide popup.

---

## Recommended filenames (one per trait)

Use these to stay organized — they match the trait `id` values in `traits.js`:

| Trait                       | Suggested filename             |
|-----------------------------|--------------------------------|
| Eye Color                   | `eye-color.jpg`                |
| Hair Color                  | `hair-color.jpg`               |
| Hair Form                   | `hair-form.jpg`                |
| Skin Color                  | `skin-color.jpg`               |
| Cephalic Index              | `cephalic-index.jpg`           |
| Face Shape                  | `face-shape.jpg`               |
| Cheekbones                  | `cheekbones.jpg`               |
| Epicanthus                  | `epicanthus.jpg`               |
| Eye Shape                   | `eye-shape.jpg`                |
| Interocular Distance        | `interocular-distance.jpg`     |
| Nose Type (Nasal Index)     | `nose-type.jpg`                |
| Forehead Morphology         | `forehead.jpg`                 |
| Chin Morphology             | `chin.jpg`                     |
| Eyebrow Characteristics     | `eyebrows.jpg`                 |
| Brow Ridges                 | `brow-ridges.jpg`              |
| Ear Morphology              | `ears.jpg`                     |
| Stature (Height)            | `height.jpg`                   |
| Nasal Profile               | `nasal-profile.jpg`            |
| Lip Fullness                | `lip-fullness.jpg`             |
| Prognathism                 | `prognathism.jpg`              |
| Occipital Contour           | `occipital-contour.jpg`        |
| Eye Depth (Orbital Depth)   | `eye-depth.jpg`                |
| Nasal Bridge Height         | `nasal-bridge-height.jpg`      |

---

## Tips

- **Ideal image size:** 680–720 px wide. The popup displays images at max 340 px wide (2× for retina).
- **Diagram-style images** (black-and-white anatomical diagrams, measurement illustrations) work best.
- If a file is missing or the path is wrong, the popup simply hides the image slot — no broken icon shows.
- You can use the same image for multiple traits (e.g. a general caliper diagram for all index-based traits).

---

## Example edit in traits.js

```js
{
    id: 'cephalicIndex',
    number: 5,
    title: 'Cephalic Index',
    definition: 'Ratio of maximum head width to maximum head length × 100.',
    measurement: 'Calipers: (Head Width / Head Length) × 100.',
    unit: 'Index value → categorical',
    guideImage: 'cephalic-index.jpg',   // ← image now active
    type: 'cephalic',
    ...
}
```
