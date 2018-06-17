import { BattleDeployment } from './components/deployment/deployment.component';
import { AppSettings } from './components/settings/settings.component';
import { BattleSetup } from './components/battle-setup/battle-setup.component';
import { CreateArmy } from './components/create-army/create-army.component';
import { CreateUnit } from './components/create-unit/create-unit.component'
import { BattleBoard } from './components/battle-board/battle-board.component'
import { About } from './components/about/about.component'
import { Menu } from './components/menu/menu.component'
import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

const appRoutes: Routes = [
    {
        path: 'menu',
        component: Menu
    },
    {
        path: 'about',
        component: About
    },
    {
        path: 'options',
        component: AppSettings
    },
    {
        path: 'battle',
        children: [
            {
                path: 'setup',
                component: BattleSetup
            },
            {
                path: 'deployment',
                component: BattleDeployment
            },
            {
                path: 'arena',
                component: BattleBoard
            }
        ]
    },
    {
        path: 'armies',
        component: CreateArmy
    },
    {
        path: 'units',
        component: CreateUnit
    },
    {
        path: '**',
        component: Menu
    }
]

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)