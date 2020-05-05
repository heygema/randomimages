import {NowRequest, NowResponse} from "@now/node";
import fetch from "node-fetch";

export default async (req: NowRequest, res: NowResponse) => {
  let clientID = (req.body || {clientID: null}).clientID;

  /*TODO: cookies
  let cookies = (req.cookies || {
      id: null,
      limit: 10,
    }) */
  try {
    let fetched = await fetch(
      "https://api.unsplash.com/photos/random?count=6",
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY || ''}`
        }
      }
    );
    let result = await fetched.json();

    res.setHeader("Set-Cookie", `id=${clientID};Expires=Max-Age`);
    res.setHeader("Set-Cookie", `limit=10;`);

    res.status(200).json({
      message: "request success",
      result
    });
  } catch {
    res.status(500).json({
      message: "server error"
    });
  }
};
