const axios = require('axios');
const xml2js = require('xml2js');


//returns a list of all stations with StationDesc, StaionCode, StationId, StationAlias, StationLatitude and StationLongitude ordered by 
//Latitude, Longitude
function getAllStations() {
  const url = 'http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML';

  return axios
    .get(url)
    .then((response) => {
      const rawData = response.data;
      return new Promise((resolve, reject) => {
        xml2js.parseString(rawData, (error, result) => {
          if (error) {
            reject(error);
          } else {
            const stations = result.ArrayOfObjStation.objStation.map((station) => {
              return {
                StationDesc: station.StationDesc[0],
                StationAlias: station.StationAlias[0],
                StationLatitude: station.StationLatitude[0],
                StationLongitude: station.StationLongitude[0],
                StationCode: station.StationCode[0],
                StationId: station.StationId[0],
              };
            });
            resolve(stations);
          }
        });
      });
    })
    .catch((error) => {
      throw new Error('Failed to retrieve stations');
    });
}

//returns a listing of 'running trains' ie trains that are between 
//origin and destination or are due to start within 10 minutes of the query time. Returns TrainStatus, TrainLatitude, 
//TrainLongitude, TrainCode, TrainDate, PublicMessage and Direction
function getCurrentTrains() {
    const url = 'http://api.irishrail.ie/realtime/realtime.asmx/getCurrentTrainsXML';
  
    return axios
      .get(url)
      .then((response) => {
        const rawData = response.data;
        return new Promise((resolve, reject) => {
          xml2js.parseString(rawData, (error, result) => {
            if (error) {
              reject(error);
            } else {
              const trainPositions = result.ArrayOfObjTrainPositions.objTrainPositions.map((train) => {
                return {
                  TrainStatus: train.TrainStatus[0],
                  TrainLatitude: train.TrainLatitude[0],
                  TrainLongitude: train.TrainLongitude[0],
                  TrainCode: train.TrainCode[0],
                  TrainDate: train.TrainDate[0],
                  PublicMessage: train.PublicMessage[0],
                  Direction: train.Direction[0],
                };
              });
              resolve(trainPositions);
            }
          });
        });
      })
      .catch((error) => {
        throw new Error('Failed to retrieve train positions');
      });
  }

  //returns a list of all stations with StationDesc, StaionCode, StationId, StationAlias, StationLatitude and StationLongitude ordered by Latitude, Longitude filtered by StationType 
  //- takes a single letter with 4 possible values for the StationType parameter (A for All, M for Mainline, S for suburban and D for DART) any other value will be changed to A
  function getAllStationsFilter(stationType) {
    const url = `http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML_WithStationType?StationType=${stationType}`;
  
    return axios.get(url)
      .then((response) => {
        const xmlData = response.data;
        return new Promise((resolve, reject) => {
          xml2js.parseString(xmlData, (error, result) => {
            if (error) {
              reject(error);
            } else {
              const stationsArray = result.ArrayOfObjStation.objStation;
              const stations = stationsArray.map((station) => {
                return {
                  StationDesc: station.StationDesc[0],
                  StationAlias: station.StationAlias[0],
                  StationLatitude: station.StationLatitude[0],
                  StationLongitude: station.StationLongitude[0],
                  StationCode: station.StationCode[0],
                  StationId: station.StationId[0],
                };
              });
              resolve(stations);
            }
          });
        });
      })
      .catch((error) => {
        throw new Error('Failed to retrieve stations');
      });
  }

  //returns a listing of 'running trains' ie trains that are between origin and destination or are due to start within 10 minutes of the query time. Returns TrainStatus, TrainLatitude, TrainLongitude, TrainCode, TrainDate, PublicMessage and Direction filtered by traintype,
  //takes a single letter with 4 possible values for the StationType parameter (A for All, M for Mainline, S for suburban and D for DART) any other value will be changed to A
  function getAllTrainsFilter(trainType) {
    const url = `http://api.irishrail.ie/realtime/realtime.asmx/getCurrentTrainsXML_WithTrainType?TrainType=${trainType}`;
  
    return axios
      .get(url)
      .then((response) => {
        const rawData = response.data;
        return new Promise((resolve, reject) => {
          xml2js.parseString(rawData, (error, result) => {
            if (error) {
              reject(error);
            } else {
              const trainPositions = result.ArrayOfObjTrainPositions.objTrainPositions.map((train) => {
                return {
                  TrainStatus: train.TrainStatus[0],
                  TrainLatitude: train.TrainLatitude[0],
                  TrainLongitude: train.TrainLongitude[0],
                  TrainCode: train.TrainCode[0],
                  TrainDate: train.TrainDate[0],
                  PublicMessage: train.PublicMessage[0],
                  Direction: train.Direction[0],
                };
              });
              resolve(trainPositions);
            }
          });
        });
      })
      .catch((error) => {
        throw new Error('Failed to retrieve train positions');
      });
  }


