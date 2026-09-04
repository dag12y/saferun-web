import { CopyButton } from './CopyButton';

interface CodeBlockProps {
  code: string;
  lang?: string;
  showCopy?: boolean;
  prompt?: string;
}

export function CodeBlock({ code, lang, showCopy = true, prompt }: CodeBlockProps) {
  return (
    <div className="relative rounded-lg overflow-hidden border" style={{ borderColor: 'var(--border)', background: 'var(--terminal-bg)' }}>
      {(lang || showCopy) && (
        <div className="flex items-center justify-between px-4 py-2 border-b" style={{ borderColor: 'var(--border)', background: 'rgba(255,255,255,0.02)' }}>
          {lang && <span className="text-xs mono" style={{ color: 'var(--fg3)' }}>{lang}</span>}
          {showCopy && <CopyButton text={code} />}
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed mono" style={{ color: 'var(--terminal-fg)', margin: 0 }}>
        {prompt && <span style={{ color: 'var(--terminal-dim)', userSelect: 'none' }}>{prompt} </span>}
        <code>{code}</code>
      </pre>
    </div>
  );
}
