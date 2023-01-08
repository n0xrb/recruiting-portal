import { useId } from 'react';
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
            disabled: true,
            className: 'select-none',
        },
        {
            label: 'Agendar entrevista',
            key: '2',
            icon: <UserOutlined />,
            disabled: true,
            className: 'select-none',
        },
        {
            label: 'Asignar postulante',
            key: '3',
            icon: <UserOutlined />,
            disabled: true,
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
                return record.requestID.toString();
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
            dataIndex: 'startDate',
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
            onFilter: (value, record) => record.startDate.toString().includes(value),
            render: (_, record) => {
                return new Date(record.startDate).toISOString().slice(0, 10);
            },
        },
        {
            title: 'Fecha Ingreso',
            dataIndex: 'employeeStartDate',
            width: '8em',
            sorter: (a, b) => new Date(a.employeeStartDate) - new Date(b.employeeStartDate),
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
            onFilter: (value, record) => record.employeeStartDate.toString().includes(value),
            render: (_, record) => {
                return new Date(record.employeeStartDate).toISOString().slice(0, 10);
            },
        },
        {
            title: 'Tipo Trabajador',
            dataIndex: 'typeWorker',
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
            onFilter: (value, record) => record.typeWorker.includes(value),
            filterIcon: () => {
                return <FilterFilled />;
            },
        },

        {
            title: 'Categoría Local',
            dataIndex: 'localCategory',
            width: 120,
            filters: [
                {
                    text: 'Socio EQ',
                    value: 'Socio EQ',
                    key: useId(),
                },
                {
                    text: 'Socio AP',
                    value: 'Socio AP',
                    key: useId(),
                },
                {
                    text: 'Senior Manager I',
                    value: 'Senior Manager I',
                    key: useId(),
                },
                {
                    text: 'Senior Manager II',
                    value: 'Senior Manager II',
                    key: useId(),
                },
                {
                    text: 'Gerente II',
                    value: 'Gerente II',
                    key: useId(),
                },
                {
                    text: 'Gerente I',
                    value: 'Gerente I',
                    key: useId(),
                },
                {
                    text: 'Senior A',
                    value: 'Senior A',
                    key: useId(),
                },
                {
                    text: 'Senior B',
                    value: 'Senior B',
                    key: useId(),
                },
                {
                    text: 'Senior C',
                    value: 'Senior C',
                    key: useId(),
                },
                {
                    text: 'Analista A',
                    value: 'Analista A',
                    key: useId(),
                },
                {
                    text: 'Analista B',
                    value: 'Analista B',
                    key: useId(),
                },
                {
                    text: 'Analista',
                    value: 'Analista',
                    key: useId(),
                },
                {
                    text: 'Estudiante En Practica',
                    value: 'Estudiante En Practica',
                    key: useId(),
                },
                {
                    text: 'Socio',
                    value: 'Director',
                    key: useId(),
                },
                {
                    text: 'Senior Manager',
                    value: 'Senior Manager',
                    key: useId(),
                },
                {
                    text: 'Gerente',
                    value: 'Gerente',
                    key: useId(),
                },
                {
                    text: 'Consultor Líder',
                    value: 'Consultor Líder',
                    key: useId(),
                },
                {
                    text: 'Consultor Senior',
                    value: 'Consultor Senior',
                    key: useId(),
                },
                {
                    text: 'Consultor',
                    value: 'Consultor',
                    key: useId(),
                },
                {
                    text: 'Gerente De Desarrollo Y Mantencion',
                    value: 'Gerente De Desarrollo Y Mantencion',
                    key: useId(),
                },
                {
                    text: 'Coordinador De Planning',
                    value: 'Coordinador De Planning',
                    key: useId(),
                },
                {
                    text: 'Jefe Typing',
                    value: 'Jefe Typing',
                    key: useId(),
                },
                {
                    text: 'Coordinador De Desarrollo Y Mantencion',
                    value: 'Coordinador De Desarrollo Y Mantencion',
                    key: useId(),
                },
                {
                    text: 'Especialista De Desarrollo',
                    value: 'Especialista De Desarrollo',
                    key: useId(),
                },
                {
                    text: 'Analista De Desarrollo',
                    value: 'Analista De Desarrollo',
                    key: useId(),
                },
                {
                    text: 'Asistente De Desarrollo',
                    value: 'Asistente De Desarrollo',
                    key: useId(),
                },
                {
                    text: 'Apoyo Administrativo',
                    value: 'Apoyo Administrativo',
                    key: useId(),
                },
                {
                    text: 'Supervisor',
                    value: 'Supervisor',
                    key: useId(),
                },
                {
                    text: 'Especialista Senior',
                    value: 'Especialista Senior',
                    key: useId(),
                },
                {
                    text: 'Especialista',
                    value: 'Especialista',
                    key: useId(),
                },
                {
                    text: 'Asistente',
                    value: 'Asistente',
                    key: useId(),
                },
                {
                    text: 'Procurador',
                    value: 'Procurador',
                    key: useId(),
                },
                {
                    text: 'Asistente De Riesgo',
                    value: 'Asistente De Riesgo',
                    key: useId(),
                },
                {
                    text: 'Administrador De Sistema',
                    value: 'Administrador De Sistema',
                    key: useId(),
                },
                {
                    text: 'Analista Trainee',
                    value: 'Analista Trainee',
                    key: useId(),
                },
                {
                    text: 'Contador',
                    value: 'Contador',
                    key: useId(),
                },
                {
                    text: 'Contador Lider',
                    value: 'Contador Lider',
                    key: useId(),
                },
                {
                    text: 'Contador Senior',
                    value: 'Contador Senior',
                    key: useId(),
                },
                {
                    text: 'Coordinador De Riesgo',
                    value: 'Coordinador De Riesgo',
                    key: useId(),
                },
                {
                    text: 'Jefe De Grupo',
                    value: 'Jefe De Grupo',
                    key: useId(),
                },
                {
                    text: 'Analistra Trainee',
                    value: 'Analistra Trainee',
                    key: useId(),
                },
                {
                    text: 'Gerente Abajo',
                    value: 'Gerente Abajo',
                    key: useId(),
                },
                {
                    text: 'Coordinador',
                    value: 'Coordinador',
                    key: useId(),
                },
                {
                    text: 'Asistente Administrativo',
                    value: 'Asistente Administrativo',
                    key: useId(),
                },
                {
                    text: 'Mensajero',
                    value: 'Mensajero',
                    key: useId(),
                },
            ],
            filterSearch: true,
            onFilter: (value, record) => record.localCategory.includes(value),
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
            onFilter: (value, record) => record.office.includes(value),
        },
        {
            title: 'Solicitante',
            dataIndex: 'requestedBy',
            ellipsis: true,
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
            onFilter: (value, record) => record.requestedBy.toString().includes(value),
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
            dataIndex: 'totalVacancy',
            sorter: (a, b) => a.totalVacancy - b.totalVacancy,
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
