var myApp = angular.module("shoppingApp", []);
myApp.controller("appController", [ctrl]);
myApp.controller("list1Controller", ["$timeout", "ctmSrv", List1]);
myApp.controller("list2Controller", ["$timeout", "ctmSrv", List2]);
myApp.factory("ctmSrv", [CustomFactoryFunction]);

function ctrl() {}

function List1($timeout, ctmSrv) {
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

function List2($timeout, ctmSrv) {
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
function Srv(maxItem) {
  var srv = this;
  var items = [];
  srv.getItems = function () {
    return items;
  };
  srv.addItem = function (name, quant) {
    if (name != (undefined || "") && quant != (undefined || "")) {
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
  var factory = function (maxItem) {
    return new Srv(maxItem);
  };
  return factory;
}
