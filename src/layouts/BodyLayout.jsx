import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
const { Header, Content } = Layout;

const BodyLayout = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout
            className="layout bg-[url('bg-layout.webp')] bg-cover overflow-hidden flex"
            style={{
                minHeight: '100vh',
                minWidth: '100vw',
            }}
        >
            <Header className="!bg-white shadow-md">
                <div className="logo" />
            </Header>
            <Content
                className="container max-w-[95vw] p-8 rounded-lg max-h-[80vh] bg-white my-auto
                shadow-lg flex !text-xs overflow-auto"
            >
                <Outlet />
            </Content>
        </Layout>
    );
};
export default BodyLayout;
