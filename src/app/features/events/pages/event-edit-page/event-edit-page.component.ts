import { CommonModule, Location } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import {
  Validators,
  FormGroup,
  FormsModule,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';

import { catchError, EMPTY, finalize, take } from 'rxjs';
import {
  X,
  Save,
  ImageIcon,
  ArrowLeft,
  LucideAngularModule,
} from 'lucide-angular';

import { EventService } from '../../data-access/event.service';
import { AppEvent, EventStatus } from '../../data-access/event.models';

function dateRangeValidator(group: AbstractControl): ValidationErrors | null {
  const start = group.get('startAtLocal')?.value as string | null;
  const end = group.get('endAtLocal')?.value as string | null;

  if (!start || !end) return null;

  return start <= end ? null : { dateRange: true };
}

function isoToLocalInput(iso?: string | null): string {
  if (!iso) return '';

  return iso.substring(0, 16);
}

function localInputToIso(
  local?: string | null,
  offset = '-03:00'
): string | null {
  if (!local) return null;

  const hasSeconds = local.length > 16;
  const base = hasSeconds ? local.substring(0, 19) : `${local}:00`;

  return `${base}${offset}`;
}

@Component({
  selector: 'app-event-edit',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    LucideAngularModule,
  ],
  templateUrl: './event-edit-page.component.html',
})
export class EventEditPageComponent {
  public readonly loading = signal(true);
  public readonly saving = signal(false);
  public readonly id = signal<string>('');
  public readonly error = signal<string | null>(null);

  public readonly icons = {
    cancel: X,
    save: Save,
    back: ArrowLeft,
    image: ImageIcon,
  };

  public form!: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly location: Location,
    private readonly eventsService: EventService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id) {
      this.error.set('ID do evento não informado.');
      this.loading.set(false);
      return;
    }

    this.id.set(id);
    this.loadEvent(id);

    this.form = this.fb.group(
      {
        title: ['', [Validators.required, Validators.maxLength(140)]],
        status: this.fb.nonNullable.control<EventStatus>('inactive', {
          validators: [Validators.required],
        }),
        image: [''],

        category: ['', Validators.required],
        venue: ['', Validators.required],
        city: ['', Validators.required],
        organizer: [''],

        price: [0, [Validators.min(0)]],
        ticketsAvailable: [0, [Validators.min(0)]],

        description: [''],
        target: [''],
        publishedFor: [''],
        readers: [null as number | null, [Validators.min(0)]],

        publishedAtLocal: ['', Validators.required],
        startAtLocal: ['', Validators.required],
        endAtLocal: ['', Validators.required],
      },
      { validators: dateRangeValidator }
    );
  }

  public loadEvent(id: string) {
    this.loading.set(true);
    this.eventsService
      .getById(id)
      .pipe(
        take(1),
        catchError((_) => {
          this.error.set('Não foi possível carregar o evento.');
          return EMPTY;
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe((event) => {
        this.form.patchValue({
          title: event.title,
          status: event.status,
          image: event.image ?? '',
          category: event.category,
          venue: event.venue,
          city: event.city,
          organizer: event.organizer ?? '',
          price: event.price,
          ticketsAvailable: event.ticketsAvailable,
          description: event.description ?? '',
          target: event.target ?? '',
          publishedFor: event.publishedFor ?? '',
          readers: event.readers ?? null,
          endAtLocal: isoToLocalInput(event.endAt),
          startAtLocal: isoToLocalInput(event.startAt),
          publishedAtLocal: isoToLocalInput(event.publishedAt),
        });
      });
  }

  public submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    const patch: Partial<AppEvent> = {
      title: formValue.title!,
      status: formValue.status!,
      image: formValue.image ? formValue.image : null,
      category: formValue.category!,
      venue: formValue.venue!,
      city: formValue.city!,
      organizer: formValue.organizer || '',
      price: Number(formValue.price ?? 0),
      ticketsAvailable: Number(formValue.ticketsAvailable ?? 0),
      description: formValue.description || '',
      target: formValue.target || '',
      publishedFor: formValue.publishedFor || '',
      readers: formValue.readers ?? null,
      publishedAt: localInputToIso(formValue.publishedAtLocal)!,
      startAt: localInputToIso(formValue.startAtLocal)!,
      endAt: localInputToIso(formValue.endAtLocal)!,
    };

    this.saving.set(true);
    this.eventsService
      .update(this.id(), patch)
      .pipe(
        take(1),
        catchError((err) => {
          this.saving.set(false);
          this.error.set('Falha ao salvar. Tente novamente.');

          return EMPTY;
        }),
        finalize(() => this.saving.set(false))
      )
      .subscribe((event) => {
        this.router.navigate(['admin/eventos', event.id]);
      });
  }

  public cancel(): void {
    this.router.navigate(['admin/eventos', this.id()]);
  }

  public back(): void {
    this.location.back();
  }

  public hasError(name: string, err: string): boolean {
    const control = this.form.get(name);

    return !!(control && control.touched && control.hasError(err));
  }
}
