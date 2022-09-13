const AWS = require("aws-sdk");
const { moviesTable } = require("./constants");

const getMovie = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameter;

  const result = dynamoDB.get({
    TableName: moviesTable,
    Key: {
      id,
    },
  }).promise();

  const movie = result.result.Item;

  return{
    status:200,
    body: movie
  }
};

module.exports = {
    getMovie
};
