const AWS = require("aws-sdk");
const { moviesTable } = require("./constants");

const deleteMovie = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  await dynamoDB
    .delete({
      TableName: moviesTable,
      Key: {
        id,
      },
    })
    .promise();

  return {
    status: 200,
    body: {
      message: "Pelicula elimada",
    },
  };
};

module.exports = {
  deleteMovie,
};
