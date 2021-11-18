

app.controller("StudentCntrl", function ($http, $rootScope, $scope) {

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
    $scope.classes = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    $scope.sec = ['A', 'B', 'C', 'D']
    $scope.schoolname = ["DPS", "HPS", "JHPS", "SUPS"];
    $scope.student = {};
    console.log($rootScope.arr1);

    //Add Student
    $scope.addArr = function () {
        $scope.a = new Date();
        $scope.student = {
            "firstName": $scope.fname,
            "lastName": $scope.lname,
            "Class": $scope.class,
            "Section": $scope.section,
            "SchoolName": $scope.sname,
            "DateAdded": $scope.a,
            "year": new Date($scope.a).getFullYear()
        }
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        var data = { "recordsss": $rootScope.arr1 }
        console.log(data.recordsss);

        $http({
            method: "POST",
            url: "http://localhost:3000/POSTstudent",
            data: $scope.student,
            headers: headers
        }
        ).then
            (
                function recived(res) {
                    $scope.message = res.data.message;
                    $rootScope.studentGetDATA();
                },
                function error(res) {
                    $scope.error = res.statusText;
                }
            );


        document.getElementById("savednotif").innerHTML = "Saved Successfully.";
        $scope.fname = "";
        $scope.lname = "";
        $scope.class = 0;
        $scope.section = "";
        $scope.sname = "";


        // console.log($rootScope.arr1)
        $rootScope.myFunction();
        $rootScope.studentGetDATA();
    }

    //Delete 
   
    $scope.deleteData = function (i) {
        console.log(i)
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
      var deleted={"id": i};
        $http({
            method: 'DELETE',
            url: "http://localhost:3000/DELETEstudent",
            params: deleted,
            headers: headers
        }).then(function recived(res) {
            $rootScope.studentGetDATA();


        }
        )
       deleted = {};
    };

    $rootScope.studentGetDATA();

    //pageHandler
    $scope.currentPage = 1;
    $scope.pageSize = 10;



})



app.directive('capitalize', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var capitalize = function (inputValue) {
                if (inputValue == undefined) inputValue = '';
                var capitalized = inputValue.toUpperCase();
                if (capitalized !== inputValue) {
                    // see where the cursor is before the update so that we can set it back
                    var selection = element[0].selectionStart;
                    modelCtrl.$setViewValue(capitalized);
                    modelCtrl.$render();
                    // set back the cursor after rendering
                    element[0].selectionStart = selection;
                    element[0].selectionEnd = selection;
                }
                return capitalized;
            }
            modelCtrl.$parsers.push(capitalize);
            capitalize(scope[attrs.ngModel]); // capitalize initial value
        }
    };
});