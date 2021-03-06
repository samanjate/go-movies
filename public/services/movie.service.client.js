(function () {
    angular
        .module("GoMovies")
        .factory("MovieService", MovieService);

    function MovieService($http) {

        var baseUrl = 'https://api.themoviedb.org/3/';
        var key = 'fa1d97a5a35846c3b2e7f28f84c36675';
        var language = 'en-US';

        var api = {
            "searchUpcomingMovies" : searchUpcomingMovies,
            "topRatedMovies" : topRatedMovies,
            "movieGenres" : movieGenres,
            "popularPeople" : popularPeople,
            "getMovieById" : getMovieById,
            "getMovieByIdFromDb": getMovieByIdFromDb,
            "getWantToSeeMovies": getWantToSeeMovies,
            "addToWantToSee": addToWantToSee,
            "deleteToWantToSee": deleteToWantToSee,
            "getSimilarMovies" : getSimilarMovies,
            "updateRatings": updateRatings
        };

        return api;

        function searchUpcomingMovies() {
            var url = baseUrl + 'movie/upcoming?api_key=' + key;
            return $http.get(url);
        }

        function topRatedMovies() {
            var url = baseUrl + 'movie/top_rated?api_key='+ key + '&language='+ language + '&page=1';
            return $http.get(url);
        }

        function movieGenres() {
            var url = baseUrl + 'genre/movie/list?api_key='+key+'&language='+language;
            return $http.get(url);
        }

        function popularPeople() {
            var url = baseUrl + 'person/popular?api_key='+key+'&language='+language+'&page=1';
            return $http.get(url);
        }

        function getMovieById(movieId) {
            var tags = 'videos,credits,reviews';
            var url = baseUrl + 'movie/'+movieId+'?api_key='+key+'&language=' + language + '&append_to_response=' + tags;
            return $http.get(url);
        }

        function getMovieByIdFromDb(movieId) {
            return $http.get("/api/movie?mid="+movieId);
        }

        function getSimilarMovies(movieId) {
            var url = baseUrl + 'movie/'+movieId+'/similar?api_key='+key+'&language='+language+'&page=1';
            return $http.get(url);
        }

        function getWantToSeeMovies(userId) {
            return $http.get("/api/audience/wts/"+userId);
        }

        function addToWantToSee(userId, movie) {
            return $http.post("/api/audience/wts/"+userId,movie);
        }

        function deleteToWantToSee(userId, movieId) {
            return $http.delete("/api/audience/wts/"+userId+'?mid='+ movieId);
        }

        function updateRatings(movie, rate) {
            return $http.put("/api/movie?rate="+rate, movie);
        }
    }

})();