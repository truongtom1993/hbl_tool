import './App.scss';

import { Component, createSignal, onMount } from 'solid-js';

let cp = null;
let hbl = null;
let btnTraLoi = null;
let iframe = null;
const App: Component = () => {
	const [slide, setSlide] = createSignal(null);
	const [ready, setReady] = createSignal(false);

	onMount(() => {
		console.info(`🟠 src/App.tsx	Line:14	ID:6fb185`);

		const id = setInterval(() => {
			if (!hbl || !cp) {
				iframe = document.querySelector('iframe#stream-frame.ng-isolate-scope') as HTMLIFrameElement;
				cp = iframe?.contentWindow?.cp;
				hbl = iframe?.contentWindow?.cpAPIInterface;
				setReady(true);
				clearInterval(id);
			} else {
				setReady(true);
			}
		}, 200);

		const id3 = setInterval(() => {
			if (!iframe) return;
			btnTraLoi = iframe.contentDocument.querySelector('#btnArrest');
			if (btnTraLoi) {
				if (btnTraLoi.style.visibility === 'hidden') return;
				btnTraLoi.style.visibility = 'hidden';
			}
		}, 1000);
	});

	const goSlide = () => {
		if (slide()) {
			hbl?.gotoSlide(slide());
			setSlide(void 0);
		}
	};
	const nextSlide = () => {
		console.info(`🟠 src/App.tsx	Line:45	ID:db4ecd`);
		cp?.jumpToNextSlide();
	};
	return (
		<>
			<div id='_b14702'>
				<h3>Trạng thái tool: {ready() ? 'Sẵn sàng' : 'Không dùng được'}</h3>
				<div id='_7cfa11'>
					<label for='_fa78a8'>Nhảy trang: </label>
					<input
						type='number'
						id='_fa78a8'
						onChange={e => {
							setSlide(e.target.value);
						}}
						value={slide()}
						onKeyPress={e => {
							if (e?.key === 'Enter' || e?.keyCode === 13) {
								goSlide();
							}
						}}
					/>
					<button onClick={goSlide}>Goto Slide</button>
				</div>
				<button onclick={nextSlide}>Trang tiếp</button>
			</div>
		</>
	);
};

export default App;
