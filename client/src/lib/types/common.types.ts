import { FieldInputProps, FormikProps } from "formik";
import { User } from "../../generated/graphql";

export interface Message {
    userId: string;
    id: string;
    text: string;
    chatId: string;
}

export interface MessageListProps {
    messages: Message[];
    user: User;
    receiver: User;
}

export interface MessageRowProps extends Omit<MessageListProps, 'messages'> {
    message: Message;
}

export interface MessageInputProps {
    onSend: (text: string) => void
}

export interface ChatProps {
    user: User;
}

export interface LoginFormProps {
    onLogin: (user: User) => void;   
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
    user: User;
    onLogout: () => void;
}

export interface UserListProps {
    onUserSelect: (user: User) => void;
    selectedUserId: string;
}