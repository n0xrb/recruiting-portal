import { Layout, theme, ConfigProvider } from 'antd';
import { Outlet } from 'react-router-dom';
const { Header, Content } = Layout;

const BodyLayout = () => {
    const defaultData = {
        borderRadius: 6,
        colorPrimary: '#ff9200',
    };
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
            <Content className="flex">
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: defaultData.colorPrimary,
                        },
                    }}
                >
                    <Outlet />
                </ConfigProvider>
            </Content>
        </Layout>
    );
};
export default BodyLayout;
