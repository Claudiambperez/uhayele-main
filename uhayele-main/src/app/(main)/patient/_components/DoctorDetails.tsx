import { useParams,  useNavigate } from "react-router";


import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Phone,
  Mail,
  GraduationCap,
  Calendar,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockDoctors } from "@/app/assets/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function DoctorDetail() {
  const { serialNumber } = useParams();
  const navigate = useNavigate();
  
  const doctor = mockDoctors.find((d) => d.serialNumber === serialNumber);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Médico não encontrado
          </h2>
          <p className="text-gray-600 mb-4">
            O médico que você está procurando não existe.
          </p>
          <Link href="/">
            <Button>Voltar à busca</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="default"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar à busca
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Doctor Profile Card */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                <span className="text-5xl">
                  {doctor.firstName[0]}
                  {doctor.lastName[0]}
                </span>
              </div>

              {/* Doctor Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      Dr. {doctor.firstName} {doctor.lastName}
                    </h1>
                    <div className="flex flex-wrap gap-2">
                      {doctor.specializations.map((spec) => (
                        <Badge key={spec.id} variant="secondary">
                          {spec.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Consulta desde</p>
                    <p className="text-2xl font-bold text-green-600">
                      {doctor.consultationFee.toLocaleString("pt-AO")} Kz
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(doctor.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{doctor.rating}</span>
                  <span className="text-gray-500">
                    ({doctor.reviewCount} avaliações)
                  </span>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    <span>{doctor.yearsOfExperience} anos de experiência</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span>Luanda, Angola</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <span>{doctor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">{doctor.email}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6">
                  <Link href={`/patient/book/${doctor.serialNumber}`}>
                    <Button size="lg" className="w-full md:w-auto">
                      <Calendar className="w-5 h-5 mr-2" />
                      Marcar Consulta
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Sobre o Médico</h2>
            <p className="text-gray-700  leading-relaxed">{doctor.description}</p>
          </CardContent>
        </Card>

        {/* Specializations Details */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-blue-600" />
              Especialidades
            </h2>
            <div className="space-y-4">
              {doctor.specializations.map((spec) => (
                <div key={spec.id}>
                  <h3 className="font-medium text-lg text-gray-900 mb-1">
                    {spec.name}
                  </h3>
                  <p className="text-gray-600">{spec.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Availability */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-600" />
              Disponibilidade
            </h2>
            <p className="text-gray-700">{doctor.availability}</p>
            <Separator className="my-4" />
            <p className="text-sm text-gray-500">
              * Os horários podem variar. Confirme a disponibilidade ao marcar
              sua consulta.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
