import { memo, useId } from 'react';
import { SettingFilled, UserOutlined, SearchOutlined, FilterFilled } from '@ant-design/icons';
import { Badge, Dropdown } from 'antd';
import FilterColumnTableVacancy from './FilterColumnTableVacancy';

const columnsVacancyTable = () => {
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
            label: 'Aprobar vacante',
            key: '1',
            icon: <UserOutlined />,
            className: 'select-none',
        },
        {
            label: 'Agendar entrevista',
            key: '2',
            icon: <UserOutlined />,
            className: 'select-none',
        },
        {
            label: 'Asignar postulante',
            key: '3',
            icon: <UserOutlined />,
            className: 'select-none',
        },
        {
            label: 'Ver detalle',
            key: '4',
            icon: <UserOutlined />,
            disabled: true,
            className: 'select-none',
        },
    ];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    return [
        {
            title: 'ID Solicitud',
            dataIndex: 'requestID',
            width: 100,
            align: 'center',
            render: (_, record) => {
                return record.requestID.toString().substring(1, 8);
            },
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return (
                    <FilterColumnTableVacancy
                        setSelectedKeys={setSelectedKeys}
                        selectedKeys={selectedKeys}
                        confirm={confirm}
                        clearFilters={clearFilters}
                    />
                );
            },
            filterIcon: () => {
                return <SearchOutlined />;
            },
            onFilter: (value, record) => record.requestID.toString().includes(value),
        },
        {
            title: 'Fecha Apertura',
            dataIndex: 'startDateVancancy',
            width: '9em',
            sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return (
                    <FilterColumnTableVacancy
                        setSelectedKeys={setSelectedKeys}
                        selectedKeys={selectedKeys}
                        confirm={confirm}
                        clearFilters={clearFilters}
                    />
                );
            },
            filterIcon: () => {
                return <SearchOutlined />;
            },
            onFilter: (value, record) => record.startDateVancancy.toString().includes(value),
        },
        {
            title: 'Fecha Ingreso',
            dataIndex: 'entryDateEmployee',
            width: '8em',
            sorter: (a, b) => new Date(a.entryDateEmployee) - new Date(b.entryDateEmployee),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return (
                    <FilterColumnTableVacancy
                        setSelectedKeys={setSelectedKeys}
                        selectedKeys={selectedKeys}
                        confirm={confirm}
                        clearFilters={clearFilters}
                    />
                );
            },
            filterIcon: () => {
                return <SearchOutlined />;
            },
            onFilter: (value, record) => record.entryDateEmployee.toString().includes(value),
        },
        {
            title: 'Tipo Trabajador',
            dataIndex: 'workerType',
            width: '8em',
            filters: [
                {
                    text: 'Plazo Fijo',
                    value: 'Plazo Fijo',
                    key: useId(),
                },
                {
                    text: 'Socio',
                    value: 'Socio',
                    key: useId(),
                },
                {
                    text: 'Regular',
                    value: 'Regular',
                    key: useId(),
                },
                {
                    text: 'Trainee',
                    value: 'Trainee',
                    key: useId(),
                },
            ],
            onFilter: (value, record) => record.workerType.includes(value),
            filterIcon: () => {
                return <FilterFilled />;
            },
        },
        {
            title: 'Categoría Global',
            dataIndex: 'jobTitle',
            width: 120,
            filters: [
                {
                    text: 'Partner',
                    value: 'Partner',
                    key: useId(),
                },
                {
                    text: 'Salaried Partner',
                    value: 'Salaried Partner',
                    key: useId(),
                },
                {
                    text: 'Senior Manager 2',
                    value: 'Senior Manager 2',
                    key: useId(),
                },
                {
                    text: 'Senior Manager',
                    value: 'Senior Manager',
                    key: useId(),
                },
                {
                    text: 'Manager 2',
                    value: 'Manager 2',
                    key: useId(),
                },
                {
                    text: 'Manager',
                    value: 'Manager',
                    key: useId(),
                },
                {
                    text: 'Senior Associate 2',
                    value: 'Senior Associate 2',
                    key: useId(),
                },
                {
                    text: 'Senior Associate',
                    value: 'Senior Associate',
                    key: useId(),
                },
                {
                    text: 'Associate 2',
                    value: 'Associate 2',
                    key: useId(),
                },
                {
                    text: 'Associate',
                    value: 'Associate',
                    key: useId(),
                },
                {
                    text: 'Intern/Trainee',
                    value: 'Intern/Trainee',
                    key: useId(),
                },
            ],
            onFilter: (value, record) => record.jobTitle.includes(value),
        },
        {
            title: 'Categoría Local',
            dataIndex: 'jobTitle',
            width: 120,
            filters: [
                {
                    text: 'Partner',
                    value: 'Partner',
                    key: useId(),
                },
                {
                    text: 'Salaried Partner',
                    value: 'Salaried Partner',
                    key: useId(),
                },
                {
                    text: 'Senior Manager 2',
                    value: 'Senior Manager 2',
                    key: useId(),
                },
                {
                    text: 'Senior Manager',
                    value: 'Senior Manager',
                    key: useId(),
                },
                {
                    text: 'Manager 2',
                    value: 'Manager 2',
                    key: useId(),
                },
                {
                    text: 'Manager',
                    value: 'Manager',
                    key: useId(),
                },
                {
                    text: 'Senior Associate 2',
                    value: 'Senior Associate 2',
                    key: useId(),
                },
                {
                    text: 'Senior Associate',
                    value: 'Senior Associate',
                    key: useId(),
                },
                {
                    text: 'Associate 2',
                    value: 'Associate 2',
                    key: useId(),
                },
                {
                    text: 'Associate',
                    value: 'Associate',
                    key: useId(),
                },
                {
                    text: 'Intern/Trainee',
                    value: 'Intern/Trainee',
                    key: useId(),
                },
            ],
            onFilter: (value, record) => record.jobTitle.includes(value),
        },
        {
            title: 'Oficina',
            dataIndex: 'office',
            width: '9em',
            filters: [
                {
                    text: 'Santiago',
                    value: 'Santiago',
                    key: useId(),
                },
                {
                    text: 'Puerto Montt',
                    value: 'Puerto Montt',
                    key: useId(),
                },
                {
                    text: 'Concepción',
                    value: 'Concepción',
                    key: useId(),
                },
            ],
            onFilter: (value, record) => record.jobTitle.includes(value),
        },
        {
            title: 'Solicitante',
            dataIndex: 'requestedBy',
            ellipsis: true,
            sorter: (a, b) => a.requestedBy - b.requestedBy,
        },
        {
            title: 'LoS',
            dataIndex: 'los',
            width: 90,
            filters: [
                {
                    text: 'Tax',
                    value: 'Tax',
                    key: useId(),
                },
                {
                    text: 'Assurance',
                    value: 'Assurance',
                    key: useId(),
                },
                {
                    text: 'IFS',
                    value: 'IFS',
                    key: useId(),
                },
                {
                    text: 'Advisory',
                    value: 'Advisory',
                    key: useId(),
                },
            ],
            onFilter: (value, record) => record.los.includes(value),
            filterIcon: () => {
                return <FilterFilled />;
            },
        },
        {
            title: 'Estado Solicitud',
            dataIndex: 'requestStatus',
            width: '7em',
            align: 'center',
            render: (_, record) => {
                const value = record.requestStatus;

                if (value === 'Aprobado') {
                    return <Badge key={record.requestID} color="green" className="flex justify-center w-full" data-value="Aprobado" />;
                } else if (value === 'Rechazado') {
                    return <Badge key={record.requestID} color="red" className="flex justify-center w-full" data-value="Rechazado" />;
                } else {
                    return <Badge key={record.requestID} color="yellow" className="flex justify-center w-full" data-value="Pendiente" />;
                }
            },
            filters: [
                {
                    text: 'Aprobado',
                    value: 'Aprobado',
                    key: useId(),
                },
                {
                    text: 'Pendiente',
                    value: 'Pendiente',
                    key: useId(),
                },
                {
                    text: 'Rechazado',
                    value: 'Rechazado',
                    key: useId(),
                },
            ],
            onFilter: (value, record) => record.requestStatus.includes(value),
        },
        {
            title: 'Vacante Creada',
            dataIndex: 'vacancyIsCreated',
            width: '7em',
            align: 'center',
            render: (_, record) => {
                const value = record.vacancyIsCreated;

                if (value === 'Creada') {
                    return <Badge key={record.requestID} color="green" className="flex justify-center w-full" />;
                } else {
                    return <Badge key={record.requestID} color="yellow" className="flex justify-center w-full" />;
                }
            },
            filters: [
                {
                    text: 'Creada',
                    value: 'Creada',
                    key: useId(),
                },
                {
                    text: 'Pendiente',
                    value: 'Pendiente',
                    key: useId(),
                },
            ],
            onFilter: (value, record) => record.vacancyIsCreated.includes(value),
        },
        {
            title: 'Total Cupos Disponibles',
            dataIndex: 'totalVacancies',
            sorter: (a, b) => a.totalVacancies - b.totalVacancies,
            width: '8em',
            align: 'center',
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
};

export default columnsVacancyTable;
