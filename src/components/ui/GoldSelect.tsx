"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import React from "react";

type Option<T extends string> = { value: T; label: string };

export default function GoldSelect<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: Option<T>[];
}) {
  const selected = options.find((o) => o.value === value) ?? options[0];

  return (
    <div>
      <div className="text-sm text-white/70">{label}</div>

      <Listbox value={value} onChange={onChange}>
        <div className="relative mt-1">

          {/* Button */}
          <ListboxButton
            className="w-full rounded-xl border border-amber-400/30 bg-black p-3 text-left text-white outline-none focus:border-amber-400 hover:border-amber-400/60"
          >
            <span className="block truncate">{selected?.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-amber-200">
              ▾
            </span>
          </ListboxButton>

          {/* Optionen */}
          <ListboxOptions
            className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-amber-400/30 bg-black/95 p-1 shadow-lg backdrop-blur-sm focus:outline-none"
          >
            {options.map((opt) => (
              <ListboxOption
                key={opt.value}
                value={opt.value}
                className={({ active, selected }) =>
                  [
                    "cursor-pointer select-none rounded-lg px-3 py-2 text-sm",
                    active ? "bg-amber-400/15 text-white" : "text-white/90",
                    selected ? "ring-1 ring-amber-400/40" : "",
                  ].join(" ")
                }
              >
                {opt.label}
              </ListboxOption>
            ))}
          </ListboxOptions>

        </div>
      </Listbox>
    </div>
  );
}