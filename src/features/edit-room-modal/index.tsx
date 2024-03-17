import { useEffect, useState } from 'react';
import { Modal, Form, Button, Popconfirm } from 'antd';
import { RoomForm } from '@/entities/room/ui';
import { getOneRoom, removeRoom, updateRoom } from '@/entities/room/api';
import { showError, showSuccess } from '@/shared/lib';

interface Props {
  roomId?: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditRoomModal = ({ roomId, isOpen, setIsOpen }: Props) => {
  const [form] = Form.useForm();
  const [roomInitialValue, setRoomInitialValue] = useState();
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isFinishLoading, setIsFinishLoading] = useState(false);
  const [isRemoveLoading, setIsRemoveLoading] = useState(false);

  const fetchData = async (id: number): Promise<void> => {
    try {
      setIsFormLoading(true);
      const res = await getOneRoom(id);
      setRoomInitialValue(res);
    } catch (error) {
      showError(error, 'Ошибка при получении информации о номере');
    } finally {
      setIsFormLoading(false);
    }
  };

  const onFinish = async (id: number): Promise<void> => {
    try {
      setIsFinishLoading(true);
      const data = form.getFieldsValue();
      const { price } = data;
      await updateRoom(id, { ...data, price: +price });
      showSuccess('Информация о номере успешно обновлена');
      setIsOpen(false);
    } catch (error) {
      showError(error, `Ошибка при обновлении информации о номере`);
    } finally {
      setIsFinishLoading(false);
    }
  };

  const removeHandler = async (id: number): Promise<void> => {
    try {
      setIsRemoveLoading(true);
      await removeRoom(id);
      showSuccess('Информация о номере успешно удалена');
    } catch (error) {
      showError(error, 'Ошибка при удалении информации о номере');
    } finally {
      setIsRemoveLoading(false);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (roomId) fetchData(roomId);
  }, [roomId]);

  useEffect(() => {
    if (roomInitialValue) form.setFieldsValue(roomInitialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomInitialValue]);

  return (
    <Modal
      destroyOnClose
      title="Редактирование номера"
      open={isOpen}
      closable={false}
      footer={null}
    >
      {/* <Form
        disabled={isFormLoading}
        form={form}
        name="room_edit"
        onFinish={() => roomId && onFinish(roomId)}
        style={{ marginTop: '1.5rem' }}
      >
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
            <Button loading={isFinishLoading} htmlType="submit">
              Применить
            </Button>
            <Button onClick={() => form.setFieldsValue(roomInitialValue)}>Сбросить</Button>
            <Popconfirm
              title="Подтвердить?"
              okText="Да"
              cancelText="Отмена"
              onConfirm={() => roomId && removeHandler(roomId)}
              okButtonProps={{ loading: isRemoveLoading }}
            >
              <Button danger>Удалить</Button>
            </Popconfirm>
            <Button onClick={() => setIsOpen(false)}>Отменить</Button>
          </Space>
        </Form.Item>
      </Form> */}

      <RoomForm
        form={form}
        disabled={isFormLoading}
        name="room_edit"
        onFinish={() => roomId && onFinish(roomId)}
        style={{ marginTop: '1.5rem' }}
        buttons={[
          <Button key="room_edit_submit" loading={isFinishLoading} htmlType="submit">
            Применить
          </Button>,
          <Button key="room_edit_reset" onClick={() => form.setFieldsValue(roomInitialValue)}>
            Сбросить
          </Button>,
          <Button key="room_edit_cancel" onClick={() => setIsOpen(false)}>
            Отменить
          </Button>,
          <Popconfirm
            key="room_edit_remove"
            title="Подтвердить?"
            okText="Да"
            cancelText="Отмена"
            onConfirm={() => roomId && removeHandler(roomId)}
            okButtonProps={{ loading: isRemoveLoading }}
          >
            <Button danger>Удалить</Button>
          </Popconfirm>,
        ]}
      />
    </Modal>
  );
};
