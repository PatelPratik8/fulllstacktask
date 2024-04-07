import { Response } from "express";

function create(
  res: Response,
  data: object,
  message: string = "",
  statusCode: number = 201
) {
  const resData = {
    success: true,
    message: message,
    statusCode: statusCode,
    data,
    messageCode: message,
  };
  return res.status(statusCode).send(resData);
}

function success(
  res: Response,
  data: object | object[] | null,
  message: string = "",
  statusCode: number = 200
) {
  const resData = {
    success: true,
    message: message,
    statusCode: statusCode,
    data,
    messageCode: message,
  };
  return res.status(statusCode).send(resData);
}

function notFound(
  res: Response,
  data: object,
  message: string = "",
  statusCode: number = 404
) {
  const resData = {
    success: false,
    statusCode: statusCode,
    message: message || "Invalid request data",
    data: {},
    messageCode: message,
  };
  return res.status(statusCode).send(resData);
}

function send(
  res: Response,
  data: object,
  message: string = "",
  statusCode: number = 200
) {
  let response = {
    success: true,
    statusCode: statusCode,
    data,
    message: message,
    messageCode: message,
  };
  return res.status(statusCode).send(response);
}

function internalServerError(
  res: Response,
  err: string | object | any,
  message: string = "Internal server Error",
  statusCode: number = 200
) {
  if (process.env.NODE_ENV != "production") console.log(err);
  let response = {
    success: false,
    statusCode: statusCode,
    data: err,
    message: message,
    messageCode: message,
  };
  return res.status(statusCode).send(response);
}

export default {
  create,
  success,
  notFound,
  send,
  internalServerError,
};
