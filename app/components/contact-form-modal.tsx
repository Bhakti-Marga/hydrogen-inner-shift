import {useEffect, useRef, useState} from 'react';
import {useFetcher, useLocation, useNavigate} from 'react-router';
import {contactForm, type ContactFormField} from '~/lib/contact-form';
import type {action} from '~/routes/api.contact';
import {Button} from '~/ui';

/** Any link to this href opens the contact form instead of navigating. */
export const CONTACT_FORM_HREF = '#contact-form';

const TITLE_ID = 'contact-form-title';

/**
 * "Start a conversation" form in a native `<dialog>`, in three steps that are
 * validated one at a time and posted together to `/api/contact`. The visible
 * label of the link that opened it is sent as `source`.
 */
export function ContactFormModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const stepRefs = useRef<(HTMLFieldSetElement | null)[]>([]);
  const {pathname} = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [source, setSource] = useState('');
  const [step, setStep] = useState(0);
  // A fresh fetcher per submitted form, so reopening starts over.
  const [round, setRound] = useState(0);
  const fetcher = useFetcher<typeof action>({key: `contact-form-${round}`});

  const steps = contactForm.steps;
  const lastStep = steps.length - 1;
  const sending = fetcher.state !== 'idle';
  const sent = fetcher.data?.ok === true;
  const failed = !sending && fetcher.data?.ok === false;

  useEffect(() => {
    if (sent) void navigate('/confirmation');
  }, [navigate, sent]);

  const failureMessage = fetcher.data?.ok === false ? fetcher.data.message : '';

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }
      const link = event.target.closest(`a[href="${CONTACT_FORM_HREF}"]`);
      if (!link) return;
      event.preventDefault();
      setSource(linkLabel(link));
      setOpen(true);
    };

    document.addEventListener('click', onClick);
    if (window.location.hash === CONTACT_FORM_HREF) setOpen(true);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
    const target = sent
      ? dialog.querySelector<HTMLElement>('[data-contact-done]')
      : stepRefs.current[step]?.querySelector<HTMLElement>('input, select');
    target?.focus();
  }, [open, step, sent]);

  const handleClose = () => {
    setOpen(false);
    if (window.location.hash === CONTACT_FORM_HREF) {
      const {pathname: path, search} = window.location;
      window.history.replaceState(window.history.state, '', path + search);
    }
    if (sent) {
      formRef.current?.reset();
      setStep(0);
      setRound((value) => value + 1);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const controls = Array.from(
      stepRefs.current[step]?.elements ?? [],
    ) as HTMLInputElement[];
    const invalid = controls.find((control) => !control.checkValidity());
    if (invalid) {
      invalid.reportValidity();
      return;
    }
    if (step < lastStep) {
      setStep(step + 1);
      return;
    }
    void fetcher.submit(event.currentTarget, {
      method: 'post',
      action: contactForm.endpoint,
    });
  };

  return (
    // The backdrop is part of the dialog box, so a click that lands on the
    // dialog itself (not the card) is a click outside the form.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={dialogRef}
      aria-labelledby={TITLE_ID}
      onClose={handleClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto bg-abyss/43 p-4 opacity-0 backdrop-blur-lg transition-[opacity,display,overlay] transition-discrete duration-base ease-out-soft open:flex open:opacity-100 starting:open:opacity-0 motion-reduce:transition-none backdrop:bg-transparent"
    >
      <div className="relative m-auto w-full max-w-154.75 rounded-card bg-white px-6 pt-10 pb-8 text-ink sm:px-9.25 sm:pt-12">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={contactForm.closeLabel}
          title={contactForm.closeLabel}
          className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-full text-flint transition-colors duration-fast hover:text-ink focus-visible:outline-2 focus-visible:outline-cobalt"
        >
          ✕
        </button>

        <h2 id={TITLE_ID} className="pr-8 text-form-title font-medium">
          {sent ? contactForm.success.title : contactForm.title}
        </h2>
        <p className="mt-1.5 text-form-lead text-ink/60">
          {sent ? contactForm.success.description : contactForm.description}
        </p>

        <div aria-hidden className="mt-7 flex gap-1.5">
          {steps.map((item, index) => (
            <span
              key={item.id}
              className={`h-1 flex-1 rounded-full transition-colors duration-base ${sent || index <= step ? 'bg-cobalt' : 'bg-ink/10'}`}
            />
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          {sent
            ? contactForm.success.title
            : `Step ${step + 1} of ${steps.length}`}
        </p>

        <form
          ref={formRef}
          noValidate
          onSubmit={handleSubmit}
          aria-labelledby={TITLE_ID}
          hidden={sent}
          className="mt-8"
        >
          <input type="hidden" name="source" value={source} />
          <input type="hidden" name="page" value={pathname} />
          {/* Honeypot: left empty by people, filled by bots. BhaktiHub drops
              a submission when this is non-empty and still answers ok. */}
          <div
            aria-hidden
            className="absolute -left-[9999px] h-0 overflow-hidden"
          >
            <input
              type="text"
              name={contactForm.relay.honeypot}
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>

          {steps.map((item, index) => (
            <fieldset
              key={item.id}
              ref={(element) => {
                stepRefs.current[index] = element;
              }}
              hidden={index !== step}
              className="grid min-w-0 gap-x-5.75 gap-y-5.5 sm:grid-cols-2"
            >
              {item.fields.map((field) => (
                <FormField key={field.name} field={field} />
              ))}
            </fieldset>
          ))}

          {failed ? (
            <p role="alert" className="mt-6 text-form-lead text-ember">
              {failureMessage || contactForm.errorMessage}
            </p>
          ) : null}

          <div className="mt-8 flex items-center gap-4">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2.5 px-2.25 text-link font-bold text-flint transition-colors duration-fast hover:text-ink focus-visible:outline-2 focus-visible:outline-cobalt"
              >
                <img
                  src="/icons/arrow-right-muted.svg"
                  alt=""
                  width="10.9345"
                  height="9.375"
                  className="-scale-x-100"
                />
                {contactForm.backLabel}
              </button>
            ) : null}
            <Button
              type="submit"
              size="form"
              disabled={sending}
              className="ml-auto"
            >
              <span className="flex-1 text-center">
                {steps[step].submitLabel}
              </span>
              <img
                src="/icons/arrow-right.svg"
                alt=""
                width="10.9345"
                height="9.375"
              />
            </Button>
          </div>
        </form>

        {sent ? (
          <div className="mt-8 flex justify-end">
            <Button
              data-contact-done
              size="form"
              onClick={() => setOpen(false)}
            >
              <span className="flex-1 text-center">
                {contactForm.closeLabel}
              </span>
            </Button>
          </div>
        ) : null}
      </div>
    </dialog>
  );
}

/** Skips `aria-hidden` copies, such as the header pill's width-sizing labels. */
function linkLabel(link: Element) {
  const parts: string[] = [];
  const walk = (node: Node) => {
    if (node instanceof Element && node.getAttribute('aria-hidden') === 'true') {
      return;
    }
    if (node.nodeType === Node.TEXT_NODE) {
      parts.push(node.textContent ?? '');
      return;
    }
    for (const child of node.childNodes) walk(child);
  };
  walk(link);
  return parts.join('').replace(/\s+/g, ' ').trim();
}

const inputClasses =
  'h-12.25 w-full rounded-field border border-fog bg-chalk px-4.5 text-field text-ink transition-colors duration-fast placeholder:text-flint focus:border-cobalt focus:ring-1 focus:ring-cobalt focus:outline-none';

function FormField({field}: {field: ContactFormField}) {
  const span = field.half ? '' : 'sm:col-span-2';

  if (field.type === 'checkboxes' || field.type === 'radio') {
    return (
      <fieldset className={`min-w-0 not-first:mt-4.5 ${span}`}>
        <legend className="text-label font-medium">{field.label}</legend>
        {field.type === 'checkboxes' ? (
          <div className="mt-2.25 flex flex-wrap gap-x-1.5 gap-y-2.25">
            {field.options.map((option) => (
              <label
                key={option.value}
                className="flex h-12.25 cursor-pointer items-center rounded-full border border-fog bg-chalk px-5 text-field text-flint transition-colors duration-fast hover:border-flint has-checked:border-ink has-checked:bg-ink has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-cobalt"
              >
                <input
                  type="checkbox"
                  name={field.name}
                  value={option.value}
                  className="sr-only"
                />
                {option.label}
              </label>
            ))}
          </div>
        ) : (
          <div className="mt-2.25 flex flex-col gap-3">
            {field.options.map((option) => (
              <label
                key={option.value}
                className="flex min-h-26 cursor-pointer items-start gap-3.25 rounded-field border border-fog bg-chalk px-2.5 py-5.25 transition-colors duration-fast hover:border-shale has-checked:border-cobalt"
              >
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  required={field.required}
                  className="size-5.5 shrink-0 cursor-pointer appearance-none rounded-full border border-shale bg-white transition-[border] duration-fast checked:border-6 checked:border-cobalt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
                />
                <span className="flex flex-col gap-2">
                  <span className="text-body font-semibold">
                    {option.label}
                  </span>
                  {option.description ? (
                    <span className="text-field text-flint">
                      {option.description}
                    </span>
                  ) : null}
                </span>
              </label>
            ))}
          </div>
        )}
      </fieldset>
    );
  }

  return (
    <label className={`flex flex-col gap-2.25 ${span}`}>
      <span className="text-label font-medium">{field.label}</span>
      {field.type === 'select' ? (
        <span className="relative">
          <select
            name={field.name}
            required={field.required}
            defaultValue=""
            className={`${inputClasses} cursor-pointer appearance-none pr-12 has-[option[value='']:checked]:text-flint`}
          >
            <option value="">{field.placeholder}</option>
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <img
            src="/icons/chevron-down.svg"
            alt=""
            width="14.4055"
            height="8.417"
            className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2"
          />
        </span>
      ) : (
        <input
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          required={field.required}
          maxLength={field.maxLength}
          autoComplete={field.autocomplete}
          className={inputClasses}
        />
      )}
    </label>
  );
}
