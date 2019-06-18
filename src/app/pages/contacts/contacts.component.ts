import { mapStyle } from './mapStyle';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from 'app/core/shared/layouts/layout-components/header/header.service';
import { PageService, PageType } from '@osd-services/page.service';
import { SeoService } from '@osd-services/seo.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '@osd-services/api.service';
import { untilDestroyed } from '@osd-rxjs/operators';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public mapStyle = mapStyle;
  public pageContent: any;

  constructor(
    private _header: HeaderService,
    private _page: PageService,
    private _seo: SeoService,
    private _fb: FormBuilder,
    private _api: ApiService
  ) { }

  ngOnInit() {
    this._header.setTitle('Контакты');
    this._page.contentUpdate$.pipe(
      untilDestroyed(this)
    ).subscribe(() => {
      this.pageContent = null;
      this._page.loadPageBySlug('contacts').subscribe((e: PageType) => {
        this._seo.updateTags(e.acf);
        this.pageContent = e;
      })
    })
    this._initForm();
  }

  private _initForm() {
    this.form = this._fb.group({
      question: '',
      direction1: '',
      direction2: ''
    });
  }

  get question() {
    return this.form.get('question');
  }

  get direction1() {
    return this.form.get('direction1');
  }

  get direction2() {
    return this.form.get('direction2');
  }

  sendEmail() {
    const data = {
      'contact': {
        'question': this.question.value
      }
    };

    if (this.direction1.value) {
      data['contact']['direction1'] = 'МОНЕТИЗАЦИЯ БАЗ ДАННЫХ';
    }
    if (this.direction2.value) {
      data['contact']['direction2'] = 'МАРКЕТИНГОВЫЕ КОММУНИКАЦИИ 360°, PR И МЕРОПРИЯТИЯ.';
    }

    this._api.post('/contact/send', data).subscribe(res => {
      console.log(res);

      // this._toastMessage.success('Message was send');
      this.form.reset();
      }, error => {
        // this._form.backendErrors(error.error.errors, this.form);
        console.log(error.errors, this.form);
      }
    );
  }

  ngOnDestroy(): void {
    this._header.setTitle('');
  }

}
