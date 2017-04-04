import {NgModule, LOCALE_ID}      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule}   from '@angular/forms';
import {HttpModule}    from '@angular/http';

import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppComponent }        from './app.component';
import { AppRoutingModule }    from "./app-routing.module";
import { UserService }         from "./user.service";
import { LogInComponent }      from "./log-in.component";
import { PageMyComponent }         from "./page-my.component";
import {PageHomeComponent} from "./page-home.component";
import {UserClubsComponent} from "./user-clubs.component";
import {ClubDetailComponent} from "./club-detail.component";
import {CheckingService} from "./checking.service";
import {UserActivitiesComponent} from "./user-activities.component";
import {ActivityDetailComponent} from "./activity-detail.component";
import {ClubActivitiesComponent} from "./club-activities.component";
import {ClubMembersComponent} from "./club-members.component";
import {ActivityParticipantsComponent} from "./activity-participants.component";
import {CreateClubBulletinComponent} from "./create-club-bulletin.component";
import {PageMessagesComponent} from "./page-messages.component";
import {ApplicationDetailComponent} from "./application-detail.component";
import {CreateActivityComponent} from "./create-activity.component";
import {CreateClubComponent} from "./create-club.component";
import {UserDetailComponent} from "./user-detail.component";
import {ClubMessagesComponent} from "./club-messages.component";
import {UpdateUserDetailComponent} from "./update-user-detail.component";
import {CreateActivityBillComponent} from "./create-activity-bill.component";
import {ActivityBillDetailComponent} from "./activity-bill-detail.component";
import {UpdateActivityComponent} from "./update-activity.component";
import {UpdateClubComponent} from "./update-club.component";
import {NewsDetailComponent} from "./news-detail.component";
import {SafeHtmlPipe} from "./safe-html.pipe";


@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRoutingModule,
		ReactiveFormsModule
	],

	declarations: [
		AppComponent,
		LogInComponent,
		PageMyComponent,
		PageHomeComponent,
		UserClubsComponent,
		ClubDetailComponent,
		UserActivitiesComponent,
		ActivityDetailComponent,
		ClubActivitiesComponent,
		ClubMembersComponent,
		ActivityParticipantsComponent,
		CreateClubBulletinComponent,
		PageMessagesComponent,
		ApplicationDetailComponent,
		CreateActivityComponent,
		CreateClubComponent,
		UserDetailComponent,
		ClubMessagesComponent,
		UpdateUserDetailComponent,
		CreateActivityBillComponent,
		ActivityBillDetailComponent,
		UpdateActivityComponent,
		UpdateClubComponent,
		NewsDetailComponent,
		SafeHtmlPipe
	],

	providers: [
		{ provide: LOCALE_ID, useValue: "zh-CN" },
		UserService,
		CheckingService,
		CookieService
	],

	bootstrap: [
		AppComponent
	]

})
export class AppModule { }
