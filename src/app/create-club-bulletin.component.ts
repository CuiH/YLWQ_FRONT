/**
 * Created by CuiH on 2017/3/31.
 */

import {Component, OnInit} from "@angular/core";
import { Location }               from '@angular/common';
import {Router, ActivatedRoute, Params} from "@angular/router";

import {UserService} from "./user.service";
import {Club} from "./club";
import {ClubBulletin} from "./club-bulletin";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ClubBulletinService} from "./club-bulletin-service";

import "zepto";
import "sm";

declare let $: any;


@Component({
	selector: 'create-club-bulletin',
	templateUrl: './create-club-bulletin.component.html',
	styleUrls: ['./create-club-bulletin.component.css'],
	providers: [ClubBulletinService]
})
export class CreateClubBulletinComponent implements OnInit {

	private clubBulletinForm: FormGroup;

	private clubBulletin: ClubBulletin;

	private createClubBulletinButtonText = "发布";

	private published = false;

	constructor(
		private userService: UserService,
		private formBuilder: FormBuilder,
		private clubBulletinService: ClubBulletinService,
		private activatedRoute: ActivatedRoute,
		private location: Location,
		private router: Router,
	) {

	}

	ngOnInit(): void {
		if (!this.userService.isLoggedIn()) {
			this.router.navigate(['/log_in']);

			return;
		}

		$.init();

		this.buildForm();
	}

	private buildForm(): void {
		this.clubBulletinForm = this.formBuilder.group({
			title: ["", [
				Validators.required,
				Validators.minLength(1),
				Validators.maxLength(30),
			]],
			content: ["", [
				Validators.required,
				Validators.minLength(1),
				Validators.maxLength(200),
			]]
		});
	}

	private onSubmit(): void {
		this.createClubBulletinButtonText = "发布中...";

		if (this.validateForm()) {
			const clubBulletinObject = this.clubBulletinForm.value as ClubBulletin;

			this.activatedRoute.params
				.switchMap((params: Params) => {
					clubBulletinObject.club_id = +params['club_id'];

					return this.clubBulletinService.createClubBulletin(clubBulletinObject)
				})
				.subscribe(() => {
					$.alert("发布成功！");
					this.published = true;
				});
		}

		this.createClubBulletinButtonText = "发布";
	}

	private validateForm(): boolean {
		if (!this.clubBulletinForm) return;

		const form = this.clubBulletinForm;

		for (const field in this.formFields) {
			const control = form.get(field);
			if (control && !control.valid) {
				const messages = this.validationMessages[field];
				for (const key in control.errors) {
					$.alert(messages[key]);

					return false;
				}
			}
		}

		return true;
	}

	private goBack(): void {
		this.location.back();
	}

	formFields = {
		title: '',
		content: ''
	};

	validationMessages = {
		title: {
			required:      '请输入标题',
			maxLength:     '标题过长',
		},
		content: {
			required:      '请输入内容',
			maxLength:     '内容过长',
		},
	};

}