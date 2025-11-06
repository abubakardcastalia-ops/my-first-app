// import React, { useRef, useEffect } from 'react';

// // This component dynamically imports Editor.js and tools to avoid
// // evaluating the library at module-import time (which can trigger
// // environment-specific errors like "crypto is not defined").
// export default function ClickUpEditor() {
//   const editorRef = useRef(null);
//   const instanceRef = useRef(null);

//   useEffect(() => {
//     let mounted = true;

//     async function init() {
//       if (!mounted || typeof window === 'undefined' || !editorRef.current) return;

//       // Dynamic import so the module is evaluated only in the browser/test runtime
//       const EditorJS = (await import('@editorjs/editorjs')).default;
//       const Header = (await import('@editorjs/header')).default;
//       const Paragraph = (await import('@editorjs/paragraph')).default;

//       const editor = new EditorJS({
//         holder: editorRef.current,
//         autofocus: false,
//         onReady: () => {},
//         tools: {
//           header: Header,
//           paragraph: {
//             class: Paragraph,
//             inlineToolbar: true,
//           },
//         },
//         // keep lightweight for testing
//       });

//       instanceRef.current = editor;
//     }

//     init().catch((err) => {
//       // Swallow errors in test environment; we've polyfilled crypto in setupTests
//       // but keep this here to avoid breaking the app if something else fails.
//       // eslint-disable-next-line no-console
//       console.error('Editor init error:', err);
//     });

//     return () => {
//       mounted = false;
//       if (instanceRef.current && instanceRef.current.destroy) {
//         instanceRef.current.destroy();
//         instanceRef.current = null;
//       }
//     };
//   }, []);

//   return (
//     <div>
//       <div ref={editorRef} data-testid="editor-root" style={{ minHeight: 120 }} />
//     </div>
//   );
// }
