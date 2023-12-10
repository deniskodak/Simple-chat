import { User } from "../../generated/graphql";

export const generateChatId = (receiver: User, user: User): string => {
    return receiver.id + '-' + user.id
}