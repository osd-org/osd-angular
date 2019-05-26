import {Injectable} from '@angular/core';
import {BodyService} from '@osd-services/body.service';
import { BaseOCEntityService } from '../../../../modules/open-closed-entity/base/base-o-c-entity.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService extends BaseOCEntityService {

  constructor(
    protected _body: BodyService
  ) {
    super(_body);
  }
}
