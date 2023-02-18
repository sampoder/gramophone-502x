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
			console.log([req.query.id]);
			spotifyApi.pause().then(
				function() {
					res.send('Playback paused');
				},
				function(err) {
					//if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
					console.log('Something went wrong!', err);
				}
			);
		},
		function(err) {
			console.log('Auth failed.');
			res.send('🐛');
		}
	);
};
