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
      const trains = await getAllStations();
      console.log(trains);
    }
    
    getStations();
    