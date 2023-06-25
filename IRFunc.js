const axios = require('axios');
const xml2js = require('xml2js');

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

module.exports = {
  getAllStations, getCurrentTrains, getAllStationsFilter, getAllTrainsFilter, getAllTrainsServing
};
