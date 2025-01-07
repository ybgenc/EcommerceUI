import { TestBed } from '@angular/core/testing';
import { ToasterCustomService } from './toaster-custom.service';



describe('ToasterService', () => {
  let service: ToasterCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToasterCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
