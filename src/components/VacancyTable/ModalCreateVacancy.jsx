import { memo, useRef, useState } from 'react';
import { Modal, Select, DatePicker, Divider, Form, Button, InputNumber, Input } from 'antd';

const typeRecruitment = [
    {
        label: 'Reclutamiento',
        value: 'Reclutamiento',
    },
    {
        label: 'Hunting',
        value: 'Hunting',
    },
    {
        label: 'Evaluación Psicolaboral',
        value: 'Evaluación Psicolaboral',
    },
];

const typeWorkerOptions = [
    { label: 'Plazo Fijo', value: 'Plazo Fijo' },
    { label: 'Regular', value: 'Regular' },
    { label: 'Trainee', value: 'Trainee' },
    { label: 'Socio', value: 'Socio' },
];
const ModalCreateVacancy = ({ modalVacancyCreation, setModalVacancyCreation, matrixWD }) => {
    const [losOptions, setLosOptions] = useState([
        { label: 'Assurance', value: 'Assurance' },
        { label: 'Tax', value: 'Tax' },
        { label: 'Advisory', value: 'Advisory' },
        { label: 'IFS', value: 'Internal Firm Service' },
    ]);

    const [costCenterID, setCostCenterID] = useState('');

    const [loadingSubmit, setLoadingSubmit] = useState(true);
    const fixedTermContainer = useRef();
    const [form] = Form.useForm();

    const [losSelected, setLosSelected] = useState('');
    const [subLosSelected, setSubLosSelected] = useState('');
    const [teamSelected, setTeamSelected] = useState('');
    const [officeSelected, setOfficeSelected] = useState('');
    const [localCategorySelected, setLocalCategorySelected] = useState('');

    const [subLosOptions, setSubLosOptions] = useState({ options: [], disabled: true });
    const [teamOptions, setTeamOptions] = useState({ options: [], disabled: true });
    const [officesOptions, setOfficesOptions] = useState({ options: [], disabled: true });
    const [localCategoriesOptions, setLocalCategoriesOptions] = useState({ options: [], disabled: true });
    const [teamLeadersOptions, setTeamLeadersOptions] = useState({ options: [], disabled: true });

    const onFinish = values => {
        console.log('Received values of form:', values);
    };

    const handleChangeOnMatrixElements = (value, from) => {
        const allNamesInputs = ['LoS', 'Sub LoS', 'Team', 'Office', 'localCategory', 'Team Lead'];

        const nextIndexNodeForReset = allNamesInputs.indexOf(from) + 1;
        const allPendingReset = allNamesInputs.slice(nextIndexNodeForReset);
        allPendingReset.forEach(
            name => (document.getElementById(`dynamic_form_complex_${name}`).parentNode.nextSibling.innerText = 'Seleccionar'),
        );

        let tempOptions = [];

        switch (from) {
            case 'LoS':
                setLosSelected(value);

                setTeamOptions({ options: [], disabled: true });
                setOfficesOptions({ options: [], disabled: true });
                setLocalCategoriesOptions({ options: [], disabled: true });
                setTeamLeadersOptions({ options: [], disabled: true });

                const allSubLoS = Object.entries(matrixWD['LoS'][value]).map(results => results[0]);
                allSubLoS.forEach(subLos => tempOptions.push({ label: subLos, value: subLos }));
                setSubLosOptions({ options: tempOptions, disabled: false });

                break;
            case 'Sub LoS':
                setSubLosSelected(value);

                setOfficesOptions({ options: [], disabled: true });
                setLocalCategoriesOptions({ options: [], disabled: true });
                setTeamLeadersOptions({ options: [], disabled: true });

                const allResultsTeamInSubLoS = Object.entries(matrixWD['LoS'][losSelected][value]).map(results => results[0]);
                allResultsTeamInSubLoS.forEach(team => tempOptions.push({ label: team, value: team }));

                setTeamOptions({ options: tempOptions, disabled: false });
                break;

            case 'Team':
                setTeamSelected(value);

                setLocalCategoriesOptions({ options: [], disabled: true });
                setTeamLeadersOptions({ options: [], disabled: true });

                const allResultsOfficesInTeam = Object.entries(matrixWD['LoS'][losSelected][subLosSelected][value]).map(
                    results => results[0],
                );
                allResultsOfficesInTeam.forEach(office => tempOptions.push({ label: office, value: office }));

                setOfficesOptions({ options: tempOptions, disabled: false });
                break;
            case 'Office':
                setOfficeSelected(value);

                setTeamLeadersOptions({ options: [], disabled: true });

                const allResultsCategoryInOffice = Object.entries(matrixWD['LoS'][losSelected][subLosSelected][teamSelected][value]);
                console.log(allResultsCategoryInOffice[0]);
                const allCategoryResults = Object.entries(allResultsCategoryInOffice[0][1]);
                const allLocalCategories = allCategoryResults.map(category => category[0]);
                allLocalCategories.forEach(category => tempOptions.push({ label: category, value: category }));

                setLocalCategoriesOptions({ options: tempOptions, disabled: false });
                break;
            case 'localCategory':
                setLocalCategorySelected(value);

            default:
                break;
        }
    };

    const handleChange = e => {
        console.log(e);
    };

    const handleChangeTypeWorker = value => {
        if (value === 'Plazo Fijo') {
            fixedTermContainer.current.classList.remove('ghost');
        } else {
            fixedTermContainer.current.classList.add('ghost');
        }
    };

    return (
        <Modal
            title="Creación de Vacante"
            open={modalVacancyCreation}
            onOk={() => setModalVacancyCreation(false)}
            onCancel={() => setModalVacancyCreation(false)}
            centered
            footer={null}
            loading={loadingSubmit}
            confirmLoading={loadingSubmit}
        >
            <div className="container">
                <Form form={form} name="dynamic_form_complex" layout="vertical" onFinish={onFinish} autoComplete="off">
                    <Form.Item
                        name="typeRecruitment"
                        label="Tipo de Selección"
                        rules={[
                            {
                                required: true,
                                message: 'Obligatorio',
                            },
                        ]}
                    >
                        <Select options={typeRecruitment} placeholder="Seleccionar" />
                    </Form.Item>
                    <Divider />
                    <div className="grid grid-cols-3 gap-x-4 xs:grid-cols-1">
                        <Form.Item name="LoS" label="LoS" rules={[{ required: true, message: 'Obligatorio' }]}>
                            <Select
                                options={losOptions}
                                placeholder="Seleccionar"
                                onSelect={value => handleChangeOnMatrixElements(value, 'LoS')}
                            />
                        </Form.Item>

                        <Form.Item name="Sub LoS" label="Sub LoS" rules={[{ required: true, message: 'Obligatorio' }]}>
                            <Select
                                options={subLosOptions.options}
                                placeholder="Seleccionar"
                                disabled={subLosOptions.disabled}
                                onSelect={value => handleChangeOnMatrixElements(value, 'Sub LoS')}
                            />
                        </Form.Item>

                        <Form.Item name="Team" label="Equipo" rules={[{ required: true, message: 'Obligatorio' }]}>
                            <Select
                                options={teamOptions.options}
                                placeholder="Seleccionar"
                                disabled={teamOptions.disabled}
                                onSelect={value => handleChangeOnMatrixElements(value, 'Team')}
                            />
                        </Form.Item>

                        <Form.Item name="Office" label="Oficina" rules={[{ required: true, message: 'Obligatorio' }]}>
                            <Select
                                options={officesOptions.options}
                                placeholder="Seleccionar"
                                disabled={officesOptions.disabled}
                                onSelect={value => handleChangeOnMatrixElements(value, 'Office')}
                            />
                        </Form.Item>

                        <Form.Item name="localCategory" label="Categoría Local" rules={[{ required: true, message: 'Obligatorio' }]}>
                            <Select
                                options={localCategoriesOptions.options}
                                placeholder="Seleccionar"
                                disabled={localCategoriesOptions.disabled}
                                onSelect={value => handleChangeOnMatrixElements(value, 'localCategory')}
                            />
                        </Form.Item>

                        <Form.Item name="globalCategory" label="Categoría Global">
                            <Input placeholder="Seleccionar" disabled value="123" />
                        </Form.Item>

                        <Form.Item
                            name="totalVacancy"
                            label="Cantidad de Vacantes"
                            rules={[
                                {
                                    required: true,
                                    message: 'Obligatorio',
                                },
                            ]}
                        >
                            <InputNumber min={1} max={300} defaultValue={0} className="w-full" />
                        </Form.Item>

                        <Form.Item
                            name="startDate"
                            label="Fecha de Apertura"
                            rules={[
                                {
                                    required: true,
                                    message: 'Obligatorio',
                                },
                            ]}
                        >
                            <DatePicker showToday={false} placeholder="Seleccionar" />
                        </Form.Item>

                        <Form.Item
                            name="employeeStartDate"
                            label="Fecha de Ingreso"
                            rules={[
                                {
                                    required: true,
                                    message: 'Obligatorio',
                                },
                            ]}
                        >
                            <DatePicker showToday={false} placeholder="Seleccionar" />
                        </Form.Item>

                        <Form.Item name="typeWorker" label="Tipo de Trabajador" rules={[{ required: true, message: 'Obligatorio' }]}>
                            <Select options={typeWorkerOptions} placeholder="Seleccionar" onSelect={handleChangeTypeWorker} />
                        </Form.Item>

                        <div ref={fixedTermContainer} className="ghost">
                            <Form.Item
                                name="employeeEndDate"
                                label="Fecha de Término"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Obligatorio',
                                        validator: (component, value) => {
                                            if (fixedTermContainer.current.classList.contains('ghost') === false) {
                                                if (!!value) {
                                                    return Promise.resolve();
                                                } else {
                                                    return Promise.reject('Obligatorio');
                                                }
                                            } else {
                                                return Promise.resolve();
                                            }
                                        },
                                    },
                                ]}
                            >
                                <DatePicker showToday={false} placeholder="Seleccionar" />
                            </Form.Item>
                        </div>

                        <Form.Item name="Team Lead" label="Team Lead" rules={[{ required: true, message: 'Obligatorio' }]}>
                            <Select placeholder="Seleccionar" />
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loadingSubmit}>
                            CREAR VACANTE
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default ModalCreateVacancy;
