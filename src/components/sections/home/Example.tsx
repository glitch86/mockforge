"use client";

import { motion } from "framer-motion";
import Section from "@/components/shared/Section";
import React from "react";

const jsonLines = [
  "{",
  '  "status": "success",',
  '  "data": {',
  '    "users": [',
  '      {',
  '        "id": 1,',
  '        "name": "Alex Rivera",',
  '        "role": "Frontend Engineer",',
  '        "avatar": "{{DATA:IMAGE:IMG_1}}"',
  "      },",
  "      {",
  '        "id": 2,',
  '        "name": "Sarah Chen",',
  '        "role": "UI Designer"',
  "      }",
  "    ],",
  '    "pagination": {',
  '      "total": 42,',
  '      "page": 1',
  "    }",
  "  }",
  "}",
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const line = {
  hidden: {
    opacity: 0,
    x: -12,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
};
const Example = () => {
  return (
    <Section>
      <div>
        {/* header  */}
        <div className="dark:bg-zinc-800 bg-gray-200 px-6 py-3 rounded-t-2xl flex">
          <div className="flex items-center gap-3">
            <div className="size-6 bg-red-500 rounded-full"></div>
            <div className="size-6 bg-yellow-500 rounded-full"></div>
            <div className="size-6 bg-green-500 rounded-full "></div>
          </div>
          <div className=" flex-1">
            <div className="w-fit mx-auto bg-white dark:bg-black px-1 rounded-xl">
              <p className="text-accent/90">
                <span className="font-semibold text-accent">GET</span>{" "}
                api.mockforge.dev/v1/users
              </p>
            </div>
          </div>
        </div>

        {/* body  */}
        <div>
          <div className=" rounded-b-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-sm text-zinc-300">
            <motion.pre
              variants={container}
              initial="hidden"
              animate="visible"
              className="space-y-1"
            >
              {jsonLines.map((lineText, index) => (
                <motion.div
                  key={index}
                  variants={line}
                  className="whitespace-pre"
                >
                  {lineText}
                </motion.div>
              ))}
            </motion.pre>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Example;
