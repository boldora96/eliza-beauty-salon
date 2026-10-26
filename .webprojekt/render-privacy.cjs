const fs = require('node:fs');
const source = 'Adatvédelmi nyilatkozat/Eliza Beauty Salon - adatkezelesi tajekoztato.md';
const escape = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const inline = text => escape(text)
  .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|tel:[^\s)]+)\)/g, '<a href="$2">$1</a>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
module.exports = () => {
  const lines = fs.readFileSync(source, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/);
  const output = [], contents = [];
  let paragraph = [], list = false, section = 0;
  const flush = () => { if (paragraph.length) { output.push(`<p>${inline(paragraph.join('<BR>')).replace(/&lt;BR&gt;/g, '<br>')}</p>`); paragraph = []; } };
  const closeList = () => { if (list) { output.push('</ul>'); list = false; } };
  for (const line of lines) {
    if (!line.trim()) { flush(); closeList(); continue; }
    if (line.startsWith('# ')) { flush(); closeList(); output.push(`<h1>${inline(line.slice(2))}</h1>`); }
    else if (line.startsWith('## ')) { flush(); closeList(); const id = `tajekoztato-${++section}`; contents.push(`<li><a href="#${id}">${inline(line.slice(3))}</a></li>`); output.push(`<h2 id="${id}">${inline(line.slice(3))}</h2>`); }
    else if (line.startsWith('- ')) { flush(); if (!list) { output.push('<ul>'); list = true; } output.push(`<li>${inline(line.slice(2))}</li>`); }
    else { closeList(); paragraph.push(line); }
  }
  flush(); closeList();
  const toc = `<nav class="policy-toc" aria-label="A tájékoztató tartalma"><h2>Tartalom</h2><ul>${contents.join('')}</ul></nav>`;
  return output.join('\n').replace(/(<h2 id="tajekoztato-1">)/, toc + '$1');
};
