const apiConfig = {
	baseUrl: 'https://api.themoviedb.org/3/',
	apiKey: '3aceb8319946c098a5b1d988c49ade5a',
	originalImage: imgPath => `https://image.tmdb.org/t/p/original/${imgPath}`,
	w500lImage: imgPath => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig
