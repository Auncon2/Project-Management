import { Button, Col, Form, Input, Row } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

import { RxCross2 } from "react-icons/rx";

const ProjectManagementAddCard = ({ content }: any) => {
  const [card, setCard] = useState(false);
  const onFinish = (values: any) => {
    const body = {
      title: values.email,
      type: content,
    };
    //   getOTP(body);
    console.log(body);
  };
  return (
    <>
      {card ? (
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            // label={
            //   <span style={{ color: "black", fontWeight: "bold" }}>Email</span>
            // }
            // label={<span className="text-white">Email</span>}
            rules={[{ required: true, message: "Enter a card name" }]}
          >
            <Input
              type="text"
              placeholder="Enter a name for this card..."
              style={{ marginTop: "10px" }}
            />
          </Form.Item>
          <Row justify={"start"} align={"middle"}>
            <Col xs={12}>
              <Form.Item>
                <Button
                  type="primary"
                  style={{
                    // backgroundImage:
                    //   "linear-gradient(to right,#282a42,#40458e,#666cff)",
                    color: "white",
                    border: "none",
                    marginTop: "-7px",
                    width: "100%",
                  }}
                  //   loading={isLoading}
                  htmlType="submit"
                  block
                  // icon={<LoginOutlined />}
                >
                  Submit
                </Button>
              </Form.Item>
            </Col>
            <Col xs={4}>
              <Form.Item>
                <RxCross2
                  size={35}
                  color="red"
                  onClick={() => setCard(false)}
                  style={{ cursor: "pointer" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ) : (
        <Button
          icon={<FaPlus />}
          style={{ marginTop: "10px" }}
          onClick={() => setCard(true)}
        >
          Add a card
        </Button>
      )}
    </>
  );
};

export default ProjectManagementAddCard;
