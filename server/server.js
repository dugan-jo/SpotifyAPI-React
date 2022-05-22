const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/refresh", (req, res) => {
  const refreshToken = req.params.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "f7135ecc7e824cedbef7b757b8d1f358",
    clientSecret: "5b3e46e0660a4430a8c8612a5cc29ed0",
    refreshToken,
  });
  spotifyApi
    .refreshAccessToken()
    .then(data => {
      //   console.log(data.body);
      //   console.log("The access token has been refreshed");
      spotifyApi.refreshAccessToken(data.body["access_token"]);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "f7135ecc7e824cedbef7b757b8d1f358",
    clientSecret: "5b3e46e0660a4430a8c8612a5cc29ed0",
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch(err => {
      res.sendStatus(400);
    });
});

app.listen(3001);
