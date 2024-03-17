import '@/shared/styles/global.css';
import { BaseLayout } from '@/shared/ui/layouts';
import { RoomList } from '@/widgets/room-list/ui';

function App() {
  return (
    <BaseLayout>
      <RoomList></RoomList>
    </BaseLayout>
  );
}

export default App;
