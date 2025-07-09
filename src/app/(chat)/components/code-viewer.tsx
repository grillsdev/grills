import { useEffect, useState } from 'react';
import dedent from 'dedent';


const CodeViewer = ({code: Hcode}: {code:string}) => {
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    const loadHighlighter = async () => {
      const { createHighlighter } = await import('shiki');
      const highlighter = await createHighlighter({
        themes: ['vitesse-black'],
        langs: ['typescript'],
      });

      const code = highlighter.codeToHtml(dedent(Hcode), {
        lang: 'typescript',
        theme: 'vitesse-black',
      });
      setHighlightedCode(code);
    };

    loadHighlighter();
  }, []);

  if (!highlightedCode) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse">Loading code...</div>
      </div>
    );
  }

  return (
    <div 
      className="text-[13px] overflow-x-auto overflow-y-visible bg-black p-4 pb-36 h-full"
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
};

export default CodeViewer