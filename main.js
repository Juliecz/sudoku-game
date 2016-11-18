/**
 * Created by yuliya on 18.11.16.
 */
angular.module('sudokugame', [])
    .controller('mainCtrl', ['$scope', function ($scope) {
        $scope.grid = [[],[],[],[],[],[],[],[],[]];
        $scope.generate = function () {
            fillGrid();
            for (var i=0; i<10; i++) {
                $scope.grid = transpose($scope.grid);
                vertical3($scope.grid);
                horizontal3($scope.grid);
                vertical1horizontal($scope.grid);
            }
        };
        function fillGrid() {
            var n=3;
            for (var i=0; i<9; i++) {
                for (var j=0; j<9; j++) {
                    $scope.grid[i][j] = Math.floor((i*n + i/n + j) % (n*n) + 1);
                }
            }
        }
        function transpose(arr) {
            var newArr = [[],[],[],[],[],[],[],[],[]];
            for (var i=0; i<arr.length; i++) {
                for (var j=0; j<arr.length; j++) {
                    newArr[j][i] = arr[i][j];
                }
            }
            return newArr;
        }
        function vertical3(pole) {
            var first = Math.floor(Math.random()*3),
                second = Math.floor(Math.random()*3);
            if (first===second) { vertical3(pole); }
            else {
                for (var i=0; i<9; i++) {
                    [$scope.grid[i][first*3], $scope.grid[i][second*3]] = [$scope.grid[i][second*3], $scope.grid[i][first*3]];
                    [$scope.grid[i][first*3+1], $scope.grid[i][second*3+1]] = [$scope.grid[i][second*3+1], $scope.grid[i][first*3+1]];
                    [$scope.grid[i][first*3+2], $scope.grid[i][second*3+2]] = [$scope.grid[i][second*3+2], $scope.grid[i][first*3+2]];
                }
            }
        }
        function horizontal3(pole) {
            var first = Math.floor(Math.random()*3),
                second = Math.floor(Math.random()*3);
            if (first===second) { horizontal3(pole); }
            else {
                for (var i=0; i<9; i++) {
                    [$scope.grid[first*3][i], $scope.grid[second*3][i]] = [$scope.grid[second*3][i], $scope.grid[first*3][i]];
                    [$scope.grid[first*3+1][i], $scope.grid[second*3+1][i]] = [$scope.grid[second*3+1][i], $scope.grid[first*3+1][i]];
                    [$scope.grid[first*3+2][i], $scope.grid[second*3+2][i]] = [$scope.grid[second*3+2][i], $scope.grid[first*3+2][i]];
                }
            }
        }
        function vertical1horizontal(pole) {
            var i=0;
            for (var k=0; k<3; k++) {
                var block = k*3;
                var first = Math.floor(Math.random()*3),
                    second = Math.floor(Math.random()*3);
                while (first===second) {
                    first = Math.floor(Math.random()*3);
                    second = Math.floor(Math.random()*3);
                }
                first += k*3;
                second += k*3;
                for (i = 0; i < 9; i++) {
                    [$scope.grid[i][first], $scope.grid[i][second]] = [$scope.grid[i][second], $scope.grid[i][first]];
                }
                for (i = 0; i < 9; i++) {
                    [$scope.grid[first][i], $scope.grid[second][i]] = [$scope.grid[second][i], $scope.grid[first][i]];
                }
            }

        }
        function removeCells(pole) {
            for (var i=0; i<3; i++) {
                var rand = Math.floor(Math.random()*9);

            }
        }
        $scope.generate();
    }]);