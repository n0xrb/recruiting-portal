import { useCallback, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Table, Button, Empty } from 'antd';
import { getAllDataVacancy, getMatrixWD } from '@getters';
import columnsVacancyTable from '../components/VacancyTable/columnsVacancyTable';
import ModalCreateVacancy from '../components/VacancyTable/ModalCreateVacancy';

const Home = () => {
    const { vacancyDataForTable, matrixWD } = useLoaderData();
    const [modalVacancyCreation, setModalVacancyCreation] = useState(false);
    const [locale, setLocale] = useState({
        emptyText: <Empty description="No existen registros" className="font-bold"></Empty>,
    });

    const columnsTable = useCallback(() => columnsVacancyTable());

    const handleClickVacancyButton = () => {
        setModalVacancyCreation(true);
    };
    return (
        <div
            className="container max-w-[95vw] px-7 py-4 rounded-lg max-h-[82vh] bg-white my-auto
        shadow-lg flex !text-xs flex-col"
        >
            {modalVacancyCreation ? (
                <ModalCreateVacancy
                    modalVacancyCreation={modalVacancyCreation}
                    setModalVacancyCreation={setModalVacancyCreation}
                    matrixWD={matrixWD}
                />
            ) : null}
            <div className="flex justify-between mb-4 items-center">
                <div className="text-[1.2rem] font-semibold">Portal Altas WorkDay</div>
                <Button className="bg-[#E52445] text-white hover:!text-red-200" onClick={handleClickVacancyButton}>
                    Ingresar Vacante
                </Button>
            </div>
            <Table
                columns={columnsTable()}
                dataSource={vacancyDataForTable}
                className="w-full"
                size="small"
                locale={locale}
                responsive={true}
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
        const matrixWD = getMatrixWD();
        return { vacancyDataForTable, matrixWD };
    } else {
        const promiseData = new Promise((resolve, reject) => {
            google.script.run
                .withSuccessHandler(result => {
                    resolve(result);
                })
                .withFailureHandler(error => {
                    reject(error);
                })
                .getAllDataVacancy();
        });
        const promiseMatrix = new Promise((resolve, reject) => {
            google.script.run
                .withSuccessHandler(result => {
                    resolve(result);
                })
                .withFailureHandler(error => {
                    reject(error);
                })
                .getMatrixWD();
        });
        let vacancyDataForTable = await promiseData;
        vacancyDataForTable = JSON.parse(vacancyDataForTable);
        const matrixWD = await promiseMatrix;
        return { vacancyDataForTable, matrixWD };
    }
};
