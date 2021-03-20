import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatGridListModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
  ],
  providers: [
    {
      provide: "MAT_SNACK_BAR_DEFAULT_OPTIONS",
      useValue: { duration: 3000, verticalPosition: "top" }
    },
    {
      provide: "MAT_DIALOG_DEFAULT_OPTIONS",
      useValue: { width: "80vw", data:null, hasBackdrop: true }
    },
    {
      provide: "MatDialogRef",
      useValue: {}
    },
    {
      provide: "MAT_FORM_FIELD_DEFAULT_OPTIONS",
      useValue: { appearance: "outline" }
    },
  ]
})
export class MaterialsModule { }
