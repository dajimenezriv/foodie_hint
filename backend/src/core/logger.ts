import { inspect } from "node:util";

type TTag = "ONE" | "SECOND";

export type TLoggerBody = {
  tag?: TTag;
  msg: string;
  exc?: Error | unknown;
  context?: Record<string, unknown>;
  attributes?: {
    tag?: TTag;
  };
  [key: string]: unknown;
};

const prepareBody = (
  level: "debug" | "info" | "warn" | "error" | "fatal",
  rawBody: TLoggerBody
) => {
  const { tag, msg, ...rest1 } = rawBody;

  rawBody = {
    level,
    ...(tag && { tag }),
    msg,
    ...rest1,
    attributes: {
      ...rest1.attributes,
    },
  };

  const { attributes, ...rest2 } = rawBody;
  const body = inspect(rest2, {
    colors: true,
    depth: Infinity,
    breakLength: Infinity,
  });

  return { attributes, body };
};

export const logger = {
  debug: (rawBody: TLoggerBody) => {
    const { body } = prepareBody("debug", rawBody);
    console.debug(body);
  },

  info: (rawBody: TLoggerBody) => {
    const { body } = prepareBody("info", rawBody);
    console.info(body);
  },

  warn: (rawBody: TLoggerBody) => {
    const { body } = prepareBody("warn", rawBody);
    console.warn(body);
    return new Error(rawBody.msg);
  },

  error: (rawBody: TLoggerBody) => {
    const { body } = prepareBody("error", rawBody);
    console.error(body);
    return new Error(rawBody.msg);
  },

  fatal: (rawBody: TLoggerBody) => {
    const { body } = prepareBody("fatal", rawBody);
    console.error(body);
    return new Error(rawBody.msg);
  },
};
