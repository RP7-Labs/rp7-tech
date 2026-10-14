import { readFileSync, writeFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const logoPng = readFileSync('public/brand/png/rp7-logo-negativa-2048.png');
const logoB64 = logoPng.toString('base64');

const logoWidth = 620;
const logoHeight = Math.round(logoWidth * (718 / 1832));
const logoX = (1200 - logoWidth) / 2;
const logoY = 200;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="630">
	<defs>
		<linearGradient id="stripe" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0" stop-color="#007BFF"/>
			<stop offset="1" stop-color="#00D2FF"/>
		</linearGradient>
	</defs>
	<rect width="1200" height="630" fill="#0B132B"/>
	<g opacity="0.16">
		<rect x="880" y="-140" width="620" height="110" rx="55" fill="url(#stripe)" transform="rotate(-42 880 -140)"/>
		<rect x="-260" y="560" width="520" height="72" rx="36" fill="url(#stripe)" transform="rotate(-42 -260 560)"/>
	</g>
	<image xlink:href="data:image/png;base64,${logoB64}" x="${logoX}" y="${logoY}" width="${logoWidth}" height="${logoHeight}"/>
	<text x="600" y="${logoY + logoHeight + 70}" text-anchor="middle"
		font-family="Montserrat" font-weight="500" font-size="26"
		letter-spacing="6" fill="#9aa5b8">SOLUÇÕES DIGITAIS QUE GERAM RESULTADOS</text>
</svg>`;

const fontFile = 'scripts/fonts/Montserrat-Medium.ttf';

const resvg = new Resvg(svg, {
	fitTo: { mode: 'width', value: 1200 },
	font: {
		fontFiles: [fontFile],
		loadSystemFonts: false,
		defaultFontFamily: 'Montserrat',
	},
});

writeFileSync('public/og-image.png', resvg.render().asPng());
console.log('public/og-image.png gerado');
