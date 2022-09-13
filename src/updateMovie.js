const AWS = require("aws-sdk");
const { moviesTable } = require("./constants");

const updateMovie = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  const { title, description } = JSON.parse(event.body);

  await dynamoDB
    .update({
      TableName: moviesTable,
      Key: { id },
      UpdateExpression: "SET title = :title, description= :description",
      ExpressionAttributeValues: {
        ":title": title,
        ":description": description,
      },
      ReturnValues: "All_NEW",
    })
    .promise();

  return {
    status: 200,
    body: JSON.stringify({
      message: "Pelicula actualizada exitosamente",
    }),
  };
};

module.exports = {
  updateMovie,
};
