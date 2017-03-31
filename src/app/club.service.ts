/**
 * Created by CuiH on 2017/3/29.
 */

import {Http, RequestMethod, RequestOptions, Headers} from "@angular/http";
import {Injectable} from "@angular/core";

import 'rxjs/add/operator/toPromise';

import {Club} from "./club";

import "zepto";
import "sm";
import {Activity} from "./activity";
import {UserService} from "./user.service";
import {User} from "./user";
import {ClubBulletin} from "./club-bulletin";

declare let $: any;


@Injectable()
export class ClubService {

	constructor(
		private http: Http,
	    private userService: UserService
	) {
		$.init();
	};

	getClubById(id: number): Promise<Club> {
		$.showPreloader();

		let options = new RequestOptions({
			method: RequestMethod.Get,
		});

		return this.http.request('http://localhost:3000/api/club/' + id, options)
			.toPromise()
			.then((res) => {
				$.hidePreloader();

				return res.json().data.club as Club;
			})
			.catch(this.handleError);
	}

	getAllClubActivitiesById(id: number): Promise<Activity[]> {
		$.showPreloader();

		let options = new RequestOptions({
			method: RequestMethod.Get,
			headers: new Headers({
				'x-access-token': this.userService.getCurrentUserToken()
			}),
		});

		return this.http.request('http://localhost:3000/api/club/get_all_activities?club_id=' + id, options)
			.toPromise()
			.then((res) => {
				$.hidePreloader();

				return res.json().data.activities as Activity[];
			})
			.catch(this.handleError);
	}

	getAllClubMembersById(id: number): Promise<User[]> {
		let options = new RequestOptions({
			method: RequestMethod.Get,
			headers: new Headers({
				'x-access-token': this.userService.getCurrentUserToken()
			}),
		});

		return this.http.request('http://localhost:3000/api/club/get_all_members?club_id=' + id, options)
			.toPromise()
			.then((res) => {
				return res.json().data.members as User[];
			})
			.catch(this.handleError);
	}

	getLatestClubBulletinById(id: number): Promise<ClubBulletin> {
		let options = new RequestOptions({
			method: RequestMethod.Get,
			headers: new Headers({
				'x-access-token': this.userService.getCurrentUserToken()
			}),
		});

		return this.http.request('http://localhost:3000/api/club_bulletin/get_latest_one?club_id=' + id, options)
			.toPromise()
			.then((res) => {
				return res.json().data.clubBulletin as ClubBulletin;
			})
			.catch(this.handleError);
	}

	private handleError(err: any): any {
		$.hidePreloader();

		$.alert(err.json().message);
	}
}