import { createHighlighter, type Highlighter } from 'shiki';

let highlighter: Highlighter | null = null;
let highlighterPromise: Promise<Highlighter> | null = null;

export async function getHighlighter(): Promise<Highlighter> {
  if (highlighter) return highlighter;
  
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['vitesse-black'],
      langs: ['typescript', 'tsx', 'javascript', 'jsx', 'json', 'html', 'css'],
    });
  }
  
  highlighter = await highlighterPromise;
  return highlighter;
}

export async function highlightCode(code: string, language: string = 'typescript'): Promise<string> {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang: language,
    theme: 'vitesse-black',
  });
}
