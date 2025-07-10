// import { useEffect, useState, useCallback } from 'react';
// import dedent from 'dedent';
// import { highlightCode } from '@/lib/shiki';

// const CodeViewer = ({ code: Hcode }: { code: string }) => {
//   const [highlightedCode, setHighlightedCode] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   const highlight = useCallback(async (code: string) => {
//     try {
//       if (!code) return '';
//       const highlighted = await highlightCode(dedent(code), 'typescript');
//       return highlighted;
//     } catch (error) {
//       console.error('Error highlighting code:', error);
//       return '';
//     }
//   }, []);

//   useEffect(() => {
//     let isMounted = true;
    
//     const updateHighlight = async () => {
//       setIsLoading(true);
//       const result = await highlight(Hcode);
//       if (isMounted) {
//         setHighlightedCode(result);
//         setIsLoading(false);
//       }
//     };

//     updateHighlight();

//     return () => {
//       isMounted = false;
//     };
//   }, [Hcode, highlight]);

//   if (isLoading || !highlightedCode) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <div className="animate-pulse">Loading code...</div>
//       </div>
//     );
//   }

//   return (
//     <div 
//       className="text-[13px] overflow-x-auto overflow-y-visible bg-black p-4 pb-36 h-full"
//       dangerouslySetInnerHTML={{ __html: highlightedCode }}
//     />
//   );
// };

// export default CodeViewer;

import { useEffect, useState } from 'react';
import dedent from 'dedent';
import { highlightCode } from '@/lib/shiki';

const CodeViewer = ({ code: hCode }: { code: string }) => {
  const [highlightedCode, setHighlightedCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const highlight = async () => {
      try {
        setIsLoading(true);
        const code = await highlightCode(dedent(hCode), 'typescript');
        if (isMounted) {
          setHighlightedCode(code);
        }
      } catch (error) {
        console.error('Error highlighting code:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    highlight();

    return () => {
      isMounted = false;
    };
  }, [hCode]);

  if (isLoading || !highlightedCode) {
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