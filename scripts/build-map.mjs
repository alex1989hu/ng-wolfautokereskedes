// Builds the static map image of the business from OpenStreetMap tiles, so the contact page
// needs no third-party embed. Run once (and again only when the location changes):
//   node scripts/build-map.mjs
// Please keep the volume low, see https://operations.osmfoundation.org/policies/tiles/
import sharp from "sharp";
import { Buffer } from "node:buffer";
import { fileURLToPath, URL } from "node:url";
import process from "node:process";
import { setTimeout } from "node:timers";

const lat = 47.253687;
const lon = 16.6149763;
const zoom = 17;
const width = 1000;
const height = 640;
const userAgent = "wolfautokereskedes-static-map/1.0 (https://wolfautokereskedes.hu)";

const n = 2 ** zoom;
const worldX = ((lon + 180) / 360) * n;
const rad = (lat * Math.PI) / 180;
const worldY = ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * n;

// Tiles that cover the area around the pin.
const left = Math.floor(worldX - width / 2 / 256);
const right = Math.floor(worldX + width / 2 / 256);
const top = Math.floor(worldY - height / 2 / 256);
const bottom = Math.floor(worldY + height / 2 / 256);

const tiles = [];
for (let x = left; x <= right; x++) {
  for (let y = top; y <= bottom; y++) {
    const response = await fetch(`https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`, {
      headers: { "User-Agent": userAgent },
    });
    if (!response.ok) throw new Error(`Tile ${x}/${y} failed: ${response.status}`);
    tiles.push({
      input: Buffer.from(await response.arrayBuffer()),
      left: (x - left) * 256,
      top: (y - top) * 256,
    });
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
}

const mosaic = await sharp({
  create: {
    width: (right - left + 1) * 256,
    height: (bottom - top + 1) * 256,
    channels: 3,
    background: "#f2efe9",
  },
})
  .composite(tiles)
  .png()
  .toBuffer();

// Pin position inside the mosaic, then crop around it.
const pinX = Math.round((worldX - left) * 256);
const pinY = Math.round((worldY - top) * 256);
const cropLeft = pinX - width / 2;
const cropTop = pinY - height / 2;

// Marker with its tip on the coordinates.
const marker = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="80" viewBox="0 0 64 80">
  <ellipse cx="32" cy="76" rx="12" ry="4" fill="#0a192f" fill-opacity="0.25"/>
  <path d="M32 76C32 76 8 46 8 28a24 24 0 0 1 48 0c0 18-24 48-24 48z" fill="#0d5bff" stroke="#fff" stroke-width="3"/>
  <circle cx="32" cy="28" r="9" fill="#fff"/>
</svg>`);

const output = fileURLToPath(new URL("../src/assets/map.webp", import.meta.url));
await sharp(mosaic)
  .extract({ left: cropLeft, top: cropTop, width, height })
  .composite([{ input: marker, left: width / 2 - 32, top: height / 2 - 76 }])
  .webp({ quality: 82 })
  .toFile(output);

process.stdout.write(`Wrote ${output} from ${tiles.length} tiles\n`);
