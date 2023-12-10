/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** Represents Message fields */
export type Message = {
  __typename?: 'Message';
  chatId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

/** Represents all available mutations */
export type Mutation = {
  __typename?: 'Mutation';
  addMessage?: Maybe<Message>;
};


/** Represents all available mutations */
export type MutationAddMessageArgs = {
  chatId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};

/** Represents all available queries */
export type Query = {
  __typename?: 'Query';
  messages?: Maybe<Array<Message>>;
  users?: Maybe<Array<User>>;
};


/** Represents all available queries */
export type QueryMessagesArgs = {
  chatId: Scalars['ID']['input'];
};

/** Represents all available subscriptions */
export type Subscription = {
  __typename?: 'Subscription';
  messageAdded?: Maybe<Message>;
};


/** Represents all available subscriptions */
export type SubscriptionMessageAddedArgs = {
  chatId: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type MessagesQueryQueryVariables = Exact<{
  chatId: Scalars['ID']['input'];
}>;


export type MessagesQueryQuery = { __typename?: 'Query', messages?: Array<{ __typename?: 'Message', id: string, userId: string, text: string, chatId: string }> | null };

export type UsersQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQueryQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: string, username: string }> | null };

export type AddMessageMutationMutationVariables = Exact<{
  text: Scalars['String']['input'];
  chatId: Scalars['ID']['input'];
}>;


export type AddMessageMutationMutation = { __typename?: 'Mutation', message?: { __typename?: 'Message', id: string, userId: string, text: string, chatId: string } | null };

export type MessageAddedSubscriptionSubscriptionVariables = Exact<{
  chatId: Scalars['String']['input'];
}>;


export type MessageAddedSubscriptionSubscription = { __typename?: 'Subscription', message?: { __typename?: 'Message', id: string, userId: string, text: string, chatId: string } | null };


export const MessagesQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MessagesQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}}]}}]}}]} as unknown as DocumentNode<MessagesQueryQuery, MessagesQueryQueryVariables>;
export const UsersQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UsersQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<UsersQueryQuery, UsersQueryQueryVariables>;
export const AddMessageMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddMessageMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"message"},"name":{"kind":"Name","value":"addMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}}]}}]}}]} as unknown as DocumentNode<AddMessageMutationMutation, AddMessageMutationMutationVariables>;
export const MessageAddedSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MessageAddedSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"message"},"name":{"kind":"Name","value":"messageAdded"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}}]}}]}}]} as unknown as DocumentNode<MessageAddedSubscriptionSubscription, MessageAddedSubscriptionSubscriptionVariables>;