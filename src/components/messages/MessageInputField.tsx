import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { postNewMessage } from "../../utils/api";
import { MessageContentParam } from "../../utils/types";

type MessageInputFieldProps = {
  conversationId: string | undefined;
};

export const MessageInputField = ({
  conversationId,
}: MessageInputFieldProps) => {
  const messageInitialValue = { content: "" };

  const messageValidationSchema = Yup.object({
    content: Yup.string().required("Message is empty"),
  });

  const handleOnMessageSubmit = async (
    data: MessageContentParam,
    { resetForm }: any
  ) => {
    try {
      if (conversationId) {
        await postNewMessage({
          conversationId: parseInt(conversationId),
          content: data.content,
        });

        resetForm();
      }
    } catch (err) {
      console.log({ err });
    }
  };

  const handleMessageReset = () => {};

  return (
    <Formik
      initialValues={messageInitialValue}
      validationSchema={messageValidationSchema}
      onSubmit={handleOnMessageSubmit}
    >
      <Form className="flex w-full justify-between">
        <Field
          id="content"
          name="content"
          type="text"
          placeholder="Type something..."
          autoComplete="off"
          className="mx-2 h-full w-full p-2 outline-none"
        />
        <button
          type="submit"
          onClick={handleMessageReset}
          className="mx-10 w-20 flex-none rounded-lg bg-black text-white"
        >
          Send
        </button>
      </Form>
    </Formik>
  );
};
