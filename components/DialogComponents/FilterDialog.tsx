"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

export function FilterDialog(){
    return <div className="mx-2">
        <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <SlidersHorizontal size="sm" />
                <h1 className="ml-2">Add Filters</h1>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-2xl">Filters</DialogTitle>
              </DialogHeader>
              <div>
                <Label>Tags</Label>
                <div className="mt-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a tag" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="gaming">gaming</SelectItem>
                        <SelectItem value="video">video</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mt-6">
                <Label>Link Type</Label>
                <div className="mt-2">
                <Select >
                    <SelectTrigger >
                      <SelectValue placeholder="Select Link Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="with">Links with custom back halves</SelectItem>
                        <SelectItem value="without">Links without custom back halves</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  </div>
                  </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="mt-4">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
    </div>
}