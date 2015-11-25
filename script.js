	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute']);
	// configure our routes
	scotchApp.config(function($routeProvider) {
		Parse.initialize("bmGuNCAVpGCmtUY5GOORTxaatm2FmSZIYdnIxdsY", "fuNlKEuSbANtiLNULpfcvsFAEJwq38Dqohvgjgj4");
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'pages/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'pages/contact.html',
				controller  : 'contactController'
			})
			.when('/login', {
				templateUrl : 'pages/login.html',
				controller  : 'loginController'
			})
			.when('/logout', {
				templateUrl : 'pages/logout.html',
				controller  : 'logoutController'
			});
	});

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope,$location) {
		// create a message to display in our view
		var currentUser = Parse.User.current();
		if (currentUser) {
    // do stuff with the user
    		alert('Already logged in');
    		$location.path('contact');
		} else {
    // show the signup or login page
    		$location.path('login');
		}
		$scope.message = 'Everyone come and see how good I look!';
	});

	scotchApp.controller('aboutController', function($scope) {
		$scope.message = 'Look! I am an about page.';
	});

	scotchApp.controller('contactController', function($scope) {
		$scope.todos = [];
		$scope.formTodoText == ""
		var currentUser = Parse.User.current();
		var todoClass = Parse.Object.extend("Todo");
		var Query = new Parse.Query(todoClass);
		Query.equalTo("author",currentUser); 
		$scope.getTodos = function() {
			Query.find({
			success: function(results) {
    			for (var i = 0; i < results.length; i++) {
      				var object = results[i];
      				console.log(object);
      				$scope.$apply(function(){
  						$scope.todos.push(object);
					});
    			}
    			
  			},
  			error: function(error) {
    			alert("Error: " + error.code + " " + error.message);
  			}
		});
		}

		$scope.addTodo = function() {
			if($scope.formTodoText == "")
				alert('Enter todo');
			else {
				var todo = new todoClass();
				todo.set("content",$scope.formTodoText);
				todo.set("Priority","MEDIUM");
				todo.set("author",currentUser);
				todo.save(null, {
				  success: function(gameScore) {
				    // Execute any logic that should take place after the object is saved.
				    alert('New object created with objectId: ' + gameScore.id);
				    $scope.$apply(function(){
  						$scope.todos.push(todo);
					});
				  },
				  error: function(gameScore, error) {
				    // Execute any logic that should take place if the save fails.
				    // error is a Parse.Error with an error code and message.
				    alert('Failed to create new object, with error code: ' + error.message);
				  }
				});
				$scope.formTodoText ="";
			}
		}

		$scope.delete = function(objectId) {
			alert(objectId+ "id");
			Query.get(objectId, {
	  			success: function(gameScore) {
	    			gameScore.destroy({
	    				success: function(myObject) {
		    				alert("Deleted");
		    				$scope.$apply(function(){
  								$scope.getTodos();
							});
		    				
	  					},
	  					error: function(myObject, error) {
	    // The delete failed.
	    // error is a Parse.Error with an error code and message.
	  					}
					});

	  			},
	  			error: function(object, error) {
	    // The object was not retrieved successfully.
	    // error is a Parse.Error with an error code and message.
	    			alert('no object');
	  			}
			});
		

		}

	});

	scotchApp.controller('loginController', function($scope,$location) {
		$scope.isLoggedin = false;
		//$scope.message = 'Contact us! JK. This is just a demo.';
		$scope.login = function() {
			Parse.User.logIn($scope.username, $scope.password, {
  				success: function(user) {
    // Do stuff after successful login.
    				$location.path('contact');
    				alert('login succes');
 
  				},
  				error: function(user, error) {
    // The login failed. Check error to see why.
    				alert('login failed');
  				}
			});
		};
	});

scotchApp.controller('TodoCtrl',function ($scope) {
  
  $scope.todos = [
    {text:'Task 1', done:false},         
    {text: 'Hey look here !! ', done:false}
  ];
  
  $scope.getTotalTodos = function () {
    return $scope.todos.length;
  };
  
  
  $scope.addTodo = function () {
    $scope.todos.push({text:$scope.formTodoText, done:false});
    $scope.formTodoText = '';
  };
  
    $scope.clearCompleted = function () {
        $scope.todos = _.filter($scope.todos, function(todo){
            return !todo.done;
        });
    };
});

	scotchApp.controller('logoutController', function($scope,$location) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
		var currentUser = Parse.User.current();
	    Parse.User.logOut();
    	var currentUser = Parse.User.current(); 
    	$location.path('login');
	});

