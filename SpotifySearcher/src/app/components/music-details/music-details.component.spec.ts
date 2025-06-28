import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicDetailsComponent } from './music-details.component';

describe('MusicDetailsComponent', () => {
  let component: MusicDetailsComponent;
  let fixture: ComponentFixture<MusicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
