/**
 * Created by CuiH on 2017/3/29.
 */

import {Component, OnInit} from "@angular/core";
import { Location }               from '@angular/common';
import {ActivatedRoute, Params} from "@angular/router";

import {ClubService} from "./club.service";
import {Club} from "./club";
import {UserService} from "../user/user.service";
import {CheckingService} from "../checking.service";
import {ClubBulletin} from "../club-bulletin/club-bulletin";
import {ClubMessage} from "../club-message/club-message";
import {ApplicationService} from "../application/application.service";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

import "zepto";
import "sm";


declare let $: any;


@Component({
	selector: 'club-detail',
	templateUrl: './club-detail.component.html',
	styleUrls: ['./club-detail.component.css'],
	providers: [
		ApplicationService
	]
})
export class ClubDetailComponent implements OnInit {

	private club: Club = new Club();

	private isMember = false;
	private loggedIn = false;
	private isAdmin = false;
	private isClicked = false;
	private isLoaded = false;
	private isApplied = "";

	private clubBulletin: ClubBulletin = new ClubBulletin();
	private clubMessages: ClubMessage[] = [];

	private applicationMessage = "";

	private applyButtonText = "发送申请";
	private quitButtonText = "退出该群组";

	constructor(
		private location: Location,
		private activatedRoute: ActivatedRoute,
		private clubService: ClubService,
	    private userService: UserService,
	    private checkingService: CheckingService,
	    private applicationService: ApplicationService
	) {

	}

	ngOnInit(): void {
		$.init();

		this.loggedIn = this.userService.isLoggedIn();

		this.activatedRoute.params
			.switchMap((params: Params) => this.clubService.getClubById(+params['id']))
			.subscribe((club) => {
				this.club = club;

				if (this.userService.isLoggedIn()) {
					this.loggedIn = true;
					this.checkingService.checkUserClubMap(this.userService.getCurrentUserId(), this.club.id)
						.then((result) => {
							this.isMember = result;
							this.isLoaded = true;

							if (this.isMember) {
								this.clubService.getLatestClubBulletinById(this.club.id)
									.then(clubBulletin => this.clubBulletin = clubBulletin);

								this.checkingService.checkUserClubMapAdmin(this.userService.getCurrentUserId(), this.club.id)
									.then(result => this.isAdmin = result);

								this.clubService.getLatestThreeClubMessagesById(this.club.id)
									.then(clubMessages => this.clubMessages = clubMessages);
							} else {
								this.checkingService.checkApplicationUnread(this.userService.getCurrentUserId(), this.club.id).then((result) => {
									if (result) {
										this.isApplied = "disabled";
										this.applyButtonText = "已发送申请";
									}
								});
							}
						})
				}
			});
	}

	private quitClub(): void {
		this.quitButtonText = "处理中...";

		this.activatedRoute.params
			.switchMap((params: Params) => this.clubService.quitClub(+params['id']))
			.subscribe(() => {
				$.alert("退出成功！");

				this.isMember = false;
			});

		this.quitButtonText = "退出该群组";
	}

	private goBack(): void {
		this.location.back();
	}

	private showBriefIntro(): void {
		if (!this.club) return;

		$.alert(this.club.brief_intro, "简介");
	}

	private showForm(): void {
		this.isClicked = true;
	}

	private onApply(): void {
		if (this.applicationMessage.length > 50) {
			$.alert("申请信息过长！");
			this.applyButtonText = "发送申请";

			return;
		}

		this.activatedRoute.params
			.switchMap((params: Params) => this.applicationService.createApplication(+params['id'], this.applicationMessage))
			.subscribe(() => {
				this.applyButtonText = "已发送申请";
				this.isApplied = "disabled";
				$.alert("发送成功");
			});
	}

}
