import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

export const MessageInputField = () => {
  const messageInitialValue = { content: "" };

  const messageValidationSchema = Yup.object({
    content: Yup.string().required("Message is empty"),
  });

  const handleOnMessageSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

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
          className="mx-2 h-full w-full p-2 outline-none"
        />
        <button
          type="submit"
          className="mx-10 w-20 flex-none rounded-lg bg-black text-white"
        >
          Send
        </button>
      </Form>
    </Formik>
  );
};
