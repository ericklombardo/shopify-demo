import { useState, useCallback, useRef } from "react";
import {
  Banner,
  Card,
  Form,
  FormLayout,
  InlineError,
  TextField,
  Button,
  ChoiceList,
  Select,
  Thumbnail,
  Icon,
  Stack,
  TextStyle,
  Layout,
  EmptyState,
} from "@shopify/polaris";
import {
  ContextualSaveBar,
  ResourcePicker,
  useAppBridge,
  useNavigate,
} from "@shopify/app-bridge-react";
import { ImageMajor, AlertMinor } from "@shopify/polaris-icons";
import { useAuthenticatedFetch, useAppQuery } from "../hooks";
import { useForm, useField, notEmptyString } from "@shopify/react-form";
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
  const appBridge = useAppBridge();
  const fetch = useAuthenticatedFetch();

  const onSubmit: SubmitHandler<
    FormMapping<{ description: Field<string> }, "value">
  > = (body: Message) => {
    console.log("submit", body);
    return Promise.resolve({ status: "success" });
  };

  const isDeleting = false;
  const deleteMessage = () => console.log("delete");

  const {
    reset,
    submitting,
    submit,
    dirty,
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
