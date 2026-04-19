const https = require('https');
const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'public', 'models');
if (!fs.existsSync(modelsDir)) {
    fs.mkdirSync(modelsDir, { recursive: true });
}

const files = [
    'tiny_face_detector_model-weights_manifest.json',
    'tiny_face_detector_model-shard1',
    'face_expression_model-weights_manifest.json',
    'face_expression_model-shard1'
];

const baseUrl = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/';

async function download() {
    for (const file of files) {
        const dest = path.join(modelsDir, file);
        console.log(`Downloading ${file}...`);
        await new Promise((resolve, reject) => {
            https.get(baseUrl + file, (res) => {
                if (res.statusCode !== 200) {
                    reject(new Error(`Failed to download ${file}, status: ${res.statusCode}`));
                    return;
                }
                const fileStream = fs.createWriteStream(dest);
                res.pipe(fileStream);
                fileStream.on('finish', () => {
                    fileStream.close();
                    resolve();
                });
            }).on('error', reject);
        });
    }
    console.log("Done downloading models.");
}

download().catch(console.error);
