import {data} from 'react-router';
import type {Route} from './+types/api.contact';
import {
  contactForm,
  parseContactSubmission,
  toCrmValues,
} from '~/lib/contact-form';

const HONEYPOT_MAX = 200;

function failure(status: number, message = '') {
  return data({ok: false as const, message}, {status});
}

export async function action({request, context}: Route.ActionArgs) {
  if (request.method !== 'POST') {
    return failure(405);
  }

  const formData = await request.formData();
  const result = parseContactSubmission(formData);
  if (!result.ok) return failure(400);

  const apiKey = context.env.BHAKTIHUB_FORMS_API_KEY;
  if (!apiKey) {
    console.error('BHAKTIHUB_FORMS_API_KEY is not set');
    return failure(500);
  }

  const honeypot = formData.get(contactForm.relay.honeypot);
  const values = toCrmValues(
    result.data,
    typeof honeypot === 'string' ? honeypot.slice(0, HONEYPOT_MAX) : '',
  );

  let response: Response;
  try {
    response = await fetch(contactForm.relay.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({values}),
    });
  } catch (error) {
    console.error('Contact form relay failed', error);
    return failure(502);
  }

  if (response.ok) return {ok: true as const};

  if (response.status === 400) {
    const body = await response.json().catch(() => null);
    const message =
      body !== null &&
      typeof body === 'object' &&
      'error' in body &&
      typeof body.error === 'string'
        ? body.error
        : '';
    return failure(400, message);
  }

  console.error('Contact form relay rejected', response.status);
  return failure(502);
}
