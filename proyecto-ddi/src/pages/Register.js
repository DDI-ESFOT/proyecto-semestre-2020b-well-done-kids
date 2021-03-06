import React, { useState } from "react";
import { Button, Col, Form, Input, message, Row, Select, Image } from "antd";
import { useAuth } from "../lib/auth";
import translateMessage from "../utils/translateMessage";
import withoutAuth from "../hocs/withoutAuth";

const { Option } = Select;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const onFinish = async (data) => {
    setLoading(true);
    try {
      console.log("FORM data", data);
      let score = 0;

      await register({
        ...data,
        score,
      });
      setLoading(false);
    } catch (error) {
      const errorCode = error.code;
      message.error(translateMessage(errorCode));
      setLoading(false);
    }
  };
  const layout = {
    labelCol: { span: 40 },
    wrapperCol: { span: 40 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div id="form">
      <div id="form1">
        <Row justify="center">
          <Col>
            <p>
              <h1>Si no tienes una cuenta aún... regístrate!</h1>
            </p>
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Nombre de usuario" }]}
              >
                <Input placeholder="Nombre" />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[{ required: true, message: "Correo Electrónico " }]}
              >
                <Input placeholder="Correo Electrónico" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Contraseña" }]}
              >
                <Input.Password placeholder="Contraseña" />
              </Form.Item>

              <Form.Item
                name="passwordconfirm"
                rules={[
                  {
                    required: true,
                    message: "Debes confirmar tu clave",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Las claves no coinciden")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirmar contraseña" />
              </Form.Item>
              <Form.Item
                name="selectedYear"
                rules={[
                  { required: true, message: "Ingrese la edad del peque" },
                ]}
              >
                <Select defaultValue="Ingrese la edad del niño o niña">
                  <Option value="6">6 años</Option>
                  <Option value="7">7 años</Option>
                  <Option value="8">8 años</Option>
                  <Option value="9">9 años</Option>
                  <Option value="10">10 años</Option>
                  <Option value="11">11 años</Option>
                </Select>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Registrarse
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default withoutAuth(Register);
