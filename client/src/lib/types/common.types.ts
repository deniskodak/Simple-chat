import { FieldInputProps, FormikProps } from "formik";

export interface Message {
    user: string;
    id: string;
    text: string;
}

export interface MessageListProps {
    messages: Message[];
    user: string;
}

export interface MessageRowProps {
    message: Message;
    user: string;
}

export interface MessageInputProps {
    onSend: (text: string) => void
}

export interface ChatProps {
    user: string;
}

export interface LoginFormProps {
    onLogin: (user: string) => void;   
}

export interface LoginFormValues {
    username: string;
    password: string;
    confirmPassword?: string;
}

export interface LoginFieldProps {
    isPassword?: boolean;
    label: string;
    field: FieldInputProps<any>;
    form: FormikProps<LoginFormProps>
}

export interface NavBarProps {
    user: string;
    onLogout: () => void;
}