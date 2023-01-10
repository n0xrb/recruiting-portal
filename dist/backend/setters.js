const createNewVacancyRequest = ({
    typeRecruitment,
    LoS,
    subLos,
    Team,
    Office,
    localCategory,
    globalCategory,
    teamLead,
    totalVacancy,
    employeeStartDate,
    typeWorker,
    justification,
    costCenterName,
    jobClassifications,
    jobFamily,
    jobProfile,
    organisationID,
    costCenterID,
    startDateFormatted,
    employeeEndDateFormatted,
}) => {
    const requestedBy = getCurrentEmailUser();
    const requestID = createToken();
    const requestDate = Utilities.formatDate(new Date(), 'America/Santiago', 'yyyy/dd/MM').toString();
    const requestStatus = 'Pendiente';
    const vacancyIsCreated = 'Pendiente';

    SHEET.appendRow([
        requestID,
        requestDate,
        startDateFormatted,
        employeeStartDate,
        employeeEndDateFormatted,
        typeWorker,
        localCategory,
        Office,
        requestedBy,
        LoS,
        requestStatus,
        vacancyIsCreated,
        totalVacancy,
        costCenterID,
        costCenterName,
        subLos,
        Team,
        globalCategory,
        teamLead,
        jobClassifications,
        organisationID,
        jobFamily,
        jobProfile,
        justification,
        typeRecruitment,
    ]);

    return requestID;
};
