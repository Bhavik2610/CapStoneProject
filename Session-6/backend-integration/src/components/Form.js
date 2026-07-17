import { useState } from "react";
import styles from "@/styles/Form.module.css";

// Task 5: A generic, reusable Form.
//
// Props:
//   fields      -> array of field definitions. Each field is an object:
//                  { name, label, type, placeholder, required, options }
//                  - type can be: text, email, password, number, date,
//                    tel, select, textarea.
//                  - options (array of strings) is only used for `select`.
//   onSubmit    -> function called with the collected values object.
//   submitLabel -> text on the submit button (default "Submit").
//
// The component builds its own state automatically from the field names, so
// you never have to write a separate useState for each input. Add a field to
// the array and it just works — that's the whole point of a data-driven form.

export default function Form({ fields = [], onSubmit, submitLabel = "Submit" }) {
  // Build an initial state object like { fullName: "", email: "", ... }
  const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [values, setValues] = useState(initialValues);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(values);
  };

  const renderField = (field) => {
    const shared = {
      id: field.name,
      name: field.name,
      value: values[field.name],
      required: field.required,
      className: styles.input,
      placeholder: field.placeholder,
      onChange: (e) => handleChange(field.name, e.target.value),
    };

    if (field.type === "select") {
      return (
        <select {...shared}>
          <option value="" disabled>
            {field.placeholder ?? "Select an option"}
          </option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "textarea") {
      return <textarea {...shared} rows={3} className={`${styles.input} ${styles.textarea}`} />;
    }

    // Default: any standard <input> type (text, email, password, number, ...)
    return <input {...shared} type={field.type ?? "text"} />;
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className={styles.group}>
          <label className={styles.label} htmlFor={field.name}>
            {field.label}
            {field.required && <span className={styles.req}> *</span>}
          </label>
          {renderField(field)}
        </div>
      ))}

      <button type="submit" className={styles.submit}>
        {submitLabel}
      </button>
    </form>
  );
}
