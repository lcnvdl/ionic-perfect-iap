import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IonicPerfectIapComponent } from './ionic-perfect-iap.component';

describe('IonicPerfectIapComponent', () => {
  let component: IonicPerfectIapComponent;
  let fixture: ComponentFixture<IonicPerfectIapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonicPerfectIapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IonicPerfectIapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
