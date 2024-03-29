var SpotifyWebApi = require("spotify-web-api-node");

export default async (req, res) => {
  var clientId = process.env.SPOTIFY_CLIENT_ID,
    clientSecret = process.env.SPOTIFY_CLIENT_SECRET,
    refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken: refreshToken,
  });

  await spotifyApi.refreshAccessToken().then(
    function (data) {
      console.log("The access token has been refreshed!");
      spotifyApi.setAccessToken(data.body["access_token"]);
    },
    function (err) {
      console.log(err);
      console.log("Auth failed.");
      return res.send("🐛");
    }
  );

  spotifyApi.getMyCurrentPlayingTrack().then(
    function (data) {
      try {
        return res.send(data.body.item.name + `\n by ` + data.body.item.artists[0].name);
      }
      catch (e){
        console.error(e)
        return res.send("Nothing...");
      }
    },
    function (err) {
      console.log(err);
      console.log("Device list failed.");
      res.send("🐛");
    }
  );
};
