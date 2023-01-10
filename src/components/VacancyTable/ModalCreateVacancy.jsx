import { memo, useRef, useState, useEffect } from 'react';
import { Modal, Select, DatePicker, Divider, Form, Button, InputNumber, Input, Spin, Result } from 'antd';
const { TextArea } = Input;

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

const dateFormat = 'YYYY/MM/DD';

const typeWorkerOptions = [
    { label: 'Plazo Fijo', value: 'Plazo Fijo' },
    { label: 'Regular', value: 'Regular' },
    { label: 'Trainee', value: 'Trainee' },
    { label: 'Socio', value: 'Socio' },
];
const losOptions = [
    { label: 'Assurance', value: 'Assurance' },
    { label: 'Tax', value: 'Tax' },
    { label: 'Advisory', value: 'Advisory' },
    { label: 'IFS', value: 'Internal Firm Service' },
];

const optionsDate = { year: 'numeric', month: 'numeric', day: 'numeric' };

const ModalCreateVacancy = ({ modalVacancyCreation, setModalVacancyCreation, matrixWD }) => {
    const [costCenterID, setCostCenterID] = useState('');
    const [matrixCurrentCategoriesNode, setMatrixCurrentCategoriesNode] = useState([]);

    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [successRequest, setSuccessRequest] = useState(false);
    const [errorRequest, setErrorRequest] = useState(false);
    const [requestIDCreated, setRequestIDCreated] = useState('');

    const fixedTermContainer = useRef();
    const [form] = Form.useForm();

    const [losSelected, setLosSelected] = useState('');
    const [subLosSelected, setSubLosSelected] = useState('');
    const [teamSelected, setTeamSelected] = useState('');
    const [costCenterName, setCostCenterName] = useState('');
    const [globalCategory, setGlobalCategory] = useState('');
    const [jobClassifications, setJobClassifications] = useState('');
    const [jobFamily, setJobFamily] = useState('');
    const [jobProfile, setJobProfile] = useState('');
    const [organisationID, setOrganisationID] = useState('');

    const [subLosOptions, setSubLosOptions] = useState({ options: [], disabled: true });
    const [teamOptions, setTeamOptions] = useState({ options: [], disabled: true });
    const [officesOptions, setOfficesOptions] = useState({ options: [], disabled: true });
    const [localCategoriesOptions, setLocalCategoriesOptions] = useState({ options: [], disabled: true });
    const [teamLeadersOptions, setTeamLeadersOptions] = useState({ options: [], disabled: true });

    useEffect(() => {
        form.setFieldsValue({
            globalCategory: globalCategory,
        });
    }, [globalCategory]);

    const onFinish = async values => {
        const startDateFormatted = new Date(values.startDate).toLocaleDateString('es-CL', optionsDate);
        const employeeEndDateFormatted = !!values.employeeEndDate
            ? new Date(values.employeeEndDate).toLocaleDateString('es-CL', optionsDate)
            : 'N/A';
        const employeeStartDate = new Date(values.employeeStartDate).toLocaleDateString('es-CL', optionsDate);

        delete values['employeeEndDate'];
        delete values['employeeStartDate'];
        delete values['startDate'];

        const allValuesForm = {
            ...values,
            costCenterName: costCenterName,
            globalCategory: globalCategory,
            jobClassifications: jobClassifications,
            jobFamily: jobFamily,
            jobProfile: jobProfile,
            organisationID: organisationID,
            costCenterID: costCenterID,
            startDateFormatted: startDateFormatted,
            employeeEndDateFormatted: employeeEndDateFormatted,
            employeeStartDate: employeeStartDate,
            subLos: values['Sub LoS'],
            teamLead: values['Team Lead'],
        };

        setLoadingSubmit(true);

        const environment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

        console.log(allValuesForm);
        if (environment) {
            setTimeout(() => {
                setLoadingSubmit(false);
                setSuccessRequest(true);
                setTimeout(() => setModalVacancyCreation(false), 5000);
            }, 5000);
        } else {
            try {
                const promiseSaveData = new Promise((resolve, reject) => {
                    google.script.run
                        .withSuccessHandler(result => {
                            resolve(result);
                        })
                        .withFailureHandler(error => {
                            reject(error);
                        })
                        .createNewVacancyRequest(allValuesForm);
                });

                const requestID = await promiseSaveData;
                setLoadingSubmit(false);
                setRequestIDCreated(requestID);
                setSuccessRequest(true);
            } catch (error) {
                setErrorRequest(true);
            }

            setTimeout(() => setModalVacancyCreation(false), 8000);
        }
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
                setTeamLeadersOptions({ options: [], disabled: true });

                const allResultsCategoryInOffice = Object.entries(matrixWD['LoS'][losSelected][subLosSelected][teamSelected][value]);
                const currentCostCenterID = allResultsCategoryInOffice[0][0].replace('\n', '');
                const currentLocalCategoriesNode = allResultsCategoryInOffice[0][1];

                setCostCenterID(currentCostCenterID);
                setMatrixCurrentCategoriesNode(currentLocalCategoriesNode);

                const allCategoryResults = Object.entries(allResultsCategoryInOffice[0][1]);

                const allLocalCategories = allCategoryResults.map(category => category[0]);
                allLocalCategories.forEach(category => tempOptions.push({ label: category, value: category }));

                setLocalCategoriesOptions({ options: tempOptions, disabled: false });
                break;
            case 'localCategory':
                const nodeObject = matrixCurrentCategoriesNode[value];
                setCostCenterName(nodeObject.costCenterName);
                setGlobalCategory(nodeObject.globalCategory);
                setJobClassifications(nodeObject.jobClassifications);
                setJobFamily(nodeObject.jobFamily);
                setJobProfile(nodeObject.jobProfile);
                setOrganisationID(nodeObject.organisationID);

                let teamLead;

                !!nodeObject.teamLead ? (teamLead = nodeObject.teamLead) : (teamLead = 'Sin información');

                setTeamLeadersOptions({ options: [{ label: teamLead, value: teamLead }], disabled: false });
            default:
                break;
        }
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
            bodyStyle={{ 'max-height': '80vh', 'overflow-y': 'scroll', 'padding-right': '20px' }}
            className="!w-[700px]"
        >
            {successRequest ? (
                <Result
                    status="success"
                    title="Solicitud creada correctamente."
                    subTitle={
                        'Número de solicitud:  ' +
                        requestIDCreated +
                        '. Se ha notificado tanto a Socio, Business Partner y Reclutamiento, para seguir con el proceso se requiere la aprobación del socio.'
                    }
                />
            ) : null}
            {errorRequest ? (
                <Result status="error" title="No ha sido posible enviar la solicitud, inténtelo nuevamente más tarde." />
            ) : null}

            {!successRequest & !errorRequest ? (
                <Spin spinning={loadingSubmit}>
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
                        <div className="grid grid-cols-3 gap-x-4 gap-y-2 max-[500px]:grid-cols-1">
                            <Form.Item name="LoS" label="LoS" rules={[{ required: true, message: 'Obligatorio' }]}>
                                <Select
                                    options={losOptions}
                                    placeholder="Seleccionar"
                                    onSelect={value => handleChangeOnMatrixElements(value, 'LoS')}
                                />
                            </Form.Item>

                            <Form.Item name="Sub LoS" label="Sub LoS" rules={[{ required: true, message: 'Obligatorio' }]}>
                                <Select
                                    showSearch
                                    options={subLosOptions.options}
                                    placeholder="Seleccionar"
                                    disabled={subLosOptions.disabled}
                                    onSelect={value => handleChangeOnMatrixElements(value, 'Sub LoS')}
                                />
                            </Form.Item>

                            <Form.Item name="Team" label="Equipo" rules={[{ required: true, message: 'Obligatorio' }]}>
                                <Select
                                    showSearch
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
                                    showSearch
                                    options={localCategoriesOptions.options}
                                    placeholder="Seleccionar"
                                    disabled={localCategoriesOptions.disabled}
                                    onSelect={value => handleChangeOnMatrixElements(value, 'localCategory')}
                                />
                            </Form.Item>

                            <Form.Item name="globalCategory" label="Categoría Global">
                                <Input placeholder="Pendiente" disabled value={globalCategory} />
                            </Form.Item>

                            <Form.Item name="Team Lead" label="Team Lead" rules={[{ required: true, message: 'Obligatorio' }]}>
                                <Select
                                    options={teamLeadersOptions.options}
                                    placeholder="Seleccionar"
                                    disabled={teamLeadersOptions.disabled}
                                />
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
                                <DatePicker showToday={false} placeholder="Seleccionar" className="w-full" format={dateFormat} />
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
                                <DatePicker showToday={false} placeholder="Seleccionar" className="w-full" format={dateFormat} />
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
                                    <DatePicker showToday={false} placeholder="Seleccionar" format={dateFormat} />
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item
                            name="justification"
                            label="Justificación del Negocio"
                            rules={[
                                {
                                    required: true,
                                    message: 'Obligatorio',
                                    validator: (component, value) => {
                                        if (!!value && value.length >= 1 && value.length <= 200) {
                                            return Promise.resolve();
                                        } else {
                                            return Promise.reject('Obligatorio');
                                        }
                                    },
                                },
                            ]}
                        >
                            <TextArea
                                maxLength={200}
                                style={{
                                    height: 60,
                                }}
                                placeholder="Ingresar texto"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loadingSubmit} className="w-full mt-4">
                                CREAR VACANTE
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            ) : null}
        </Modal>
    );
};

export default memo(ModalCreateVacancy);
