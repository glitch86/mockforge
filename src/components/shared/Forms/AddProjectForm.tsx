"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import useAxios from "@/hooks/axios/useAxios";
import { useDebounce } from "@/hooks/useDebounce";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  title: z
    .string()
    .min(1, "title can't be empty.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z.string(),
  // .min(20, "Description must be at least 20 characters.")
  // .max(100, "Description must be at most 100 characters."),
});

const AddProjectForm = () => {
  const axios = useAxios();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [exists, setExists] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // duplicate checking
  const debouncedTitle = useDebounce(title, 500);

  useEffect(() => {
    if (!debouncedTitle.trim()) return;
    const checker = async () => {
      const res = await axios.get(
        `/check-duplicate?title=${encodeURIComponent(debouncedTitle)}&type=project`,
      );

      setExists(res.data.exists);
      console.log(res.data)
    };

    checker();
  }, [debouncedTitle, axios]);

  // form submit
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // console.log(data);
    setLoading(true);
    const { title, description } = data;
    const projectID = title
    .trim()
    .toLocaleLowerCase()
    .replace(/\s+/g, "-");
    const res = await axios.post("/add-projects", { title, description, projectID });

    console.log("server res", res.data);
    toast.success("Project Created.");
    router.push(`projects/${projectID}`);
  };

  return (
    <form id="add-project" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* title */}
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="project-title">Project Title</FieldLabel>
              <Input
                {...field}
                id="project-title"
                aria-invalid={fieldState.invalid}
                placeholder="Aa..."
                autoComplete="off"
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value);
                  setTitle(value);
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              {exists && (
                <FieldError
                  errors={[
                    { message: "A project with this title already exists." },
                  ]}
                ></FieldError>
              )}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="project-description">Description</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  id="project-description"
                  placeholder="Write Description for project. (Optional)"
                  rows={6}
                  className="min-h-24 resize-none"
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {field.value.length}/100 characters
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription>
                Include steps to reproduce, expected behavior, and what actually
                happened.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        type="submit"
        form="add-project"
        disabled={loading || exists ? true : false}
      >
        Submit
      </Button>
    </form>
  );
};

export default AddProjectForm;
