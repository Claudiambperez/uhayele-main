import { Doctor } from "@/app/assets/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, MapPin, Clock, Phone } from "lucide-react";
import Link from "next/link";

import { useState } from "react";

import DoctorProfileModal from "../doctor/[serialNumber]/page";
type DoctorCardProps = {
  doctor: Doctor;
};

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex gap-4">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shrink-0">
              <span className="text-2xl font-medium">
                {doctor.firstName[0]}{doctor.lastName[0]}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg leading-tight">
                    Dr. {doctor.firstName} {doctor.lastName}
                  </h3>

                  {/* Badges - using array */}
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    {doctor.speciality?.map((spec) => (
                      <Badge key={spec.id} variant="secondary" className="text-xs">
                        {spec.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-sm">{doctor.rating}</span>
                <span className="text-gray-500 text-sm">
                  ({doctor.reviewCount} avaliações)
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                {doctor.description}
              </p>

              {/* Info */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{doctor.yearsOfExperience} anos exp.</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>Luanda</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span className="text-xs">{doctor.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-6 py-4 bg-gray-50 flex items-center justify-between border-t">
          <div>
            <p className="text-xs text-gray-500">Consulta desde</p>
            <p className="font-semibold text-lg text-green-600">
              {doctor.consultationFee.toLocaleString("pt-AO")} Kz
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(true)}
            >
              Ver Perfil
            </Button>

            <Link href={`/patient/doctor/book/${doctor.serialNumber}`}>
              <Button size="sm">Marcar Consulta</Button>
            </Link>
          </div>
        </CardFooter>
      </Card>

      {/* Clean Modal - No more transformation needed */}
      <DoctorProfileModal
        doctor={doctor}           // ← No transformation needed anymore
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}