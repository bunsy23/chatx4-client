import React, { Dispatch } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { IoCloseOutline } from "react-icons/io5";
import * as Yup from "yup";

type CreateConversationFormProps = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

export const CreateConversationForm = ({
  setShowModal,
}: CreateConversationFormProps) => {
  const createConversationInitialValue = { recipient: "", message: "" };

  const createConversationValidationSchema = Yup.object({
    recipient: Yup.string().required("Recipient is required"),
    message: Yup.string().optional(),
  });

  const handleOnSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  const handleCloseButtonClick = () => {
    setShowModal(false);
  };

  return (
    <div className="flex w-96 max-w-2xl flex-col rounded-2xl border bg-white p-8">
      <div className="flex justify-between">
        <h1 className="mb-4 text-lg font-bold">Create Conversation</h1>
        <IoCloseOutline
          size={24}
          className="hover:cursor-pointer"
          onClick={handleCloseButtonClick}
        />
      </div>
      <Formik
        initialValues={createConversationInitialValue}
        validationSchema={createConversationValidationSchema}
        onSubmit={handleOnSubmit}
      >
        <Form className="flex flex-col gap-y-2">
          <div className="flex w-full cursor-pointer flex-col rounded-xl border p-2">
            <label htmlFor="recipient" className="text-sm">
              Recipient
            </label>
            <Field
              id="recipient"
              name="recipient"
              type="text"
              className="outline-none"
            />
            <div className="text-xs text-red-500">
              <ErrorMessage name="recipient" />
            </div>
          </div>
          <div className="flex w-full cursor-pointer flex-col rounded-xl border p-2">
            <label htmlFor="message" className="text-sm">
              Message (optional)
            </label>
            <Field
              id="message"
              name="message"
              type="text"
              as="textarea"
              rows={5}
              className="resize-none outline-none"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg border bg-gradient-to-r from-indigo-500 to-sky-500 py-2 text-sm font-bold text-white"
          >
            Create Conversation
          </button>
        </Form>
      </Formik>
    </div>
  );
};