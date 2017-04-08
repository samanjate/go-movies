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
                })
        }
        init();

        vm.goToMoviePage = goToMoviePage;
        vm.goToHomePage = goToHomePage;

        function goToMoviePage(movieId) {
            if(userId) $location.url("/" + userId + "/movie/" + movieId);
            else $location.url("/0/movie/" + movieId);
        }

        function goToHomePage() {
            $location.url("/");
        }

    }

})();