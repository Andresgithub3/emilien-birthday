import React, { useState } from 'react';
import { supabase, type RSVPInsert } from '../lib/supabase';

type FormState = {
  name: string;
  party_size: string;
  attending: '' | 'yes' | 'no';
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

type RSVPFormProps = {
  onSuccess: () => void;
};

const RSVPForm: React.FC<RSVPFormProps> = ({ onSuccess }) => {
  const [form, setForm] = useState<FormState>({
    name: '',
    party_size: '',
    attending: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};

    if (!form.name.trim()) {
      errs.name = 'Please enter your name.';
    }

    if (!form.attending) {
      errs.attending = 'Please let us know if you can attend.';
    }

    if (form.attending === 'yes') {
      const size = parseInt(form.party_size, 10);
      if (!form.party_size || isNaN(size) || size < 1 || size > 20) {
        errs.party_size = 'Please enter a valid number between 1 and 20.';
      }
    }

    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const isAttending = form.attending === 'yes';
    const payload: RSVPInsert = {
      name: form.name.trim(),
      party_size: isAttending ? parseInt(form.party_size, 10) : 0,
      attending: isAttending,
      message: form.message.trim() || undefined,
    };

    const { error } = await supabase.from('rsvps').insert(payload);

    if (error) {
      console.error('Supabase insert error:', error);
      setServerError(
        'Something went wrong submitting your RSVP. Please try again or contact us directly.'
      );
      setIsSubmitting(false);
      return;
    }

    onSuccess();
  };

  return (
    <section className="rsvp-section section-container" aria-label="RSVP form">
      <h2 className="rsvp-heading">RSVP</h2>
      <p className="rsvp-subheading">Kindly reply by March 15th, 2026</p>

      <form onSubmit={handleSubmit} noValidate className="rsvp-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Your Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Full name"
            className={`form-input${errors.name ? ' error' : ''}`}
            autoComplete="name"
            disabled={isSubmitting}
          />
          {errors.name && (
            <span className="field-error" role="alert">{errors.name}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="attending" className="form-label">
            Will you be attending?
          </label>
          <select
            id="attending"
            name="attending"
            value={form.attending}
            onChange={handleChange}
            className={`form-select${errors.attending ? ' error' : ''}`}
            disabled={isSubmitting}
          >
            <option value="">Please select...</option>
            <option value="yes">Joyfully accepts</option>
            <option value="no">Regretfully declines</option>
          </select>
          {errors.attending && (
            <span className="field-error" role="alert">{errors.attending}</span>
          )}
        </div>

        {form.attending === 'yes' && (
          <div className="form-group">
            <label htmlFor="party_size" className="form-label">
              Number of guests attending
            </label>
            <input
              id="party_size"
              name="party_size"
              type="number"
              min="1"
              max="20"
              value={form.party_size}
              onChange={handleChange}
              placeholder="e.g. 2"
              className={`form-input${errors.party_size ? ' error' : ''}`}
              disabled={isSubmitting}
            />
            {errors.party_size && (
              <span className="field-error" role="alert">{errors.party_size}</span>
            )}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message for the family{' '}
            <span className="form-label-optional">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Share a warm wish for Natalia..."
            className="form-input"
            rows={3}
            disabled={isSubmitting}
          />
        </div>

        {serverError && (
          <p className="server-error" role="alert">{serverError}</p>
        )}

        <button
          type="submit"
          className="btn-primary rsvp-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send RSVP'}
        </button>
      </form>

      <style>{`
        .rsvp-section { text-align: center; }

        .rsvp-heading {
          font-family: var(--font-script);
          font-size: 2.8rem;
          color: var(--color-primary);
          margin-bottom: 0.3rem;
        }

        .rsvp-subheading {
          font-size: 0.88rem;
          font-style: italic;
          color: var(--color-text-light);
          margin-bottom: 2rem;
          letter-spacing: 0.06em;
        }

        .rsvp-form {
          display: flex;
          flex-direction: column;
          gap: 1.3rem;
          text-align: left;
        }

        .form-label-optional {
          font-size: 0.78rem;
          color: var(--color-text-light);
          font-style: italic;
          text-transform: none;
          letter-spacing: 0;
        }

        textarea.form-input {
          resize: vertical;
          min-height: 80px;
        }

        .server-error {
          padding: 0.8rem 1rem;
          background: rgba(201, 122, 122, 0.08);
          border: 1px solid rgba(201, 122, 122, 0.25);
          border-radius: 8px;
          color: var(--color-error);
          font-size: 0.9rem;
        }

        .rsvp-submit {
          align-self: center;
          margin-top: 0.5rem;
          min-width: 180px;
        }
      `}</style>
    </section>
  );
};

export default RSVPForm;
