import { useState, useCallback, useRef } from "react";
import { Card, Form, FormLayout, Stack, Layout } from "@shopify/polaris";
import { ContextualSaveBar, useNavigate } from "@shopify/app-bridge-react";
import { useAuthenticatedFetch } from "../hooks";
import { useForm, useField } from "@shopify/react-form";
import {
  SubmitHandler,
  FormMapping,
  Field,
} from "@shopify/react-form/build/ts";
import { EditorRef, HtmlEditor } from "./HtmlEditor";
import { Message } from "../../@types/message";

export const MessageForm = (props: { message?: Message }): JSX.Element => {
  const { message: initialMessage } = props;

  const [message, setMessage] = useState<Message>(initialMessage);
  const editorRef = useRef<EditorRef>();
  const maxCharCount = useRef<number>(50);

  const navigate = useNavigate();
  const fetch = useAuthenticatedFetch();

  const onSubmit: SubmitHandler<
    FormMapping<{ description: Field<string> }, "value">
  > = useCallback(
    async (body: Message) => {
      console.log("submit", body);
      const id = message?.id;
      const isNew = !id;
      const url = isNew ? "/api/messages" : `/api/messages/${id}`;
      const method = isNew ? "POST" : "PATCH";
      const response = await fetch(url, {
        method,
        body: JSON.stringify({ message: body }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        makeClean();
        const responseMessage = await response.json();
        /* if this is a new message, then save it and navigate to the edit page;
           this behavior is the standard when saving resources in the Shopify admin
         */
        if (isNew) {
          navigate(`/messages/${responseMessage.id}`);
          /* if this is a message update, then set the message state in this component */
        } else {
          setMessage(responseMessage);
        }
      }
      return { status: "success" };
    },
    [message]
  );

  const {
    reset,
    submitting,
    submit,
    dirty,
    makeClean,
    fields: { description },
  } = useForm({
    fields: {
      description: useField({
        value: message?.description || "",
        validates: [
          () =>
            !editorRef.current || editorRef.current.isEmpty()
              ? "Please enter a description"
              : undefined,
        ],
      }),
    },
    onSubmit,
  });

  return (
    <Stack vertical>
      <Layout>
        <Layout.Section>
          <Form onSubmit={submit}>
            <ContextualSaveBar
              saveAction={{
                onAction: submit,
                loading: submitting,
                disabled: submitting,
              }}
              discardAction={{
                onAction: reset,
                loading: submitting,
                disabled: submitting,
              }}
              visible={dirty}
              fullWidth
            />
            <FormLayout>
              <Card sectioned title="Description">
                <HtmlEditor
                  ref={editorRef}
                  maxCharCount={maxCharCount.current}
                  {...description}
                />
              </Card>
            </FormLayout>
          </Form>
        </Layout.Section>
      </Layout>
    </Stack>
  );
};
