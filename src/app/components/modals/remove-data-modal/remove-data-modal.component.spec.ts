import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveDataModalComponent } from './remove-data-modal.component';

describe('RemoveDataModalComponent', () => {
  let component: RemoveDataModalComponent;
  let fixture: ComponentFixture<RemoveDataModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveDataModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoveDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
