const ALA_SQL = AlaSQL.load();
const ID_SHEET_DOCUMENT = '1bQX7vxE2vH-VVdilallRK6AKQgJhbtZtGFMC3DM3lks';

const SHEET = SpreadsheetApp.openById(ID_SHEET_DOCUMENT);

const getCurrentEmailUser = () => Session.getActiveUser().getEmail();

const getAllDataVacancy = () => {
    const data = SHEET.getSheetByName('Inputs').getDataRange().getValues();
    query = `
                SELECT
                    Col1 as requestID,
                    Col3 as startDate,
                    Col4 as employeeStartDate,
                    Col6 as typeWorker,
                    Col7 as localCategory,
                    Col8 as office,
                    Col9 as requestedBy,
                    Col10 as los,
                    Col11 as requestStatus,
                    Col12 as vacancyIsCreated,
                    Col13 as totalVacancy,
                    "ACTION"
                
                FROM ?`;
    const results = ALA_SQL(AlaSQL.transformQueryColsNotation(query), [data]);

    const resultsFiltered = results.filter(result => result.requestedBy.toString().includes('requestedBy') === false);
    Logger.log(resultsFiltered);
    return JSON.stringify(resultsFiltered);
};

const getMatrixWD = () => {};
