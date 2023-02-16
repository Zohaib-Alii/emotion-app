import React, { useState } from "react";
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { Dragger } = Upload;
const UploadFilePpt = () => {
  // ts+++++++++++++++++++++++++++

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  console.log(file, "file", "previewUrl", previewUrl);
  // const handleFileUpload = (info) => {
  //   debugger;
  //   setTimeout(() => {
  //     const { status } = info.file;
  //     debugger;
  //     if (status === "uploading") {
  //       message.success(`${info.file.name} file uploaded successfully.`);
  //       setFile(info.file);
  //       console.log(info.file, "info file");
  //       generatePreview();
  //     } else if (status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   }, 3000);
  // };
  const allowedTypes = [
    "application/pdf",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ];
  const handleFileUpload = async ({ file }) => {
    debugger;
    if (allowedTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        const fileExtension = file.name.split(".").pop().toLowerCase();
        let previewUrl = null;
        if (fileExtension === "pdf") {
          previewUrl = dataUrl;
        } else if (fileExtension === "ppt" || fileExtension === "pptx") {
          previewUrl = `${dataUrl}#toolbar=0&navpanes=0&scrollbar=0`;
        } else {
          message.error("Unsupported file format.");
          return;
        }
        setPreviewUrl(previewUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  // const generatePreview = () => {
  //   debugger;
  //   if (!file) {
  //     message.error("Please upload a file.");
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     const dataUrl = reader.result;
  //     const fileExtension = file.name.split(".").pop().toLowerCase();
  //     let previewUrl = null;
  //     if (fileExtension === "pdf") {
  //       previewUrl = dataUrl;
  //     } else if (fileExtension === "ppt" || fileExtension === "pptx") {
  //       previewUrl = `${dataUrl}#toolbar=0&navpanes=0&scrollbar=0`;
  //     } else {
  //       message.error("Unsupported file format.");
  //       return;
  //     }
  //     setPreviewUrl(previewUrl);
  //   };
  //   reader.readAsDataURL(file);
  // };
  // const generatePreview = () => {
  //   console.log(file, "file");
  //   debugger;
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       if (file.type === "application/pdf") {
  //         const pdf = new window.PDFJS.PDFDocumentProxy({
  //           data: e.target.result,
  //         });
  //         pdf.getPage(1).then((page) => {
  //           const viewport = page.getViewport({ scale: 1 });
  //           const canvas = document.createElement("canvas");
  //           const context = canvas.getContext("2d");
  //           canvas.height = viewport.height;
  //           canvas.width = viewport.width;
  //           page
  //             .render({ canvasContext: context, viewport })
  //             .promise.then(() => {
  //               setPreview(canvas.toDataURL());
  //             });
  //         });
  //       } else if (
  //         file.type === "application/vnd.ms-powerpoint" ||
  //         file.type ===
  //           "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  //       ) {
  //         const ppt = new window.PptxGenJS();
  //         ppt.load(e.target.result);
  //         const slide = ppt.getSlide(1);
  //         const base64 = slide.getBase64(true);
  //         setPreview(base64);
  //       }
  //     };
  //     if (file.type === "application/pdf") {
  //       reader.readAsArrayBuffer(file);
  //     } else if (
  //       file.type === "application/vnd.ms-powerpoint" ||
  //       file.type ===
  //         "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  //     ) {
  //       reader.readAsBinaryString(file);
  //     }
  //   }
  // };

  // const beforeUpload = (file) => {
  //   if (
  //     file.type !== "application/pdf" &&
  //     file.type !== "application/vnd.ms-powerpoint" &&
  //     file.type !==
  //       "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  //   ) {
  //     message.error("You can only upload PDF and PPT files.");
  //     return false;
  //   }
  //   return true;
  // };

  return (
    <div>
      <div>
        <Dragger onChange={handleFileUpload}>
          <p className='ant-upload-drag-icon'>+</p>
          <p className='ant-upload-text'>
            Click or drag file to this area to upload
          </p>
        </Dragger>
        {previewUrl && (
          <div style={{ marginTop: 16 }}>
            <iframe src={previewUrl} width='100%' height='600' />
          </div>
        )}
      </div>
      {/* <div>
        <Upload
          accept='.ppt,.pptx,.pdf'
          showUploadList={false}
          beforeUpload={beforeUpload}
          customRequest={() => {}}
          onChange={handleFileUpload}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        {preview && (
          <img
            src={preview}
            alt='File preview'
            style={{ maxWidth: "100%", maxHeight: "500px" }}
          />
        )}
      </div> */}
    </div>
  );
};

export default UploadFilePpt;
