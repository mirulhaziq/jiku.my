import Image from 'next/image';

type Block =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'img'; src: string; alt: string }
  | { type: 'code'; lang: string; code: string };

function parseBlocks(src: string): Block[] {
  const lines = src.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i += 1;
      continue;
    }

    if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.slice(3).trim() });
      i += 1;
      continue;
    }

    if (line.startsWith('### ')) {
      blocks.push({ type: 'h3', text: line.slice(4).trim() });
      i += 1;
      continue;
    }

    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      i += 1;
      const buf: string[] = [];
      while (i < lines.length && !lines[i].startsWith('```')) {
        buf.push(lines[i]);
        i += 1;
      }
      i += 1; // closing fence
      blocks.push({ type: 'code', lang, code: buf.join('\n') });
      continue;
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      const items: string[] = [];
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        items.push(lines[i].slice(2).trim());
        i += 1;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    const img = line.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/);
    if (img) {
      blocks.push({ type: 'img', alt: img[1], src: img[2] });
      i += 1;
      continue;
    }

    const buf: string[] = [line];
    i += 1;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith('## ') &&
      !lines[i].startsWith('### ') &&
      !lines[i].startsWith('```') &&
      !lines[i].startsWith('- ') &&
      !lines[i].startsWith('* ') &&
      !lines[i].match(/^!\[[^\]]*\]\([^)]+\)\s*$/)
    ) {
      buf.push(lines[i]);
      i += 1;
    }
    blocks.push({ type: 'p', text: buf.join(' ') });
  }

  return blocks;
}

function Inline({ text }: { text: string }) {
  // very light **bold** support
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={idx} className="font-semibold text-fg">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={idx}>{part}</span>;
      })}
    </>
  );
}

export function MarkdownContent({ content }: { content: string }) {
  const blocks = parseBlocks(content);

  return (
    <div className="space-y-6 text-lg leading-relaxed">
      {blocks.map((block, idx) => {
        if (block.type === 'h2') {
          return (
            <h2 key={idx} className="text-2xl md:text-3xl font-semibold tracking-tight text-fg pt-4">
              {block.text}
            </h2>
          );
        }
        if (block.type === 'h3') {
          return (
            <h3 key={idx} className="text-xl font-semibold tracking-tight text-fg pt-2">
              {block.text}
            </h3>
          );
        }
        if (block.type === 'ul') {
          return (
            <ul key={idx} className="space-y-2 text-muted">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span className="text-fg/40 shrink-0 mt-2.5 h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                  <span>
                    <Inline text={item} />
                  </span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === 'img') {
          return (
            <figure key={idx} className="my-8">
              <div className="relative w-full overflow-hidden rounded-xl border border-border bg-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={block.src} alt={block.alt} className="w-full h-auto" />
              </div>
              {block.alt ? (
                <figcaption className="mt-2 text-sm text-muted text-center">{block.alt}</figcaption>
              ) : null}
            </figure>
          );
        }
        if (block.type === 'code') {
          return (
            <pre
              key={idx}
              className="overflow-x-auto rounded-xl border border-border bg-card p-4 text-sm text-muted leading-relaxed"
            >
              <code>{block.code}</code>
            </pre>
          );
        }
        return (
          <p key={idx} className="text-muted leading-relaxed">
            <Inline text={block.text} />
          </p>
        );
      })}
    </div>
  );
}
