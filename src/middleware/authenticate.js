import createHttpError from "http-errors";
import { Session } from "../models/session.js";
import { User } from "../models/user.js";

export const authenticate = async (req, res, next) => {
  if (!req.cookies.accessToken) {
    throw createHttpError(401, "No access token");
  }

  const session = await Session.findOne({
    accessToken: req.cookies.accessToken,
  });

  if (!session) {
    throw createHttpError(401, "No session");
  }

  const isAcessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAcessTokenExpired) {
    throw createHttpError(401, "Token expired");
  }

  const user = await User.findById(session.userId);
  if (!user) {
    throw createHttpError(401, "No user");
  }

  req.user = user;
  next();
};
