import { navbarLinks } from '@/shared/lib';
import { Layout, Menu, theme } from 'antd';
import { NavLink } from 'react-router-dom';
const { Header, Content } = Layout;

export const BaseLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100%' }}>
      <Header style={{ display: 'flex', alignItems: 'center', padding: '0 28px' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={navbarLinks.map((link) => ({
            label: link.text,
            key: link.url,
          }))}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content
        style={{
          margin: '12px 12px',
          padding: 16,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};
