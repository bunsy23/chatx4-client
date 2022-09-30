import { Field, Form, Formik } from "formik";
import { useContext } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { RootState } from "../../store";
import { postNewMessage } from "../../utils/api";
import { SocketContext } from "../../utils/context/SocketContext";
import { MessageContentParam } from "../../utils/types";

type MessageInputFieldProps = {
  conversationId: string | undefined;
};

export const MessageInputField = ({
  conversationId,
}: MessageInputFieldProps) => {
  const socket = useContext(SocketContext);
  // const { currentConversationId } = useSelector(
  //   (state: RootState) => state.conversation
  // );
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

  const handleOnKeyDown = () => {
    // socket.emit("onUserTyping", { conversationId: currentConversationId });
  };

  return (
    <div className="flex w-full flex-col">
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
            onKeyDown={handleOnKeyDown}
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
      <div className="ml-4 text-xs">typing...</div>
    </div>
  );
};
