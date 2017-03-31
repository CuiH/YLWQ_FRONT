/**
 * Created by CuiH on 2017/3/30.
 */

import {Component, OnInit} from "@angular/core";
import { Location }               from '@angular/common';
import {Router, ActivatedRoute, Params} from "@angular/router";

import {UserService} from "./user.service";

import {Activity} from "./activity";
import {ClubService} from "./club.service";


@Component({
	selector: 'club-activities',
	templateUrl: './club-activities.component.html',
	styleUrls: ['./club-activities.component.css'],
	providers: [ClubService]
})
export class ClubActivitiesComponent implements OnInit {

	private activities: Activity[] = null;

	constructor(
		private clubService: ClubService,
		private activatedRoute: ActivatedRoute,
		private userService: UserService,
		private location: Location,
		private router: Router,
	) {

	}

	ngOnInit(): void {
		if (!this.userService.isLoggedIn()) {
			this.router.navigate(['/log_in']);

			return;
		}

		this.activatedRoute.params
			.switchMap((params: Params) => this.clubService.getAllClubActivitiesById(+params['club_id']))
			.subscribe((activities) => {
				this.activities = activities;
			});
	}

	private goBack(): void {
		this.location.back();
	}

}
