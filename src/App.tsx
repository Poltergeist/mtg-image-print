import React from "react";
import "./App.css";
import { useDropzone } from "react-dropzone";

interface FilePreview extends File {
  preview: string;
}

function App() {
  const [files, setFiles] = React.useState<FilePreview[]>([]);
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const fileList = files.map((file) => (
    <img src={file.preview} className="card" alt={file.name} key={file.name} />
  ));

  return (
    <div className="App">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag and drop your files here, or click to select files</p>
      </div>
      <div className="container">{fileList}</div>
    </div>
  );
}

export default App;
