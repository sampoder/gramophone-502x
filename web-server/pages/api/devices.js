var SpotifyWebApi = require('spotify-web-api-node');

export default (req, res) => {
	var clientId = process.env.SPOTIFY_CLIENT_ID,
		clientSecret = process.env.SPOTIFY_CLIENT_SECRET,
		refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

	var spotifyApi = new SpotifyWebApi({
		clientId: clientId,
		clientSecret: clientSecret,
		refreshToken: refreshToken,
	});

	spotifyApi.refreshAccessToken().then(
		function(data) {
			console.log('The access token has been refreshed!');
			spotifyApi.setAccessToken(data.body['access_token']);
			spotifyApi.getMyDevices().then(
				function(data) {
					console.log('The device list is here!');
					res.json(data);
				},
				function(err) {
					console.log(err);
					console.log('Device list failed.');
					res.send('🐛');
				}
			);
		},
		function(err) {
			console.log(err);
			console.log('Auth failed.');
			res.send('🐛');
		}
	);
};
