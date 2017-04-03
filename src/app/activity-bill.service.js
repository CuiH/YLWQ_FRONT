/**
 * Created by CuiH on 2017/4/3.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
require("rxjs/add/operator/toPromise");
require("zepto");
require("sm");
var user_service_1 = require("./user.service");
var ActivityBillService = (function () {
    function ActivityBillService(http, jsonp, userService) {
        this.http = http;
        this.jsonp = jsonp;
        this.userService = userService;
        $.init();
    }
    ;
    ActivityBillService.prototype.createActivityBill = function (activityBill) {
        console.log(JSON.stringify(activityBill));
        var options = new http_1.RequestOptions({
            method: http_1.RequestMethod.Post,
            headers: new http_1.Headers({
                'Content-Type': "application/x-www-form-urlencoded",
                'x-access-token': this.userService.getCurrentUserToken()
            }),
            body: JSON.stringify(activityBill)
        });
        return this.jsonp.request('http://172.18.43.152:3000/api/activity_bill/create', options)
            .toPromise()
            .then(function () {
            return;
        })
            .catch(this.handleError);
    };
    ActivityBillService.prototype.handleError = function (err) {
        $.hidePreloader();
        $.alert(err.json().message);
        return Promise.reject(err);
    };
    return ActivityBillService;
}());
ActivityBillService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        http_1.Jsonp,
        user_service_1.UserService])
], ActivityBillService);
exports.ActivityBillService = ActivityBillService;
//# sourceMappingURL=activity-bill.service.js.map