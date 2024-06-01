export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  CREATED: 201,
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  CONFLICT: 409
};

export const ERROR_MESSAGES = {
  UNAUTHORIZED: "Unauthorized",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
};

const HTTP_HEADERS = {
    "Content-Type": "application/json",
  };

export const RESPONSE = (data: any, status: number) => {
  return Response.json(data, {
    headers: HTTP_HEADERS,
    status: status,
  });
};

export enum paginateOperation {
  NEXT,
  PREV,
  CLICK
}

export enum pageOrder {
  ONE = 0,
  TWO = 1,
  THREE = 2
}