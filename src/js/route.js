var app = angular.module("myApp", ["ngRoute"]);


app.config(function ($routeProvider) {
    $routeProvider
        .when("/Logins", {
            templateUrl: "src/html/login.html",
            controller: "LoginController"
        })
        .when("/ForgotPassword", {
            templateUrl: "src/html/forgot-password.html",
            controller: "LoginController"
        })
        .when("/Registers", {
            templateUrl: "src/html/register.html",
            controller: "LoginController"
        })
        .when("/404s", {
            templateUrl: "src/html/404.html",
            controller: "headContr"
        })

        .when("/Mains", {
            templateUrl: "src/html/home.html",
            controller: "homeController"
        })

        .when("/Student", {
            templateUrl: "src/html/StudentForm.html",
            controller: "StudentCntrl"
        })
        .when("/Teacher", {
            templateUrl: "src/html/TeacherForm.html",
            controller: "TeacherCntrl"
        })

        .when("/Studenttabuls", {
            templateUrl: "src/html/StudentTables.html",
            controller: "StudentCntrl"
        })

        .when("/Teachtabuls", {
            templateUrl: "src/html/Teachertables.html",
            controller: "TeacherCntrl"
        })


    $routeProvider.otherwise({
        redirectTo: "/404s"
    });

})

app.run(function ($rootScope, $http,) {
    $rootScope.twenty10 = 0;
    $rootScope.twenty11 = 0;
    $rootScope.twenty12 = 0;
    $rootScope.twenty13 = 0;
    $rootScope.twenty14 = 0;
    $rootScope.twenty15 = 0;
    $rootScope.twenty16 = 0;
    $rootScope.twenty17 = 0;
    $rootScope.twenty18 = 0;
    $rootScope.twenty19 = 0;
    $rootScope.twenty20 = 0;

    //Student Array
    $rootScope.arr1 = []
    //Teacher Array
    $rootScope.arr2 = []

    $rootScope.checkYear = function (years) {
        console.log(years.year)
        if (years.year == 2010) {
            $rootScope.twenty10++;

        }

        else if (years.year == 2011) {
            $rootScope.twenty11++;

        }
        else if (years.year == 2012) {
            $rootScope.twenty12++;

        }
        else if (years.year == 2013) {
            $rootScope.twenty13++;

        }
        else if (years.year == 2014) {
            $rootScope.twenty14++;

        }
        else if (years.year == 2015) {
            $rootScope.twenty15++;

        }
        else if (years.year == 2016) {
            $rootScope.twenty16++;

        }
        else if (years.year == 2017) {
            $rootScope.twenty17++;

        }
        else if (years.year == 2018) {
            $rootScope.twenty18++;

        }

        else if (years.year == 2019) {
            $rootScope.twenty19++;

        }

        else if (years.year == 2020) {
            $rootScope.twenty20++;

        }

    }

    $rootScope.myFunction = function () {
        $rootScope.arr1.filter($rootScope.checkYear);
    }
    $rootScope.myFunction();

    //get method
    $rootScope.studentGetDATA = function () {
        $http({
            method: "GET",
            url: "http://localhost:3000/GETstudent"
        }
        ).then(function recived(res) {
            $rootScope.arr1 = res.data.data;

        }, function error(res) {
            $rootScope.error = res.statusText;
        }
        );
        $rootScope.obj = {};

    }

    $rootScope.teacherGetDATA = function () {
        $http({
            method: "GET",
            url: "http://localhost:3000/GETteacher"
        }
        ).then(function recived(res) {
            $rootScope.arr2 = res.data.data;
            console.log($rootScope.arr2)

        }, function error(res) {
            $rootScope.error = res.statusText;
        }
        );


    }

    $rootScope.teacherGetDATA();
    $rootScope.studentGetDATA()

});


