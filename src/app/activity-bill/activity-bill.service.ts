/**
 * Created by CuiH on 2017/4/3.
 */

import {Http, RequestMethod, RequestOptions, Headers} from "@angular/http";
import {Injectable} from "@angular/core";

import 'rxjs/add/operator/toPromise';

import "zepto";
import "sm";
import {ActivityBill} from "./activity-bill";
import {UserService} from "../user/user.service";
import {Challenge} from "../challenge/challenge";

declare let $: any;


@Injectable()
export class ActivityBillService {

	constructor(
		private http: Http,
	    private userService: UserService
	) {
		$.init();
	};

	createActivityBill(activityBill: ActivityBill): Promise<any> {
		let options = new RequestOptions({
			method: RequestMethod.Post,
			headers: new Headers({
				'Content-Type': 'application/json',
				'x-access-token': this.userService.getCurrentUserToken(),
			}),
			body: JSON.stringify(activityBill),
		});

		return this.http.request('http://172.18.43.152:3000/api/activity_bill/create', options)
			.toPromise()
			.then(() => {
				return;
			})
			.catch(this.handleError);
	}

	updateActivityBill(activityBill: ActivityBill): Promise<any> {
		let options = new RequestOptions({
			method: RequestMethod.Post,
			headers: new Headers({
				'Content-Type': 'application/json',
				'x-access-token': this.userService.getCurrentUserToken(),
			}),
			body: JSON.stringify(activityBill),
		});

		return this.http.request('http://172.18.43.152:3000/api/activity_bill/update', options)
			.toPromise()
			.then(() => {
				return;
			})
			.catch(this.handleError);
	}

	finishActivityBill(activityBillId: number): Promise<any> {
		let options = new RequestOptions({
			method: RequestMethod.Post,
			headers: new Headers({
				'x-access-token': this.userService.getCurrentUserToken(),
				'Content-Type': "application/x-www-form-urlencoded"
			}),
			body: 'activity_bill_id=' + activityBillId,
		});

		return this.http.request('http://172.18.43.152:3000/api/activity_bill/finish', options)
			.toPromise()
			.then((res) => {
			})
			.catch(this.handleError);
	}

	getActivityBillById(id: number): Promise<ActivityBill> {
		let options = new RequestOptions({
			method: RequestMethod.Get,
			headers: new Headers({
				'x-access-token': this.userService.getCurrentUserToken(),
			}),
		});

		return this.http.request('http://172.18.43.152:3000/api/activity_bill/' + id, options)
			.toPromise()
			.then((res) => res.json().data.activityBill as ActivityBill)
			.catch(this.handleError);
	}

	getAllChallengesById(id: number): Promise<Challenge[]> {
		let options = new RequestOptions({
			method: RequestMethod.Get,
			headers: new Headers({
				'x-access-token': this.userService.getCurrentUserToken(),
			}),
		});

		return this.http.request('http://172.18.43.152:3000/api/activity_bill/get_all_challenges?activity_bill_id=' + id, options)
			.toPromise()
			.then((res) => res.json().data.challenges as Challenge[])
			.catch(this.handleError);
	}

	private handleError(err: any): any {
		$.hidePreloader();

		$.alert(err.json().message);

		return Promise.reject(err);
	}
}
