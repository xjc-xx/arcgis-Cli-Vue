/*
 * @Author: CC-TSR
 * @Date: 2020-12-18 18:58:10
 * @LastEditTime: 2020-12-18 20:27:53
 * @LastEditors: xiejiancheng1999@qq.com
 * @Description: 
 * @FilePath: \arcgis-cli-demo\src\worker-config.ts
 * @可以输入预定的版权声明、个性签名、空行等
 */
import esriConfig from 'esri/config';

const DEFAULT_WORKER_URL = 'http://127.0.0.1/library/4.17/';
const DEFAULT_LOADER_URL = `${DEFAULT_WORKER_URL}dojo/dojo-lite.js`;

(esriConfig.workers as any).loaderUrl = DEFAULT_LOADER_URL;
esriConfig.workers.loaderConfig = {
    baseUrl: `${DEFAULT_WORKER_URL}dojo`,
    packages: [
        { name: 'esri', location: DEFAULT_WORKER_URL + 'esri' },
        { name: 'dojo', location: DEFAULT_WORKER_URL + 'dojo' },
        { name: 'dojox', location: DEFAULT_WORKER_URL + 'dojox' },
        { name: 'dijit', location: DEFAULT_WORKER_URL + 'dijit' },
        { name: 'dstore', location: DEFAULT_WORKER_URL + 'dstore' },
        { name: 'moment', location: DEFAULT_WORKER_URL + 'moment' },
        { name: '@dojo', location: DEFAULT_WORKER_URL + '@dojo' },
        {
            name: 'cldrjs',
            location: DEFAULT_WORKER_URL + 'cldrjs',
            main: 'dist/cldr'
        },
        {
            name: 'globalize',
            location: DEFAULT_WORKER_URL + 'globalize',
            main: 'dist/globalize'
        },
        {
            name: 'maquette',
            location: DEFAULT_WORKER_URL + 'maquette',
            main: 'dist/maquette.umd'
        },
        {
            name: 'maquette-css-transitions',
            location: DEFAULT_WORKER_URL + 'maquette-css-transitions',
            main: 'dist/maquette-css-transitions.umd'
        },
        {
            name: 'maquette-jsx',
            location: DEFAULT_WORKER_URL + 'maquette-jsx',
            main: 'dist/maquette-jsx.umd'
        },
        { name: 'tslib', location: DEFAULT_WORKER_URL + 'tslib', main: 'tslib' }
    ]
} as any;
