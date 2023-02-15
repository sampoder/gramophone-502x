var SpotifyWebApi = require('spotify-web-api-node');

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
		function(data) {
			console.log('The access token has been refreshed!');
			spotifyApi.setAccessToken(data.body['access_token']);
		},
		function(err) {
			console.log(err);
			console.log('Auth failed.');
			return res.send('🐛');
		}
	);

	await spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
		function(data) {
			console.log('Artist albums', data.body);
		},
		function(err) {
			console.error(err);
		}
	);

	await spotifyApi.getMyDevices().then(
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
};
