import React from 'react';
import ReactDOM from 'react-dom';
import ExampleApplication from './App';

const start = new Date().getTime();

const root = ReactDOM.unstable_createRoot(document.getElementById('root'));

root.render(<ExampleApplication />);

function update() {
  const elapsed = new Date().getTime() - start;
  const t = (elapsed / 1000) % 10;
  const scale = 1 + (t > 5 ? 10 - t : t) / 10;
  const warp = document.querySelector('#anim');
  warp && (document.querySelector('#anim').style.transform = 'scaleX(' + (scale / 2.1) + ') scaleY(0.7) translateZ(0.1px)');
  requestAnimationFrame(update);
}
requestAnimationFrame(update);
