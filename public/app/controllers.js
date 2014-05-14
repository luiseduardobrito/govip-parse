
var Controllers = angular.module("go.controllers", []).controller;

Controllers('HeaderCtrl', ['$scope', '$location', '$user', function($scope, $location, $user) {

	$scope.$safeApply = function(fn) {
		var phase = this.$root.$$phase;
		if(phase == '$apply' || phase == '$digest') {
			if(fn && (typeof(fn) === 'function')) {
				fn();
			}
		} else {
			this.$apply(fn);
		}
	}

	$scope.getCurrentUser = function() {
		return $user.me();
	}

	$scope.$watch('getCurrentUser()', function(me) {
		$scope.$safeApply(function(){
			$scope.me = me;
		});
	});

	$scope.loggedButton = function() {

		if(!me) 
			return "";

		else 
			return "none";
	}

	$scope.userButton = function() {
		if(me) return "";
		else return "none"
	}

	$scope.fblogin = function() {

		$user.facebookLogin(function(err, me) {
			$scope.$safeApply(function(){
				$location.path("eventos");
			})
		});
	}

	$scope.logout = function() {
		$user.logout(function() {
			$location.path("");
		});
	}
}]);

Controllers('HomeCtrl', ['$scope', '$location', '$user', function($scope, $location, $user) {

	$scope.$safeApply = function(fn) {
		var phase = this.$root.$$phase;
		if(phase == '$apply' || phase == '$digest') {
			if(fn && (typeof(fn) === 'function')) {
				fn();
			}
		} else {
			this.$apply(fn);
		}
	}

	// $scope.getCurrentUser = function() {
	// 	return $user.me();
	// }

	// $scope.$watch('getCurrentUser()', function(me) {
	// 	if(me)
	// 		$scope.me = me;
	// })

	/* ======= Flexslider ======= */
    $('.flexslider').flexslider({
        animation: "fade",
        touch: true,
        directionNav: false
    });

	/* ======= Animations ======= */
	jQuery(document).ready(function($) {

		//Only animate elements when using non-mobile devices    
		if (jQuery.browser.mobile === false) {

			/* Animate elements in #Promo */
			$('#promo .title').css('opacity', 0).one('inview', function(isInView) {
			    if (isInView) {$(this).addClass('animated fadeInUp delayp1');}
			});
			$('#promo .summary').css('opacity', 0).one('inview', function(isInView) {
			    if (isInView) {$(this).addClass('animated fadeInUp delayp2');}
			});
			$('#promo .ios').css('opacity', 0).one('inview', function(isInView) {
			    if (isInView) {$(this).addClass('animated fadeInLeft delayp3');}
			});

			$('#promo .android').css('opacity', 0).one('inview', function(isInView) {
			    if (isInView) {$(this).addClass('animated fadeInRight delayp3');}
			});

			$('#promo .ipad').css('opacity', 0).one('inview', function(isInView) {
			    if (isInView) {$(this).addClass('animated fadeInRight delayp3');}
			});

			$('.phone-holder').css('opacity', 0).one('inview', function(event, isInView) {
			    if (isInView) {$(this).addClass('animated fadeInRightBig delayp4');}
			});

			/* Animate elements in #Features */
			$('#features .icon').css('opacity', 0).one('inview', function(event, isInView) {
			    if (isInView) {$(this).addClass('animated fadeInUp delayp1');}
			});

			/* Animate elements in #How */
			$('#how .video-wrapper').css('opacity', 0).one('inview', function(event, isInView) {
			    if (isInView) {$(this).addClass('animated fadeInLeft delayp1');}
			});

			$('#how .content').css('opacity', 0).one('inview', function(event, isInView) {
			    if (isInView) {$(this).addClass('animated fadeInRight delayp2');}
			});

			/* Animate elements in #faq */
			$('#faq .title').css('opacity', 0).one('inview', function(event, isInView) {
			    if (isInView) {$(this).addClass('animated fadeInUp delayp1');}
			});
			$('#faq .question').css('opacity', 0).one('inview', function(event, isInView) {
			    if (isInView) {$(this).addClass('animated fadeInUp delayp2');}
			});
			$('#faq .answer').css('opacity', 0).one('inview', function(event, isInView) {
			    if (isInView) {$(this).addClass('animated fadeInUp delayp3');}
			});
			$('#faq .btn').css('opacity', 0).one('inview', function(event, isInView) {
			    if (isInView) {$(this).addClass('animated fadeInUp delayp2');}
			});

			/* Animate elements in #testimonials */
			$('#testimonials .title').css('opacity', 0).one('inview', function(event, isInView) {
			    if (isInView) {$(this).addClass('animated fadeInUp delayp1');}
			});

			$('#testimonials .quote-box').css('opacity', 0).one('inview', function(event, isInView) {
			    if (isInView) {$(this).addClass('animated fadeInUp delayp2');}
			});

			$('#testimonials .people').css('opacity', 0).one('inview', function(event, isInView) {
			    if (isInView) {$(this).addClass('animated fadeInUp delayp3');}
			});

			$('#testimonials .press').css('opacity', 0).one('inview', function(event, isInView) {
			    if (isInView) {$(this).addClass('animated fadeInUp delayp1');}
			});

			/* Animate elements in #contact */
			$('#contact .title').css('opacity', 0).one('inview', function(event, isInView) {
			    if (isInView) {$(this).addClass('animated fadeInUp delayp1');}
			});

			$('#contact .intro').css('opacity', 0).one('inview', function(event, isInView) {
			    if (isInView) {$(this).addClass('animated fadeInUp delayp2');}
			});

			$('#contact .contact-form').css('opacity', 0).one('inview', function(event, isInView) {
			    if (isInView) {$(this).addClass('animated fadeInUp delayp3');}
			});

			$('#contact .social-icons').css('opacity', 0).one('inview', function(event, isInView) {
			    if (isInView) {$(this).addClass('animated fadeInUp delayp4');}
			});   
		}
	});
}]);

