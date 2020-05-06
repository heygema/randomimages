import {NowRequest, NowResponse} from "@now/node";
import fetch from "node-fetch";

export default async (req: NowRequest, res: NowResponse) => {

  try {
    let {attempt} = req.cookies;

    let numberAttempt = isNaN(Number(attempt)) ? 0 : Number(attempt);

    let newAttempt = attempt ? numberAttempt + 1 : numberAttempt;

    if (newAttempt > 5) {
      res.status(404).json({
        message: 'Stop Playing Get A Life!',
      })
      return;
    }

    let fetched = await fetch(
      "https://api.unsplash.com/photos/random?count=6",
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY || ''}`
        }
      }
    );

    let result = await fetched.json();

    // TODO: cookies for client id
    // let clientID = (req.body || {clientID: null}).clientID;
    // res.setHeader("Set-Cookie", `id=${clientID};Expires=Max-Age`);
    let expiryDate = new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toString()

    res.setHeader("Set-Cookie", `attempt=${newAttempt};Expires=${expiryDate}`);

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
