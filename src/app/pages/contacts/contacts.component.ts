import { mapStyle } from './mapStyle';
import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { HeaderService } from 'app/core/shared/layouts/layout-components/header/header.service';
import { PageService, PageType } from '@osd-services/page.service';
import { SeoService } from '@osd-services/seo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@osd-services/api.service';
import { untilDestroyed } from '@osd-rxjs/operators';
import { ReCaptcha2Component } from 'app/core/shared/components/recapcha/components/recaptcha-2.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public mapStyle = mapStyle;
  public pageContent: any;
  public emailSuccess: boolean = null;
  public sending: boolean = null;

  public zoom = 15;

  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;

  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'en';
  public type: 'image' | 'audio';
  public useGlobalDomain: boolean = false;

  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;

  constructor(
    private _header: HeaderService,
    private _page: PageService,
    private _seo: SeoService,
    private _fb: FormBuilder,
    private _api: ApiService,
    private _cdr: ChangeDetectorRef
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
      direction2: '',
      recaptcha: ['', Validators.required]
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

    this.sending = true;
    this._api.post('/contact/send', data).subscribe(res => {
      this.emailSuccess = true;
      setTimeout(() => {
        this.emailSuccess = false;
        this.sending = false;
      }, 2000);
      this.form.reset();
      }, error => {
        console.log(error.errors, this.form);
      }
    );
  }

  zoomIn() {
    if (this.zoom < 20) {
      this.zoom ++;
    }
  }

  zoomOut() {
    if (this.zoom > 1) {
      this.zoom --;
    }
  }

  handleReset(): void {
    this.captchaSuccess = false;
    this.captchaResponse = undefined;
    this.captchaIsExpired = false;
    this._cdr.detectChanges();
  }

  handleSuccess(captchaResponse: string): void {
    setTimeout(() => {
      this.captchaSuccess = true;
      this.captchaResponse = captchaResponse;
      this.captchaIsExpired = false;
      this._cdr.detectChanges();
    }, 1000);
  }

  handleLoad(): void {
    this.captchaIsLoaded = true;
    this.captchaIsExpired = false;
    this._cdr.detectChanges();
  }

  handleExpire(): void {
    this.captchaSuccess = false;
    this.captchaIsExpired = true;
    this._cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this._header.setTitle('');
  }

}