Controllers('AuthCtrl', ['$scope', '$user', '$location', function($scope, $user, $location) {

	$scope.$safeApply = function(fn) {
		var phase = this.$root.$$phase;
		if(phase == '$apply' || phase == '$digest') {
			if(fn && (typeof(fn) === 'function')) {
				fn();
			}
		} else {
			this.$apply(fn);
		}
	}

	$scope.facebookLogin = function() {

		$user.facebookLogin(function(err, me) {
			$scope.$safeApply(function(){
				console.log(me);
				$location.path("eventos");
			})
		});
	}

	$scope.login = function() {

		$user.login({

			email: $scope.email,
			password: $scope.password

		}, {

			success: function(me) {
				$scope.$safeApply(function(){

					alert("Bem vindo, " + me.get("name") + "!");
					console.log(me);

					$location.path("eventos");
				})
			},

			error: function(err) {
				alert("Erro!");
				console.error(err);
			}
		});
	}

	$scope.signup = function() {

		$user.signup({

			name: $scope.signup_name + " " + $scope.signup_lastname,
			email: $scope.signup_email,
			password: $scope.signup_password

		}, {

			success: function(me) {
				
				$scope.$safeApply(function(){

					alert("Bem vindo, " + me.get("name") + "!");
					console.log(me);

					$location.path("eventos");
				})
			},

			error: function(err) {
				alert("Erro!")
				console.error(err);
			}
		})
	}

	$scope.resetPassword = function() {

		var email = prompt("Digite seu email:", "Esqueci minha senha");

		if (email != null) {

			$user.resetPassword(email, {

				success: function() {
					alert("Você receberá um email em breve!");
				},

				error: function(error) {
					alert("Erro!");
					console.error(error);
				}
			});
		}
	}

	$scope.getCurrentUser = function() {
		return $user.me();
	}

	$scope.$watch('getCurrentUser()', function(me) {
		if(me)
			$location.path('eventos');
	})
}]);

Controllers('ListCtrl', ['$scope', '$user', '$event', '$location', function($scope, $user, $event, $location) {

	$scope.safeApply = function(fn) {

		var phase = this.$root.$$phase;

		if(phase == '$apply' || phase == '$digest') {
			if(fn && (typeof(fn) === 'function')) {
				fn();
			}
		} else {
			this.$apply(fn);
		}
	};

	$event.getList({

		success: function(list) {

			$scope.safeApply(function(){

				$scope.events = [];
				
				for(var i = 0; i < list.length; i++) {

					var pos = $scope.events.push(list[i].attributes) - 1;

					$scope.events[pos].displayDate = list[i].getDisplayDate();
					$scope.events[pos].id = list[i].id;

					$scope.events[pos].available = list[i].isAvailable({
						success: function(result) {
							$scope.safeApply(function(){
								$scope.events[pos].available = result;
							})
						},
						error: function(err) {
							console.error(err)
						}
					});
				}
			})
		},

		error: function(error) {
			alert("Erro!");
			console.error(error);
		}
	})

	$scope.goCart = function(currentEvent) {
		$location.path('carrinho/'+ currentEvent.id);
	}
}]);

