(function () {
    angular
        .module("GoMovies")
        .controller("PersonController", personController);

    function personController($routeParams, $location, SearchService) {
        var vm = this;

        var userId = $routeParams['uid'];
        var personId = $routeParams['pid'];

        function init() {
            SearchService
                .getPersonById(personId)
                .then(function (response) {
                    vm.person = response.data;
                });
        }
        init();

        vm.goToMoviePage = goToMoviePage;
        vm.goToHomePage = goToHomePage;
        vm.goToTvPage = goToTvPage;

        function goToMoviePage(movieId) {
            if(userId) $location.url("/" + userId + "/movie/" + movieId);
            else $location.url("/0/movie/" + movieId);
        }

        function goToTvPage(tvId) {
            if(userId) $location.url("/" + userId + "/tv/" + tvId);
            else $location.url("/0/tv/" + tvId);
        }

        function goToHomePage() {
            $location.url("/");
        }

    }

})();