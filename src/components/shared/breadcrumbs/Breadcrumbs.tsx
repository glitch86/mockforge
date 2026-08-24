"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  // const
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator></BreadcrumbSeparator>

        {segments.map((segment, index) => {
          return (
            <div key={index} className="flex justify-center items-center">
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${segment}`}>{segment}</BreadcrumbLink>
              </BreadcrumbItem>
              {index + 1 === segments.length ? (
                ""
              ) : (
                <BreadcrumbSeparator></BreadcrumbSeparator>
              )}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
