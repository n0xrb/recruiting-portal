import { Table, Badge, Dropdown, Button } from 'antd';
import { SettingFilled, UserOutlined } from '@ant-design/icons';
import { getAllDataVacancy } from '@getters';
import { useLoaderData } from 'react-router-dom';

const handleButtonClick = e => {
    message.info('Click on left button.');
    console.log('click left button', e);
};

const handleMenuClick = e => {
    message.info('Click on menu item.');
    console.log('click', e);
};

const items = [
    {
        label: '1st menu item',
        key: '1',
        icon: <UserOutlined />,
    },
    {
        label: '2nd menu item',
        key: '2',
        icon: <UserOutlined />,
    },
    {
        label: '3rd menu item',
        key: '3',
        icon: <UserOutlined />,
        danger: true,
    },
    {
        label: '4rd menu item',
        key: '4',
        icon: <UserOutlined />,
        danger: true,
        disabled: true,
    },
];

const menuProps = {
    items,
    onClick: handleMenuClick,
};

const columns = [
    {
        title: 'ID Solicitud',
        dataIndex: 'requestID',
        width: 100,
        render: (_, record) => {
            return record.requestID.toString().substring(1, 8);
        },
    },
    {
        title: 'Fecha Apertura',
        dataIndex: 'startDateVancancy',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.startDate - b.startDate,
    },
    {
        title: 'Fecha Ingreso',
        dataIndex: 'entryDateEmployee',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.entryDateEmployee - b.entryDateEmployee,
    },
    {
        title: 'Worker Type',
        dataIndex: 'workerType',
        defaultSortOrder: 'descend',
        width: 100,
        sorter: (a, b) => a.workerType - b.workerType,
    },
    {
        title: 'Job Title',
        dataIndex: 'jobTitle',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.jobTitle - b.jobTitle,
    },
    {
        title: 'Office',
        dataIndex: 'office',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.office - b.office,
    },
    {
        title: 'Solicitante',
        dataIndex: 'requestedBy',
        defaultSortOrder: 'descend',
        ellipsis: true,
        sorter: (a, b) => a.requestedBy - b.requestedBy,
    },
    {
        title: 'LoS',
        dataIndex: 'los',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.los - b.los,
        width: 90,
    },
    {
        title: 'Estado Solicitud',
        dataIndex: 'requestStatus',
        width: '80px',
        render: (_, record) => {
            const value = record.requestStatus;

            if (value === 'Aprobado') {
                return <Badge key={record.requestID} color="green" className="flex justify-center w-full" />;
            } else if (value === 'Rechazado') {
                return <Badge key={record.requestID} color="red" className="flex justify-center w-full" />;
            } else {
                return <Badge key={record.requestID} color="yellow" className="flex justify-center w-full" />;
            }
        },
    },
    {
        title: 'Vacante Creada',
        dataIndex: 'vacancyIsCreated',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.vacancyIsCreated - b.vacancyIsCreated,
        render: (_, record) => {
            const value = record.vacancyIsCreated;

            if (value === 'Creada') {
                return <Badge key={record.requestID} color="green" className="flex justify-center w-full" />;
            } else {
                return <Badge key={record.requestID} color="yellow" className="flex justify-center w-full" />;
            }
        },
    },
    {
        title: 'Total Cupos Disponibles',
        dataIndex: 'totalVacancies',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.totalVacancies - b.totalVacancies,
    },
    {
        title: 'Acción',
        dataIndex: 'action',
        width: 80,
        render: (_, record) => {
            return (
                <Dropdown menu={menuProps} trigger={['click']}>
                    <div className="bg-[#FFB600] text-black text-center cursor-pointer max-h-[1.5rem] max-w-[3rem]">
                        <SettingFilled className="text-[1rem] self-center" />
                    </div>
                </Dropdown>
            );
        },
    },
];

const Home = () => {
    const { vacancyDataForTable } = useLoaderData();
    return (
        <div
            className="container max-w-[95vw] px-7 py-4 rounded-lg max-h-[82vh] bg-white my-auto
        shadow-lg flex !text-xs flex-col"
        >
            <div className="flex justify-between mb-4 items-center">
                <div className="text-[1.2rem] font-semibold">Portal Altas WorkDay</div>
                <Button className="bg-[#E52445] text-white hover:!text-red-200">Ingresar Vacante</Button>
            </div>
            <Table
                columns={columns}
                dataSource={vacancyDataForTable}
                className="w-full"
                size="small"
                scroll={{
                    x: '100%',
                    y: '430px',
                }}
            />
        </div>
    );
};
export default Home;

export const loaderHome = async () => {
    const environment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

    if (environment) {
        const vacancyDataForTable = getAllDataVacancy();
        return { vacancyDataForTable };
    } else {
        const vacancyDataForTable = new Promise((resolve, reject) => {
            google.script.run.withSuccess;
        });
    }
};
