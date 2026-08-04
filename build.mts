import * as esbuild from 'esbuild';

await esbuild.build({
    entryPoints: ['./src/app.tsx'],
    bundle: true,
    minify: false,
    sourcemap: false,
    treeShaking: true,
    format: 'esm',
    jsx: 'automatic',
    loader: {
        '.data': 'base64',
        '.png': 'dataurl',
    },
    target: ['chrome148', 'firefox150', 'safari26.3', 'edge149'],
    outfile: './dist/app.js',
});

await esbuild.build({
    entryPoints: ['./src/app.tsx'],
    bundle: true,
    minify: true,
    sourcemap: true,
    treeShaking: true,
    format: 'esm',
    jsx: 'automatic',
    loader: {
        '.data': 'base64',
        '.png': 'dataurl',
    },
    target: ['chrome148', 'firefox150', 'safari26.3', 'edge149'],
    outfile: './dist/app.min.js',
});