import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Notes = () => {
  const [editorHTML, setEditorHTML] = useState("");

  const handleChange = (html) => {
    setEditorHTML(html);
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  return (
    <div style={{ height: "95%", padding: "50px 40px" }}>
      <ReactQuill
        style={{ height: "100%" }}
        theme={"snow"}
        onChange={handleChange}
        value={editorHTML}
        modules={modules}
        formats={formats}
        bounds={".app"}
        placeholder={"Write something here"}
      />
    </div>
  );
};

export default Notes;