app.directive('dirPaginate', ['$compile', '$parse', '$timeout', 'paginationService', function ($compile, $parse, $timeout, paginationService) {
    return {
        priority: 5000, //High priority means it will execute first
        terminal: true,
        compile: function (element, attrs) {
            attrs.$set('ngRepeat', attrs.dirPaginate); //Add ng-repeat to the dom

            var expression = attrs.dirPaginate;
            // regex taken directly from https://github.com/angular/angular.js/blob/master/src/ng/directive/ngRepeat.js#L211
            var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

            var filterPattern = /\|\s*itemsPerPage:[^|]*/;
            if (match[2].match(filterPattern) === null) {
                throw 'pagination directive: the \'itemsPerPage\' filter must be set.';
            }
            var itemsPerPageFilterRemoved = match[2].replace(filterPattern, '');
            var collectionGetter = $parse(itemsPerPageFilterRemoved);

            //Now that we added ng-repeat to the element, proceed with compilation
            //but skip directives with priority 5000 or above to avoid infinite
            //recursion (we don't want to compile ourselves again)
            var compiled = $compile(element, null, 5000);

            return function (scope, element, attrs) {
                var paginationId;
                paginationId = attrs.paginationId || '__default';
                paginationService.registerInstance(paginationId);

                var currentPageGetter;
                if (attrs.currentPage) {
                    currentPageGetter = $parse(attrs.currentPage);
                } else {
                    // if the current-page attribute was not set, we'll make our own
                    var defaultCurrentPage = paginationId + '__currentPage';
                    scope[defaultCurrentPage] = 1;
                    currentPageGetter = $parse(defaultCurrentPage);
                }
                paginationService.setCurrentPageParser(paginationId, currentPageGetter, scope);

                if (typeof attrs.totalItems !== 'undefined') {
                    paginationService.setAsyncModeTrue(paginationId);
                    scope.$watch(function () {
                        return $parse(attrs.totalItems)(scope);
                    }, function (result) {
                        if (0 < result) {
                            paginationService.setCollectionLength(paginationId, result);
                        }
                    });
                } else {
                    scope.$watchCollection(function () {
                        return collectionGetter(scope);
                    }, function (collection) {
                        if (collection) {
                            paginationService.setCollectionLength(paginationId, collection.length);
                        }
                    });
                }
                //When linking just delegate to the link function returned by the new compile
                compiled(scope);
            };
        }
    };
}])

app.directive('dirPaginationControls', ['paginationService', function (paginationService) {
    var numberRegex = /^\d+$/;
    /**
     * Generate an array of page numbers (or the '...' string) which is used in an ng-repeat to generate the
     * links used in pagination
     *
     * @param currentPage
     * @param rowsPerPage
     * @param paginationRange
     * @param collectionLength
     * @returns {Array}
     */
    function generatePagesArray(currentPage, collectionLength, rowsPerPage, paginationRange) {
        var pages = [];
        var totalPages = Math.ceil(collectionLength / rowsPerPage);
        var halfWay = Math.ceil(paginationRange / 2);
        var position;

        if (currentPage <= halfWay) {
            position = 'start';
        } else if (totalPages - halfWay < currentPage) {
            position = 'end';
        } else {
            position = 'middle';
        }

        var ellipsesNeeded = paginationRange < totalPages;
        var i = 1;
        while (i <= totalPages && i <= paginationRange) {
            var pageNumber = calculatePageNumber(i, currentPage, paginationRange, totalPages);

            var openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));
            var closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));
            if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                pages.push('...');
            } else {
                pages.push(pageNumber);
            }
            i++;
        }
        return pages;
    }

    /**
     * Given the position in the sequence of pagination links [i], figure out what page number corresponds to that position.
     *
     * @param i
     * @param currentPage
     * @param paginationRange
     * @param totalPages
     * @returns {*}
     */
    function calculatePageNumber(i, currentPage, paginationRange, totalPages) {
        var halfWay = Math.ceil(paginationRange / 2);
        if (i === paginationRange) {
            return totalPages;
        } else if (i === 1) {
            return i;
        } else if (paginationRange < totalPages) {
            if (totalPages - halfWay < currentPage) {
                return totalPages - paginationRange + i;
            } else if (halfWay < currentPage) {
                return currentPage - halfWay + i;
            } else {
                return i;
            }
        } else {
            return i;
        }
    }

    return {
        restrict: 'AE',
        templateUrl: function (elem, attrs) {
            return attrs.templateUrl || 'directives/pagination/dirPagination.tpl.html';
        },
        scope: {
            maxSize: '=?',
            onPageChange: '&?'
        },
        link: function (scope, element, attrs) {
            var paginationId;
            paginationId = attrs.paginationId || '__default';
            if (!scope.maxSize) { scope.maxSize = 9; }
            scope.directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$parent.$eval(attrs.directionLinks) : true;
            scope.boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$parent.$eval(attrs.boundaryLinks) : false;

            if (!paginationService.isRegistered(paginationId)) {
                var idMessage = (paginationId !== '__default') ? ' (id: ' + paginationId + ') ' : ' ';
                throw 'pagination directive: the pagination controls' + idMessage + 'cannot be used without the corresponding pagination directive.';
            }

            var paginationRange = Math.max(scope.maxSize, 5);
            scope.pages = [];
            scope.pagination = {
                last: 1,
                current: 1
            };

            scope.$watch(function () {
                return (paginationService.getCollectionLength(paginationId) + 1) * paginationService.getItemsPerPage(paginationId);
            }, function (length) {
                if (0 < length) {
                    generatePagination();
                }
            });

            scope.$watch(function () {
                return paginationService.getCurrentPage(paginationId);
            }, function (currentPage) {
                goToPage(currentPage);
            });

            scope.setCurrent = function (num) {
                if (isValidPageNumber(num)) {
                    paginationService.setCurrentPage(paginationId, num);
                }
            };

            function goToPage(num) {
                if (isValidPageNumber(num)) {
                    scope.pages = generatePagesArray(num, paginationService.getCollectionLength(paginationId), paginationService.getItemsPerPage(paginationId), paginationRange);
                    scope.pagination.current = num;

                    // if a callback has been set, then call it with the page number as an argument
                    if (scope.onPageChange) {
                        scope.onPageChange({ newPageNumber: num });
                    }
                }
            }

            function generatePagination() {
                scope.pages = generatePagesArray(1, paginationService.getCollectionLength(paginationId), paginationService.getItemsPerPage(paginationId), paginationRange);
                scope.pagination.current = parseInt(paginationService.getCurrentPage(paginationId));
                scope.pagination.last = scope.pages[scope.pages.length - 1];
                if (scope.pagination.last < scope.pagination.current) {
                    scope.setCurrent(scope.pagination.last);
                }
            }

            function isValidPageNumber(num) {
                return (numberRegex.test(num) && (0 < num && num <= scope.pagination.last));
            }
        }
    };
}])

