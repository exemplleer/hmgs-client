import { Form, FormInstance, Input, InputNumber, Space } from 'antd';
import { ReactNode } from 'react';
const { TextArea } = Input;

interface Props {
  form: FormInstance;
  name: string;
  onFinish: (roomId: string) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  buttons: ReactNode[];
}

export const RoomForm = ({ form, name, disabled = false, onFinish, buttons }: Props) => {
  return (
    <Form form={form} name={name} disabled={disabled} onFinish={onFinish}>
      <Form.Item label="Номер" name="num" required>
        <Input />
      </Form.Item>
      <Form.Item label="Название" name="title" required>
        <Input />
      </Form.Item>
      <Space size="small">
        <Form.Item label="Вместимость" name="capacity" required>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Цена" name="price" required>
          <InputNumber controls={false} suffix="₽" style={{ width: '100%' }} />
        </Form.Item>
      </Space>
      <Form.Item label="Описание" name="description">
        <TextArea />
      </Form.Item>
      <Form.Item>
        <Space size="small" wrap>
          {buttons}
        </Space>
      </Form.Item>
    </Form>
  );
};
