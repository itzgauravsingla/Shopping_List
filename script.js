var myApp = angular.module("shoppingApp", []);
myApp.controller("appController", [ctrl]);
myApp.controller("list1Controller", ["$rootScope", "$timeout", "ctmSrv", List1]);
myApp.controller("list2Controller", ["$rootScope", "$timeout", "ctmSrv", List2]);
myApp.factory("ctmSrv", ["$rootScope", CustomFactoryFunction]);

function ctrl() {}

function List1($rootScope, $timeout, ctmSrv) {
  var list1 = this;
  var srv = ctmSrv();
  list1.items = srv.getItems();
  list1.addItem = function () {
    try {
      srv.addItem(list1.name, list1.quant);
    } catch (error) {
      list1.error = error.message;
      $timeout(()=>{list1.error = "";},2000);
    }
  };

  list1.delItem = function (index) {
    srv.delItem(index);
  };
}

function List2($rootScope, $timeout, ctmSrv) {
  var list2 = this;
  var srv = ctmSrv(3);
  list2.items = srv.getItems();

  list2.addItem = function () {
    try {
      srv.addItem(list2.name, list2.quant);
    } catch (error) {
      list2.error = error.message;
      $timeout(()=>{list2.error = "";},2000);
    }
  };
  list2.delItem = function (index) {
    srv.delItem(index);
  };
}

// Service factory function - Return Function
function Srv($rootScope, maxItem) {
  var srv = this;
  var items = [];
  srv.getItems = function () {
    return items;
  };
  srv.addItem = function (name, quant) {
    if (name != undefined && quant != undefined) {
      if (
        maxItem == undefined ||
        (maxItem != undefined && items.length < maxItem)
      ) {
        var tmp = {
          name: name,
          quant: quant,
        };
        items.push(tmp);
      } else {
        throw new Error("Max items " + maxItem + " exceeds");
      }
    } else {
      throw new Error("Enter the values correctly");
    }
  };
  srv.delItem = function (index) {
    items.splice(index, 1);
  };
}

function CustomFactoryFunction() {
  var factory = function ($rootScope, maxItem) {
    return new Srv($rootScope, maxItem);
  };
  // console.log(factory());
  return factory;
}
