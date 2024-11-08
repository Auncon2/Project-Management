import { Avatar, message, Upload, UploadProps } from "antd";
import { useState } from "react";
import { FaClipboard } from "react-icons/fa";
import { IoIosAttach } from "react-icons/io";
import { Modal } from "antd";

import { InboxOutlined } from "@ant-design/icons";
const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const ProjectManagementCard = ({ provided, content }: any) => {
  const getLetterColor = (letter: string) => {
    const colors: { [key: string]: string } = {
      A: "red",
      B: "blue",
      C: "green",
      D: "orange",
      E: "purple",
      F: "pink",
      G: "yellow",
      H: "brown",
      I: "cyan",
      J: "magenta",
      K: "lime",
      L: "teal",
      M: "navy",
      N: "olive",
      O: "maroon",
      P: "coral",
      Q: "gold",
      R: "silver",
      S: "indigo",
      T: "violet",
      U: "turquoise",
      V: "salmon",
      W: "khaki",
      X: "plum",
      Y: "orchid",
      Z: "tan",
    };

    return colors[letter?.toUpperCase()] || "default-color";
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      ref={provided?.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      // className="task"
      style={{
        ...provided.draggableProps.style,
        display: "flex",
        flexDirection: "column",
        border: "1px solid lightgrey",
        borderRadius: "9px",
        padding: "8px",
        marginBottom: "8px",
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        minHeight: "50px",
        width: "267px",
        color: "black",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", gap: "6px" }}>
        {content?.photo ? (
          <Avatar
            //   style={{ border: "2px solid green" }}
            size={45}
            src={`${content?.photo}`}
          >
            {content?.email.slice(0, 1).toUpperCase()}
          </Avatar>
        ) : (
          <Avatar
            style={{
              border: "1px solid ",
              backgroundColor: getLetterColor(content?.email.slice(0, 1) ?? ""),
            }}
            size={45}
          >
            {content?.email.slice(0, 1).toUpperCase()}
          </Avatar>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",

            fontWeight: "bold",
          }}
        >
          <span
            style={{
              fontSize: "15px",
            }}
          >
            {content?.name}
          </span>
          <span
            style={{
              fontSize: "12px",
            }}
          >
            {content?.email}
          </span>
          {/* <span
            style={{
              fontSize: "12px",
            }}
          >
            Software Developer
          </span> */}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <span style={{ marginTop: "5px", fontWeight: 500 }}>
          {content?.content}
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            padding: "3px",
            borderRadius: "2px",
            background: "#f2f4f7",
            fontSize: "12px",
          }}
        >
          <FaClipboard />
          <span>1/2</span>
        </span>
      </div>
      <span
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "2px",
          padding: "3px",
          borderRadius: "2px",

          fontSize: "12px",
        }}
        onClick={showModal}
      >
        <IoIosAttach size={12} />
        <span>20</span>
      </span>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </Modal>
    </div>
  );
};

export default ProjectManagementCard;
