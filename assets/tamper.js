// ==UserScript==
// @name         HBL_tool
// @namespace    http://tampermonkey.net/
// @version      2024-01-12
// @description  try to take over the world!
// @author       TruongTom
// @match        https://myherbalife.intuition.com/herbalife/content/stream/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function () {
	'use strict';
	let abc343;
	const id = setInterval(() => {
		if (!abc343) {
			abc343 = document.querySelector('iframe#stream-frame.ng-isolate-scope');
			if (abc343) {
				clearInterval(id);
				console.info(`🟠 src/App.tsx	Line:40	ID:3c5b55`);
				const styleContent = `#_debb06{display:inline}#_11b1cb{color:red}#_7cfa11{display:flex;gap:10px}#_7cfa11 input{border-radius:4px;border:1px solid #aaa;width:40px};`;
				const styleHbl = document.createElement('style');
				styleHbl.type = 'text/css';
				styleHbl.innerText = styleContent;
				document.head.appendChild(styleHbl);
				const div = document.createElement('div');
				div.id = 'hbl_tool';
				div.style = `z-index: 100;display: flex;position: absolute;bottom: 100px;right: 100px;background: white;padding: 20px;border-radius: 10px;`;
				const btnTaiScript = document.createElement('button');
				btnTaiScript.innerText = 'Tải tool';
				btnTaiScript.addEventListener('click', taiScript(btnTaiScript));
				div.appendChild(btnTaiScript);
				document.body.appendChild(div);
			}
		}
	}, 1000);

	function taiScript(btnTaiScript) {
		return () => {
			let scriptHbl = document.getElementById('_e917dd');
			if (scriptHbl) return;
			else {
				scriptHbl = document.createElement('script');
				scriptHbl.id = '_e917dd';
				scriptHbl.src = 'https://truongtom1993.github.io/hbl_tool/assets/hbl.js';
				document.head.appendChild(scriptHbl);
				btnTaiScript.style.display = 'none';
			}
		};
	}
})();
