import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvoLeafletComponent } from './evo-leaflet.component';

describe('EvoLeafletComponent', () => {
  let component: EvoLeafletComponent;
  let fixture: ComponentFixture<EvoLeafletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvoLeafletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvoLeafletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
