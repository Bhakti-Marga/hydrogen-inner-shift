import spec from './contact-form.json';

export type ContactFormOption = {
  value: string;
  label: string;
  description?: string;
};

type BaseField = {
  name: string;
  label: string;
  description?: string;
  required: boolean;
  /** Sits beside the next half-width field from `sm` up. */
  half?: boolean;
};

type TextField = BaseField & {
  placeholder: string;
  maxLength: number;
  autocomplete?: string;
} & ({type: 'text'} | {type: 'email'});

type SelectField = BaseField & {
  type: 'select';
  placeholder: string;
  options: ContactFormOption[];
};

type ChoiceField = BaseField & {
  options: ContactFormOption[];
} & ({type: 'checkboxes'} | {type: 'radio'});

export type ContactFormField = TextField | SelectField | ChoiceField;

export type ContactFormSpec = {
  id: string;
  title: string;
  description: string;
  endpoint: string;
  relay: {url: string; renames: Record<string, string>; honeypot: string};
  steps: {id: string; submitLabel: string; fields: ContactFormField[]}[];
  hiddenFields: {name: string; description: string; maxLength: number}[];
  backLabel: string;
  closeLabel: string;
  success: {title: string; description: string};
  errorMessage: string;
};

export type ContactSubmission = Record<string, string | string[]>;

/** Field definitions shared by the contact modal and `/api/contact`. */
export const contactForm = spec as ContactFormSpec;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Checks posted form data against `contactForm` and returns only the known
 * fields, so unexpected keys never reach the CRM.
 */
export function parseContactSubmission(
  formData: FormData,
):
  | {ok: true; data: ContactSubmission}
  | {ok: false; errors: Record<string, string>} {
  const data: ContactSubmission = {};
  const errors: Record<string, string> = {};

  for (const field of contactForm.steps.flatMap((step) => step.fields)) {
    const values = formData
      .getAll(field.name)
      .map((value) => (typeof value === 'string' ? value.trim() : ''))
      .filter(Boolean);

    if (values.length === 0) {
      if (field.required) errors[field.name] = 'Required';
      continue;
    }

    if (field.type === 'text' || field.type === 'email') {
      const [value] = values;
      if (value.length > field.maxLength) errors[field.name] = 'Too long';
      else if (field.type === 'email' && !EMAIL_PATTERN.test(value)) {
        errors[field.name] = 'Invalid email';
      } else data[field.name] = value;
      continue;
    }

    const allowed = new Set(field.options.map((option) => option.value));
    if (!values.every((value) => allowed.has(value))) {
      errors[field.name] = 'Unknown option';
    } else if (field.type === 'checkboxes') data[field.name] = values;
    else data[field.name] = values[0];
  }

  for (const field of contactForm.hiddenFields) {
    const value = formData.get(field.name);
    if (typeof value === 'string' && value.trim()) {
      data[field.name] = value.trim().slice(0, field.maxLength);
    }
  }

  return Object.keys(errors).length > 0
    ? {ok: false, errors}
    : {ok: true, data};
}

/**
 * Shape BhaktiHub expects: form values under the CRM field names, plus the
 * honeypot, which is always forwarded (filled in means a bot).
 */
export function toCrmValues(
  data: ContactSubmission,
  honeypot: string,
): ContactSubmission {
  const values: ContactSubmission = {};
  for (const [name, value] of Object.entries(data)) {
    values[contactForm.relay.renames[name] ?? name] = value;
  }
  values[contactForm.relay.honeypot] = honeypot;
  return values;
}
