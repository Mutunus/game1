// CORE
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// COMPONENTS
import { AppComponent } from './app.component';
import { Menu } from './components/menu/menu.component';
import { CreateUnit } from './components/create-unit/create-unit.component';
import { BattleBoard } from './components/battle-board/battle-board.component';
import { About } from './components/about/about.component';
import { CreateArmy } from './components/create-army/create-army.component';
import { BattleSetup } from './components/battle-setup/battle-setup.component';
import { TopBar } from './components/top-bar/top-bar.component';
import { AppSettings } from './components/settings/settings.component';
import { BattleDeployment } from './components/deployment/deployment.component';
import { UnitToolTip } from './components/unit-tooltip/unit-tooltip.component';

// SERVICES
import { FormatService } from './services/format.service';
import { BattleEventsService } from './services/battle-events.service';
import { InitService } from './services/init.service';
import { IndexDBService } from './services/indexDB.service';
import { DebugService } from './services/debug.service';
import { ArmyService } from './services/army.service';
import { StoreService } from './services/store.service';
import { LocalStorageService } from './services/localStorage.service';

// LIBRARIES
import { StoreModule } from '@ngrx/store';
import { MaterialLibraryModule } from './libraries/material.module';
import { DragulaService, DragulaModule } from 'ng2-dragula/ng2-dragula';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// CONFIG
import { Routing } from './app.routing';

// REDUCERS
import { data } from './reducers/main.reducer';

@NgModule({
	declarations: [
		AppComponent,
		Menu,
		About,
		BattleBoard,
		CreateArmy,
		CreateUnit,
		BattleSetup,
		TopBar,
		BattleDeployment,
		AppSettings,
		UnitToolTip
	],
	imports: [
		MaterialLibraryModule,
		BrowserModule,
		Routing,
		ReactiveFormsModule,
		FormsModule,
		DragulaModule,
		NgbModule.forRoot(),
		StoreModule.forRoot({
			data
		})
	],
	providers: [
		DragulaService,
		FormatService,
		InitService,
		BattleEventsService,
		IndexDBService,
		DebugService,
		ArmyService,
		StoreService,
		LocalStorageService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
