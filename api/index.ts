import {NowRequest, NowResponse} from "@now/node";
import fetch from 'node-fetch';

export default (req: NowRequest, res: NowResponse) => {
  let clientID = req.body?.clientID;
  let result = fetch('https://api.unsplash.com/photos/random?count=6', {
    headers: {
      Authorization: 'Client-ID 68Flpv0iTyInXg5CJF3pyQFl1LWZE6csk9eYkpungJU'
    }
  });

  console.log('cookies : ', req.cookies);
  console.log('clientID ?', clientID)

  res.setHeader('Set-Cookie', 'id=123');
  res.status(200).json({
    ...result,
  });
};
