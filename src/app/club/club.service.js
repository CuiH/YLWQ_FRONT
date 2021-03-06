/**
 * Created by CuiH on 2017/3/29.
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
var user_service_1 = require("../user/user.service");
require("rxjs/add/operator/toPromise");
require("zepto");
require("sm");
var ClubService = (function () {
    function ClubService(http, userService) {
        this.http = http;
        this.userService = userService;
        $.init();
    }
    ;
    ClubService.prototype.createClub = function (club) {
        $.showPreloader();
        var options = new http_1.RequestOptions({
            method: http_1.RequestMethod.Post,
            headers: new http_1.Headers({
                'Content-Type': "application/x-www-form-urlencoded",
                'x-access-token': this.userService.getCurrentUserToken()
            }),
            body: 'name=' + club.name + '&brief_intro=' + club.brief_intro,
        });
        return this.http.request('http://172.18.43.152:3000/api/club/create', options)
            .toPromise()
            .then(function (res) {
            $.hidePreloader();
            return true;
        })
            .catch(this.handleError);
    };
    ClubService.prototype.updateClub = function (club) {
        var options = new http_1.RequestOptions({
            method: http_1.RequestMethod.Post,
            headers: new http_1.Headers({
                'Content-Type': "application/x-www-form-urlencoded",
                'x-access-token': this.userService.getCurrentUserToken()
            }),
            body: 'id=' + club.id + '&brief_intro=' + club.brief_intro,
        });
        return this.http.request('http://172.18.43.152:3000/api/club/update', options)
            .toPromise()
            .then(function (res) {
            return true;
        })
            .catch(this.handleError);
    };
    ClubService.prototype.quitClub = function (id) {
        var options = new http_1.RequestOptions({
            method: http_1.RequestMethod.Post,
            headers: new http_1.Headers({
                'Content-Type': "application/x-www-form-urlencoded",
                'x-access-token': this.userService.getCurrentUserToken()
            }),
            body: 'club_id=' + id
        });
        return this.http.request('http://172.18.43.152:3000/api/club/quit', options)
            .toPromise()
            .then(function (res) {
            return true;
        })
            .catch(this.handleError);
    };
    ClubService.prototype.getClubById = function (id) {
        $.showPreloader();
        var options = new http_1.RequestOptions({
            method: http_1.RequestMethod.Get,
        });
        return this.http.request('http://172.18.43.152:3000/api/club/' + id, options)
            .toPromise()
            .then(function (res) {
            $.hidePreloader();
            return res.json().data.club;
        })
            .catch(this.handleError);
    };
    ClubService.prototype.getAllClubsByPartName = function (partName) {
        var options = new http_1.RequestOptions({
            method: http_1.RequestMethod.Get,
        });
        return this.http.request('http://172.18.43.152:3000/api/club/search?part_name=' + partName, options)
            .toPromise()
            .then(function (res) {
            return res.json().data.clubs;
        })
            .catch(this.handleError);
    };
    ClubService.prototype.getAllClubActivitiesById = function (id) {
        $.showPreloader();
        var options = new http_1.RequestOptions({
            method: http_1.RequestMethod.Get,
            headers: new http_1.Headers({
                'x-access-token': this.userService.getCurrentUserToken()
            }),
        });
        return this.http.request('http://172.18.43.152:3000/api/club/get_all_activities?club_id=' + id, options)
            .toPromise()
            .then(function (res) {
            $.hidePreloader();
            return res.json().data.activities;
        })
            .catch(this.handleError);
    };
    ClubService.prototype.getAllClubMembersById = function (id) {
        var options = new http_1.RequestOptions({
            method: http_1.RequestMethod.Get,
            headers: new http_1.Headers({
                'x-access-token': this.userService.getCurrentUserToken()
            }),
        });
        return this.http.request('http://172.18.43.152:3000/api/club/get_all_members?club_id=' + id, options)
            .toPromise()
            .then(function (res) {
            return res.json().data.members;
        })
            .catch(this.handleError);
    };
    ClubService.prototype.getLatestClubBulletinById = function (id) {
        var options = new http_1.RequestOptions({
            method: http_1.RequestMethod.Get,
            headers: new http_1.Headers({
                'x-access-token': this.userService.getCurrentUserToken()
            }),
        });
        return this.http.request('http://172.18.43.152:3000/api/club_bulletin/get_latest_one?club_id=' + id, options)
            .toPromise()
            .then(function (res) {
            return res.json().data.clubBulletin;
        })
            .catch(this.handleError);
    };
    ClubService.prototype.getLatestThreeClubMessagesById = function (id) {
        var options = new http_1.RequestOptions({
            method: http_1.RequestMethod.Get,
            headers: new http_1.Headers({
                'x-access-token': this.userService.getCurrentUserToken()
            }),
        });
        return this.http.request('http://172.18.43.152:3000/api/club/get_latest_three_club_messages?club_id=' + id, options)
            .toPromise()
            .then(function (res) {
            return res.json().data.clubMessages;
        })
            .catch(this.handleError);
    };
    ClubService.prototype.getAllClubMessagesById = function (id, page) {
        $.showPreloader();
        var options = new http_1.RequestOptions({
            method: http_1.RequestMethod.Get,
            headers: new http_1.Headers({
                'x-access-token': this.userService.getCurrentUserToken()
            }),
        });
        return this.http.request('http://172.18.43.152:3000/api/club/get_all_club_messages?club_id=' + id + '&page=' + page, options)
            .toPromise()
            .then(function (res) {
            $.hidePreloader();
            return res.json().data.clubMessages;
        })
            .catch(this.handleError);
    };
    ClubService.prototype.getHottestThreeClubs = function () {
        var options = new http_1.RequestOptions({
            method: http_1.RequestMethod.Get,
        });
        return this.http.request('http://172.18.43.152:3000/api/club/get_hottest_three', options)
            .toPromise()
            .then(function (res) {
            return res.json().data.clubs;
        })
            .catch(this.handleError);
    };
    ClubService.prototype.handleError = function (err) {
        $.hidePreloader();
        $.alert(err.json().message);
        return Promise.reject(err);
    };
    return ClubService;
}());
ClubService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        user_service_1.UserService])
], ClubService);
exports.ClubService = ClubService;
//# sourceMappingURL=club.service.js.map