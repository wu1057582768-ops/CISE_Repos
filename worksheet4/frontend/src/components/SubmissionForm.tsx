import React from "react";
import { useForm } from "react-hook-form";

interface FormData {
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  linked_discussion: string;
}

export default function SubmissionForm() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(JSON.stringify(data));
    // 这里可以添加实际的提交逻辑
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} placeholder="Title" />
      <p>
        <input {...register("authors")} placeholder="Authors" />
      </p>
      <p>
        <input {...register("source")} placeholder="Source" />
      </p>
      <p>
        <input {...register("pubyear")} placeholder="Publication Year" />
      </p>
      <p>
        <input {...register("doi")} placeholder="DOI" />
      </p>

      <select {...register("linked_discussion")}>
        <option value="">Select SE practice...</option>
        <option value="TDD">TDD</option>
        <option value="Mob Programming">Mob Programming</option>
      </select>
      <input type="submit" />
    </form>
  );
}