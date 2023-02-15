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
			spotifyApi.transferMyPlayback(req.query.id).then(
				function() {
					console.log('Transfering playback to ' + req.query.id);
					spotifyApi.play({ uris: [`spotify:track:${req.query.song}`] }).then(
						function() {
							console.log('Now playing ' + req.query.song);
							spotifyApi.setRepeat('track').then(
								function() {
									console.log('Now looping.');
								},
								function(err) {
									console.log('Loop command failed.');
									res.send('🐛');
								}
							);
						},
						function(err) {
							console.log('Play command failed.');
							res.send('🐛');
						}
					);
				},
				function(err) {
					console.log('Transfer failed.');
					res.send('🐛');
				}
			);
		},
		function(err) {
			console.log('Auth failed.');
			res.send('🐛');
		}
	);
};
