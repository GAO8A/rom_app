import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MainMenuPage, 
         MineralViewPage,
         ListPage,
         ListPopoverPage,
         MapPage,
         DetailViewPage,
         FavouritesPage} from '../pages/pages';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MineralService,
         GlossaryService,
         WorldmapService } from '../providers/providers';
import { GlossaryPipe } from '../pipes/glossary.pipe';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '0b9d03fc'
  }
};

@NgModule({
  declarations: [
    MyApp,
    MainMenuPage,
    MineralViewPage,
    ListPage,
    ListPopoverPage,
    MapPage,
    DetailViewPage,
    FavouritesPage,
    GlossaryPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp),
     CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MainMenuPage,
    MineralViewPage,
    ListPage,
    ListPopoverPage,
    MapPage,
    DetailViewPage,
    FavouritesPage
  ],
  providers: [ MineralService, WorldmapService, GlossaryService,
  {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
