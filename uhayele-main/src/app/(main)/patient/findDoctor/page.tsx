"use client";
import { useState } from "react";

import { Search, Stethoscope, Filter } from "lucide-react";
import { mockDoctors, speciality } from "@/app/assets/data/mockData";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DoctorCard from "../_components/DoctorCard";

export default function FindDoctors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("rating");

  const filteredDoctors = mockDoctors
    .filter((doctor) => {
      const matchesSearch =
        doctor.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.speciality.some((spec) =>
          spec.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesSpecialization =
        selectedSpecialization === "all" ||
        doctor.speciality.some((spec) => spec.id === selectedSpecialization);

      return matchesSearch && matchesSpecialization;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "experience") return b.yearsOfExperience - a.yearsOfExperience;
      if (sortBy === "price-low") return a.consultationFee - b.consultationFee;
      if (sortBy === "price-high") return b.consultationFee - a.consultationFee;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 border border-zinc-500 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-zinc-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Encontre seu Médico
              </h1>
              <p className="text-sm text-gray-600">
                Agende consultas com os melhores profissionais de saúde em Angola
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid gap-4 md:grid-cols-[1fr,auto,auto]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Procurar por médico ou especialidade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
              <SelectTrigger className="w-full md:w-[220px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Especialidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas Especialidades</SelectItem>
                {speciality.map((spec) => (
                  <SelectItem key={spec.id} value={spec.id}>
                    {spec.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Melhor Avaliação</SelectItem>
                <SelectItem value="experience">Mais Experiente</SelectItem>
                <SelectItem value="price-low">Menor Preço</SelectItem>
                <SelectItem value="price-high">Maior Preço</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedSpecialization !== "all") && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t">
              <span className="text-sm text-gray-600">Filtros ativos:</span>
              {searchQuery && (
                <Badge variant="outline" className="gap-1">
                  Busca: {searchQuery}
                  <button
                    onClick={() => setSearchQuery("")}
                    className="ml-1 hover:text-red-600"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedSpecialization !== "all" && (
                <Badge variant="outline" className="gap-1">
                  {speciality.find((s) => s.id === selectedSpecialization)?.name}
                  <button
                    onClick={() => setSelectedSpecialization("all")}
                    className="ml-1 hover:text-red-600"
                  >
                    ×
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSpecialization("all");
                }}
                className="ml-auto text-xs"
              >
                Limpar tudo
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">{filteredDoctors.length}</span>{" "}
            médicos encontrados
          </p>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.serialNumber} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">
              Nenhum médico encontrado com os critérios selecionados
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedSpecialization("all");
              }}
              className="mt-4"
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
