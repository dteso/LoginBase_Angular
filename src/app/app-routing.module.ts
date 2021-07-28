import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './routing/guards/auth.guard';
import { HomeResolver } from './routing/resolvers/home.resolver';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then( m => m.LoginModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    resolve: {
      data: HomeResolver
    },
    loadChildren: () => import('./modules/home/home.module').then( m => m.HomeModule)
  },
  {
    path: '' || '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      //enableTracing: true,
      preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
