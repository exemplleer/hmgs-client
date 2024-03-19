import { RoomList } from '@/widgets/room-list';
import { Space } from 'antd';

export const RoomPage = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <h2>Список всех гостиничных номеров </h2>
      <RoomList />
    </Space>
  );
};
