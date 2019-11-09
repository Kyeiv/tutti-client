import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAppointemntDialogComponent } from './make-appointemnt-dialog.component';

describe('MakeAppointemntDialogComponent', () => {
  let component: MakeAppointemntDialogComponent;
  let fixture: ComponentFixture<MakeAppointemntDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeAppointemntDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeAppointemntDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
