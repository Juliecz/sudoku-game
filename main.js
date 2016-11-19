/**
 * Created by yuliya on 18.11.16.
 */
angular.module('sudokugame', [])
    .controller('mainCtrl', ['$scope', function ($scope) {
        $scope.grid = [[],[],[],[],[],[],[],[],[]];
        $scope.possibleValue = [1,2,3,4,5,6,7,8,9];
        $scope.selectedCell = {
            selected: false,
            x: null,
            y: null
        };
        $scope.generate = function () {
            fillGrid();
            for (var i=0; i<10; i++) {
                $scope.grid = transpose($scope.grid);
                vertical3($scope.grid);
                horizontal3($scope.grid);
                vertical1horizontal($scope.grid);
            }
            $scope.pole = removeCells($scope.grid);
        };
        function fillGrid() {
            var n=3;
            for (var i=0; i<9; i++) {
                for (var j=0; j<9; j++) {
                    $scope.grid[i][j] = Math.floor((i*n + i/n + j) % (n*n) + 1);
                }
            }
        }
        function transpose(pole) {
            var newArr = [[],[],[],[],[],[],[],[],[]];
            for (var i=0; i<pole.length; i++) {
                for (var j=0; j<pole.length; j++) {
                    newArr[j][i] = pole[i][j];
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
                    [pole[i][first*3], pole[i][second*3]] = [pole[i][second*3], pole[i][first*3]];
                    [pole[i][first*3+1], pole[i][second*3+1]] = [pole[i][second*3+1], pole[i][first*3+1]];
                    [pole[i][first*3+2], pole[i][second*3+2]] = [pole[i][second*3+2], pole[i][first*3+2]];
                }
            }
        }
        function horizontal3(pole) {
            var first = Math.floor(Math.random()*3),
                second = Math.floor(Math.random()*3);
            if (first===second) { horizontal3(pole); }
            else {
                for (var i=0; i<9; i++) {
                    [pole[first*3][i], pole[second*3][i]] = [pole[second*3][i], pole[first*3][i]];
                    [pole[first*3+1][i], pole[second*3+1][i]] = [pole[second*3+1][i], pole[first*3+1][i]];
                    [pole[first*3+2][i], pole[second*3+2][i]] = [pole[second*3+2][i], pole[first*3+2][i]];
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
                    [pole[i][first], pole[i][second]] = [pole[i][second], pole[i][first]];
                }
                for (i = 0; i < 9; i++) {
                    [pole[first][i], pole[second][i]] = [pole[second][i], pole[first][i]];
                }
            }

        }
        function removeCells(pole) {
            var i,
                novePole = [[],[],[],[],[],[],[],[],[]];
            for (i=0; i<9; i++) {
                for (var j = 0; j < 9; j++) {
                    novePole[i][j] = {
                        number: pole[i][j],
                        edit: false,
                        visNumbers: false
                    }
                }
            }
            for (i=0; i<50; i++) {
                var vertical = Math.floor(Math.random()*9),
                    horizontal = Math.floor(Math.random()*9);
                novePole[vertical][horizontal] = {
                    number: null,
                    edit: true
                };
            }
            return novePole;
        }
        $scope.selected = function (x, y, ifselected) {
            // unselect
            if (ifselected) {
                $scope.selectedCell = {
                    selected: false,
                    x: null,
                    y: null
                };
            }
            //select
            else {
                $scope.selectedCell = {
                    selected: true,
                    x: x,
                    y: y
                };
            }
        };

        $scope.chooseValue = function(num) {
            $scope.pole[$scope.selectedCell.y][$scope.selectedCell.x].number = num;
            $scope.selected(null, null, true);
            /*$scope.selectedCell = {
             selected: false,
             x: null,
             y: null
             };*/
            console.log($scope.selectedCell);
        };
        $scope.restart = function () {
            for (var i=0; i<9; i++) {
                for (var j = 0; j < 9; j++) {
                    if ($scope.pole[i][j].edit) {
                        $scope.pole[i][j].number = null;
                        $scope.pole[i][j].class = null;
                    }
                }
            }
            $scope.selectedCell = {
                selected: false,
                x: null,
                y: null
            };
        };
        $scope.solution = function () {
            for (var i=0; i<9; i++) {
                for (var j = 0; j < 9; j++) {
                    if ($scope.pole[i][j].number !== $scope.grid[i][j]) {
                        $scope.pole[i][j].class = 'warning';
                        $scope.pole[i][j].number = $scope.grid[i][j];
                    }
                    else {
                        $scope.pole[i][j].class = 'success';
                    }
                }
            }
        };
        $scope.generate();
    }]);