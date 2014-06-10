;
(function(window) {
	'use strict';

	/**
	 * Função utilizada nos testes unitários para retornar
	 * uma promise. Para utilizar esta função como callback
	 * com um retorno resolve específico deve-se executar
	 * com a propriedade .bind do js. *
	 * 		Ex: getPromise.bind(this, {id: 42});
	 *
	 * @param  {Any} resolve 	Variável que será utilizada no resolve
	 * @return {Promise}         Retorna uma promise
	 */

	function getPromise(resolve) {
		var $q;
		inject(function(_$q_) {
			$q = _$q_;
		});
		var defer = $q.defer();
		if (!resolve) {
			defer.resolve({});
		} else {
			defer.resolve(resolve);
		}
		return defer.promise;
	}

	/**
	 * Funçã utlizada nos testes unitários para simular uma
	 * função vazia
	 * @return {Void} Nenhum retorno
	 */

	function voidFunction() {}

	/**
	 * Função que irá criar um novo $scope
	 * @return {Object} Retorna um novo scope criado a partir do rootScope
	 */
	function getNewScope() {
		var $scope;

		inject(function($rootScope) {
			$scope = $rootScope.$new();
		});

		return $scope;
	}

	/**
	 * Inicializa um controller com as injeções passadas por parametro
	 * @param  {String} controller Nome do controller a ser inicializado
	 * @param  {Object} params     Injeções que serão realizadas no controller
	 * @return {Object}            Um objeto controller com as injeções realizadas
	 */
	function initController(controller, params) {
		var $controller;

		if (!params) {
			params = {
				$scope: getNewScope()
			};
		}

		inject(function(_$controller_) {
			$controller = _$controller_(controller, params);
		});

		return $controller;
	}

	/**
	 * Objeto utilizado como utilitário nos testes
	 * @type {Object}
	 */
	window.$hrUnitUtil = {
		getPromise: getPromise,
		voidFunction: voidFunction,
		getNewScope: getNewScope,
		initController: initController
	};

})(window);
