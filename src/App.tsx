import React from "react";
import "./App.css";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";

interface FilePreview extends File {
  preview: string;
  uuid: string;
}

const baseStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column" as "column",
  alignItems: "center",
  padding: "calc( 25vh / 2 - 2rem )",
  boxSizing: "border-box",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  height: "25vh",
  position: "fixed",
  width: "100%",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function App() {
  const [files, setFiles] = React.useState<FilePreview[]>([]);
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    setFiles((old) => [
      ...old,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          uuid: uuidv4(),
        })
      ),
    ]);
  }, []);
  const onRemove: React.MouseEventHandler<HTMLImageElement> = (event) => {
    setFiles([
      ...files.filter(
        (file) => file.uuid !== event.currentTarget.getAttribute("data-uuid")
      ),
    ]);
  };

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: { "image/*": [] }, onDrop });

  const style = React.useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const fileList = files.map((file) => (
    <img
      src={file.preview}
      className="card"
      alt={file.name}
      data-uuid={file.uuid}
      key={file.uuid}
      onClick={onRemove}
    />
  ));

  return (
    <div className="App">
      <div {...getRootProps({ style })} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag and drop your files here, or click to select files</p>
      </div>
      <div className="container">{fileList}</div>
    </div>
  );
}

export default App;
