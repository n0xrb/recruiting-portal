import { Layout, theme, ConfigProvider } from 'antd';
import { Outlet } from 'react-router-dom';
const { Header, Content } = Layout;

const BodyLayout = () => {
    const defaultData = {
        borderRadius: 6,
        colorPrimary: '#D04A02',
    };
    return (
        <Layout
            className="layout bg-cover overflow-hidden flex"
            style={{
                minHeight: '100vh',
                minWidth: '100vw',
            }}
            id="layoutContainer"
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
