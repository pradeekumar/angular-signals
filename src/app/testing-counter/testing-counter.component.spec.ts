import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingCounterComponent } from './testing-counter.component';

describe('TestingCounterComponent', () => {
  let component: TestingCounterComponent;
  let fixture: ComponentFixture<TestingCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