Controllers('OrderCtrl', 

	['$scope', '$routeParams', '$event', '$item', '$location', '$user', '$order', '$attendee',

	function($scope, $routeParams, $evnt, $item, $location, $User, $Order, $Attendee) {

	// Scope attributes
	$scope.cart = [];

	$scope.items = $scope.evnt = {}

	$scope.info = {
		attendee: {
			name: $User.me().get('name'),
		},
		evnt: {},
		item: {}
	}

	$scope.safeApply = function(fn) {

		var phase = this.$root.$$phase;

		if(phase == '$apply' || phase == '$digest') {
			if(fn && (typeof(fn) === 'function')) {
				fn();
			}
		} else {
			this.$apply(fn);
		}
	};

	$scope.getInfoItem = function() {

		for(var i = 0; i < $scope.items.length; i++) {
			if($scope.items[i].id === $scope.info.item)
				return $scope.items[i];
		}

		return {};
	}

	$scope.getCartToral = function() {

		var tot = 0;

		for(var i = 0; i < $scope.cart.length; i++) {
			tot += $scope.cart[i].item.get('value');
		}

		return tot;
	}

	$scope.deleteCartItem = function(n) {
		$scope.cart.splice(n > 0 ? n : 0, 1);
	}

	$scope.getItemsFromEvent = function(e, fn) {

		fn = fn || function(){};

		$item.findByEvent(e, {

			success: function(items) {
				$scope.safeApply(function() {
					$scope.items = items;
					$scope.info.item = items[0].id;
				});
			},

			error: function(err) {
				alert("Erro!");
				console.error(err);
			}
		});
	}

	$scope.addToCart = function() {
		var info = $scope.info;
		info.n = $scope.cart.length;
		info.evnt = $scope.evnt;

		if(!info) {
			alert("Informações do ingresso inválidas");
			console.error("info is not defined")
			return;
		}

		else if(!info.item) {
			alert("Informações do ingresso inválidas");
			console.error("info.item is not defined")
			return;
		}

		else if(!info.evnt) {
			alert("Informações do ingresso inválidas");
			console.error("info.evnt is not defined")
			return;
		}

		else if(!info.attendee) {
			alert("Informações do ingresso inválidas");
			console.error("info.attendee is not defined")
			return;
		}

		else if(!info.attendee.name || !info.attendee.document) {
			alert("Informações do ingresso inválidas");
			console.error("info.attendee is not defined")
			return;
		}

		else {

			info.item = $scope.getInfoItem(info.item);
			$scope.cart.push(info);

			$scope.info = {
				attendee: {},
				'evnt': {},
				item: ($scope.items && $scope.items.length ? $scope.items[0] : {})
			}
		}
	}

	$scope.placeCart = function() {

		var cart = $scope.cart;
		var me = $User.me();

		var _order = $Order.create({

			buyer: me,
			items: cart,
			total: $scope.getCartToral()

		}, {

			success: function(order, attendees) {

				console.log(order);

				$Order.place(attendees, order, {

					success: function(payment) {
						console.log(payment);
						alert("Sucesso!");
					},

					error: function(error) {
						console.error(error);
						alert("Erro!");
					}
				});
			},

			error: function(error) {
				console.error(error);
				alert("Erro!");
			}
		});
	}

	$evnt.findById($routeParams.id, {

		success: function(e) {
			$scope.safeApply(function(){
				$scope.evnt = e;
				$scope.admin = e.get('admin')
				$scope.getItemsFromEvent(e);
			});
		},

		error: function(error) {
			alert("Erro!");
			console.error(error);
		}
	});

	// $scope.addItemId = null;
	// $scope.addItem = {};
	// $scope.addItemUser = {};

	// $scope.items = [];
	// $scope.availableItems = [];

	// $scope.addItemChange = function() {

	// 	for(var i = 0; i < $scope.availableItems.length; i++) {
	// 		var item = $scope.availableItems[i];
	// 		if($scope.addItemId === item.id) {
	// 			$scope.addItem = item;
	// 		}
	// 	}
	// };

	// $scope.addItemToCart = function() {

	// 	var item = $scope.addItem;
	// 	item.user = $scope.addItemUser;
	// 	item.quantity = 1;

	// 	$scope.items.push(item);

	// 	$scope.addItemId = $scope.availableItems[0].id;
	// 	$scope.addItem = {};
	// 	$scope.addItemUser = {};

	// 	$scope.addItemChange();
	// }

	// $scope.deleteItem = function(item) {
	// 	for(var i = 0; i < $scope.items.length; i++) {
	// 		if($scope.items[i].id === item.id)
	// 			$scope.items.splice(i, 1);
	// 	}
	// }

	// $scope.getUserLabel = function(item) {

	// 	item = item || {};
	// 	item.user  = item.user || {};

	// 	var label = "";

	// 	if(item.user && item.user.name) {
	// 		label += item.user.name;

	// 		if(item.user.rg)
	// 			label += "  (RG: " + item.user.rg + ")";
	// 	}

	// 	return label;
	// }

	// $scope.getTotalValue = function() {

	// 	var total = 0;

	// 	for(var i = 0; i < $scope.items.length; i++) {
	// 		total += $scope.items[i].value;
	// 	}

	// 	return total;
	// }

	// $scope.buttonState = false;
	// $scope.buttonLabel = "Continuar ";
	// $scope.buttonContent = "";
	// $scope.buttonRet = 0;

	// setInterval(function(){

	// 	$scope.safeApply(function(){

	// 		$scope.buttonRet++;
	// 		$scope.buttonRet %= 3;
	// 		$scope.buttonContent = $scope.buttonLabel;

	// 		for(var i = 0; i <= $scope.buttonRet; i++)
	// 			$scope.buttonContent += ".";
	// 	});

	// }, 1300);

	// $scope.getButtonLabel = function() {
	// 	if($scope.buttonState)
	// 		return $scope.buttonContent;
	// 	else
	// 		return $scope.buttonLabel;
	// }

	// $scope.getButtonClass = function() {
	// 	if($scope.buttonState)
	// 		return "btn-cart-disabled";
	// 	else
	// 		return "btn-cart";		
	// }

	// $scope.placeOrder = function() {

	// 	if($scope.items.length < 1) {
	// 		alert("Erro: nenhum item no carrinho");
	// 		return;
	// 	}

	// 	var me = $user.me();

	// 	if(!me) {
	// 		alert("Erro: você precisa estar logado para realizar uma compra");
	// 		return;
	// 	}

	// 	$scope.buttonRet = 0;
	// 	$scope.buttonState = true;
	// 	$scope.buttonLabel = "Aguarde ";

	// 	$order.place($scope.evnt.id, $scope.items, function(err, result) {

	// 		if(err) {
	// 			alert("Erro! Atualize a página e tente novamente. Se o problema persistir entre em contato com contato@govipclub.com.br");
	// 			console.log(err);
	// 		}

	// 		else {

	// 			console.log(result);
	// 			$location.path("sucesso");
	// 		}

	// 	});
	// };

	// $event.findById($routeParams.id, function(err, res) {
	// 	$scope.safeApply(function(){
	// 		$scope.evnt = res;
	// 	});
	// });

	// $event.getItems($routeParams.id, function(err, res) {
	// 	$scope.safeApply(function(){

	// 		$scope.availableItems = res;

	// 		if(res.length > 0) {
	// 			$scope.addItemId = res[0].id;
	// 			$scope.addItemChange();
	// 		}
	// 	});
	// });
}]);

Controllers('SuccessCtrl', ['$scope', function($scope) {

}]);

Controllers('AboutCtrl', ['$scope', function($scope) {

	 /* Animate elements in #story */
    $('#story .content').css('opacity', 0).one('inview', function(event, isInView) {
        if (isInView) {$(this).addClass('animated fadeInLeft delayp1');}
    });
    
    $('#story .member').css('opacity', 0).one('inview', function(event, isInView) {
        if (isInView) {$(this).addClass('animated fadeInRight delayp2');}
    });
}]);

Controllers('TermsCtrl', ['$scope', '$order', function($scope, $Order) {
}]);