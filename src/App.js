import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import Marker from "@editorjs/marker";
import ImageTool from "@editorjs/image";
import Code from "@editorjs/code";
import NestedList from "@editorjs/nested-list";
import Toggle from "editorjs-toggle-block";
import Button from "editorjs-button";
// import Banner from "editorjs-banner-block";
// import NewPage from "editorjs-new-page";
import "./App.css";
import CustomBanner from "./CustomBanner";


const App = () => {
  const editorRef = useRef(null);
  const editorHolderRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current && editorHolderRef.current) {
      editorRef.current = new EditorJS({
        holder: editorHolderRef.current,
        placeholder: "Start writing your document...",
        autofocus: true,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              placeholder: "Heading",
              levels: [1, 2, 3, 4, 5],
              defaultLevel: 2,
            },
          },

          list: {
            class: List,
            inlineToolbar: true,
          },

          nestedList: {
            class: NestedList,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },

          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: "Enter a quote",
              captionPlaceholder: "Quote author",
            },
          },

          table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3,
            },
          },

          marker: {
            class: Marker,
            shortcut: "CMD+SHIFT+M",
          },

          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: "http://localhost:8000/uploadFile",
                byUrl: "http://localhost:8000/fetchUrl",
              },
              captionPlaceholder: "Add image caption",
              buttonContent: "Select an image",
            },
          },

          banner: {
            class: CustomBanner,
            inlineToolbar: false,
          },

          code: {
            class: Code,
            inlineToolbar: true,
          },

          toggle: {
            class: Toggle,
            inlineToolbar: true,
            config: {
              placeholder: "Toggle content here...",
            },
          },

          button: {
            class: Button,
            inlineToolbar: true,
            config: {
              placeholder: "Button text",
              defaultStyle: "primary",
            },
          },

          // newPage: {
          //   class: NewPage,
          //   inlineToolbar: false,
          //   config: {
          //     placeholder: "Add new page...",
          //   },
          // },
        },
      });
    }
  }, []);

  return (
    <div style={{ maxWidth: "700px", margin: "50px auto" }}>
      <input
        type="text"
        placeholder="Title..."
        style={{
          width: "100%",
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "20px",
          padding: "10px",
        }}
      />
      <div
        ref={editorHolderRef}
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          width: "100%",
          height: "800px",
        }}
      ></div>
    </div>
  );
};

export default App;