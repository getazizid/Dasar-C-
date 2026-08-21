import React from "react";

interface FormattedTextProps {
  content: string;
  className?: string;
}

/**
 * Parses inline formatting safely:
 * - **bold** -> <strong>
 * - `code` -> <code>
 * - *italic* -> <em>
 */
function renderInlineFormatting(text: string): React.ReactNode[] {
  if (!text) return [];

  // Match bold (**...**), inline code (`...`), and italic (*...*)
  const tokens: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];

    if (token.startsWith("**") && token.endsWith("**")) {
      const inner = token.slice(2, -2);
      tokens.push(
        <strong key={`b-${keyIndex++}`} className="font-bold text-slate-900">
          {renderInlineFormatting(inner)}
        </strong>
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      const inner = token.slice(1, -1);
      tokens.push(
        <code
          key={`c-${keyIndex++}`}
          className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200/90 font-mono text-[11px] sm:text-xs text-blue-700 font-semibold mx-0.5 inline-block align-middle"
        >
          {inner}
        </code>
      );
    } else if (token.startsWith("*") && token.endsWith("*")) {
      const inner = token.slice(1, -1);
      tokens.push(
        <em key={`i-${keyIndex++}`} className="italic text-slate-800">
          {inner}
        </em>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push(text.slice(lastIndex));
  }

  return tokens.length > 0 ? tokens : [text];
}

export const FormattedText: React.FC<FormattedTextProps> = ({ content, className = "" }) => {
  if (!content) return null;

  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let blockKey = 0;

  let inCodeBlock = false;
  let codeBlockLines: string[] = [];
  let currentList: React.ReactNode[] = [];
  let tableRows: string[][] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${blockKey++}`} className="space-y-1.5 my-2.5 pl-1">
          {currentList}
        </ul>
      );
      currentList = [];
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      const header = tableRows[0];
      const body = tableRows.slice(1);

      elements.push(
        <div key={`table-${blockKey++}`} className="my-4 overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead className="bg-slate-100/90 text-slate-900 border-b border-slate-200 font-semibold">
              <tr>
                {header.map((col, idx) => (
                  <th key={idx} className="px-3.5 py-2.5 whitespace-nowrap">
                    {renderInlineFormatting(col)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {body.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50/70 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-3.5 py-2 text-slate-700">
                      {renderInlineFormatting(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Handle code fence block (```cpp or ```)
    if (trimmed.startsWith("```")) {
      flushList();
      flushTable();
      if (inCodeBlock) {
        // End code block
        elements.push(
          <div key={`codeblock-${blockKey++}`} className="my-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-blue-300 overflow-x-auto shadow-xs">
            <pre>{codeBlockLines.join("\n")}</pre>
          </div>
        );
        codeBlockLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(rawLine);
      continue;
    }

    // Empty line: flush lists & tables
    if (!trimmed) {
      flushList();
      flushTable();
      continue;
    }

    // Markdown Table row: | ... | ... |
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      flushList();
      // Skip divider lines like | :--- | :--- | or |---|---|
      if (/^\|[\s\-:]+(\|[\s\-:]+)+\|$/.test(trimmed)) {
        continue;
      }
      const cells = trimmed
        .slice(1, -1)
        .split("|")
        .map((c) => c.trim());
      tableRows.push(cells);
      continue;
    } else {
      flushTable();
    }

    // Headings: ### or ## or #
    if (trimmed.startsWith("### ") || trimmed.startsWith("## ") || trimmed.startsWith("# ")) {
      flushList();
      const headingText = trimmed.replace(/^#{1,3}\s+/, "");
      elements.push(
        <h4
          key={`h-${blockKey++}`}
          className="font-bold text-slate-900 text-sm sm:text-base mt-4 mb-2 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
          <span>{renderInlineFormatting(headingText)}</span>
        </h4>
      );
      continue;
    }

    // Math block: $$...$$
    if (trimmed.startsWith("$$") && trimmed.endsWith("$$")) {
      flushList();
      const mathText = trimmed.slice(2, -2).trim();
      elements.push(
        <div
          key={`math-${blockKey++}`}
          className="my-3 p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 font-mono text-xs sm:text-sm text-blue-950 flex items-center justify-center text-center shadow-xs"
        >
          {mathText}
        </div>
      );
      continue;
    }

    // Bullet list item: - or * followed by space
    if (/^[-*]\s+/.test(trimmed)) {
      const itemText = trimmed.replace(/^[-*]\s+/, "");
      currentList.push(
        <li
          key={`li-${blockKey++}`}
          className="flex items-start gap-2 text-slate-700 text-xs sm:text-sm leading-relaxed"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
          <div className="flex-1">{renderInlineFormatting(itemText)}</div>
        </li>
      );
      continue;
    }

    // Numbered list item: 1. 2. etc
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      flushList();
      elements.push(
        <div
          key={`num-${blockKey++}`}
          className="flex items-start gap-2.5 text-slate-700 text-xs sm:text-sm leading-relaxed my-1.5"
        >
          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono font-bold text-[11px] mt-0.5 flex-shrink-0 border border-slate-200">
            {numMatch[1]}
          </span>
          <div className="flex-1">{renderInlineFormatting(numMatch[2])}</div>
        </div>
      );
      continue;
    }

    // Standard paragraph line
    flushList();
    elements.push(
      <p
        key={`p-${blockKey++}`}
        className="text-slate-700 text-xs sm:text-sm leading-relaxed my-2"
      >
        {renderInlineFormatting(trimmed)}
      </p>
    );
  }

  // Flush any remaining buffered items
  if (inCodeBlock && codeBlockLines.length > 0) {
    elements.push(
      <div key={`codeblock-${blockKey++}`} className="my-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-blue-300 overflow-x-auto shadow-xs">
        <pre>{codeBlockLines.join("\n")}</pre>
      </div>
    );
  }
  flushList();
  flushTable();

  return <div className={`space-y-1 ${className}`}>{elements}</div>;
};
