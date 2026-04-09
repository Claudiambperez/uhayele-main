"use client";
import { useState, useRef } from 'react';
import { ArrowLeft, Edit2, Save, X, User, Mail, Phone, Briefcase, FileText, Camera, Calendar, Award } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DoctorProfileData {
  serialNumber: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  yearsOfExperience: number;
  description: string;
  specializations: string[];
  profileImage?: string;
  createdAt: Date;
}

interface DoctorProfileProps {
  onBack: () => void;
}

export default function DoctorProfile({ onBack }: DoctorProfileProps) {
  // Mock doctor data - in production this would come from the database
  const [doctorData, setDoctorData] = useState<DoctorProfileData>({
    serialNumber: 'DR001',
    userId: 'U001',
    firstName: 'João',
    lastName: 'Santos',
    email: 'joao.santos@hospital.com',
    phone: '(11) 98765-4321',
    yearsOfExperience: 15,
    description: 'Médico especializado em clínica geral com ampla experiência em atendimento ambulatorial e hospitalar. Formado pela Universidade de São Paulo com residência em Medicina Interna.',
    specializations: ['Clínica Geral', 'Medicina Interna', 'Cardiologia'],
    profileImage: undefined,
    createdAt: new Date(2011, 0, 15)
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<DoctorProfileData>(doctorData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(doctorData);
    setErrors({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(doctorData);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!editedData.firstName.trim()) {
      newErrors.firstName = 'Nome é obrigatório';
    }

    if (!editedData.lastName.trim()) {
      newErrors.lastName = 'Sobrenome é obrigatório';
    }

    if (!editedData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editedData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!editedData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }

    if (editedData.yearsOfExperience < 0) {
      newErrors.yearsOfExperience = 'Anos de experiência não pode ser negativo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    setDoctorData(editedData);
    setIsEditing(false);
    // Here you would typically make an API call to save the data
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors({ ...errors, profileImage: 'A imagem deve ter menos de 5MB' });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedData({ ...editedData, profileImage: reader.result as string });
        setErrors({ ...errors, profileImage: '' });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => {
    setEditedData({ ...editedData, profileImage: undefined });
  };

  const currentData = isEditing ? editedData : doctorData;
  const fullName = `Dr. ${currentData.firstName} ${currentData.lastName}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-stone-50 p-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-slate-600 to-slate-700 p-3 rounded-xl shadow-md">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Perfil do Médico</h1>
                <p className="text-gray-500 text-sm mt-1">Gerencie suas informações profissionais</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors"
                >
                  <Edit2 className="w-5 h-5" />
                  Editar Perfil
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    Salvar
                  </button>
                </>
              )}
          
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Image and Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              {/* Profile Image */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  {currentData.profileImage ? (
                    <img
                      src={currentData.profileImage}
                      alt="Foto de Perfil"
                      className="w-32 h-32 rounded-full object-cover border-4 border-slate-100"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center border-4 border-slate-100">
                      <User className="w-16 h-16 text-white" />
                    </div>
                  )}

                  {isEditing && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 bg-slate-600 text-white p-2 rounded-full hover:bg-slate-700 transition-colors shadow-lg"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {isEditing && currentData.profileImage && (
                  <button
                    onClick={removeProfileImage}
                    className="mt-2 text-sm text-red-600 hover:text-red-700"
                  >
                    Remover foto
                  </button>
                )}
                {errors.profileImage && (
                  <p className="text-xs text-red-500 mt-2">{errors.profileImage}</p>
                )}

                <h2 className="text-2xl font-bold text-gray-900 mt-4">{fullName}</h2>
                <p className="text-sm text-gray-500 mt-1">CRM: {currentData.serialNumber}</p>
              </div>

              {/* Quick Stats */}
              <div className="space-y-3">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-600 p-2 rounded-lg">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Anos de Experiência</div>
                      <div className="text-xl font-bold text-gray-900">{currentData.yearsOfExperience}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-neutral-600 p-2 rounded-lg">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Especializações</div>
                      <div className="text-xl font-bold text-gray-900">{currentData.specializations.length}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-stone-50 rounded-lg p-4 border border-stone-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-stone-600 p-2 rounded-lg">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Membro desde</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {format(currentData.createdAt, "MMMM 'de' yyyy", { locale: ptBR })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Informações Pessoais</h3>

              <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Primeiro Nome *
                    </label>
                    {isEditing ? (
                      <div>
                        <input
                          type="text"
                          value={editedData.firstName}
                          onChange={(e) => {
                            setEditedData({ ...editedData, firstName: e.target.value });
                            setErrors({ ...errors, firstName: '' });
                          }}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent ${
                            errors.firstName ? 'border-red-500' : 'border-gray-200'
                          }`}
                        />
                        {errors.firstName && (
                          <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
                        <User className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{currentData.firstName}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Sobrenome *
                    </label>
                    {isEditing ? (
                      <div>
                        <input
                          type="text"
                          value={editedData.lastName}
                          onChange={(e) => {
                            setEditedData({ ...editedData, lastName: e.target.value });
                            setErrors({ ...errors, lastName: '' });
                          }}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent ${
                            errors.lastName ? 'border-red-500' : 'border-gray-200'
                          }`}
                        />
                        {errors.lastName && (
                          <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
                        <User className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{currentData.lastName}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  {isEditing ? (
                    <div>
                      <input
                        type="email"
                        value={editedData.email}
                        onChange={(e) => {
                          setEditedData({ ...editedData, email: e.target.value });
                          setErrors({ ...errors, email: '' });
                        }}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900">{currentData.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefone *
                  </label>
                  {isEditing ? (
                    <div>
                      <input
                        type="tel"
                        value={editedData.phone}
                        onChange={(e) => {
                          setEditedData({ ...editedData, phone: e.target.value });
                          setErrors({ ...errors, phone: '' });
                        }}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent ${
                          errors.phone ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900">{currentData.phone}</span>
                    </div>
                  )}
                </div>

                {/* Professional Information */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Informações Profissionais</h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Número de Ordem Médica
                      </label>
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
                        <Briefcase className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{currentData.serialNumber}</span>
                        <span className="text-xs text-gray-500 ml-auto">(Não editável)</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Anos de Experiência
                      </label>
                      {isEditing ? (
                        <div>
                          <input
                            type="number"
                            min="0"
                            value={editedData.yearsOfExperience}
                            onChange={(e) => {
                              setEditedData({ ...editedData, yearsOfExperience: parseInt(e.target.value) || 0 });
                              setErrors({ ...errors, yearsOfExperience: '' });
                            }}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent ${
                              errors.yearsOfExperience ? 'border-red-500' : 'border-gray-200'
                            }`}
                          />
                          {errors.yearsOfExperience && (
                            <p className="text-xs text-red-500 mt-1">{errors.yearsOfExperience}</p>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-lg">
                          <Award className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-900">{currentData.yearsOfExperience} anos</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Especializações
                      </label>
                      <div className="bg-gray-50 px-4 py-3 rounded-lg">
                        <div className="flex flex-wrap gap-2">
                          {currentData.specializations.map((spec, index) => (
                            <span
                              key={index}
                              className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Descrição / Biografia
                      </label>
                      {isEditing ? (
                        <textarea
                          value={editedData.description}
                          onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                          rows={5}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                          placeholder="Descreva sua experiência, formação e áreas de atuação..."
                        />
                      ) : (
                        <div className="flex items-start gap-3 bg-gray-50 px-4 py-3 rounded-lg">
                          <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                          <p className="text-gray-900 leading-relaxed">{currentData.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
