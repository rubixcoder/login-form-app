import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get valid user data', async (inject([HttpClientTestingModule, UserService], (httpClient: HttpClientTestingModule, userService: UserService) => {
    const username = 'MTN_user';
    const password = 'MTN281#^@*';

    userService.login(username, password).subscribe((user) => {
      expect(user).toBeDefined();
      expect(user.firstName).toBeDefined();
      expect(user.lastName).toBeDefined();
    })
  })));
});