//returns all trains due to serve the named station in the next 90 minutes
  function getAllTrainsServing(stationDesc) {
    const url = `http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML?StationDesc=${stationDesc}`;

    console.log("Please note these trains are serving this station in the range of the next 90 minutes only");
  
    return axios
      .get(url)
      .then((response) => {
        const rawData = response.data;
        return new Promise((resolve, reject) => {
          xml2js.parseString(rawData, (error, result) => {
            if (error) {
              reject(error);
            } else {
              const trains = result.ArrayOfObjStationData.objStationData.map((train) => {
                return {
                  Servertime: train.Servertime[0],
                  Traincode: train.Traincode[0],
                  Stationfullname: train.Stationfullname[0],
                  Stationcode: train.Stationcode[0],
                  Querytime: train.Querytime[0],
                  Traindate: train.Traindate[0],
                  Origin: train.Origin[0],
                  Destination: train.Destination[0],
                  Origintime: train.Origintime[0],
                  Destinationtime: train.Destinationtime[0],
                  Status: train.Status[0],
                  Lastlocation: train.Lastlocation[0],
                  Duein: train.Duein[0],
                  Late: train.Late[0],
                  Exparrival: train.Exparrival[0],
                  Expdepart: train.Expdepart[0],
                  Scharrival: train.Scharrival[0],
                  Schdepart: train.Schdepart[0],
                  Direction: train.Direction[0],
                  Traintype: train.Traintype[0],
                  Locationtype: train.Locationtype[0],
                };
              });
              resolve(trains);
            }
          });
        });
      })
      .catch((error) => {
        throw new Error('Failed to retrieve train data');
      });
  }

  //returns all trains due to serve the named station in the next x minutes (x must be between 5 and 90)
  function getAllTrainsServingWthNums(station, time) {
    const url = `http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML_withNumMins?StationDesc=${station}&NumMins=${time}`;
  
    return axios
      .get(url)
      .then((response) => {
        const rawData = response.data;
        return new Promise((resolve, reject) => {
          xml2js.parseString(rawData, (error, result) => {
            if (error) {
              reject(error);
            } else {
              const trains = result.ArrayOfObjStationData.objStationData.map((train) => {
                return {
                  Traincode: train.Traincode[0].trim(),
                  Stationfullname: train.Stationfullname[0],
                  Stationcode: train.Stationcode[0],
                  Querytime: train.Querytime[0],
                  Traindate: train.Traindate[0],
                  Origin: train.Origin[0],
                  Destination: train.Destination[0],
                  Origintime: train.Origintime[0],
                  Destinationtime: train.Destinationtime[0],
                  Status: train.Status[0],
                  Lastlocation: train.Lastlocation[0],
                  Duein: train.Duein[0],
                  Late: train.Late[0],
                  Exparrival: train.Exparrival[0],
                  Expdepart: train.Expdepart[0],
                  Scharrival: train.Scharrival[0],
                  Schdepart: train.Schdepart[0],
                  Direction: train.Direction[0],
                  Traintype: train.Traintype[0],
                  Locationtype: train.Locationtype[0],
                };
              });
              resolve(trains);
            }
          });
        });
      })
      .catch((error) => {
        throw new Error('Failed to retrieve train data');
      });
  }

  // returns all of the station codes only
  function getAllStationCodes() {
    const url = 'http://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML';
  
    return axios
      .get(url)
      .then((response) => {
        const rawData = response.data;
        return new Promise((resolve, reject) => {
          xml2js.parseString(rawData, (error, result) => {
            if (error) {
              reject(error);
            } else {
              const stations = result.ArrayOfObjStation.objStation;
              const stationCodes = stations.map((station) => {
                const stationCode = station.StationCode[0];
                console.log(stationCode); // Log each station code to the console
                return stationCode;
              });
              resolve(stationCodes);
            }
          });
        });
      })
      .catch((error) => {
        throw new Error('Failed to retrieve station codes');
      });
  }
  

  function parseTrainData(trainData) {
    const trainObject = {};
    for (const key in trainData) {
      if (Array.isArray(trainData[key])) {
        trainObject[key] = trainData[key][0];
      }
    }
    return trainObject;
  }
  
  function getStationDataByCode(stationCode) {
    const url = `http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML?StationCode=${stationCode}`;
  
    console.log(url);
  
    return axios
      .get(url)
      .then((response) => {
        const rawData = response.data;
        return new Promise((resolve, reject) => {
          xml2js.parseString(rawData, (error, result) => {
            if (error) {
              reject(error);
            } else {
              const trainObjects = result.ArrayOfObjStationData.objStationData.map((trainData) => {
                return parseTrainData(trainData);
              });
              resolve(trainObjects);
            }
          });
        });
      })
      .catch((error) => {
        console.log('Error:', error.message); // Log the specific error message
        throw new Error('Failed to retrieve station data');
      });
  }
  
  
  // Will return all trains going to a station not working currently
  async function getAllTrainsByStationCode(stationCode) {

    let stationCodes = await getAllStationCodes();

    console.dir(stationCodes);

    stationCodes.forEach(stationCodeOfArray => {
      if (stationCode == stationCodeOfArray) {
        console.log("Found");
      }

      getStationDataByCode(stationCode);

    });

    if (!(stationCodes.includes(stationCode))) {
      throw new Error(`Invalid station code: ${stationCode}`);
    }

    return getStationDataByCode(stationCode)
      .then((trainObjects) => {
        return trainObjects;
      })
      .catch((error) => {
        throw error;
      });

  } 


module.exports = {
  getAllStations, 
  getCurrentTrains, 
  getAllStationsFilter, 
  getAllTrainsFilter, 
  getAllTrainsServing, 
  getAllTrainsServingWthNums,
  getAllStationCodes,
  getAllTrainsByStationCode, 
  getStationDataByCode
};
