"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Module } from "@/lib/types/module"
import { initialModules } from "@/lib/data/modules"

export default function ModuleDirectoryPage() {
  const [modules, setModules] = useState<Module[]>(initialModules)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newModule, setNewModule] = useState({
    id: "",
    title: "",
    description: "",
    teacher: "",
  })

  const handleDelete = (id: number) => {
    setModules(modules.filter((module) => module.id !== id))
  }

  const handleCreate = () => {
    if (!newModule.id || !newModule.title || !newModule.description || !newModule.teacher) {
      return
    }

    const module: Module = {
      id: Number.parseInt(newModule.id),
      title: newModule.title,
      description: newModule.description,
      teacher: newModule.teacher,
    }

    setModules([...modules, module])
    setNewModule({ id: "", title: "", description: "", teacher: "" })
    setIsDialogOpen(false)
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large background text watermark */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[20vw] font-black uppercase leading-none tracking-tighter text-blue-500/[0.02]">
          Modules
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute right-[10%] top-[15%] h-64 w-64 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/10 blur-3xl animate-float" />
        <div className="absolute left-[15%] bottom-[20%] h-48 w-48 rounded-full bg-gradient-to-tr from-blue-500/15 to-blue-300/10 blur-2xl animate-float animation-delay-200" />
        <div className="absolute right-[20%] bottom-[15%] h-32 w-32 rotate-45 bg-gradient-to-bl from-blue-400/10 to-transparent blur-xl animate-float-slow" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgb(59 130 246) 1px, transparent 1px), linear-gradient(90deg, rgb(59 130 246) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 flex-1 space-y-6 p-8">
        <div className="border-l-4 border-primary pl-4 opacity-0 animate-fade-in-up">
          <h1 className="text-4xl font-bold tracking-tight text-balance">Modules Directory</h1>
          <p className="text-muted-foreground mt-2 text-balance">Manage and organize your course modules</p>
        </div>

        <div className="rounded-lg border bg-white/80 shadow-lg backdrop-blur-sm opacity-0 animate-fade-in-up animation-delay-100">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-50/50">
                <TableHead className="w-[80px] font-semibold text-primary">ID</TableHead>
                <TableHead className="font-semibold text-primary">Title</TableHead>
                <TableHead className="font-semibold text-primary">Description</TableHead>
                <TableHead className="font-semibold text-primary">Teacher</TableHead>
                <TableHead className="w-[120px] text-right font-semibold text-primary">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {modules.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                        <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div className="text-muted-foreground text-balance">
                        No modules found. Create your first module to get started.
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                modules.map((module, index) => (
                  <TableRow
                    key={module.id}
                    className="opacity-0 animate-fade-in-up hover:bg-blue-50/30 transition-colors duration-200"
                    style={{ animationDelay: `${200 + index * 100}ms` }}
                  >
                    <TableCell className="font-medium text-primary">{module.id}</TableCell>
                    <TableCell className="font-medium">{module.title}</TableCell>
                    <TableCell className="text-muted-foreground max-w-md truncate">{module.description}</TableCell>
                    <TableCell>{module.teacher}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(module.id)}
                        aria-label={`Delete ${module.title}`}
                        className="gap-1 hover:scale-105 transition-transform duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="relative z-10 border-t bg-gradient-to-r from-blue-50/80 via-white/80 to-blue-50/80 backdrop-blur-sm p-6 opacity-0 animate-fade-in-up animation-delay-300">
        <div className="mx-auto max-w-7xl">
          <Button
            onClick={() => setIsDialogOpen(true)}
            size="lg"
            className="gap-2 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <Plus className="h-5 w-5" />
            New Module
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gradient-to-br from-white to-blue-50/30 border-blue-100 sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary text-balance">Create New Module</DialogTitle>
            <DialogDescription className="text-balance">
              Add a new module to your course directory. Fill in all the required information below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            <div className="space-y-2 opacity-0 animate-slide-in-right">
              <Label htmlFor="id" className="text-foreground font-medium">
                Module ID
              </Label>
              <Input
                id="id"
                type="number"
                placeholder="e.g., 4"
                value={newModule.id}
                onChange={(e) => setNewModule({ ...newModule, id: e.target.value })}
                className="border-blue-200 focus:border-primary focus:ring-primary/20 transition-all duration-200"
              />
            </div>

            <div className="space-y-2 opacity-0 animate-slide-in-right animation-delay-100">
              <Label htmlFor="title" className="text-foreground font-medium">
                Module Title
              </Label>
              <Input
                id="title"
                placeholder="e.g., Introduction to Python"
                value={newModule.title}
                onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
                className="border-blue-200 focus:border-primary focus:ring-primary/20 transition-all duration-200"
              />
            </div>

            <div className="space-y-2 opacity-0 animate-slide-in-right animation-delay-200">
              <Label htmlFor="description" className="text-foreground font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the module content and objectives"
                value={newModule.description}
                onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                rows={4}
                className="border-blue-200 focus:border-primary focus:ring-primary/20 transition-all duration-200 resize-none"
              />
            </div>

            <div className="space-y-2 opacity-0 animate-slide-in-right animation-delay-300">
              <Label htmlFor="teacher" className="text-foreground font-medium">
                Teacher
              </Label>
              <Input
                id="teacher"
                placeholder="e.g., Dr. Jane Smith"
                value={newModule.teacher}
                onChange={(e) => setNewModule({ ...newModule, teacher: e.target.value })}
                className="border-blue-200 focus:border-primary focus:ring-primary/20 transition-all duration-200"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false)
                setNewModule({ id: "", title: "", description: "", teacher: "" })
              }}
              className="border-blue-200 hover:bg-blue-50 transition-all duration-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
              disabled={!newModule.id || !newModule.title || !newModule.description || !newModule.teacher}
            >
              Create Module
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
