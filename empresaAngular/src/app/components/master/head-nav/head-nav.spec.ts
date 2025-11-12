import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadNav } from './head-nav';

describe('HeadNav', () => {
  let component: HeadNav;
  let fixture: ComponentFixture<HeadNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadNav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
