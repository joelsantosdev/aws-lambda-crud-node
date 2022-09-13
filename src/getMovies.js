const AWS = require("aws-sdk");
const { moviesTable } = require("./constants");

const getMovies = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const result = dynamoDB
    .scan({
      TableName: moviesTable,
    })
    .promise();

  const movies = (await result).Items;

  return {
    status: 200,
    body: {
      movies,
    },
  };
};

module.exports = {
  getMovies,
};
