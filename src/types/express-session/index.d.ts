import session from "express-session";
// declare global {
//     namespace Express {
//         type SessionStore = session.Store & { generate: (req: Request) => void };

//         // Inject additional properties on express.Request
//         interface Request {
//             /**
//              * This request's `Session` object.
//              * Even though this property isn't marked as optional, it won't exist until you use the `express-session` middleware
//              * [Declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) can be used to add your own properties.
//              *
//              * @see SessionData
//              */
//             session: session.Session & Partial<session.SessionData>;
//     ...

// interface SessionData {
//   cookie: Cookie;
// }
// 위의 sessionData에 declare-merging하여 아래의 속성을 추가.
declare module "express-session" {
  interface SessionData {
    username: string;
  }
}