app.filter('itemsPerPage', ['paginationService', function (paginationService) {
    return function (collection, itemsPerPage, paginationId) {
        if (typeof (paginationId) === 'undefined') {
            paginationId = '__default';
        }
        if (!paginationService.isRegistered(paginationId)) {
            throw 'pagination directive: the itemsPerPage id argument (id: ' + paginationId + ') does not match a registered pagination-id.';
        }
        var end;
        var start;
        if (collection instanceof Array) {
            itemsPerPage = itemsPerPage || 9999999999;
            if (paginationService.isAsyncMode(paginationId)) {
                start = 0;
            } else {
                start = (paginationService.getCurrentPage(paginationId) - 1) * itemsPerPage;
            }
            end = start + itemsPerPage;
            paginationService.setItemsPerPage(paginationId, itemsPerPage);

            return collection.slice(start, end);
        } else {
            return collection;
        }
    };
}])

app.service('paginationService', function () {
    var instances = {};
    var lastRegisteredInstance;
    this.paginationDirectiveInitialized = false;

    this.registerInstance = function (instanceId) {
        if (typeof instances[instanceId] === 'undefined') {
            instances[instanceId] = {
                asyncMode: false
            };
            lastRegisteredInstance = instanceId;
        }
    };

    this.isRegistered = function (instanceId) {
        return (typeof instances[instanceId] !== 'undefined');
    };

    this.getLastInstanceId = function () {
        return lastRegisteredInstance;
    };

    this.setCurrentPageParser = function (instanceId, val, scope) {
        instances[instanceId].currentPageParser = val;
        instances[instanceId].context = scope;
    };
    this.setCurrentPage = function (instanceId, val) {
        instances[instanceId].currentPageParser.assign(instances[instanceId].context, val);
    };
    this.getCurrentPage = function (instanceId) {
        return instances[instanceId].currentPageParser(instances[instanceId].context);
    };

    this.setItemsPerPage = function (instanceId, val) {
        instances[instanceId].itemsPerPage = val;
    };
    this.getItemsPerPage = function (instanceId) {
        return instances[instanceId].itemsPerPage;
    };

    this.setCollectionLength = function (instanceId, val) {
        instances[instanceId].collectionLength = val;
    };
    this.getCollectionLength = function (instanceId) {
        return instances[instanceId].collectionLength;
    };

    this.setAsyncModeTrue = function (instanceId) {
        instances[instanceId].asyncMode = true;
    };

    this.isAsyncMode = function (instanceId) {
        return instances[instanceId].asyncMode;
    };
})

