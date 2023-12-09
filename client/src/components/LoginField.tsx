import { LoginFieldProps } from "../lib/types";

const FieldDangerHelp = ({ text }: { text: string}) => {
    return <div className="help is-danger is-medium">{text}</div>
}
  
const FieldTextInput = ({ field, form, label, isPassword }: LoginFieldProps) => (
      <div className="field">
        <label className="label">
          {label}
        </label>
        <div className="control">
          <input name={field.name} className="input" type={isPassword ? 'password' : 'text'}
              value={field.value} onChange={field.onChange}
          />
        </div>
        {form.errors[field.name] && form.touched[field.name] ? (
               <FieldDangerHelp text={form.errors[field.name]} />
             ) : null}
      </div>
)

export default FieldTextInput;