const AWS = require("aws-sdk");
const { v4 } = require("uuid");
const { moviesTable } = require("./constants");
const middy = require("@middy/core");
const httpJSONBodyParser  = require("@middy/http-json-body-parser");

const createMovie = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { title, description } = event.body;
  const createdAt = new Date().toISOString();
  const id = v4();

  const newMovie = {
    id,
    title,
    description,
    createdAt,
  };

  // Save not update!
  await dynamoDB
    .put({
      TableName: moviesTable,
      Item: newMovie,
    })
    .promise();

  return {
    status: 200,
    body: JSON.stringify(newMovie),
  };
};

module.exports = {
  createMovie: middy(createMovie).use(httpJSONBodyParser()),
};
