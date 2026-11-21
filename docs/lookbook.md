# Lookbook

The wardrobe on `/lookbook` is driven by `data/looks.ts`. Each entry in `LOOKS`
becomes one hanging piece; the order of the array is the order on the rail and
the look numbers.

## Add or replace a photo

1. Export a portrait photo at a 3:4 ratio, about 900px wide, as WebP.
2. Save it in `public/lookbook/` (for example `public/lookbook/lekki-gown.webp`).
3. Set the look's `image` field to the public path:

   ```ts
   image: "/lookbook/lekki-gown.webp",
   ```

Leave `image: ""` to show the flat placeholder block. The placeholder uses the
look's `tone` background and `textColor`, so keep those in sync with the piece
until the photo arrives. The first look's photo is preloaded; all others load
lazily.

## Prices

Set `price` on each look, for example `price: "From ₦480,000"`. Until real
prices are supplied every look reads `From ₦—`. Prices are shown in the details
panel only; the wardrobe itself carries no prices.

## WhatsApp

The number lives in `lib/whatsapp.ts` (`WHATSAPP_NUMBER`), in international
format with no `+` or spaces, for example `2348012345678`. The order button
sends the look name and number; the fitting link sends a booking request. The
header and menu reuse the same helper.

## Colours and fabric

`colors` is a list of `[name, hex]` pairs rendered as small swatches. `fabric`
and `turnaround` are free text shown in the details panel. `category` is shown
next to the look number (for example `Women · Evening`).

## Deep links

The current piece is mirrored in the URL as `#look-3`, so a look can be shared
directly. Look numbers are 1-based and follow the array order.
