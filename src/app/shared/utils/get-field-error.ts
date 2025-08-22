import { FormGroup } from '@angular/forms';

export const getFieldError = (
  formGroup: FormGroup,
  field: string
): string | null => {
  const control = formGroup.get(field);

  if (control && !control.valid && (control.dirty || control.touched)) {
    const errorKey = Object.keys(control.errors || {})[0];
    const errorMessages: { [key: string]: string } = {
      required: `${field} é obrigatório.`,
      minlength: `${field} é muito curto.`,
      maxlength: `${field} é muito longo.`,
      pattern: `${field} é inválido.`,
      email: `${field} deve ser um email válido.`,
    };

    return errorMessages[errorKey] || null;
  }

  return null;
};
