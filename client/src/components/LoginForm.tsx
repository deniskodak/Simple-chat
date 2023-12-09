import { useCallback, useState } from 'react';
import { auth } from '../lib/auth';
import { LoginFields, LoginFormProps } from '../lib/types';
import { Formik, Form, Field, FormikState } from 'formik';
import * as Yup from 'yup';

const INITIAL_FORM_STATE = { username: '', password: '', confirmPassword: '' };

const SIGN_IN_SCHEMA = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Username is too short!')
    .max(50, 'Username is too long!')
    .required('Username is required'),
  password: Yup.string()
    .min(5, 'Password is too short!')
    .required('Password is required'),
});

const SIGN_UP_SCHEMA = SIGN_IN_SCHEMA.concat(Yup.object().shape({confirmPassword: Yup.string().required("Confirm password is required")
  .oneOf([Yup.ref('password'), null], 'Passwords must match')}))

const FieldDangerHelp = ({ text }: { text: string}) => {
  return <div className="help is-danger is-medium">{text}</div>
}

const FieldTextInput = ({ field, form, label, isPassword }) => (
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


function LoginForm({ onLogin }: LoginFormProps) {
  const [error, setError] = useState<string>('');
  const [signUpMode, setSignUpMode] = useState(true);
  let resetForm = (nextState?: Partial<FormikState<LoginFields>>) => {}
  
  const parseError = useCallback((error: string) => {
    const errors = {
      'Unauthorized': 'User doesn`t exist',
      'Conflict': "User already exists"
    }

    return errors[error] ? errors[error] : 'Unhandled error appears'
  }, [])

  const handleSubmit = async ({ username, password }: LoginFields): Promise<void> => {
    setError('');
    try{ 
      const user: string = await auth(username, password, signUpMode);
      onLogin(user);
    } catch(error) {
      setError(parseError(error.message));
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  };

  const changeMode = (isSignUp) => {
    resetForm();
    setSignUpMode(isSignUp);
  }

  return (
    <section className="section">
      <div className="container">
        <div className="tabs is-large is-boxed">
          <ul>
            <li className={!signUpMode ? '' : 'is-active'} onClick={() => changeMode(true)}><a>Sign up</a></li>
            <li className={signUpMode ? '' : 'is-active'} onClick={() => changeMode(false)}><a>Sign in</a></li>
          </ul>
        </div>

        {error && (<div className="notification is-danger">
         {error} 
        </div>)}
        
        <Formik
          initialValues={INITIAL_FORM_STATE}
          validationSchema={signUpMode ? SIGN_UP_SCHEMA : SIGN_IN_SCHEMA}
          onSubmit={handleSubmit}>
          {({ resetForm: formikReset }) => {
            resetForm = formikReset;

            return (
              <Form>
                <Field name="username" component={FieldTextInput} label='Username'/>
                <Field name="password" component={FieldTextInput} label='Password' isPassword/>
                {signUpMode && <Field name="confirmPassword" component={FieldTextInput} label='Confirm password' isPassword />}
                <button className="button is-info" type="submit">Submit</button>
              </Form>
            )
            }
          }
        </Formik>
      </div>
    </section>
  );
}

export default LoginForm;