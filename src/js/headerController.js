
app.controller("headContr", function ($scope) {
    $scope.menuDatda = [
        {
            "category": "Student",
            "subs": [
                {
                    "subcategory": "Registration",
                    "url": "#!Student"
                },

                {
                    "subcategory": "List",
                    "url": "#!Studenttabuls"
                }
            ]
        },
        {
            "category": "Teacher",
            "subs": [
                {
                    "subcategory": "Registration",
                    "url": "#!Teacher"
                },

                {
                    "subcategory": "List",
                    "url": "#!Teachtabuls"
                }
            ]
        },
    ]
});


