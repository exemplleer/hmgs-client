import { useState } from 'react';
import { Modal, Form, Button } from 'antd';
import { RoomForm } from '@/entities/room/ui';
import { createRoom } from '@/entities/room/api';
import { showSuccess, showError } from '@/shared/lib/notifications';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddRoomModal = ({ isOpen, setIsOpen }: Props) => {
  const [form] = Form.useForm();
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);

  const onFinish = async () => {
    try {
      setIsConfirmLoading(true);
      const data = form.getFieldsValue();
      createRoom(data);
      showSuccess('Новый номер создан успешно');
    } catch (error) {
      console.log(error);
      showError(error, 'Ошибка при создании нового номера');
    } finally {
      form.resetFields();
      setIsConfirmLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <Modal title="Создание нового номера" open={isOpen} closable={false} footer={null}>
      {/* <Form form={form} name="room_create" onFinish={onFinish} style={{ marginTop: '1.5rem' }}>
        <Form.Item label="Номер" name="num">
          <Input />
        </Form.Item>
        <Form.Item label="Название" name="title">
          <Input />
        </Form.Item>
        <Space size="small">
          <Form.Item label="Вместимость" name="capacity">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Цена" name="price">
            <InputNumber controls={false} suffix="₽" style={{ width: '100%' }} />
          </Form.Item>
        </Space>
        <Form.Item label="Описание" name="description">
          <TextArea />
        </Form.Item>
        <Form.Item>
          <Space size="small">
            <Button loading={isConfirmLoading} htmlType="submit">
              Добавить
            </Button>
            <Button onClick={() => form.resetFields()}>Сбросить</Button>
            <Button onClick={() => setIsOpen(false)}>Отменить</Button>
          </Space>
        </Form.Item>
      </Form> */}

      <RoomForm
        form={form}
        name="room_create"
        onFinish={onFinish}
        buttons={[
          <Button key="room_create_submit" loading={isConfirmLoading} htmlType="submit">
            Добавить
          </Button>,
          <Button key="room_create_reset" onClick={() => form.resetFields()}>
            Сбросить
          </Button>,
          <Button key="room_create_cancel" onClick={() => setIsOpen(false)}>
            Отменить
          </Button>,
        ]}
      />
    </Modal>
  );
};
