"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

export interface ComboboxOption {
  value: string
  label: string
}

interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onChange?: (value: string) => void
  onCreateNew?: (label: string) => void
  placeholder?: string
  searchPlaceholder?: string
  createLabel?: string
  createNewLabel?: string
  emptyMessage?: string
  className?: string
}

export function Combobox({
  options,
  value,
  onChange,
  onCreateNew,
  placeholder = "Sélectionner...",
  searchPlaceholder = "Rechercher...",
  createLabel = "Créer",
  createNewLabel = "Créer nouveau",
  emptyMessage = "Aucun résultat.",
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [isCreating, setIsCreating] = React.useState(false)
  const [newItemName, setNewItemName] = React.useState("")
  const createInputRef = React.useRef<HTMLInputElement>(null)

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  )

  const selectedOption = options.find((opt) => opt.value === value)

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue)
    setOpen(false)
    setSearch("")
    setIsCreating(false)
    setNewItemName("")
  }

  const handleCreateNew = () => {
    if (newItemName.trim()) {
      onCreateNew?.(newItemName.trim())
      setNewItemName("")
      setIsCreating(false)
      setOpen(false)
    }
  }

  const handleStartCreating = () => {
    setIsCreating(true)
    setTimeout(() => createInputRef.current?.focus(), 0)
  }

  const handleCancelCreating = () => {
    setIsCreating(false)
    setNewItemName("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newItemName.trim()) {
      handleCreateNew()
    } else if (e.key === "Escape") {
      handleCancelCreating()
    }
  }

  return (
    <Popover open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen)
      if (!isOpen) {
        setIsCreating(false)
        setNewItemName("")
        setSearch("")
      }
    }}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between font-normal", className)}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <div className="p-2 border-b">
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9"
          />
        </div>
        <div className="max-h-60 overflow-y-auto p-1">
          {filteredOptions.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </p>
          )}
          {filteredOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={cn(
                "relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                value === option.value && "bg-accent"
              )}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === option.value ? "opacity-100" : "opacity-0"
                )}
              />
              {option.label}
            </button>
          ))}
        </div>
        {onCreateNew && (
          <div className="border-t p-2">
            {isCreating ? (
              <div className="flex items-center gap-2">
                <Input
                  ref={createInputRef}
                  placeholder="Nom..."
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="h-9 flex-1"
                />
                <Button
                  size="sm"
                  onClick={handleCreateNew}
                  disabled={!newItemName.trim()}
                  className="h-9 px-3"
                >
                  {createLabel}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCancelCreating}
                  className="h-9 px-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <button
                onClick={handleStartCreating}
                className="flex w-full items-center rounded-sm py-2 px-2 text-sm text-primary hover:bg-accent hover:text-accent-foreground"
              >
                <Plus className="mr-2 h-4 w-4" />
                {createNewLabel}
              </button>
            )}
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}