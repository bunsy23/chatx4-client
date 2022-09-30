import React, { Dispatch } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { IoCloseOutline } from "react-icons/io5";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import {
  addConversation,
  createConversationThunk,
} from "../../store/conversationSlice";
import { CreateConversationParams } from "../../utils/types";
import { useNavigate } from "react-router-dom";

type CreateConversationFormProps = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

export const CreateConversationForm = ({
  setShowModal,
}: CreateConversationFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const createConversationInitialValue = { email: "", message: "" };

  const createConversationValidationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleOnSubmit = (data: CreateConversationParams) => {
    dispatch(createConversationThunk(data))
      .unwrap()
      .then((response) => {
        const { id: conversationId } = response.data;

        setShowModal(false);
        navigate(`/conversations/${conversationId}`);
      })
      .catch((err) => console.log({ err }));
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
            <label htmlFor="email" className="text-sm">
              Recipient
            </label>
            <Field
              id="email"
              name="email"
              type="text"
              className="rounded-md outline-none"
            />
            <div className="text-xs text-red-500">
              <ErrorMessage name="email" />
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
              className="resize-none rounded-md outline-none"
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
