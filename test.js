const { getAllStations, 
    getCurrentTrains, 
    getAllStationsFilter, 
    getAllTrainsFilter, 
    getAllTrainsServing, 
    getAllTrainsServingWthNums,
    getAllStationCodes,
    getAllTrainsByStationCode,
    getStationDataByCode } = require('./IRFunc');

    let trains = getAllTrainsByStationCode('CLARA');

    console.dir(trains);