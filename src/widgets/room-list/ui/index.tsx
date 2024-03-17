import { useEffect, useState } from 'react';
import { Button, Space, Table, TableColumnsType } from 'antd';
import { IRoom } from '@/entities/room/model/interfaces';
import { AddRoomModal, EditRoomModal } from '@/entities/room/ui';
import { getRooms } from '@/entities/room/api';
import { showError } from '@/shared/lib';

export const RoomList = () => {
  const columns: TableColumnsType<IRoom> = [
    {
      title: 'Номер',
      dataIndex: 'num',
      key: 'num',
      width: '15%',
    },
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
      width: '50%',
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `${text} руб.`,
      width: '15%',
    },
    {
      title: 'Вместимость',
      dataIndex: 'capacity',
      key: 'capacity',
      render: (text) => `${text} чел.`,
      width: '15%',
    },
    {
      title: 'Действия',
      key: 'actions',
      width: '5%',
      fixed: 'right',
      render: (_, record) => <Button onClick={() => handleEdit(record)}>Ред.</Button>,
    },
  ];

  function handleEdit(room: IRoom) {
    setSelectedRoomId(room.id);
    setIsOpenEditRoomModal(true);
    console.log(room);
  }

  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenCrateRoomModal, setIsOpenCrateRoomModal] = useState(false);
  const [isOpenEditRoomModal, setIsOpenEditRoomModal] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number>();

  const fetchData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const res = await getRooms();
      setRooms(res);
    } catch (error) {
      showError(error, `Ошибка при получении списка номеров`);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshHandle = async (): Promise<void> => await fetchData();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Space size="middle" direction="vertical" style={{ width: '100%' }}>
        <h2 style={{ margin: 0 }}>Список всех гостиничных номеров </h2>
        <Space size="small" wrap>
          <Button onClick={refreshHandle}>Обновить список</Button>
          <Button onClick={() => setIsOpenCrateRoomModal(true)}>Добавить новый номер</Button>
        </Space>
        <Table
          bordered
          columns={columns}
          loading={isLoading}
          dataSource={rooms.map((room) => ({ ...room, key: room.num }))}
          scroll={{ x: true }}
          size="middle"
          pagination={false}
        />
      </Space>

      {/* Modals */}
      <AddRoomModal isOpen={isOpenCrateRoomModal} setIsOpen={setIsOpenCrateRoomModal} />
      <EditRoomModal
        roomId={selectedRoomId}
        isOpen={isOpenEditRoomModal}
        setIsOpen={setIsOpenEditRoomModal}
      />
    </>
  );
};
