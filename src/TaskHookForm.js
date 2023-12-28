import React from "react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { nanoid } from "nanoid";

const TaskHookForm = ({ kisiler, submitFn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mode: "onChange",
      id: nanoid(5), // unique bir id oluşturduk
      title: "",
      description: "",
      people: [],
    },
  });

  const onSubmit = (data, a) => {
    submitFn({
      ...data,
      status: "yapılacak",
    });
    a.target.reset();
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          name="title"
          type="text"
          {...register("title", {
            required: "Task başlığı yazmalısınız",
            min: { value: 3, message: "Task başlığı en az 3 karakter olmalı" },
          })}
        />
        {errors.title && <p className="input-error">{errors.title.message}</p>}
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          name="description"
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            min: {
              value: 10,
              message: "Task açıklaması en az 10 karakter olmalı",
            },
          })}
        ></textarea>
        {errors.description && (
          <p className="input-error">{errors.description.message}</p>
        )}
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                {...register("people", {
                  validate: {
                    lessThanTen: (x) =>
                      x.length >= 1 || "Lütfen en az bir kişi seçin",
                    lessThanThree: (y) =>
                      y.length <= 3 || "En fazla 3 kişi seçebilirsiniz",
                  },
                })}
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && (
          <p className="input-error">{errors.people.message}</p>
        )}
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit">
          Kaydet
        </button>
      </div>
    </form>
  );
};

export default TaskHookForm;
