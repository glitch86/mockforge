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
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(1, "title can't be empty"),
  description: z.string().max(50),
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  json: z.string().min(1, "Invalid JSON"),
});


const AddEndpoints = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      title: "",
      method: "GET",
      description: "",
      json: "",
    },
  });


  const onSubmit = async (data: z.infer<typeof formSchema>) => {
  const json = await JSON.parse(data.json)
  console.log( json);
  toast.success("submitted")
  location.reload()

};


  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      id="add-endpoints"
      className=""
    >

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
                <Select value={field.value} onValueChange={field.onChange} >
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
            )}></Controller>

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
        <div className=" h-full">

        {/* description */}
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex flex-col h-full">
              <FieldLabel htmlFor="description">Descrioption</FieldLabel>
              <InputGroup className="border flex-1">
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}></Controller>
        </div>

      </FieldGroup>

      {/* right */}
      <FieldGroup className="w-75">
        <div className="h-full">
          <Controller
            name="json"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="h-full ">
                <FieldLabel htmlFor="json">Paste JSON here</FieldLabel>
                <InputGroup  className="h-full">
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
            )}></Controller>
        </div>
      </FieldGroup>
      </div>
      <Button type="submit" form="add-endpoints">
        Submit
      </Button>
    </form>
  );
};

export default AddEndpoints;
