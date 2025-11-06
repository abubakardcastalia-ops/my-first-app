import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import Marker from "@editorjs/marker";
import ImageTool from "@editorjs/image";
// import Toggle from "@editorjs/toggle";
// import Button from "@editorjs/button";
// import Banner from "editorjs-banner-block";
// import NewPage from "editorjs-new-page";

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
            shortcut: 'CMD+SHIFT+M',
          },

          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: "http://localhost:8000/uploadFile", // upload endpoint
                byUrl: "http://localhost:8000/fetchUrl",
              },
              captionPlaceholder: "Add image caption",
              buttonContent: "Select an image",
            },
          },

          // toggle: {
          //   class: Toggle,
          //   inlineToolbar: true,
          // },

          // button: {
          //   class: Button,
          //   inlineToolbar: true,
          //   config: {
          //     placeholder: "Button text",
          //     defaultStyle: "primary",
          //   },
          // },

          // banner: {
          //   class: Banner,
          //   inlineToolbar: true,
          //   config: {
          //     placeholder: "Write your banner text...",
          //     styles: ["info", "warning", "success", "danger"],
          //   },
          // },

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

    // return () => {
    //   // editorRef.current?.destroy();
    //   editorRef.current = null;
    // };
  }, []);

  // const saveContent = async () => {
  //   if (!editorRef.current) return;
  //   const outputData = await editorRef.current.save();
  //   console.log("Saved data:", outputData);
  // };

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
        style={{ border: "1px solid #ccc", padding: "10px", width: "100%", height: "800px" }}
      ></div>
      {/* <button
        // onClick={saveContent}
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px", cursor: "pointer", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px" }}
      >
        Save
      </button> */}
    </div>
  );
};

export default App;
