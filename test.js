const { getAllStations, 
    getCurrentTrains, 
    getAllStationsFilter, 
    getAllTrainsFilter, 
    getAllTrainsServing, 
    getAllTrainsServingWthNums,
    getAllStationCodes,
    getAllTrainsByStationCode,
    getStationDataByCode } = require('./IRFunc');


    async function getStations() {
      const output = await getAllStationsFilter('D');
      console.log(output);
    }
    
    getStations();
    