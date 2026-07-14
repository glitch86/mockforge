"use client";
import { Button } from "@/components/ui/button";

import {
  Field,
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAxios from "@/hooks/axios/useAxios";
import { useDebounce } from "@/hooks/useDebounce";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  title: z.string().min(1, "title can't be empty"),
  url: z.string().min(1, "must set url"),
  description: z.string().max(50),
  json: z.string(),
});

type Props = {
  projectTitle: string;
};
const AddEndpoints = ({ projectTitle }: Props) => {
  const [method, setMethod] = useState("GET");
  const [route, setRoute] = useState("");
  const [exists, setExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();
  const projectID = projectTitle
    .trim()
    .toLocaleLowerCase()
    .replace(/\s+/g, "-");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      method: "GET",
      title: "",
      url: "",
      description: "",
      json: "",
    },
  });

  // check duplicate
  const debouncedRoute = useDebounce(route, 500);

  useEffect(() => {
    if (!debouncedRoute.trim()) return;
    const checker = async () => {
      const res = await axios.get(
        `/check-duplicate?method=${method}&projectID=${projectID}&route=${encodeURIComponent(debouncedRoute)}&type=endpoint`,
      );

      setExists(res.data.exists);
      console.log(res.data);
    };

    checker();
  }, [debouncedRoute, method, projectID, axios]);

  // submission
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    const path = `/${projectID}${data.url}`;
    const { method, title, description } = data;
    const responseBody = method === "GET" ? await JSON.parse(data.json) : [];

    // responsebody
    const result = await axios.get(
      `/check-duplicate?projectID=${projectID}&route=${encodeURIComponent(path)}&type=responseBody`,
    );

    if (!result.data.exists) {
      const body = await axios.post("/responseBody/add", {
        projectID,
        path,
        responseBody,
      });
      console.log("server res", body);
    }

    // endpoint
    const res = await axios.post("/add-endpoints", {
      method,
      title,
      projectID,
      path,
      description,
    });

    toast.success("submitted");
    location.reload();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} id="add-endpoints">
      <div className="flex gap-5 my-4">
        {/* left  */}
        <FieldGroup className="w-75">
          <div className="flex gap-3">
            {/* method dropdown  */}
            <Controller
              name="method"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="">
                  <FieldLabel htmlFor="">METHOD</FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setMethod(value);
                    }}
                  >
                    <SelectTrigger className="w-fit p-2">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent className="">
                      <SelectGroup>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        {/* <SelectItem value="system">System</SelectItem> */}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            ></Controller>

            {/* title  */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Aa..."
                    autoComplete="off"
                    className=""
                  ></Input>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            ></Controller>
          </div>
          <div className="flex flex-col justify-between h-full">
            {/* url */}
            <Controller
              name="url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="">
                  <FieldLabel htmlFor="url">URL</FieldLabel>

                  <div className="flex items-baseline gap-4">
                    <div className="bg-secondary px-2 py-1 rounded-2xl text-zinc-400">
                      <p className="">/{projectID}</p>
                    </div>
                    <div className="flex-1">
                      <Input
                        {...field}
                        id="url"
                        aria-invalid={fieldState.invalid}
                        placeholder="/url"
                        autoComplete="off"
                        className=""
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value);
                          setRoute(value);
                        }}
                      ></Input>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                      {exists && (
                        <FieldError
                          errors={[
                            {
                              message:
                                "A route with similar method already exists.",
                            },
                          ]}
                        ></FieldError>
                      )}
                    </div>
                  </div>
                </Field>
              )}
            ></Controller>

            {/* description */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="flex flex-col"
                >
                  <FieldLabel htmlFor="description">Descrioption</FieldLabel>
                  <InputGroup className="flex-1">
                    <InputGroupTextarea
                      {...field}
                      id="description"
                      placeholder="(Optional)"
                      rows={3}
                      className="h-full resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/50 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            ></Controller>
          </div>
        </FieldGroup>

        {/* right */}
        <AnimatePresence>
          {method !== "POST" && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <FieldGroup className="w-75">
                <div className="h-full">
                  <Controller
                    name="json"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field className="h-full ">
                        <FieldLabel htmlFor="json">Paste JSON here</FieldLabel>
                        <InputGroup className="h-full">
                          <InputGroupTextarea
                            {...field}
                            id="json"
                            placeholder="{JSON}"
                            rows={10}
                            className="h-64 resize-none"
                            aria-invalid={fieldState.invalid}
                          />
                        </InputGroup>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  ></Controller>
                </div>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    const values = form.getValues();
                    const prompt = `Generate me 10 ${values.url} json for my project ${projectID}`;

                    window.open(
                      `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
                      "_blank",
                    );
                  }}
                >
                  <span>Ask ChatGPT</span>
                </Button>
              </FieldGroup>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Button
        type="submit"
        form="add-endpoints"
        disabled={loading || exists ? true : false}
      >
        Submit
      </Button>
    </form>
  );
};

export default AddEndpoints;
