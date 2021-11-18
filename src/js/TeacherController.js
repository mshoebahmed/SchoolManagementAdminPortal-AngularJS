
app.controller("TeacherCntrl", function ($http, $rootScope, $scope) {
    $scope.Cityes = [
        {
            "state": "Select State",
            "city": ["Select City (Select State First)"]
        },
        {
            "state": "Telengana",
            "city": ["Hyderabad", "Secunderabad"]
        },
        {
            "state": "Delhi",
            "city": ["Agra"]
        },
        {
            "state": "TamilNadu",
            "city": ["Chennai", "Coimbatore"]
        },
        {
            "state": "Karnataka",
            "city": ["Banglore", "Gulbarga"]
        }
    ]
    $scope.Officename = ['English', 'Science', 'History', 'Maths', 'Commerce', 'Geography'];
    $scope.loadCity = function (state1) {


        console.log($scope.stateName);
        $scope.cityNames = state1.city;
        $scope.cityName = state1.city[0];
    }

    //Add Teacher
    $scope.addArr = function () {

        $scope.employee = {
            "firstName": $scope.fname,
            "lastName": $scope.lname,
            "City": $scope.cityName,
            "State": $scope.stateName.state,
            "OfficeName": $scope.sname,
            "DateAdded": Date(),
            "year": new Date().getFullYear
        }
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        var data = { "recordsss": $rootScope.arr2 }
        console.log(data.recordsss);

        $http({
            method: "POST",
            url: "http://localhost:3000/POSTteacher",
            data: $scope.employee,
            headers: headers
        }
        ).then
            (
                function recived(res) {
                    $scope.message = res.data.message;
                    $rootScope.teacherGetDATA();
                },
                function error(res) {
                    $scope.error = res.statusText;
                }
            );


        document.getElementById("savednotif").innerHTML = "Saved Successfully."
        $scope.fname = "";
        $scope.lname = "";
        $scope.stateName = "";
        $scope.cityName = "";
        $scope.sname = "";

    }

    //Delete 
    $scope.deleteDatas = function (i) {
        console.log(i)
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        var deleted={"id": i};
        $http({
            method: 'DELETE',
            url: "http://localhost:3000/DELETEteacher",
            params:deleted,
            headers: headers
        }).then(function recived(res) {
            $rootScope.teacherGetDATA();


        }
        )
        deleted = {};
    };

    $rootScope.teacherGetDATA();

    //pageHandler
    $scope.currentPage = 1;
    $scope.pageSize = 10;



})
